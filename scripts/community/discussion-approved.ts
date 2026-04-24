/**
 * discussion labeled "approved" — create GitHub issue, comment on discussion, optional Teams.
 * Optional: DISCUSSION_APPROVED_ACTORS=comma,list,of,logins (lowercase) — if set, only those users may trigger.
 */
import { readFileSync } from "node:fs";
import {
  addDiscussionCommentGraphql,
  addDiscussionLabelsByName,
  getDiscussionCommentBodiesGraphql,
} from "./github-discussion-graphql";
import {
  isJiraConfigured,
  notifyJira,
  typeFromDiscussionSlug,
} from "./jira-shared";
import {
  postTeamsDiscussionApprovalNotice,
  postTeamsJiraAndGithubCreated,
} from "./teams-notify";

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
const ghToken = token;
const [owner, repoName] = repoFull.split("/");
const ownerEnc = encodeURIComponent(owner);
const repoEnc = encodeURIComponent(repoName);

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
    user?: { login?: string };
  };
}

const event = JSON.parse(readFileSync(eventPath, "utf8")) as DiscussionEvent;

/** Hidden marker so re-runs skip after this automation already commented. */
const DISCUSSION_APPROVED_MARKER = "<!-- blok-discussion-approved -->";

async function gh(
  method: string,
  path: string,
  body: Record<string, unknown> | null,
): Promise<unknown> {
  const res = await fetch(`${api.replace(/\/+$/, "")}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${ghToken}`,
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
    .map((s) => s.trim().replace(/^@+/, "").toLowerCase())
    .filter(Boolean);
  const actor = (event.sender?.login || "").toLowerCase();
  if (actors.length && !actors.includes(actor)) {
    console.log(`Skip: ${actor} is not in DISCUSSION_APPROVED_ACTORS`);
    process.exit(0);
  }

  const dnum = discussion.number;

  let bodies: string;
  if (discussion.node_id) {
    const graphqlBodies = await getDiscussionCommentBodiesGraphql({
      token: ghToken,
      discussionNodeId: discussion.node_id,
    });
    bodies = graphqlBodies.join("\n");
  } else {
    const commentsRaw = await gh(
      "GET",
      `/repos/${ownerEnc}/${repoEnc}/discussions/${dnum}/comments`,
      null,
    );
    const list = Array.isArray(commentsRaw)
      ? (commentsRaw as DiscussionComment[])
      : [];
    bodies = list.map((c) => c.body || "").join("\n");
  }
  if (
    bodies.includes(DISCUSSION_APPROVED_MARKER) ||
    /Tracked in #\d+/i.test(bodies) ||
    /\*\*Approved \(no GitHub issue\)\*\*/i.test(bodies)
  ) {
    console.log(
      "Discussion already reviewed/approved by automation; skipping.",
    );
    process.exit(0);
  }

  let discBody = discussion.body || "";
  let discTitle = discussion.title || "Discussion";
  let discAuthorLogin = discussion.user?.login;
  if (!discussion.body && discussion.node_id) {
    try {
      const full = (await gh(
        "GET",
        `/repos/${ownerEnc}/${repoEnc}/discussions/${dnum}`,
        null,
      )) as { body?: string; title?: string; user?: { login?: string } };
      discBody = full.body || "";
      discTitle = full.title || discTitle;
      if (!discAuthorLogin && full.user?.login) {
        discAuthorLogin = full.user.login;
      }
    } catch {
      /* use event fields */
    }
  }

  const issueTitle = `[discussion - ${dnum}]`;

  const issueBody = `Created from discussion #${dnum}: ${discussion.html_url}\n\n---\n\n${discBody || "_No description._"}`;

  const issueRes = await fetch(
    `${api.replace(/\/+$/, "")}/repos/${ownerEnc}/${repoEnc}/issues`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ghToken}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: issueTitle,
        body: issueBody.slice(0, 65000),
        labels: ["needs-triage"],
      }),
    },
  );
  const issueResText = await issueRes.text();
  let issueJson: {
    number?: number;
    html_url?: string;
    title?: string;
    body?: string;
    message?: string;
  };
  try {
    issueJson = issueResText ? JSON.parse(issueResText) : {};
  } catch {
    issueJson = {};
  }

  let inum: number | undefined;
  let issueUrl: string | undefined;
  let githubIssueCreated = true;
  let trackedBody: string;

  if (issueRes.status === 410) {
    githubIssueCreated = false;
    issueUrl = discussion.html_url;
    trackedBody = `**Discussion reviewed and approved.**

This repository has [GitHub Issues disabled](https://docs.github.com/rest/issues/issues#create-an-issue), so **no GitHub issue was created**. Please keep tracking in this discussion thread.

**Discussion:** ${discussion.html_url}

${DISCUSSION_APPROVED_MARKER}`;
    console.log(
      "Issues disabled on repository (HTTP 410); skipping issue creation, posting discussion comment only.",
    );
  } else if (!issueRes.ok) {
    throw new Error(
      `POST /repos/${ownerEnc}/${repoEnc}/issues → ${issueRes.status}: ${issueResText.slice(0, 800)}`,
    );
  } else {
    inum = issueJson.number;
    issueUrl = issueJson.html_url;
    if (inum === undefined || !issueUrl) {
      throw new Error("Issue creation response missing number or html_url");
    }
    trackedBody = `**Discussion reviewed and approved.** A **GitHub issue** was created to track the process.

**Issue:** [#${inum}](${issueUrl})

${DISCUSSION_APPROVED_MARKER}`;
  }
  if (discussion.node_id) {
    await addDiscussionCommentGraphql({
      token: ghToken,
      discussionNodeId: discussion.node_id,
      body: trackedBody,
    });
  } else {
    await gh(
      "POST",
      `/repos/${ownerEnc}/${repoEnc}/discussions/${dnum}/comments`,
      {
        body: trackedBody,
      },
    );
  }

  try {
    if (discussion.node_id) {
      await addDiscussionLabelsByName({
        token: ghToken,
        owner,
        repo: repoName,
        discussionNodeId: discussion.node_id,
        labelNames: ["tracked"],
      });
      console.log("Applied label tracked (GraphQL)");
    } else {
      const currentRaw = await gh(
        "GET",
        `/repos/${ownerEnc}/${repoEnc}/discussions/${dnum}/labels`,
        null,
      );
      const currentLabels = Array.isArray(currentRaw)
        ? (currentRaw as DiscussionLabel[])
        : [];
      const names = new Set(
        currentLabels.map((l) => l.name).filter(Boolean) as string[],
      );
      names.add("tracked");
      await gh(
        "PUT",
        `/repos/${ownerEnc}/${repoEnc}/discussions/${dnum}/labels`,
        {
          labels: [...names],
        },
      );
      console.log("Applied label tracked (REST)");
    }
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn("Could not set tracked label:", msg);
  }

  const teamsUrl =
    process.env.TEAMS_COMMUNITY_WEBHOOK_URL || process.env.TEAMS_WEBHOOK_URL;
  if (teamsUrl) {
    await postTeamsDiscussionApprovalNotice({
      webhookUrl: teamsUrl,
      repository: repoFull,
      discussionNumber: dnum,
      discussionTitle: discTitle,
      discussionUrl: discussion.html_url,
      createdByLogin: discAuthorLogin,
      approvedByLogin: event.sender?.login,
      githubIssueCreated,
      issueUrl: githubIssueCreated && issueUrl ? issueUrl : undefined,
    });
  }

  const jiraSummary =
    discTitle.length > 250 ? `${discTitle.slice(0, 249)}…` : discTitle;

  let jiraResult: { ok: boolean; browseUrl?: string } = { ok: false };
  if (isJiraConfigured()) {
    const slug = discussion.category?.slug || "";
    const jtype = typeFromDiscussionSlug(slug);
    jiraResult = await notifyJira({
      summary: jiraSummary,
      description: githubIssueCreated
        ? String(issueJson.body || issueBody)
        : issueBody,
      link: issueUrl || discussion.html_url,
      type: jtype,
      sourceDiscussionUrl: discussion.html_url,
      sourceIssueUrl: githubIssueCreated && issueUrl ? issueUrl : undefined,
    });
    if (jiraResult.ok) {
      if (githubIssueCreated) {
        console.log("Jira notified for issue #%s (from discussion)", inum);
      } else {
        console.log("Jira notified (discussion link; issues disabled on repo)");
      }
    }
  }

  if (teamsUrl && jiraResult.ok && jiraResult.browseUrl) {
    await postTeamsJiraAndGithubCreated({
      webhookUrl: teamsUrl,
      discussionNumber: dnum,
      discussionUrl: discussion.html_url,
      issueTitle: githubIssueCreated
        ? String(issueJson.title ?? issueTitle)
        : jiraSummary,
      githubIssueCreated,
      issueUrl: githubIssueCreated && issueUrl ? issueUrl : undefined,
      jiraBrowseUrl: jiraResult.browseUrl,
    });
  }

  if (githubIssueCreated) {
    console.log("Created issue #%s from discussion #%s", inum, dnum);
  } else {
    console.log(
      "Approved discussion #%s (no GitHub issue — issues disabled on repo)",
      dnum,
    );
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
