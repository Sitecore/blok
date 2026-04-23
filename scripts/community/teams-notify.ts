/**
 * Teams Incoming Webhook — simple `text` payload for broad connector compatibility.
 */

function escapeText(s: string | undefined): string {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function postText(
  webhookUrl: string,
  text: string,
): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Teams webhook ${res.status}: ${t.slice(0, 300)}`);
  }
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
  const text = `**Blok — new discussion** (${escapeText(category)})
**${escapeText(title)}**
Author: @${escapeText(author)}
${url}`;
  await postText(webhookUrl, text);
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
  const text = `**Blok — discussion approved → issue**
**${escapeText(title)}**
Discussion: ${discussionUrl}
Issue #${issueNumber}: ${issueUrl}`;
  await postText(webhookUrl, text);
  console.log("Teams notification sent (approved)");
}
