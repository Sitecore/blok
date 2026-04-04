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
 * Single-page mode: pass a path as the first CLI argument, e.g. pnpm run browserstack:a11y -- /theming
 *   (or set BROWSERSTACK_A11Y_DISCOVER=0, or use a URL with a path only).
 * On success the BrowserStack Website Scanner dashboard opens (unless BROWSERSTACK_A11Y_OPEN_BROWSER=0).
 * Optional: BROWSERSTACK_A11Y_OPEN_BROWSER=0 to skip opening the browser.
 * Timeouts: BROWSERSTACK_LOCAL_START_TIMEOUT_MS (default 120000), BROWSERSTACK_A11Y_FETCH_TIMEOUT_MS (default 60000).
 * Polling: BROWSERSTACK_A11Y_POLL_MS overrides wait-for-completion; otherwise multi-URL scans use a longer default (~2 min per URL, min 15 min, max 4 h).
 * Scan name defaults to Blokcn-scan plus an ISO timestamp so each run is unique (API rejects duplicate names). Set BROWSERSTACK_A11Y_SCAN_NAME for a fixed name (remove the old scan in BrowserStack first if you reuse it).
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

const _cwd = process.cwd();

/** Lazy-load registry so the script prints progress before heavy imports. */
async function loadRegistry(): Promise<{
  getBlocks: () => { name: string }[];
  getComponents: () => { name: string }[];
}> {
  return import("../src/lib/registry");
}
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
  scanId?: number;
  scanRunId?: number;
  dashboardUrl: string;
  completed: boolean;
  errorMessage?: string;
  /** When true, add a note that the API uses bs-local.com for the same pages. */
  localPagesShownAsLocalhost?: boolean;
}): void {
  mkdirSync(resolve(_cwd, "docs", "a11y"), { recursive: true });
  const id = params.scanId !== undefined ? String(params.scanId) : "—";
  const runId = params.scanRunId !== undefined ? String(params.scanRunId) : "—";
  const n = params.scannedUrls.length;
  const scannedSummary =
    n === 1
      ? params.scannedUrls[0]
      : `${n} URLs (first: ${params.scannedUrls[0]})`;
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
    `| Pages (localhost) | ${scannedSummary} |`,
    `| Scan project id | ${id} |`,
    `| Scan run id | ${runId} |`,
    `| Status | ${params.completed ? "completed" : "failed or incomplete"} |`,
    "",
  ];
  if (params.localPagesShownAsLocalhost) {
    lines.push(
      "*The Website Scanner API sends the same pages as `bs-local.com` for the Local tunnel; in your browser they are **localhost** (e.g. `http://localhost:3000`).*",
      "",
    );
  }
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

function fetchTimeoutMs(): number {
  const n = Number(process.env.BROWSERSTACK_A11Y_FETCH_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 60_000;
}

function localStartTimeoutMs(): number {
  const n = Number(process.env.BROWSERSTACK_LOCAL_START_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 120_000;
}

/**
 * Website Scanner can take a long time for many URLs; default 5 min is too short for large scans.
 */
function defaultPollTimeoutMs(urlCount: number): number {
  if (urlCount <= 1) {
    return 600_000; // 10 min — single page
  }
  const perUrlMs = 120_000; // ~2 min per URL (heuristic)
  const minMs = 900_000; // 15 min minimum for any multi-URL run
  const maxMs = 14_400_000; // 4 h cap
  return Math.min(maxMs, Math.max(minMs, urlCount * perUrlMs));
}

function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(
        new Error(
          `${label} timed out after ${ms}ms. If BrowserStack Local never connects, check firewall/network and your access key; or set BROWSERSTACK_A11Y_SKIP_LOCAL_START=1 and run the Local binary yourself with the same BROWSERSTACK_LOCAL_IDENTIFIER.`,
        ),
      );
    }, ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e: unknown) => {
        clearTimeout(timer);
        reject(e);
      },
    );
  });
}

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

async function discoverProjectUrlPaths(): Promise<string[]> {
  const appRoot = resolve(_cwd, "src/app");
  if (!existsSync(appRoot)) {
    throw new Error(`Expected Next.js app dir at ${appRoot}`);
  }
  console.log(
    "Discovering routes under src/app (set BROWSERSTACK_A11Y_DISCOVER=0 for a single URL only)…",
  );
  const demoSlugs = extractDemoRouteSlugs();
  const { getBlocks, getComponents } = await loadRegistry();
  const blokNames = getBlocks().map((b) => b.name);
  const primitiveNames = getComponents().map((c) => c.name);
  const locations = walkAppDirs(appRoot, []);
  const paths = expandPageLocations(
    locations,
    demoSlugs,
    blokNames,
    primitiveNames,
  );
  const sorted = [...new Set(paths)].sort((a, b) => a.localeCompare(b));
  console.log(`Discovered ${sorted.length} route(s).`);
  return sorted;
}

/** Origin only (scheme + host + port). `URL#host` already includes the port — do not append `u.port` again. */
function originFromUrl(url: string): string {
  const u = new URL(url);
  return `${u.protocol}//${u.host}`;
}

function printBrowserstackCliHelp(): void {
  console.log(`browserstack-a11y-scan — Website Scanner (BrowserStack)

Usage:
  pnpm run browserstack:a11y
      Scan every discovered route (multi-page). Opens dashboard when the run finishes.

  pnpm run browserstack:a11y -- <path-or-full-url>
      Single page only (path is joined to BROWSERSTACK_A11Y_URL origin, or LOCAL_A11Y_BASE).
      Opens the same dashboard when the scan completes.

Examples:
  pnpm run browserstack:a11y -- /theming
  pnpm run browserstack:a11y -- demo/button
  pnpm run browserstack:a11y -- http://localhost:3000/primitives/input

Env: BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_A11Y_URL (default origin http://localhost:3000).
`);
}

/**
 * First CLI argument (if present): scan exactly that page and skip route discovery.
 * Accepts a path (/foo), path without leading slash (foo), or a full URL.
 */
function applyCliPagePathArg(argv: string[]): void {
  const filtered = argv.filter((a) => a !== "--");
  let pathArg: string | undefined;
  for (const a of filtered) {
    if (a === "--help" || a === "-h") {
      printBrowserstackCliHelp();
      process.exit(0);
    }
    if (!a.startsWith("-")) {
      pathArg = a;
      break;
    }
  }
  if (pathArg === undefined) return;

  const trimmed = pathArg.trim();
  if (!trimmed) return;

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    process.env.BROWSERSTACK_A11Y_URL = normalizeScanUrl(trimmed);
    process.env.BROWSERSTACK_A11Y_DISCOVER = "0";
    console.log(`Single-page scan (CLI): ${process.env.BROWSERSTACK_A11Y_URL}`);
    return;
  }

  const baseRaw =
    process.env.BROWSERSTACK_A11Y_URL?.trim() ||
    process.env.A11Y_SCAN_URL?.trim() ||
    process.env.LOCAL_A11Y_BASE?.trim() ||
    "http://localhost:3000";
  const normalized = normalizeScanUrl(baseRaw);
  const origin = originFromUrl(normalized);
  const pathPart = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const merged = joinOriginPath(origin, pathPart);
  process.env.BROWSERSTACK_A11Y_URL = merged;
  process.env.BROWSERSTACK_A11Y_DISCOVER = "0";
  console.log(`Single-page scan (CLI): ${merged}`);
}

/**
 * Multi-page: discover all routes when scan URL is a site root (path / or empty) and
 * BROWSERSTACK_A11Y_DISCOVER is not "0". Otherwise a single URL is scanned.
 */
async function resolveScanUrls(scanUrl: string): Promise<{
  urls: string[];
  mode: "single" | "multi";
}> {
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
  const paths = await discoverProjectUrlPaths();
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
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(fetchTimeoutMs()),
    });
  } catch (e) {
    if (
      e instanceof Error &&
      (e.name === "AbortError" || e.message.includes("abort"))
    ) {
      throw new Error(
        `Create scan request timed out after ${fetchTimeoutMs()}ms. Set BROWSERSTACK_A11Y_FETCH_TIMEOUT_MS to increase.`,
      );
    }
    throw e;
  }
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
  let res: Response;
  try {
    res = await fetch(url, {
      headers: { Authorization: authHeader },
      signal: AbortSignal.timeout(fetchTimeoutMs()),
    });
  } catch (e) {
    if (
      e instanceof Error &&
      (e.name === "AbortError" || e.message.includes("abort"))
    ) {
      throw new Error(
        `Status request timed out after ${fetchTimeoutMs()}ms. Set BROWSERSTACK_A11Y_FETCH_TIMEOUT_MS to increase.`,
      );
    }
    throw e;
  }
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
  applyCliPagePathArg(process.argv.slice(2));

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
    ({ urls, mode: scanMode } = await resolveScanUrls(scanUrl));
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
      const startMs = localStartTimeoutMs();
      console.log(
        `Connecting BrowserStack Local (timeout ${startMs / 1000}s) — ensure nothing else is blocking this access key’s tunnel…`,
      );
      await withTimeout(
        new Promise<void>((resolveStart, rejectStart) => {
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
        }),
        startMs,
        "BrowserStack Local",
      );
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
    `Blokcn-scan-${new Date().toISOString().replace(/[:.]/g, "-")}`;

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
      `Pages are your app at localhost; the API uses ${BS_LOCAL_DOMAIN} for the Local tunnel (required by Website Scanner).`,
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

    const envPoll = Number(process.env.BROWSERSTACK_A11Y_POLL_MS);
    const maxWaitMs =
      Number.isFinite(envPoll) && envPoll > 0
        ? envPoll
        : defaultPollTimeoutMs(urls.length);
    const intervalMs =
      Number(process.env.BROWSERSTACK_A11Y_POLL_INTERVAL_MS) || 5_000;
    const start = Date.now();
    console.log(
      `Waiting for scan to finish (max ${Math.round(maxWaitMs / 60_000)} min; set BROWSERSTACK_A11Y_POLL_MS to override)…`,
    );

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
          scanId,
          scanRunId,
          dashboardUrl,
          completed: true,
          localPagesShownAsLocalhost: isLocalhostUrl(urls[0] ?? ""),
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
          scanId,
          scanRunId,
          dashboardUrl,
          completed: false,
          errorMessage: err,
          localPagesShownAsLocalhost: isLocalhostUrl(urls[0] ?? ""),
        });
        openInBrowser(dashboardUrl);
        throw new Error(err);
      }
      if (state) {
        console.log(`Scan status: ${state} …`);
      }
      await delay(intervalMs);
    }

    const err = `Stopped waiting after ${Math.round(maxWaitMs / 60_000)} min — the scan may still be processing on BrowserStack (especially with many URLs). Open the dashboard for scan run ${scanRunId} or set BROWSERSTACK_A11Y_POLL_MS higher.`;
    writeScanDoc({
      scanName,
      region,
      scannedUrls: urls,
      scanId,
      scanRunId,
      dashboardUrl,
      completed: false,
      errorMessage: err,
      localPagesShownAsLocalhost: isLocalhostUrl(urls[0] ?? ""),
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
        dashboardUrl,
        completed: false,
        errorMessage: msg,
        localPagesShownAsLocalhost: isLocalhostUrl(urls[0] ?? ""),
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
