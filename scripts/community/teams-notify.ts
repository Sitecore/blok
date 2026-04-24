/**
 * Teams Incoming Webhook — Adaptive Card payload (Power Automate / Workflows).
 * Includes discussion template content (markdown sections) when available.
 */
import { Buffer } from "node:buffer";
import {
  type TeamsMentionUser,
  sanitizeTeamsAtDisplayName,
} from "./blok-responsibility-metric";

const TEAMS_PAYLOAD_MAX_BYTES = 256 * 1024;
const ADAPTIVE_VERSION = "1.5";
const ADAPTIVE_SCHEMA = "http://adaptivecards.io/schemas/adaptive-card.json";
const DISCUSSION_BODY_MAX = 24000;
const SECTION_BODY_MAX = 4000;
const MAX_SECTIONS = 14;

function escapeText(s: string | undefined): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function truncate(s: string, max: number): string {
  const t = String(s || "");
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

/**
 * Split GitHub discussion body on markdown headings (template fields become ### headings).
 */
function splitDiscussionBodyMarkdown(md: string): Array<{
  heading: string;
  text: string;
}> {
  const t = md.trim();
  if (!t) return [];
  const parts = t.split(/\n(?=#{1,6}\s)/);
  const out: { heading: string; text: string }[] = [];
  for (const part of parts) {
    const m = part.match(/^#{1,6}\s+([^\n]+)\n?([\s\S]*)$/);
    if (m) {
      const body = (m[2] || "").trim();
      out.push({
        heading: m[1].trim(),
        text: body || "_(empty)_",
      });
    } else if (part.trim()) {
      out.push({ heading: "Details", text: part.trim() });
    }
  }
  return out.length
    ? out
    : [
        {
          heading: "Discussion content",
          text: truncate(t, DISCUSSION_BODY_MAX),
        },
      ];
}

/** Office 365 Connector / Power Automate webhook envelope for Adaptive Cards. */
export interface TeamsAdaptiveMessage {
  type: "message";
  attachments: Array<{
    contentType: "application/vnd.microsoft.card.adaptive";
    content: Record<string, unknown>;
  }>;
}

function assertPayloadSize(payload: TeamsAdaptiveMessage): void {
  const raw = JSON.stringify(payload);
  const bytes = Buffer.byteLength(raw, "utf8");
  if (bytes > TEAMS_PAYLOAD_MAX_BYTES) {
    throw new Error(
      `Teams webhook payload is ${bytes} bytes (max ${TEAMS_PAYLOAD_MAX_BYTES}).`,
    );
  }
}

async function postAdaptiveTeamsWebhook(
  webhookUrl: string,
  payload: TeamsAdaptiveMessage,
): Promise<void> {
  assertPayloadSize(payload);
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Teams webhook ${res.status}: ${t.slice(0, 300)}`);
  }
}

function adaptiveCardShell(
  title: string,
  titleColor: "Default" | "Good" | "Warning" | "Attention",
  body: Record<string, unknown>[],
  actions: Record<string, unknown>[],
  /** Merged onto the Adaptive Card root (e.g. `msteams` for @mentions). */
  cardRootExtensions?: Record<string, unknown>,
): TeamsAdaptiveMessage {
  const content: Record<string, unknown> = {
    $schema: ADAPTIVE_SCHEMA,
    type: "AdaptiveCard",
    version: ADAPTIVE_VERSION,
    body: [
      {
        type: "TextBlock",
        text: title,
        weight: "Bolder",
        size: "Large",
        color: titleColor,
      },
      ...body,
    ],
  };
  if (actions.length) {
    content.actions = actions;
  }
  if (cardRootExtensions) {
    Object.assign(content, cardRootExtensions);
  }
  return {
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content,
      },
    ],
  };
}

function teamsMsteamsMentionPayload(
  mentions: TeamsMentionUser[],
): Record<string, unknown> | undefined {
  if (!mentions.length) return undefined;
  const entities = mentions.map((u) => {
    const name = sanitizeTeamsAtDisplayName(u.name);
    const token = `<at>${name}</at>`;
    return {
      type: "mention",
      text: token,
      mentioned: {
        id: u.id.trim(),
        name,
      },
    };
  });
  return {
    msteams: {
      width: "Full",
      entities,
    },
  };
}

function markdownSectionBlocks(
  sectionHeading: string,
  rawBody: string,
): Record<string, unknown>[] {
  const trimmed = truncate(rawBody.trim(), DISCUSSION_BODY_MAX);
  const blocks: Record<string, unknown>[] = [];
  if (sectionHeading.trim()) {
    blocks.push({
      type: "TextBlock",
      text: sectionHeading.trim(),
      weight: "Bolder",
      size: "Medium",
      spacing: "Medium",
    });
  }
  if (!trimmed) {
    blocks.push({
      type: "TextBlock",
      text: "_No description was provided on this discussion._",
      wrap: true,
      isSubtle: true,
    });
    return blocks;
  }
  const sections = splitDiscussionBodyMarkdown(trimmed);
  const shown = sections.slice(0, MAX_SECTIONS);
  for (const sec of shown) {
    blocks.push({
      type: "Container",
      separator: true,
      items: [
        {
          type: "TextBlock",
          text: escapeText(sec.heading),
          weight: "Bolder",
          wrap: true,
        },
        {
          type: "TextBlock",
          text: escapeText(truncate(sec.text, SECTION_BODY_MAX)),
          wrap: true,
          spacing: "Small",
        },
      ],
    });
  }
  if (sections.length > MAX_SECTIONS) {
    blocks.push({
      type: "TextBlock",
      text: escapeText(
        `… ${sections.length - MAX_SECTIONS} more section(s) omitted (see discussion on GitHub).`,
      ),
      isSubtle: true,
      wrap: true,
    });
  }
  return blocks;
}

export interface TeamsDiscussionCreatedArgs {
  webhookUrl: string;
  title: string;
  url: string;
  category: string;
  author: string;
  /** e.g. owner/repo */
  repository?: string;
  discussionNumber?: number;
  /** Raw markdown from the discussion (form template answers). */
  body?: string;
  /** Teams @mentions (requires `msteams.entities` on the card — see blok-responsibility-metric). */
  teamsMentions?: TeamsMentionUser[];
}

export async function postTeamsDiscussionCreated({
  webhookUrl,
  title,
  url,
  category,
  author,
  repository,
  discussionNumber,
  body,
  teamsMentions,
}: TeamsDiscussionCreatedArgs): Promise<void> {
  if (!webhookUrl) return;
  const facts: { title: string; value: string }[] = [];
  if (repository?.trim()) {
    facts.push({ title: "Repository", value: escapeText(repository.trim()) });
  }
  facts.push(
    { title: "Category", value: escapeText(category) },
    { title: "Author", value: escapeText(author) },
  );
  if (discussionNumber != null) {
    facts.push({ title: "Discussion", value: `#${discussionNumber}` });
  }

  const bodyBlocks: Record<string, unknown>[] = [
    {
      type: "TextBlock",
      text: escapeText(title),
      wrap: true,
      weight: "Bolder",
      size: "Medium",
    },
    { type: "FactSet", facts },
  ];

  const mentions =
    teamsMentions?.filter((m) => m.id?.trim() && m.name?.trim()) ?? [];

  bodyBlocks.push(...markdownSectionBlocks("Discussion details", body || ""));

  if (mentions.length) {
    const ping = mentions
      .map((u) => `<at>${sanitizeTeamsAtDisplayName(u.name)}</at>`)
      .join(" ");
    bodyBlocks.push({
      type: "TextBlock",
      text: `Please review the above discussion and provide your feedback — ${ping}`,
      wrap: true,
      spacing: "Medium",
    });
  }

  const cardRoot = teamsMsteamsMentionPayload(mentions);

  const payload = adaptiveCardShell(
    "Blok — New discussion",
    "Default",
    bodyBlocks,
    [
      {
        type: "Action.OpenUrl",
        title: "Open discussion on GitHub",
        url,
      },
    ],
    cardRoot,
  );
  await postAdaptiveTeamsWebhook(webhookUrl, payload);
  console.log("Teams notification sent (discussion created)");
}

/** First Teams card when a discussion is approved (before Jira follow-up). */
export interface TeamsDiscussionApprovalNoticeArgs {
  webhookUrl: string;
  repository?: string;
  discussionNumber: number;
  discussionTitle: string;
  discussionUrl: string;
  createdByLogin?: string;
  approvedByLogin?: string;
  githubIssueCreated: boolean;
  issueUrl?: string;
}

export async function postTeamsDiscussionApprovalNotice({
  webhookUrl,
  repository,
  discussionNumber,
  discussionTitle,
  discussionUrl,
  createdByLogin,
  approvedByLogin,
  githubIssueCreated,
  issueUrl,
}: TeamsDiscussionApprovalNoticeArgs): Promise<void> {
  if (!webhookUrl) return;

  const facts: { title: string; value: string }[] = [];
  if (repository?.trim()) {
    facts.push({
      title: "Repository",
      value: escapeText(repository.trim()),
    });
  }
  facts.push({ title: "Discussion ID", value: `#${discussionNumber}` });
  facts.push({
    title: "Title",
    value: escapeText(truncate(discussionTitle, 500)),
  });
  facts.push({
    title: "Created by",
    value: escapeText(createdByLogin || "—"),
  });
  facts.push({
    title: "Approved by",
    value: escapeText(approvedByLogin || "—"),
  });

  const blocks: Record<string, unknown>[] = [
    {
      type: "TextBlock",
      text: "A community discussion was approved for tracking.",
      wrap: true,
      isSubtle: true,
      spacing: "None",
    },
    { type: "FactSet", facts },
  ];

  if (!githubIssueCreated) {
    blocks.push({
      type: "TextBlock",
      text: "No GitHub issue was created (Issues are disabled for this repository).",
      wrap: true,
      spacing: "Medium",
    });
  }

  const actions: Record<string, unknown>[] = [
    {
      type: "Action.OpenUrl",
      title: "Open discussion",
      url: discussionUrl,
    },
  ];
  if (githubIssueCreated && issueUrl?.trim()) {
    actions.push({
      type: "Action.OpenUrl",
      title: "Open GitHub issue",
      url: issueUrl.trim(),
    });
  }

  const payload = adaptiveCardShell(
    "Discussion approved",
    "Good",
    blocks,
    actions,
  );
  await postAdaptiveTeamsWebhook(webhookUrl, payload);
  console.log("Teams notification sent (discussion approved)");
}

/** Second Teams card after Jira REST created an issue (browse URL known). */
export interface TeamsJiraGithubCreatedArgs {
  webhookUrl: string;
  discussionNumber: number;
  discussionUrl: string;
  issueTitle: string;
  githubIssueCreated: boolean;
  issueUrl?: string;
  jiraBrowseUrl: string;
}

export async function postTeamsJiraAndGithubCreated({
  webhookUrl,
  discussionNumber,
  discussionUrl,
  issueTitle,
  githubIssueCreated,
  issueUrl,
  jiraBrowseUrl,
}: TeamsJiraGithubCreatedArgs): Promise<void> {
  if (!webhookUrl) return;

  const facts: { title: string; value: string }[] = [
    { title: "Discussion ID", value: `#${discussionNumber}` },
    {
      title: "Title",
      value: escapeText(truncate(issueTitle, 500)),
    },
  ];

  const headline = githubIssueCreated
    ? "GitHub issue and Jira ticket created"
    : "Jira ticket created";

  const blocks: Record<string, unknown>[] = [{ type: "FactSet", facts }];

  const actions: Record<string, unknown>[] = [
    {
      type: "Action.OpenUrl",
      title: "Open Jira",
      url: jiraBrowseUrl,
    },
    {
      type: "Action.OpenUrl",
      title: "Open discussion",
      url: discussionUrl,
    },
  ];
  if (githubIssueCreated && issueUrl?.trim()) {
    actions.splice(1, 0, {
      type: "Action.OpenUrl",
      title: "Open GitHub issue",
      url: issueUrl.trim(),
    });
  }

  const payload = adaptiveCardShell(headline, "Good", blocks, actions);
  await postAdaptiveTeamsWebhook(webhookUrl, payload);
  console.log("Teams notification sent (Jira + GitHub links)");
}
