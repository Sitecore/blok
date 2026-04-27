import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_METRIC_PATH = join(__dirname, "blok-responsibility-metric.json");

export interface TeamsMentionUser {
  /** Display name — must match the `<at>…</at>` token in the card (see Teams docs). */
  name: string;
  /** Teams user id (e.g. `29:…@thread.skype` or AAD id per your tenant). */
  id: string;
}

export interface CategoryRouting {
  /** Space-separated GitHub @handles for the welcome comment `CC:` line. */
  githubCc?: string;
  /** Teams users to @mention on the “new discussion” Adaptive Card. */
  teamsMentions?: TeamsMentionUser[];
}

export type BlokResponsibilityMetric = Record<string, CategoryRouting>;

export interface BlokResponsibilityConfig {
  routing: BlokResponsibilityMetric;

  discussionApprovedActors: string[];
}

const LEGACY_SLUG_TO_ENV: Record<string, string> = {
  "bug-reports": "DISCUSSION_MENTIONS_BUG_REPORTS",
  "feature-requests": "DISCUSSION_MENTIONS_FEATURE_REQUESTS",
  ideas: "DISCUSSION_MENTIONS_IDEAS",
  "general-q-a": "DISCUSSION_MENTIONS_GENERAL_Q_A",
  "design-feedback": "DISCUSSION_MENTIONS_DESIGN_FEEDBACK",
};

const META_ROUTING_SKIP = new Set(["discussionApprovedActors"]);

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function normalizeTeamsMentions(raw: unknown): TeamsMentionUser[] {
  if (!Array.isArray(raw)) return [];
  const out: TeamsMentionUser[] = [];
  for (const item of raw) {
    if (!isPlainObject(item)) continue;
    const name = String(item.name ?? "").trim();
    const id = String(item.id ?? "").trim();
    if (name && id) out.push({ name, id });
  }
  return out;
}

/** Strip characters that break `<at>…</at>` / XML-like payloads. */
export function sanitizeTeamsAtDisplayName(name: string): string {
  const t = name.replace(/[<>]/g, "").trim();
  return t || "Reviewer";
}

function parseActorLogins(raw: unknown): string[] {
  if (Array.isArray(raw)) {
    return raw
      .map((x) => String(x).trim().replace(/^@+/, "").toLowerCase())
      .filter(Boolean);
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((s) => s.trim().replace(/^@+/, "").toLowerCase())
      .filter(Boolean);
  }
  return [];
}

function normalizeMetric(raw: unknown): BlokResponsibilityMetric {
  if (!isPlainObject(raw)) return {};
  const out: BlokResponsibilityMetric = {};
  for (const [slug, val] of Object.entries(raw)) {
    if (slug.startsWith("$") || slug.startsWith("_")) continue;
    if (META_ROUTING_SKIP.has(slug)) continue;
    if (!isPlainObject(val)) continue;
    const githubCc = String(val.githubCc ?? "").trim();
    const teamsMentions = normalizeTeamsMentions(val.teamsMentions);
    if (githubCc || teamsMentions.length) {
      out[slug] = {
        ...(githubCc ? { githubCc } : {}),
        ...(teamsMentions.length ? { teamsMentions } : {}),
      };
    }
  }
  return out;
}

function parseRootConfig(raw: unknown): BlokResponsibilityConfig {
  if (!isPlainObject(raw)) {
    return { routing: {}, discussionApprovedActors: [] };
  }
  return {
    routing: normalizeMetric(raw),
    discussionApprovedActors: parseActorLogins(raw.discussionApprovedActors),
  };
}

function metricFromLegacyEnv(): BlokResponsibilityMetric {
  const out: BlokResponsibilityMetric = {};
  for (const [slug, envKey] of Object.entries(LEGACY_SLUG_TO_ENV)) {
    const v = process.env[envKey]?.trim();
    if (v) out[slug] = { githubCc: v };
  }
  return out;
}

function loadRawJson(): unknown | undefined {
  const envRaw = process.env.BLOK_RESPONSIBILITY_METRIC?.trim();
  if (envRaw) {
    try {
      return JSON.parse(envRaw) as unknown;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.warn(
        "BLOK_RESPONSIBILITY_METRIC is not valid JSON; trying blok-responsibility-metric.json then legacy env:",
        msg,
      );
    }
  }

  try {
    if (existsSync(DEFAULT_METRIC_PATH)) {
      return JSON.parse(readFileSync(DEFAULT_METRIC_PATH, "utf8")) as unknown;
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("Could not read blok-responsibility-metric.json:", msg);
  }

  return undefined;
}

/**
 * Full config: discussion routing + who may trigger approval automation.
 * When `DISCUSSION_APPROVED_ACTORS` is set and non-empty, it replaces `discussionApprovedActors` from JSON.
 */
export function loadBlokResponsibilityConfig(): BlokResponsibilityConfig {
  const raw = loadRawJson();
  const fromFileOrEnv = raw !== undefined ? parseRootConfig(raw) : undefined;
  const base: BlokResponsibilityConfig =
    fromFileOrEnv !== undefined
      ? fromFileOrEnv
      : {
          routing: metricFromLegacyEnv(),
          discussionApprovedActors: [],
        };

  const envActors = parseActorLogins(process.env.DISCUSSION_APPROVED_ACTORS);
  if (envActors.length) {
    return { ...base, discussionApprovedActors: envActors };
  }
  return base;
}

/** Category slug → routing (GitHub CC + Teams mentions). */
export function loadBlokResponsibilityMetric(): BlokResponsibilityMetric {
  return loadBlokResponsibilityConfig().routing;
}

export function routingForDiscussionSlug(
  slug: string,
  metric: BlokResponsibilityMetric,
): CategoryRouting {
  return metric[slug] ?? {};
}
