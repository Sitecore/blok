import { execFileSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { join, resolve } from "node:path";
import { createInterface } from "node:readline/promises";
import { setTimeout as delay } from "node:timers/promises";
import { Local } from "browserstack-local";

const _cwd = process.cwd();
const SCAN_DOC = resolve(_cwd, "docs", "a11y", "browserstack-scan.md");

async function loadRegistry(): Promise<{
  getBlocks: () => { name: string }[];
  getComponents: () => { name: string }[];
}> {
  return import("../src/lib/registry");
}
/** Dashboard: Website Scanner report for this scan */
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

type JiraScanDocInfo =
  | { kind: "created"; key: string; browseUrl: string }
  | { kind: "skipped"; reason: string }
  | { kind: "error"; message: string };

function escapeMdTableCell(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, " ");
}

function escapeMarkdownCode(value: string): string {
  // Escape backslashes first, then backticks, for safe use in Markdown code spans.
  return value.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
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
  localPagesShownAsLocalhost?: boolean;
  jira?: JiraScanDocInfo;
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
    `| Name | \`${escapeMarkdownCode(params.scanName)}\` |`,
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
  if (params.jira) {
    lines.push("## Jira", "", "| Field | Value |", "| --- | --- |");
    if (params.jira.kind === "created") {
      lines.push(
        "| Status | Created |",
        `| Issue | [\`${params.jira.key}\`](${params.jira.browseUrl}) |`,
        `| Browse | ${params.jira.browseUrl} |`,
        "",
      );
    } else if (params.jira.kind === "skipped") {
      lines.push(
        "| Status | Skipped |",
        `| Reason | ${escapeMdTableCell(params.jira.reason)} |`,
        "",
      );
    } else {
      lines.push(
        "| Status | Error |",
        `| Message | ${escapeMdTableCell(params.jira.message)} |`,
        "",
      );
    }
  }
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

function defaultPollTimeoutMs(urlCount: number): number {
  if (urlCount <= 1) {
    return 600_000;
  }
  const perUrlMs = 120_000;
  const minMs = 900_000;
  const maxMs = 14_400_000;
  return Math.min(maxMs, Math.max(minMs, urlCount * perUrlMs));
}

function isEbusyError(e: unknown): boolean {
  if (typeof e !== "object" || e === null) return false;
  const code = (e as NodeJS.ErrnoException).code;
  if (code === "EBUSY") return true;
  const msg = e instanceof Error ? e.message : String(e);
  return /\bEBUSY\b/i.test(msg);
}

/** Windows: true if BrowserStack Local is already running (locks the binary / causes EBUSY). */
function isBrowserStackLocalProcessRunningWin32(): boolean {
  if (process.platform !== "win32") return false;
  try {
    const out = execFileSync(
      "tasklist",
      ["/FI", "IMAGENAME eq BrowserStackLocal.exe"],
      { encoding: "utf8", windowsHide: true },
    );
    return out.includes("BrowserStackLocal.exe");
  } catch {
    return false;
  }
}

function browserStackLocalBinaryPath(): string {
  return join(homedir(), ".browserstack", "BrowserStackLocal.exe");
}

function printBrowserStackLocalBusyHelp(): void {
  const bin = browserStackLocalBinaryPath();
  console.error(
    [
      "BrowserStack Local could not open its Windows binary (EBUSY: file busy or locked). Typical causes:",
      "  • Another BrowserStack Local is still running — end BrowserStackLocal.exe in Task Manager, or:",
      `      taskkill /IM BrowserStackLocal.exe /F`,
      "  • A second scan started before the first finished (only one tunnel per machine is safe).",
      `  • Antivirus briefly locked: ${bin}`,
      "",
      "Or skip auto-start and use your own tunnel: set BROWSERSTACK_A11Y_SKIP_LOCAL_START=1 and BROWSERSTACK_LOCAL_IDENTIFIER to match your running Local.",
    ].join("\n"),
  );
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

function normalizeScanUrl(raw: string): string {
  const t = raw.replace(/\uFEFF|\u200B|\u200C|\u200D|\u2060/g, "").trim();
  if (!t) return t;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) {
    return t;
  }
  return `http://${t}`;
}

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

function originFromUrl(url: string): string {
  const u = new URL(url);
  return `${u.protocol}//${u.host}`;
}

function printBrowserstackCliHelp(): void {
  console.log(`browserstack-a11y-scan — Website Scanner (BrowserStack)

Usage:
  pnpm run browserstack:a11y
      Scan every discovered route (multi-page). Opens dashboard when the run finishes.

  pnpm run browserstack:a11y -- <path-or-full-url> [<path-or-full-url> ...]
      One or more pages in a single scan. Paths are joined to BROWSERSTACK_A11Y_URL origin
      (or LOCAL_A11Y_BASE). If the first token is a full URL, later path-only tokens use that URL’s origin.

Examples:
  pnpm run browserstack:a11y -- /theming
  pnpm run browserstack:a11y --/theming
      (same as above if you omit the space before the path)
  pnpm run browserstack:a11y -- /theming /demo/button /primitives/input
      Scan several routes in one BrowserStack job.
  pnpm run browserstack:a11y -- demo/button
  pnpm run browserstack:a11y -- http://localhost:3000/primitives/input

Env: BROWSERSTACK_USERNAME, BROWSERSTACK_ACCESS_KEY, BROWSERSTACK_A11Y_URL (default origin http://localhost:3000).
Optional Jira: set JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, JIRA_PROJECT_KEY (issues only after a successful scan).
  In an interactive terminal you are prompted y/n to create the issue; set JIRA_SKIP_PROMPT=1 or CI=true to skip the prompt
  (then JIRA_CREATE_ISSUE=1 or full Jira env vars control creation as before).
`);
}

function collectCliPathTokens(filtered: string[]): string[] {
  const tokens: string[] = [];
  for (const a of filtered) {
    if (a === "--help" || a === "-h") {
      printBrowserstackCliHelp();
      process.exit(0);
    }
    if (a.startsWith("--/")) {
      tokens.push(a.slice(2));
      continue;
    }
    if (a.startsWith("-")) {
      continue;
    }
    tokens.push(a);
  }
  return tokens;
}

function applySingleCliPageToken(pathArg: string): void {
  const trimmed = pathArg.trim();
  if (!trimmed) return;

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
    process.env.BROWSERSTACK_A11Y_URL = normalizeScanUrl(trimmed);
    process.env.BROWSERSTACK_A11Y_DISCOVER = "0";
    process.env.BROWSERSTACK_A11Y_EXPLICIT_URLS = undefined;
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
  process.env.BROWSERSTACK_A11Y_EXPLICIT_URLS = undefined;
  console.log(`Single-page scan (CLI): ${merged}`);
}

function applyMultiCliPageTokens(tokens: string[]): void {
  const baseRaw =
    process.env.BROWSERSTACK_A11Y_URL?.trim() ||
    process.env.A11Y_SCAN_URL?.trim() ||
    process.env.LOCAL_A11Y_BASE?.trim() ||
    "http://localhost:3000";

  const first = tokens[0].trim();
  const urls: string[] = [];

  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(first)) {
    const firstUrl = normalizeScanUrl(first);
    urls.push(firstUrl);
    const origin = originFromUrl(firstUrl);
    for (let i = 1; i < tokens.length; i++) {
      const t = tokens[i].trim();
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) {
        urls.push(normalizeScanUrl(t));
      } else {
        const pathPart = t.startsWith("/") ? t : `/${t}`;
        urls.push(joinOriginPath(origin, pathPart));
      }
    }
  } else {
    const normalized = normalizeScanUrl(baseRaw);
    const origin = originFromUrl(normalized);
    for (const t of tokens) {
      const trimmed = t.trim();
      if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed)) {
        urls.push(normalizeScanUrl(trimmed));
      } else {
        const pathPart = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
        urls.push(joinOriginPath(origin, pathPart));
      }
    }
  }

  process.env.BROWSERSTACK_A11Y_URL = urls[0];
  process.env.BROWSERSTACK_A11Y_EXPLICIT_URLS = JSON.stringify(urls);
  process.env.BROWSERSTACK_A11Y_DISCOVER = "0";
  console.log(`Multi-page scan (CLI, ${urls.length} URLs): ${urls.join(", ")}`);
}

function applyCliPagePathArg(argv: string[]): void {
  const filtered = argv.filter((a) => a !== "--");
  const tokens = collectCliPathTokens(filtered);
  if (tokens.length === 0) {
    return;
  }
  if (tokens.length === 1) {
    applySingleCliPageToken(tokens[0]);
    return;
  }
  applyMultiCliPageTokens(tokens);
}

async function resolveScanUrls(scanUrl: string): Promise<{
  urls: string[];
  mode: "single" | "multi";
}> {
  const explicitRaw = process.env.BROWSERSTACK_A11Y_EXPLICIT_URLS?.trim();
  if (explicitRaw) {
    try {
      const parsed = JSON.parse(explicitRaw) as unknown;
      if (
        Array.isArray(parsed) &&
        parsed.length > 0 &&
        parsed.every((x) => typeof x === "string")
      ) {
        const urls = parsed as string[];
        return {
          urls,
          mode: urls.length > 1 ? "multi" : "single",
        };
      }
    } catch {}
  }

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

function jiraBasicAuthHeader(email: string, apiToken: string): string {
  return `Basic ${Buffer.from(`${email}:${apiToken}`).toString("base64")}`;
}

function normalizeJiraBaseUrl(raw: string): string {
  const t = raw.trim().replace(/\/+$/, "");
  if (!t) return t;
  if (!/^https?:\/\//i.test(t)) {
    return `https://${t}`;
  }
  return t;
}

function envTruthy(name: string): boolean {
  const v = process.env[name]?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}

function jiraExplicitlyDisabled(): boolean {
  const v = process.env.JIRA_CREATE_ISSUE?.trim().toLowerCase();
  return v === "0" || v === "false" || v === "no" || v === "off";
}

function jiraCredentialsComplete(): boolean {
  return !!(
    process.env.JIRA_BASE_URL?.trim() &&
    process.env.JIRA_EMAIL?.trim() &&
    process.env.JIRA_API_TOKEN?.trim() &&
    process.env.JIRA_PROJECT_KEY?.trim()
  );
}

function jiraCreateIssueRequested(): boolean {
  if (jiraExplicitlyDisabled()) return false;
  if (envTruthy("JIRA_CREATE_ISSUE")) return true;
  return jiraCredentialsComplete();
}

/** When true, the user is asked in the terminal whether to create a Jira issue (after a successful scan). */
function jiraUseInteractivePrompt(): boolean {
  if (envTruthy("JIRA_SKIP_PROMPT")) return false;
  if (envTruthy("CI")) return false;
  return process.stdin.isTTY === true;
}

async function promptYesNo(question: string): Promise<boolean> {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    const answer = (await rl.question(question)).trim().toLowerCase();
    return answer === "y" || answer === "yes";
  } finally {
    rl.close();
  }
}

function jiraFetchTimeoutMs(): number {
  const n = Number(process.env.JIRA_FETCH_TIMEOUT_MS);
  return Number.isFinite(n) && n > 0 ? n : 30_000;
}

function parseJiraLabels(): string[] | undefined {
  const raw = process.env.JIRA_LABELS?.trim();
  if (!raw) return undefined;
  const labels = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return labels.length > 0 ? labels : undefined;
}

interface JiraAdfDoc {
  type: "doc";
  version: 1;
  content: unknown[];
}

function jiraAdfDescription(params: {
  intro: string;
  lines: string[];
  linkLabel: string;
  linkUrl: string;
}): JiraAdfDoc {
  const content: unknown[] = [
    {
      type: "paragraph",
      content: [{ type: "text", text: params.intro }],
    },
  ];
  for (const line of params.lines) {
    content.push({
      type: "paragraph",
      content: [{ type: "text", text: line }],
    });
  }
  content.push({
    type: "paragraph",
    content: [
      { type: "text", text: `${params.linkLabel}: ` },
      {
        type: "text",
        text: params.linkUrl,
        marks: [{ type: "link", attrs: { href: params.linkUrl } }],
      },
    ],
  });
  return { type: "doc", version: 1, content };
}

interface JiraCreateIssueApiResponse {
  id: string;
  key: string;
  self: string;
}

function truncateJiraSummary(text: string, max = 240): string {
  if (text.length <= max) return text;
  return `${text.slice(0, Math.max(0, max - 1))}…`;
}

async function postJiraIssueApi(params: {
  scanName: string;
  region: string;
  scannedUrls: string[];
  scanId?: number;
  scanRunId?: number;
  dashboardUrl: string;
}): Promise<JiraCreateIssueApiResponse> {
  const baseRaw = process.env.JIRA_BASE_URL?.trim();
  const email = process.env.JIRA_EMAIL?.trim();
  const apiToken = process.env.JIRA_API_TOKEN?.trim();
  const projectKey = process.env.JIRA_PROJECT_KEY?.trim();
  const issueType = process.env.JIRA_ISSUE_TYPE?.trim() || "Task";
  const priorityName = process.env.JIRA_PRIORITY_NAME?.trim();

  if (!baseRaw || !email || !apiToken || !projectKey) {
    throw new Error("Jira configuration incomplete.");
  }

  const baseUrl = normalizeJiraBaseUrl(baseRaw);
  const browseBase = `${baseUrl}/browse`;
  const summary = truncateJiraSummary(`[A11y scan] ${params.scanName}`);

  const n = params.scannedUrls.length;
  const urlSummary =
    n === 1
      ? params.scannedUrls[0]
      : `${n} URLs (first: ${params.scannedUrls[0]})`;

  const lines: string[] = [
    `Region: ${params.region}`,
    `Pages: ${urlSummary}`,
    `Scan project id: ${params.scanId ?? "—"}`,
    `Scan run id: ${params.scanRunId ?? "—"}`,
    "Status: completed",
  ];

  const intro = "BrowserStack Website Scanner finished successfully.";

  const description = jiraAdfDescription({
    intro,
    lines,
    linkLabel: "BrowserStack dashboard",
    linkUrl: params.dashboardUrl,
  });

  const fields: Record<string, unknown> = {
    project: { key: projectKey },
    summary,
    description,
    issuetype: { name: issueType },
  };

  const labels = parseJiraLabels();
  if (labels) {
    fields.labels = labels;
  }
  if (priorityName) {
    fields.priority = { name: priorityName };
  }

  const auth = jiraBasicAuthHeader(email, apiToken);
  const apiUrl = `${baseUrl}/rest/api/3/issue`;
  const timeoutMs = jiraFetchTimeoutMs();

  let res: Response;
  try {
    res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ fields }),
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(`Jira create issue request failed: ${msg}`);
  }

  const text = await res.text();
  let json: unknown;
  try {
    json = JSON.parse(text) as Record<string, unknown>;
  } catch {
    throw new Error(
      `Jira create issue: invalid JSON (${res.status}): ${text.slice(0, 400)}`,
    );
  }

  if (!res.ok) {
    const errObj = json as {
      errorMessages?: string[];
      errors?: Record<string, string>;
    };
    const detail =
      errObj.errorMessages?.join("; ") ||
      (errObj.errors && JSON.stringify(errObj.errors)) ||
      text.slice(0, 500);
    throw new Error(`Jira create issue failed (${res.status}): ${detail}`);
  }

  const created = json as JiraCreateIssueApiResponse;
  if (!created.key) {
    throw new Error(
      `Jira create issue: unexpected response: ${text.slice(0, 400)}`,
    );
  }
  console.log(
    `Jira issue created: ${created.key} (${browseBase}/${created.key})`,
  );
  return created;
}

/** Only runs after BrowserStack reports scan status `completed` (no Jira on failed or timed-out scans). */
async function runJiraIntegration(params: {
  scanName: string;
  region: string;
  scannedUrls: string[];
  scanId?: number;
  scanRunId?: number;
  dashboardUrl: string;
}): Promise<JiraScanDocInfo | undefined> {
  if (!jiraCreateIssueRequested()) {
    return undefined;
  }

  if (jiraCredentialsComplete() && jiraUseInteractivePrompt()) {
    const create = await promptYesNo(
      "Create a Jira task for this completed scan? [y/N] ",
    );
    if (!create) {
      console.log("Skipping Jira issue creation.");
      return { kind: "skipped", reason: "Declined at interactive prompt." };
    }
  }

  const baseRaw = process.env.JIRA_BASE_URL?.trim();
  const email = process.env.JIRA_EMAIL?.trim();
  const apiToken = process.env.JIRA_API_TOKEN?.trim();
  const projectKey = process.env.JIRA_PROJECT_KEY?.trim();

  if (!baseRaw || !email || !apiToken || !projectKey) {
    console.warn(
      [
        "Jira integration is enabled but Jira is not fully configured.",
        "Set JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, and JIRA_PROJECT_KEY (see script header).",
      ].join(" "),
    );
    return {
      kind: "skipped",
      reason:
        "Jira integration is enabled but JIRA_BASE_URL, JIRA_EMAIL, JIRA_API_TOKEN, and JIRA_PROJECT_KEY must all be set.",
    };
  }

  try {
    const created = await postJiraIssueApi(params);
    const baseUrl = normalizeJiraBaseUrl(baseRaw);
    const browseUrl = `${baseUrl}/browse/${created.key}`;
    return { kind: "created", key: created.key, browseUrl };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(`Jira: ${msg} (scan result is unchanged.)`);
    return { kind: "error", message: msg };
  }
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
      const envLocalId = process.env.BROWSERSTACK_LOCAL_IDENTIFIER?.trim();
      localIdentifier = envLocalId || randomUUID();

      const win32LocalAlreadyRunning =
        process.platform === "win32" &&
        isBrowserStackLocalProcessRunningWin32();

      if (win32LocalAlreadyRunning && !envLocalId) {
        console.error(
          [
            "BrowserStack Local (BrowserStackLocal.exe) is already running on this PC.",
            "Stop it first (Task Manager → end BrowserStackLocal.exe, or in PowerShell: taskkill /IM BrowserStackLocal.exe /F),",
            "or set BROWSERSTACK_LOCAL_IDENTIFIER to the same value as your running tunnel so this script can reuse it without starting a second Local.",
            "(You can also set BROWSERSTACK_A11Y_SKIP_LOCAL_START=1 with that identifier.)",
          ].join("\n"),
        );
        process.exit(1);
      }

      const reuseExistingTunnel =
        win32LocalAlreadyRunning && Boolean(envLocalId);

      if (reuseExistingTunnel) {
        console.log(
          [
            "BrowserStack Local is already running — using BROWSERSTACK_LOCAL_IDENTIFIER from your environment and not starting a second tunnel.",
            "(It must match the --local-identifier of the process that is already running.)",
          ].join(" "),
        );
      } else {
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
        try {
          await withTimeout(
            new Promise<void>((resolveStart, rejectStart) => {
              const onUncaught = (err: Error) => {
                process.removeListener("uncaughtException", onUncaught);
                if (isEbusyError(err)) {
                  rejectStart(err);
                  return;
                }
                setImmediate(() => {
                  throw err;
                });
              };
              process.once("uncaughtException", onUncaught);
              tunnel.start(
                {
                  key: accessKey,
                  username,
                  localIdentifier,
                },
                (err?: Error) => {
                  process.removeListener("uncaughtException", onUncaught);
                  if (err) rejectStart(err);
                  else resolveStart();
                },
              );
            }),
            startMs,
            "BrowserStack Local",
          );
        } catch (e: unknown) {
          if (isEbusyError(e)) {
            printBrowserStackLocalBusyHelp();
          }
          throw e;
        }
        startedLocalTunnel = true;
        console.log(
          "BrowserStack Local tunnel connected (this script will stop it when finished).",
        );
      }
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

  let scanId: number | undefined;
  let scanRunId: number | undefined;

  try {
    const created = await createScan(baseUrl, authHeader, payload);
    scanId = created.data?.id;
    scanRunId = created.data?.scanRunId;

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
        const jiraDoc = await runJiraIntegration({
          scanName,
          region,
          scannedUrls: urls,
          scanId,
          scanRunId,
          dashboardUrl,
        });
        writeScanDoc({
          scanName,
          region,
          scannedUrls: urls,
          scanId,
          scanRunId,
          dashboardUrl,
          completed: true,
          localPagesShownAsLocalhost: isLocalhostUrl(urls[0] ?? ""),
          jira: jiraDoc,
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
        scanId,
        scanRunId,
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
