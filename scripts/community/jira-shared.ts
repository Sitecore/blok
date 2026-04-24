import { Buffer } from "node:buffer";

export interface GitHubLabel {
  name: string;
}

export interface JiraWebhookPayload {
  summary: string;
  description: string;
  link: string;
  type: string;
  /** When set (with REST), description is rendered as structured ADF with this link. */
  sourceDiscussionUrl?: string;
  /** GitHub issue or PR URL for the links row in ADF. */
  sourceIssueUrl?: string;
}

/** Result of {@link notifyJira} (REST includes browse URL when an issue was created). */
export interface JiraNotifyResult {
  ok: boolean;
  browseUrl?: string;
  issueKey?: string;
}

export function formatDescription(description: string): string {
  if (!description) return "";
  const header = (text: string) =>
    Array.from(Array(6)).reduce((currText, _, i) => {
      return currText.replace(
        new RegExp(`^#{${i + 1}}\\s`, "gm"),
        `h${i + 1}. `,
      );
    }, text);

  const boldText = (text: string) => text.replace(/\*\*(.*)\*\*/gm, "*$1*");
  const quote = (text: string) => text.replace(/^>\s/gm, "bq. ");
  const link = (text: string) =>
    text.replace(/\[([^download].*)\]\((.*)\)/gm, "[$1|$2]");
  const image = (text: string) =>
    text.replace(/!\[download\]\((.*)\)/gm, "!$1!");
  const codeBlock = (text: string) =>
    text.replace(/```(\w+)([\s\S]*)```/gm, "{code:$1}$2{code}");
  const inlineCodeBlock = (text: string) =>
    text.replace(/`([^`\n]+)`/gm, "{noformat}$1{noformat}");
  const comment = (text: string) => text.replace(/^<!---.*-->$/gm, "");

  return [
    header,
    boldText,
    quote,
    link,
    image,
    codeBlock,
    inlineCodeBlock,
    comment,
  ].reduce((currText, fn) => fn(currText), description);
}

const LABEL_RULES: {
  type: string;
  validate: (labels: GitHubLabel[]) => boolean;
}[] = [
  { type: "bug", validate: (labels) => labels.some((l) => l.name === "bug") },
  {
    type: "doc",
    validate: (labels) => labels.some((l) => l.name === "documentation"),
  },
  {
    type: "feature",
    validate: (labels) =>
      labels.some(
        (l) => l.name === "enhancement" || l.name === "component-request",
      ),
  },
  {
    type: "support",
    validate: (labels) =>
      labels.some((l) =>
        ["installation", "help", "theme", "styling", "general"].includes(
          l.name,
        ),
      ),
  },
  { type: "task", validate: () => true },
];

export function typeFromIssueLabels(labels: GitHubLabel[]): string {
  const match = LABEL_RULES.find((r) => r.validate(labels || []));
  return match ? match.type : "task";
}

const SLUG_TO_TYPE: Record<string, string> = {
  "bug-reports": "bug",
  "feature-requests": "feature",
  ideas: "feature",
  "general-q-a": "support",
  "design-feedback": "feature",
};

export function typeFromDiscussionSlug(slug: string): string {
  return SLUG_TO_TYPE[slug] || "task";
}

export function mirrorIssueInitialWorkflowLabels(): string[] {
  const trimmed = (
    process.env.GITHUB_MIRROR_ISSUE_INITIAL_WORKFLOW_LABELS ?? ""
  ).trim();
  if (trimmed.toLowerCase() === "none" || trimmed === "-") {
    return [];
  }
  if (!trimmed) {
    return ["tracked"];
  }
  return [
    ...new Set(
      trimmed
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    ),
  ];
}

/** Category-derived type labels (bug, enhancement, …) for mirror issues. */
export function mirrorIssueLabelsForDiscussionSlug(slug: string): string[] {
  const logical = typeFromDiscussionSlug(slug);
  switch (logical) {
    case "bug":
      return ["bug"];
    case "feature":
      return ["enhancement"];
    case "support":
      return ["help"];
    case "doc":
      return ["documentation"];
    default:
      return [];
  }
}

/** True when GitHub returned 422 because one or more label names are invalid / missing. */
export function isGithubIssueLabelsValidationError(
  status: number,
  responseText: string,
): boolean {
  if (status !== 422) return false;
  try {
    const j = JSON.parse(responseText) as {
      errors?: Array<{ field?: string; resource?: string }>;
    };
    return Boolean(j.errors?.some((e) => e.field === "labels"));
  } catch {
    return false;
  }
}

type AdfMark = { type: string; attrs?: Record<string, string> };
type AdfText = { type: "text"; text: string; marks?: AdfMark[] };
type AdfBlock = Record<string, unknown>;

function adfText(text: string, marks?: AdfMark[]): AdfText {
  const n: AdfText = { type: "text", text };
  if (marks?.length) n.marks = marks;
  return n;
}

function inlineWithBold(text: string): AdfText[] {
  const parts = text.split(/\*\*/);
  const out: AdfText[] = [];
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === "") continue;
    if (i % 2 === 1) {
      out.push(adfText(parts[i], [{ type: "strong" }]));
    } else {
      out.push(adfText(parts[i]));
    }
  }
  return out.length ? out : [adfText(text || " ")];
}

function stripGithubIssueMirrorHeader(md: string): string {
  let t = md.replace(
    /^Created from discussion #\d+:\s*https?:\/\/[^\s]+\s*\n*/i,
    "",
  );
  t = t.replace(/^\s*---+[^\n]*\n*/m, "");
  return t.trim();
}

function paragraphsAndListsFromPlain(text: string): AdfBlock[] {
  const lines = text.split("\n");
  const blocks: AdfBlock[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (/^-\s*\[[ xX]\]\s*/.test(line)) {
      const items: AdfBlock[] = [];
      while (i < lines.length && /^-\s*\[[ xX]\]\s*/.test(lines[i])) {
        const itemText = lines[i].replace(/^-\s*\[[ xX]\]\s*/, "").trim();
        items.push({
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: inlineWithBold(itemText),
            },
          ],
        });
        i++;
      }
      blocks.push({ type: "bulletList", content: items });
      continue;
    }
    if (line.trim() === "") {
      i++;
      continue;
    }
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !/^-\s*\[[ xX]\]\s*/.test(lines[i])
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    const para = paraLines.join("\n").trim();
    if (para) {
      blocks.push({
        type: "paragraph",
        content: inlineWithBold(para),
      });
    }
  }
  return blocks;
}

function restToAdfBlocks(rest: string): AdfBlock[] {
  const blocks: AdfBlock[] = [];
  const codeRe = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let m = codeRe.exec(rest);
  while (m !== null) {
    const before = rest.slice(lastIndex, m.index).trim();
    if (before) blocks.push(...paragraphsAndListsFromPlain(before));
    const lang = (m[1] || "").trim();
    const code = m[2].replace(/\n$/, "");
    blocks.push({
      type: "codeBlock",
      attrs: lang ? { language: lang } : {},
      content: [{ type: "text", text: code }],
    });
    lastIndex = m.index + m[0].length;
    m = codeRe.exec(rest);
  }
  const tail = rest.slice(lastIndex).trim();
  if (tail) blocks.push(...paragraphsAndListsFromPlain(tail));
  return blocks;
}

/**
 * Renders GitHub-style markdown (discussion / issue body) as Jira Cloud ADF:
 * links row, ### section headings (bold), paragraphs, task lists, fenced code.
 */
export function buildAdfFromGithubMarkdownBody(
  markdown: string,
  opts: { discussionUrl?: string; issueUrl?: string },
): object {
  const maxTotal = 31000;
  const disc = opts.discussionUrl?.trim();
  let issue = opts.issueUrl?.trim();
  if (issue && disc && issue === disc) {
    issue = undefined;
  }
  const mdRaw = stripGithubIssueMirrorHeader(markdown || "");
  const chunks = mdRaw.length
    ? mdRaw.split(/\n(?=###\s+)/)
    : ["_(No description provided)_"];

  const linkBits: AdfText[] = [];
  if (disc) {
    if (linkBits.length) linkBits.push(adfText("   "));
    linkBits.push(adfText("Discussion: ", [{ type: "strong" }]));
    linkBits.push(adfText(disc, [{ type: "link", attrs: { href: disc } }]));
  }
  if (issue) {
    if (linkBits.length) linkBits.push(adfText("   "));
    linkBits.push(adfText("GitHub issue: ", [{ type: "strong" }]));
    linkBits.push(adfText(issue, [{ type: "link", attrs: { href: issue } }]));
  }

  const content: AdfBlock[] = [];
  if (linkBits.length) {
    content.push({ type: "paragraph", content: linkBits });
  }

  for (const chunk of chunks) {
    const c = chunk.trim();
    if (!c) continue;
    const firstLine = c.split("\n")[0] || "";
    if (/^###\s+/.test(firstLine)) {
      const headingText = firstLine.replace(/^###\s+/, "").trim();
      const rest = c.slice(firstLine.length).trim();
      content.push({
        type: "heading",
        attrs: { level: 3 },
        content: [adfText(headingText)],
      });
      if (rest) content.push(...restToAdfBlocks(rest));
    } else {
      content.push(...restToAdfBlocks(c));
    }
  }

  const doc = { type: "doc", version: 1, content };
  const serialized = JSON.stringify(doc);
  if (serialized.length > maxTotal) {
    return {
      type: "doc",
      version: 1,
      content: [
        {
          type: "paragraph",
          content: [
            adfText(
              `${mdRaw.slice(0, 12000)}… [truncated for Jira size limit]`,
            ),
          ],
        },
        ...(linkBits.length ? [{ type: "paragraph", content: linkBits }] : []),
      ],
    };
  }
  return doc;
}

function issuetypeNameForLogicalType(logical: string): string {
  const env = (key: string, fallback: string) =>
    process.env[key]?.trim() || fallback;
  switch (logical) {
    case "bug":
      return env("JIRA_ISSUETYPE_BUG", "Bug");
    case "feature":
      return env("JIRA_ISSUETYPE_FEATURE", "Story");
    case "doc":
      return env("JIRA_ISSUETYPE_DOC", "Task");
    case "support":
      return env("JIRA_ISSUETYPE_SUPPORT", "Task");
    case "PR":
      return env("JIRA_ISSUETYPE_PR", "Task");
    default:
      return env("JIRA_ISSUETYPE_TASK", "Task");
  }
}

export function isJiraApiConfigured(): boolean {
  return Boolean(
    process.env.JIRA_BASE_URL?.trim() &&
      process.env.JIRA_EMAIL?.trim() &&
      process.env.JIRA_API_TOKEN?.trim() &&
      process.env.JIRA_PROJECT_KEY?.trim(),
  );
}

export function isJiraConfigured(): boolean {
  return isJiraApiConfigured() || Boolean(process.env.JIRA_WEBHOOK_URL?.trim());
}

/** Jira Cloud often returns 401 or 403 when the user cannot create issues in the project. */
function isJiraPermissionOrAuthDenied(status: number): boolean {
  return status === 401 || status === 403;
}

async function createJiraIssueRest(
  payload: JiraWebhookPayload,
): Promise<JiraNotifyResult> {
  const base = process.env.JIRA_BASE_URL?.replace(/\/+$/, "") ?? "";
  const email = process.env.JIRA_EMAIL ?? "";
  const token = process.env.JIRA_API_TOKEN ?? "";
  const projectKey = process.env.JIRA_PROJECT_KEY ?? "";
  const issuetypeName = issuetypeNameForLogicalType(payload.type);
  const summaryMax = 250;
  const summary =
    payload.summary.length > summaryMax
      ? `${payload.summary.slice(0, summaryMax - 1)}…`
      : payload.summary;

  const auth = Buffer.from(`${email}:${token}`, "utf8").toString("base64");
  const url = `${base}/rest/api/3/issue`;
  const issueLink =
    payload.sourceIssueUrl?.trim() || payload.link?.trim() || undefined;
  const discussionLink = payload.sourceDiscussionUrl?.trim() || undefined;
  const description = buildAdfFromGithubMarkdownBody(payload.description, {
    discussionUrl: discussionLink,
    issueUrl: issueLink,
  });

  const body = {
    fields: {
      project: { key: projectKey },
      summary,
      description,
      issuetype: { name: issuetypeName },
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const resText = await res.text();
  if (!res.ok) {
    if (isJiraPermissionOrAuthDenied(res.status)) {
      console.warn(
        `Jira REST ${res.status}: skipping (no permission to create issues in this project, or auth rejected). ${resText.slice(0, 400)}`,
      );
      return { ok: false };
    }
    throw new Error(`Jira REST ${res.status}: ${resText.slice(0, 800)}`);
  }
  let issueKey: string | undefined;
  try {
    const j = resText ? (JSON.parse(resText) as { key?: string }) : {};
    issueKey = j.key;
  } catch {
    issueKey = undefined;
  }
  const browseUrl =
    issueKey && base
      ? `${base}/browse/${encodeURIComponent(issueKey)}`
      : undefined;
  return { ok: true, browseUrl, issueKey };
}

export async function sendJiraWebhook(
  webhookUrl: string,
  { summary, description, link, type }: JiraWebhookPayload,
): Promise<boolean> {
  if (!webhookUrl?.trim()) return false;
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fields: {
        summary,
        description: formatDescription(description || ""),
        link,
        type,
      },
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    if (isJiraPermissionOrAuthDenied(res.status)) {
      console.warn(
        `Jira webhook ${res.status}: skipping (permission or auth rejected). ${t.slice(0, 400)}`,
      );
      return false;
    }
    throw new Error(`Jira webhook ${res.status}: ${t.slice(0, 500)}`);
  }
  return true;
}

/** REST path returns {@link JiraNotifyResult.browseUrl} when Jira returns an issue key. */
export async function notifyJira(
  payload: JiraWebhookPayload,
): Promise<JiraNotifyResult> {
  if (isJiraApiConfigured()) {
    const result = await createJiraIssueRest(payload);
    if (result.ok) {
      console.log("Jira REST issue created:", payload.type, payload.summary);
    }
    return result;
  }
  const webhookUrl = process.env.JIRA_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    const ok = await sendJiraWebhook(webhookUrl, payload);
    if (ok) {
      console.log("Jira webhook OK:", payload.type, payload.summary);
    }
    return { ok };
  }
  return { ok: false };
}
