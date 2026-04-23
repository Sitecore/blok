import { Buffer } from "node:buffer";

export interface GitHubLabel {
  name: string;
}

export interface JiraWebhookPayload {
  summary: string;
  description: string;
  link: string;
  type: string;
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

/** Atlassian Document Format for Jira Cloud REST `fields.description`. */
export function buildAdfDescription(body: string, sourceUrl: string): object {
  const text = (body || "").trim() || "_(No description provided)_";
  const max = 31000;
  const safe =
    text.length > max ? `${text.slice(0, max - 20)}… [truncated]` : text;
  return {
    type: "doc",
    version: 1,
    content: [
      {
        type: "paragraph",
        content: [{ type: "text", text: safe }],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "GitHub: " },
          {
            type: "text",
            text: sourceUrl,
            marks: [{ type: "link", attrs: { href: sourceUrl } }],
          },
        ],
      },
    ],
  };
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

async function createJiraIssueRest(payload: JiraWebhookPayload): Promise<void> {
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
  const body = {
    fields: {
      project: { key: projectKey },
      summary,
      description: buildAdfDescription(payload.description, payload.link),
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
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Jira REST ${res.status}: ${t.slice(0, 800)}`);
  }
}

export async function sendJiraWebhook(
  webhookUrl: string,
  { summary, description, link, type }: JiraWebhookPayload,
): Promise<void> {
  if (!webhookUrl?.trim()) return;
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
    throw new Error(`Jira webhook ${res.status}: ${t.slice(0, 500)}`);
  }
}

export async function notifyJira(payload: JiraWebhookPayload): Promise<void> {
  if (isJiraApiConfigured()) {
    await createJiraIssueRest(payload);
    console.log("Jira REST issue created:", payload.type, payload.summary);
    return;
  }
  const webhookUrl = process.env.JIRA_WEBHOOK_URL?.trim();
  if (webhookUrl) {
    await sendJiraWebhook(webhookUrl, payload);
    console.log("Jira webhook OK:", payload.type, payload.summary);
    return;
  }
}
