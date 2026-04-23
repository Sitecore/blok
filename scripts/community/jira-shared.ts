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
