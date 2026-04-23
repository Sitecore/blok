/**
 * discussion labeled "approved" — create GitHub issue, comment on discussion, optional Teams.
 * Optional: DISCUSSION_APPROVED_ACTORS=comma,list,of,logins (lowercase) — if set, only those users may trigger.
 */
import { readFileSync } from "node:fs";
import { sendJiraWebhook, typeFromDiscussionSlug } from "./jira-shared";
import { postTeamsDiscussionApproved } from "./teams-notify";

const api = process.env.GITHUB_API_URL || "https://api.github.com";
const token = process.env.GITHUB_TOKEN;
const repoFull = process.env.GITHUB_REPOSITORY;
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!repoFull || !token || !eventPath) {
  console.error(
    "GITHUB_REPOSITORY, GITHUB_TOKEN, or GITHUB_EVENT_PATH missing",
  );
  process.exit(1);
}
const [owner, repoName] = repoFull.split("/");

interface DiscussionComment {
  body?: string;
}

interface DiscussionLabel {
  name?: string;
}

interface DiscussionEvent {
  action?: string;
  label?: { name?: string };
  sender?: { login?: string };
  discussion?: {
    number: number;
    title?: string;
    body?: string;
    html_url: string;
    node_id?: string;
    category?: { slug?: string };
  };
}

const event = JSON.parse(readFileSync(eventPath, "utf8")) as DiscussionEvent;

async function gh(
  method: string,
  path: string,
  body: Record<string, unknown> | null,
): Promise<unknown> {
  const res = await fetch(`${api}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = {};
  }
  if (!res.ok) {
    throw new Error(
      `${method} ${path} → ${res.status}: ${String(text).slice(0, 800)}`,
    );
  }
  return data;
}

async function main(): Promise<void> {
  if (event.action !== "labeled" || event.label?.name !== "approved") {
    console.log("Skip: not discussion labeled approved");
    process.exit(0);
  }

  const discussion = event.discussion;
  if (!discussion) {
    console.log("No discussion on event");
    process.exit(0);
  }

  const actors = (process.env.DISCUSSION_APPROVED_ACTORS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const actor = (event.sender?.login || "").toLowerCase();
  if (actors.length && !actors.includes(actor)) {
    console.log(`Skip: ${actor} is not in DISCUSSION_APPROVED_ACTORS`);
    process.exit(0);
  }

  const dnum = discussion.number;

  const commentsRaw = await gh(
    "GET",
    `/repos/${owner}/${repoName}/discussions/${dnum}/comments`,
    null,
  );
  const list = Array.isArray(commentsRaw)
    ? (commentsRaw as DiscussionComment[])
    : [];
  const bodies = list.map((c) => c.body || "").join("\n");
  if (/Tracked in #\d+/i.test(bodies)) {
    console.log("Discussion already linked to an issue; skipping.");
    process.exit(0);
  }

  let discBody = discussion.body || "";
  let discTitle = discussion.title || "Discussion";
  if (!discussion.body && discussion.node_id) {
    try {
      const full = (await gh(
        "GET",
        `/repos/${owner}/${repoName}/discussions/${dnum}`,
        null,
      )) as { body?: string; title?: string };
      discBody = full.body || "";
      discTitle = full.title || discTitle;
    } catch {
      /* use event fields */
    }
  }

  const issueTitleRaw = `[from discussion #${dnum}] ${discTitle}`;
  const issueTitle =
    issueTitleRaw.length > 250
      ? `${issueTitleRaw.slice(0, 247)}…`
      : issueTitleRaw;

  const issueBody = `Created from discussion #${dnum}: ${discussion.html_url}\n\n---\n\n${discBody || "_No description._"}`;

  const issue = (await gh("POST", `/repos/${owner}/${repoName}/issues`, {
    title: issueTitle,
    body: issueBody.slice(0, 65000),
    labels: ["needs-triage"],
  })) as { number?: number; html_url?: string; title?: string; body?: string };

  const inum = issue.number;
  const issueUrl = issue.html_url;

  if (inum === undefined || !issueUrl) {
    throw new Error("Issue creation response missing number or html_url");
  }

  await gh("POST", `/repos/${owner}/${repoName}/discussions/${dnum}/comments`, {
    body: `**Tracked in** #${inum}\n\n${issueUrl}`,
  });

  try {
    const currentRaw = await gh(
      "GET",
      `/repos/${owner}/${repoName}/discussions/${dnum}/labels`,
      null,
    );
    const currentLabels = Array.isArray(currentRaw)
      ? (currentRaw as DiscussionLabel[])
      : [];
    const names = new Set(
      currentLabels.map((l) => l.name).filter(Boolean) as string[],
    );
    names.add("tracked");
    await gh("PUT", `/repos/${owner}/${repoName}/discussions/${dnum}/labels`, {
      labels: [...names],
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("Could not set tracked label:", msg);
  }

  const teamsUrl =
    process.env.TEAMS_COMMUNITY_WEBHOOK_URL || process.env.TEAMS_WEBHOOK_URL;
  if (teamsUrl) {
    await postTeamsDiscussionApproved({
      webhookUrl: teamsUrl,
      title: discTitle,
      discussionUrl: discussion.html_url,
      issueNumber: inum,
      issueUrl,
    });
  }

  const jiraUrl = process.env.JIRA_WEBHOOK_URL;
  if (jiraUrl?.trim()) {
    const slug = discussion.category?.slug || "";
    const jtype = typeFromDiscussionSlug(slug);
    const summaryPrefix = process.env.JIRA_SUMMARY_PREFIX || "[Blok] ";
    await sendJiraWebhook(jiraUrl, {
      summary: `${summaryPrefix}${issue.title}`,
      description: (issue.body as string) || issueBody,
      link: issueUrl,
      type: jtype,
    });
    console.log("Jira webhook sent for issue #%s (from discussion)", inum);
  }

  console.log("Created issue #%s from discussion #%s", inum, dnum);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
