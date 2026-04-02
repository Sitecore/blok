/**
 * BrowserStack Website Scanner — start an accessibility scan, wait for completion,
 * write details to docs/a11y/browserstack-scan.md, and open the BrowserStack dashboard.
 *
 * Requires BROWSERSTACK_USERNAME and BROWSERSTACK_ACCESS_KEY.
 * Loads `.env` then `.env.local` (Next-style precedence).
 *
 * Set BROWSERSTACK_A11Y_URL (or A11Y_SCAN_URL) to the site root, e.g. http://localhost:3000
 * (localhost:3000 without a scheme is accepted — http:// is assumed.)
 * By default, all app routes under src/app are discovered and scanned (static + dynamic).
 * Single-page mode: set BROWSERSTACK_A11Y_DISCOVER=0, or use a URL with a path (not only /).
 * Optional: BROWSERSTACK_A11Y_OPEN_BROWSER=0 to skip opening the browser.
 */

import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { Local } from "browserstack-local";

import { getBlocks, getComponents } from "../src/lib/registry";

const _cwd = process.cwd();
const SCAN_DOC = resolve(_cwd, "docs", "a11y", "browserstack-scan.md");

/** Dashboard: Website Scanner report for this scan (same pattern as BrowserStack tooling). */
function scannerDashboardUrl(scanName: string): string {
  const base =
    process.env.BROWSERSTACK_A11Y_DASHBOARD_BASE?.trim() ||
    "https://scanner.browserstack.com/site-scanner/scan-details";
  const sep = base.endsWith("/") ? "" : "/";
  return `${base}${sep}${encodeURIComponent(scanName)}`;
}

function openInBrowser(url: string): void {
  if (process.env.BROWSERSTACK_A11Y_OPEN_BROWSER === "0") {
    console.log(
      `Skipped opening browser (BROWSERSTACK_A11Y_OPEN_BROWSER=0). URL: ${url}`,
    );
    return;
  }
  const platform = process.platform;
  const child =
    platform === "win32"
      ? spawn("cmd", ["/c", "start", "", url], {
          detached: true,
          stdio: "ignore",
        })
      : platform === "darwin"
        ? spawn("open", [url], { detached: true, stdio: "ignore" })
        : spawn("xdg-open", [url], { detached: true, stdio: "ignore" });
  child.unref();
}

function writeScanDoc(params: {
  scanName: string;
  region: string;
  scannedUrls: string[];
  apiUrlsSent: string[];
  scanId?: number;
  scanRunId?: number;
  dashboardUrl: string;
  completed: boolean;
  errorMessage?: string;
}): void {
  mkdirSync(resolve(_cwd, "docs", "a11y"), { recursive: true });
  const id = params.scanId !== undefined ? String(params.scanId) : "—";
  const runId = params.scanRunId !== undefined ? String(params.scanRunId) : "—";
  const n = params.scannedUrls.length;
  const scannedSummary =
    n === 1
      ? params.scannedUrls[0]
      : `${n} URLs (first: ${params.scannedUrls[0]})`;
  const apiSummary =
    params.apiUrlsSent.length === 1
      ? params.apiUrlsSent[0]
      : `${params.apiUrlsSent.length} URLs (first: ${params.apiUrlsSent[0]})`;
  const lines = [
    "# BrowserStack accessibility scan",
    "",
    `**Last update:** ${new Date().toISOString()}`,
    "",
    "## Scan",
    "",
    "| Field | Value |",
    "| --- | --- |",
    `| Name | \`${params.scanName.replace(/`/g, "\\`")}\` |`,
    `| Region | ${params.region} |`,
    `| URLs scanned | ${scannedSummary} |`,
    `| API \`urlList\` sent | ${apiSummary} |`,
    `| Scan project id | ${id} |`,
    `| Scan run id | ${runId} |`,
    `| Status | ${params.completed ? "completed" : "failed or incomplete"} |`,
    "",
  ];
  if (n > 1) {
    const cap = 50;
    lines.push("## URLs (this run)", "");
    for (const u of params.scannedUrls.slice(0, cap)) {
      lines.push(`- ${u}`);
    }
    if (n > cap) {
      lines.push(`- … and ${n - cap} more`);
    }
    lines.push("");
  }
  lines.push(
    "## Dashboard",
    "",
    `Open the report: [BrowserStack Website Scanner — ${params.scanName}](${params.dashboardUrl})`,
    "",
    "In the app: **Accessibility Testing** → **Website scan** → select this scan → **Scan runs**.",
    "",
  );
  if (params.errorMessage) {
    lines.push("## Error", "", params.errorMessage, "");
  }
  lines.push(
    "## Settings (this run)",
    "",
    "- WCAG: **2.1 AA** (`wcag21aa`)",
    "- Advanced rules: **on**",
    "- Needs review: **on**",
    "",
  );
  writeFileSync(SCAN_DOC, `${lines.join("\n")}\n`, "utf8");
  console.log(`Wrote ${SCAN_DOC}`);
}

/** Minimal .env loader (no dotenv dep); matches Next-style precedence: .env then .env.local overrides. */
function parseEnvLine(line: string): [string, string] | undefined {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return undefined;
  const eq = trimmed.indexOf("=");
  if (eq <= 0) return undefined;
  const key = trimmed.slice(0, eq).trim();
  if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) return undefined;
  let val = trimmed.slice(eq + 1).trim();
  if (
    (val.startsWith('"') && val.endsWith('"')) ||
    (val.startsWith("'") && val.endsWith("'"))
  ) {
    val = val.slice(1, -1);
  }
  return [key, val];
}

function loadEnvFile(filePath: string, override: boolean): void {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const pair = parseEnvLine(line);
    if (!pair) continue;
    const [key, value] = pair;
    if (!override && process.env[key] !== undefined) continue;
    process.env[key] = value;
  }
}

loadEnvFile(resolve(_cwd, ".env"), false);
loadEnvFile(resolve(_cwd, ".env.local"), true);

type Region = "us" | "eu" | "in";

const REGION_API_BASE: Record<Region, string> = {
  us: "https://api-accessibility.browserstack.com",
  eu: "https://accessibility-eu.browserstack.com",
  in: "https://accessibility-in.browserstack.com",
};

/**
 * `new URL()` requires a scheme. Values like `localhost:3000` (common in .env) throw "Invalid URL"
 * unless we prepend http:// or https://.
 * Also strip BOM / zero-width chars (copy-paste, UTF-8 quirks); trim() alone is not enough.
 */
function normalizeScanUrl(raw: string): string {
  const t = raw.replace(/\uFEFF|\u200B|\u200C|\u200D|\u2060/g, "").trim();
  if (!t) return t;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) {
    return t;
  }
  return `http://${t}`;
}

/** Resolve pathname (e.g. `/theming`) against base origin; collapse `///` and surface bad paths. */
function joinOriginPath(baseOrigin: string, pathname: string): string {
  const collapsed = (pathname || "/").replace(/\/+/g, "/");
  const pathOnly = collapsed.startsWith("/") ? collapsed : `/${collapsed}`;
  const baseWithSlash = `${baseOrigin.replace(/\/+$/, "")}/`;
  try {
    return new URL(pathOnly, baseWithSlash).href;
  } catch (e) {
    throw new Error(
      `Cannot build scan URL for path ${JSON.stringify(pathname)} with base ${JSON.stringify(baseWithSlash)}: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
}

function getScanUrl(): string | undefined {
  const raw =
    process.env.BROWSERSTACK_A11Y_URL?.trim() ||
    process.env.A11Y_SCAN_URL?.trim();
  if (!raw) return undefined;
  return normalizeScanUrl(raw);
}

function getRegion(): Region {
  const r = (process.env.BROWSERSTACK_A11Y_REGION || "us").toLowerCase();
  if (r === "eu" || r === "in") return r;
  return "us";
}

/** Slugs for `/demo/[name]` — parsed from the demos object (avoid importing demos, which loads React). */
function extractDemoRouteSlugs(): string[] {
  const p = resolve(_cwd, "src/app/demo/[name]/index.tsx");
  if (!existsSync(p)) {
    throw new Error(`Expected demo index at ${p}`);
  }
  const src = readFileSync(p, "utf8");
  const marker = "export const demos";
  const mi = src.indexOf(marker);
  if (mi === -1) {
    throw new Error(`Missing ${marker} in ${p}`);
  }
  const openBrace = src.indexOf("{", mi);
  if (openBrace === -1) throw new Error("Missing demos object");
  let depth = 0;
  let end = openBrace;
  for (let i = openBrace; i < src.length; i++) {
    const c = src[i];
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  const body = src.slice(openBrace + 1, end);
  const keys: string[] = [];
  for (const line of body.split("\n")) {
    const t = line
      .trim()
      .replace(/\/\/.*$/, "")
      .trim();
    if (!t) continue;
    const quoted = t.match(/^"([^"]+)"\s*:/);
    if (quoted) {
      keys.push(quoted[1]);
      continue;
    }
    const identColon = t.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    if (identColon) {
      keys.push(identColon[1]);
      continue;
    }
    const identComma = t.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*,?\s*$/);
    if (identComma) keys.push(identComma[1]);
  }
  return keys;
}

interface PageLocation {
  segments: string[];
  isDynamic: boolean;
}

function walkAppDirs(dir: string, urlSegments: string[]): PageLocation[] {
  const results: PageLocation[] = [];
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith("_")) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith("(") && entry.name.endsWith(")")) {
        results.push(...walkAppDirs(full, urlSegments));
      } else if (entry.name.startsWith("[") && entry.name.endsWith("]")) {
        if (existsSync(join(full, "page.tsx"))) {
          results.push({
            segments: [...urlSegments, entry.name],
            isDynamic: true,
          });
        }
      } else {
        results.push(...walkAppDirs(full, [...urlSegments, entry.name]));
      }
    } else if (entry.name === "page.tsx") {
      results.push({ segments: [...urlSegments], isDynamic: false });
    }
  }
  return results;
}

function expandPageLocations(
  locations: PageLocation[],
  demoSlugs: string[],
  blokNames: string[],
  primitiveNames: string[],
): string[] {
  const paths: string[] = [];
  for (const loc of locations) {
    if (!loc.isDynamic) {
      const p = `/${loc.segments.join("/")}`.replace(/\/+/g, "/");
      paths.push(p === "//" ? "/" : p);
      continue;
    }
    const parent = loc.segments.slice(0, -1).join("/");
    const last = loc.segments[loc.segments.length - 1];
    if (!last.startsWith("[")) continue;
    let slugs: string[] = [];
    if (parent === "demo") slugs = demoSlugs;
    else if (parent === "bloks") slugs = blokNames;
    else if (parent === "primitives") slugs = primitiveNames;
    else continue;
    for (const slug of slugs) {
      const enc = encodeURIComponent(slug);
      paths.push(`/${parent}/${enc}`.replace(/\/+/g, "/"));
    }
  }
  return paths;
}

function discoverProjectUrlPaths(): string[] {
  const appRoot = resolve(_cwd, "src/app");
  if (!existsSync(appRoot)) {
    throw new Error(`Expected Next.js app dir at ${appRoot}`);
  }
  const demoSlugs = extractDemoRouteSlugs();
  const blokNames = getBlocks().map((b) => b.name);
  const primitiveNames = getComponents().map((c) => c.name);
  const locations = walkAppDirs(appRoot, []);
  const paths = expandPageLocations(
    locations,
    demoSlugs,
    blokNames,
    primitiveNames,
  );
  return [...new Set(paths)].sort((a, b) => a.localeCompare(b));
}

/** Origin only (scheme + host + port). `URL#host` already includes the port — do not append `u.port` again. */
function originFromUrl(url: string): string {
  const u = new URL(url);
  return `${u.protocol}//${u.host}`;
}

/**
 * Multi-page: discover all routes when scan URL is a site root (path / or empty) and
 * BROWSERSTACK_A11Y_DISCOVER is not "0". Otherwise a single URL is scanned.
 */
function resolveScanUrls(scanUrl: string): {
  urls: string[];
  mode: "single" | "multi";
} {
  let u: URL;
  try {
    u = new URL(scanUrl);
  } catch {
    throw new Error(
      `Invalid scan URL after normalization: ${JSON.stringify(scanUrl)}. Use an absolute URL, e.g. http://localhost:3000`,
    );
  }
  const discover = process.env.BROWSERSTACK_A11Y_DISCOVER !== "0";
  const pathname = (u.pathname.replace(/\/$/, "") || "/") as string;
  if (!discover) {
    return { urls: [scanUrl], mode: "single" };
  }
  if (pathname !== "/") {
    return { urls: [scanUrl], mode: "single" };
  }
  const base = originFromUrl(scanUrl);
  const paths = discoverProjectUrlPaths();
  const urls = paths.map((p) => joinOriginPath(base, p));
  return { urls, mode: "multi" };
}

const BS_LOCAL_DOMAIN = "bs-local.com";

function isLocalhostUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return (
      u.hostname === "localhost" ||
      u.hostname === "127.0.0.1" ||
      u.hostname === "0.0.0.0" ||
      u.hostname === "[::1]" ||
      u.hostname === "::1"
    );
  } catch {
    return false;
  }
}

/**
 * Website Scanner rejects raw localhost in `urlList`. BrowserStack maps local hosts to bs-local.com
 * when BrowserStack Local is running.
 */
function toScannerApiUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const localHosts = new Set([
      "127.0.0.1",
      "localhost",
      "0.0.0.0",
      "[::1]",
      "::1",
    ]);
    if (localHosts.has(parsed.hostname)) {
      parsed.hostname = BS_LOCAL_DOMAIN;
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

function basicAuthHeader(username: string, accessKey: string): string {
  return `Basic ${Buffer.from(`${username}:${accessKey}`).toString("base64")}`;
}

interface CreateScanResponse {
  success?: boolean;
  data?: {
    id?: number;
    scanRunId?: number;
    urlCount?: number;
  };
  error?: { invalidUrls?: string[]; message?: string };
}

interface StatusResponse {
  success?: boolean;
  data?: {
    scan_id?: number;
    scan_run_id?: number;
    status?: string;
  };
  error?: unknown;
}

async function createScan(
  baseUrl: string,
  authHeader: string,
  body: Record<string, unknown>,
): Promise<CreateScanResponse> {
  const url = `${baseUrl}/api/website-scanner/v1/scans`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  let json: CreateScanResponse;
  try {
    json = JSON.parse(text) as CreateScanResponse;
  } catch {
    throw new Error(
      `Create scan failed (${res.status}): ${text.slice(0, 500)}`,
    );
  }
  if (!res.ok || json.success === false) {
    const errMsg = json.error ? JSON.stringify(json.error) : text.slice(0, 500);
    throw new Error(`Create scan failed (${res.status}): ${errMsg}`);
  }
  return json;
}

async function getScanRunStatus(
  baseUrl: string,
  authHeader: string,
  scanId: number,
  scanRunId: number,
): Promise<StatusResponse> {
  const url = `${baseUrl}/api/website-scanner/v1/scans/${scanId}/scan_runs/${scanRunId}/status`;
  const res = await fetch(url, {
    headers: { Authorization: authHeader },
  });
  const text = await res.text();
  let json: StatusResponse;
  try {
    json = JSON.parse(text) as StatusResponse;
  } catch {
    throw new Error(
      `Status check failed (${res.status}): ${text.slice(0, 500)}`,
    );
  }
  if (!res.ok || json.success === false) {
    const errMsg =
      json.error !== undefined
        ? JSON.stringify(json.error)
        : text.slice(0, 500);
    throw new Error(`Status check failed (${res.status}): ${errMsg}`);
  }
  return json;
}

async function main(): Promise<void> {
  const username = process.env.BROWSERSTACK_USERNAME;
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY;
  if (!username || !accessKey) {
    console.error(
      [
        "Missing BROWSERSTACK_USERNAME or BROWSERSTACK_ACCESS_KEY.",
        "Set them in the shell, or add them to .env.local (or .env) in the project root, then re-run.",
        "Example:",
        "  BROWSERSTACK_USERNAME=your_username",
        "  BROWSERSTACK_ACCESS_KEY=your_access_key",
      ].join("\n"),
    );
    process.exit(1);
  }

  const scanUrl = getScanUrl();
  if (!scanUrl) {
    console.error(
      [
        "Set a URL to scan (Website Scanner must reach it from BrowserStack’s cloud).",
        "Add to .env.local, for example:",
        "  BROWSERSTACK_A11Y_URL=https://your-staging-or-production.example.com",
        "  BROWSERSTACK_A11Y_URL=http://localhost:3000   (or localhost:3000 — http:// is added if missing)",
        "For http://localhost, this script starts BrowserStack Local automatically unless you set BROWSERSTACK_A11Y_SKIP_LOCAL_START=1.",
      ].join("\n"),
    );
    process.exit(1);
  }

  let urls: string[];
  let scanMode: "single" | "multi";
  try {
    ({ urls, mode: scanMode } = resolveScanUrls(scanUrl));
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }

  const skipLocalBinary =
    process.env.BROWSERSTACK_A11Y_SKIP_LOCAL_START === "1" ||
    process.env.BROWSERSTACK_USE_OWN_LOCAL_BINARY_PROCESS === "true";

  let localIdentifier: string | undefined;
  let localTunnel: Local | undefined;
  let startedLocalTunnel = false;

  if (isLocalhostUrl(urls[0])) {
    if (skipLocalBinary) {
      localIdentifier = process.env.BROWSERSTACK_LOCAL_IDENTIFIER?.trim();
      if (!localIdentifier) {
        console.error(
          [
            "Local URL scan with manual Local: set BROWSERSTACK_LOCAL_IDENTIFIER to match your running BrowserStack Local tunnel,",
            "or remove BROWSERSTACK_A11Y_SKIP_LOCAL_START / BROWSERSTACK_USE_OWN_LOCAL_BINARY_PROCESS so this script can start Local for you.",
          ].join("\n"),
        );
        process.exit(1);
      }
      console.log(
        "Using your existing BrowserStack Local tunnel (manual mode). Ensure it is running with this localIdentifier.",
      );
    } else {
      localIdentifier =
        process.env.BROWSERSTACK_LOCAL_IDENTIFIER?.trim() || randomUUID();
      const tunnel = new Local();
      (tunnel as unknown as { logfile: string }).logfile = resolve(
        _cwd,
        "browserstack-local.log",
      );
      localTunnel = tunnel;
      await new Promise<void>((resolveStart, rejectStart) => {
        tunnel.start(
          {
            key: accessKey,
            username,
            localIdentifier,
          },
          (err?: Error) => {
            if (err) rejectStart(err);
            else resolveStart();
          },
        );
      });
      startedLocalTunnel = true;
      console.log(
        "BrowserStack Local tunnel connected (this script will stop it when finished).",
      );
    }
  }

  const region = getRegion();
  const baseUrl = REGION_API_BASE[region];
  const authHeader = basicAuthHeader(username, accessKey);

  const scanName =
    process.env.BROWSERSTACK_A11Y_SCAN_NAME?.trim() ||
    `blokcn-${new Date().toISOString().replace(/[:.]/g, "-")}`;

  const apiUrls = urls.map((u) => toScannerApiUrl(u));
  const dashboardUrl = scannerDashboardUrl(scanName);

  const payload: Record<string, unknown> = {
    name: scanName,
    recurring: false,
    instantRun: true,
    urlList: apiUrls,
    scanSettings: {
      wcagVersion: "wcag21aa",
      advancedRules: true,
      bestPractices: false,
      needsReview: true,
    },
  };

  if (isLocalhostUrl(urls[0]) && localIdentifier) {
    payload.localTestingInfo = {
      localEnabled: true,
      localIdentifier,
    };
  }

  console.log(`Starting BrowserStack accessibility scan (${region})…`);
  if (scanMode === "multi") {
    console.log(
      `Multi-page scan: ${urls.length} URLs (from project routes under src/app).`,
    );
  }
  console.log(`Primary URL: ${urls[0]}`);
  if (urls.length > 1) {
    const preview = urls.slice(0, 5).join(", ");
    console.log(
      urls.length > 5
        ? `URLs (preview): ${preview}, … (+${urls.length - 5} more)`
        : `URLs: ${preview}`,
    );
  }
  if (apiUrls[0] !== urls[0]) {
    console.log(
      `API urlList uses ${BS_LOCAL_DOMAIN} for localhost (BrowserStack Website Scanner).`,
    );
  }

  try {
    const created = await createScan(baseUrl, authHeader, payload);
    const scanId = created.data?.id;
    const scanRunId = created.data?.scanRunId;

    if (scanId === undefined || scanRunId === undefined) {
      throw new Error(
        `Unexpected response (missing id or scanRunId): ${JSON.stringify(created)}`,
      );
    }

    console.log(`Scan project id: ${scanId}`);
    console.log(`Scan run id: ${scanRunId}`);
    if (created.data?.urlCount !== undefined) {
      console.log(`URL count: ${created.data.urlCount}`);
    }

    const maxWaitMs = Number(process.env.BROWSERSTACK_A11Y_POLL_MS) || 300_000;
    const intervalMs =
      Number(process.env.BROWSERSTACK_A11Y_POLL_INTERVAL_MS) || 5_000;
    const start = Date.now();

    while (Date.now() - start < maxWaitMs) {
      const status = await getScanRunStatus(
        baseUrl,
        authHeader,
        scanId,
        scanRunId,
      );
      const state = status.data?.status;
      if (state === "completed") {
        console.log("Scan status: completed");
        writeScanDoc({
          scanName,
          region,
          scannedUrls: urls,
          apiUrlsSent: apiUrls,
          scanId,
          scanRunId,
          dashboardUrl,
          completed: true,
        });
        openInBrowser(dashboardUrl);
        console.log(`Dashboard: ${dashboardUrl}`);
        return;
      }
      if (state === "failed") {
        const err = "Scan status: failed";
        writeScanDoc({
          scanName,
          region,
          scannedUrls: urls,
          apiUrlsSent: apiUrls,
          scanId,
          scanRunId,
          dashboardUrl,
          completed: false,
          errorMessage: err,
        });
        openInBrowser(dashboardUrl);
        throw new Error(err);
      }
      if (state) {
        console.log(`Scan status: ${state} …`);
      }
      await delay(intervalMs);
    }

    const err = `Timed out after ${maxWaitMs}ms waiting for scan completion. Check the dashboard for scan run ${scanRunId}.`;
    writeScanDoc({
      scanName,
      region,
      scannedUrls: urls,
      apiUrlsSent: apiUrls,
      scanId,
      scanRunId,
      dashboardUrl,
      completed: false,
      errorMessage: err,
    });
    openInBrowser(dashboardUrl);
    throw new Error(err);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!existsSync(SCAN_DOC)) {
      writeScanDoc({
        scanName,
        region,
        scannedUrls: urls,
        apiUrlsSent: apiUrls,
        dashboardUrl,
        completed: false,
        errorMessage: msg,
      });
    }
    throw e;
  } finally {
    if (startedLocalTunnel && localTunnel) {
      await new Promise<void>((resolveStop) => {
        localTunnel.stop(() => resolveStop());
      });
      console.log("BrowserStack Local tunnel stopped.");
    }
  }
}

main().catch((err: unknown) => {
  if (err instanceof Error && err.message === "Invalid URL") {
    console.error(err.stack ?? err.message);
  } else {
    console.error(err instanceof Error ? err.message : err);
  }
  process.exit(1);
});
