import { readFileSync } from "node:fs";
import {
  isJiraConfigured,
  notifyJira,
  typeFromIssueLabels,
} from "./jira-shared";

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error("GITHUB_EVENT_PATH missing");
  process.exit(1);
}

const github = JSON.parse(readFileSync(eventPath, "utf8")) as {
  issue?: {
    title?: string;
    body?: string;
    html_url?: string;
    labels?: { name: string }[];
  };
  pull_request?: unknown;
};

async function main(): Promise<void> {
  if (!isJiraConfigured()) {
    console.log(
      "Jira not configured (set JIRA_BASE_URL + JIRA_EMAIL + JIRA_API_TOKEN + JIRA_PROJECT_KEY, or JIRA_WEBHOOK_URL); skipping.",
    );
    process.exit(0);
  }

  if (github.pull_request) {
    console.log(
      "Skip: Jira from GitHub is issues-only; pull_request events are ignored.",
    );
    process.exit(0);
  }

  const issue = github.issue;
  if (!issue) {
    console.log("No issue on event; skipping.");
    process.exit(0);
  }

  const jiraIssueType = typeFromIssueLabels(issue.labels || []);
  const summaryPrefix = (process.env.JIRA_SUMMARY_PREFIX ?? "").trim();
  const summary = summaryPrefix
    ? `${summaryPrefix} ${issue.title}`.trim()
    : issue.title || "";

  try {
    await notifyJira({
      summary,
      description: issue.body || "",
      link: issue.html_url || "",
      type: jiraIssueType,
    });
  } catch (error) {
    console.error("Jira notify error:", error);
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
