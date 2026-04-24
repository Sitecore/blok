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
  pull_request?: {
    title?: string;
    body?: string;
    html_url?: string;
    user?: { login?: string };
  };
};

async function fetchJson(url: string): Promise<{
  user?: { permissions?: { admin?: boolean; maintain?: boolean } };
}> {
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  });
  const text = await res.text();
  let data: {
    user?: { permissions?: { admin?: boolean; maintain?: boolean } };
  };
  try {
    data = text ? (JSON.parse(text) as typeof data) : {};
  } catch {
    data = {};
  }
  if (!res.ok) {
    throw new Error(`GET ${url} → ${res.status}: ${text.slice(0, 500)}`);
  }
  return data;
}

async function main(): Promise<void> {
  if (!isJiraConfigured()) {
    console.log(
      "Jira not configured (set JIRA_BASE_URL + JIRA_EMAIL + JIRA_API_TOKEN + JIRA_PROJECT_KEY, or JIRA_WEBHOOK_URL); skipping.",
    );
    process.exit(0);
  }

  const repoFull = process.env.GITHUB_REPOSITORY;
  if (!repoFull) {
    console.error("GITHUB_REPOSITORY missing");
    process.exit(1);
  }
  const apiBase = process.env.GITHUB_API_URL || "https://api.github.com";

  const jiraIssueType = github.pull_request
    ? "PR"
    : typeFromIssueLabels(github.issue?.labels || []);
  const eventEntity = github.issue || github.pull_request;
  if (!eventEntity) {
    console.log("No issue or pull_request on event; skipping.");
    process.exit(0);
  }

  if (github.pull_request) {
    const pr = github.pull_request;
    try {
      const userInfoRes = await fetchJson(
        `${apiBase}/repos/${repoFull}/collaborators/${pr.user?.login}/permission`,
      );
      if (
        userInfoRes.user?.permissions?.admin ||
        userInfoRes.user?.permissions?.maintain
      ) {
        console.log("Skipping Jira: PR author has admin/maintain on repo.");
        process.exit(0);
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.log("Could not verify collaborator permission:", msg);
    }
  }

  const summaryPrefix = (process.env.JIRA_SUMMARY_PREFIX ?? "").trim();
  const summary = summaryPrefix
    ? `${summaryPrefix} ${eventEntity.title}`.trim()
    : eventEntity.title || "";

  try {
    await notifyJira({
      summary,
      description: eventEntity.body || "",
      link: eventEntity.html_url || "",
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
