/**
 * discussion action "created" — post triage comment (@mentions from env) and set needs-triage label.
 * Env (repository Variables): DISCUSSION_MENTIONS_BUG_REPORTS, _FEATURE_REQUESTS, _IDEAS, _GENERAL_Q_A, _DESIGN_FEEDBACK
 * Each value: space-separated @mentions, e.g. "@Sitecore/blok-em @Sitecore/blok-dsdt"
 */
import { readFileSync } from "node:fs";
import { postTeamsDiscussionCreated } from "./teams-notify";

const api = process.env.GITHUB_API_URL || "https://api.github.com";
const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const eventPath = process.env.GITHUB_EVENT_PATH;
if (!repo || !token || !eventPath) {
  console.error(
    "GITHUB_REPOSITORY, GITHUB_TOKEN, or GITHUB_EVENT_PATH missing",
  );
  process.exit(1);
}
const event = JSON.parse(readFileSync(eventPath, "utf8")) as {
  discussion?: {
    number: number;
    title: string;
    html_url: string;
    body?: string;
    category?: { slug?: string; name?: string };
    user?: { login?: string };
  };
};
const [owner, repoName] = repo.split("/");

const slugToEnv: Record<string, string> = {
  "bug-reports": "DISCUSSION_MENTIONS_BUG_REPORTS",
  "feature-requests": "DISCUSSION_MENTIONS_FEATURE_REQUESTS",
  ideas: "DISCUSSION_MENTIONS_IDEAS",
  "general-q-a": "DISCUSSION_MENTIONS_GENERAL_Q_A",
  "design-feedback": "DISCUSSION_MENTIONS_DESIGN_FEEDBACK",
};

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
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status}: ${text.slice(0, 800)}`);
  }
  return text ? (JSON.parse(text) as unknown) : {};
}

function buildComment(
  categorySlug: string,
  categoryName: string,
  mentions: string,
): string {
  const m = (mentions || "").trim();
  const mentionBlock = m
    ? `\n\n${m}\n`
    : "\n\n_(No @mentions configured — set repository Variables per `docs/community-github-discussions.md`.)_\n";
  return `### Triage\n\nThanks for opening a discussion in **${categoryName || categorySlug}**. Maintainers use labels such as \`needs-triage\` → \`under-review\` → \`approved\` as described in the community docs.${mentionBlock}\n_Posted by [community automation](.github/workflows/community-discussions.yml)._`;
}

async function main(): Promise<void> {
  const discussion = event.discussion;
  if (!discussion) {
    console.log("No discussion on event");
    process.exit(0);
  }

  const slug = discussion.category?.slug || "";
  const name = discussion.category?.name || slug;
  const envKey = slugToEnv[slug];
  const mentions = envKey ? process.env[envKey] || "" : "";

  const commentBody = buildComment(slug, name, mentions);
  const number = discussion.number;

  await gh(
    "POST",
    `/repos/${owner}/${repoName}/discussions/${number}/comments`,
    {
      body: commentBody,
    },
  );
  console.log("Posted triage comment on discussion", number);

  try {
    await gh(
      "PUT",
      `/repos/${owner}/${repoName}/discussions/${number}/labels`,
      {
        labels: ["needs-triage"],
      },
    );
    console.log("Applied label needs-triage");
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.warn(
      "Could not apply needs-triage label (create the label in Discussions or adjust permissions):",
      msg,
    );
  }

  const teamsUrl =
    process.env.TEAMS_COMMUNITY_WEBHOOK_URL || process.env.TEAMS_WEBHOOK_URL;
  if (teamsUrl) {
    await postTeamsDiscussionCreated({
      webhookUrl: teamsUrl,
      title: discussion.title,
      url: discussion.html_url,
      category: name,
      author: discussion.user?.login || "",
    });
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
