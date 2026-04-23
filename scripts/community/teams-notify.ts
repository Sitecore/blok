import { Buffer } from "node:buffer";

const TEAMS_PAYLOAD_MAX_BYTES = 256 * 1024;
const ADAPTIVE_VERSION = "1.5";
const ADAPTIVE_SCHEMA = "http://adaptivecards.io/schemas/adaptive-card.json";

function escapeText(s: string | undefined): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
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

export interface TeamsDiscussionCreatedArgs {
  webhookUrl: string;
  title: string;
  url: string;
  category: string;
  author: string;
}

export async function postTeamsDiscussionCreated({
  webhookUrl,
  title,
  url,
  category,
  author,
}: TeamsDiscussionCreatedArgs): Promise<void> {
  if (!webhookUrl) return;
  const payload = adaptiveCardShell(
    "Blok — New discussion",
    "Default",
    [
      {
        type: "TextBlock",
        text: escapeText(title),
        wrap: true,
        weight: "Bolder",
      },
      {
        type: "FactSet",
        facts: [
          { title: "Category", value: escapeText(category) },
          { title: "Author", value: escapeText(author) },
        ],
      },
    ],
    [
      {
        type: "Action.OpenUrl",
        title: "Open discussion",
        url,
      },
    ],
  );
  await postAdaptiveTeamsWebhook(webhookUrl, payload);
  console.log("Teams notification sent (discussion created)");
}

export interface TeamsDiscussionApprovedArgs {
  webhookUrl: string;
  title: string;
  discussionUrl: string;
  issueNumber: number;
  issueUrl: string;
}

export async function postTeamsDiscussionApproved({
  webhookUrl,
  title,
  discussionUrl,
  issueNumber,
  issueUrl,
}: TeamsDiscussionApprovedArgs): Promise<void> {
  if (!webhookUrl) return;
  const payload = adaptiveCardShell(
    "Blok — Discussion approved",
    "Good",
    [
      {
        type: "TextBlock",
        text: escapeText(title),
        wrap: true,
        weight: "Bolder",
      },
      {
        type: "FactSet",
        facts: [{ title: "Tracked issue", value: `#${issueNumber}` }],
      },
      {
        type: "TextBlock",
        text: "Use the buttons below to open the discussion or the new GitHub issue.",
        wrap: true,
        isSubtle: true,
        size: "Small",
      },
    ],
    [
      {
        type: "Action.OpenUrl",
        title: "Open discussion",
        url: discussionUrl,
      },
      {
        type: "Action.OpenUrl",
        title: "Open issue",
        url: issueUrl,
      },
    ],
  );
  await postAdaptiveTeamsWebhook(webhookUrl, payload);
  console.log("Teams notification sent (approved)");
}
