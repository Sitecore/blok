import { getSingletonHighlighter } from "shiki";

const SHIKI_THEMES = ["github-light", "github-dark"] as const;
const SHIKI_LANGS = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "json",
  "css",
  "html",
] as const;

let highlighterPromise: ReturnType<typeof getSingletonHighlighter> | null =
  null;

/** Cached Shiki instance — do not call `createHighlighter` per render. */
export function getSharedCodeHighlighter() {
  highlighterPromise ??= getSingletonHighlighter({
    themes: [...SHIKI_THEMES],
    langs: [...SHIKI_LANGS],
  });
  return highlighterPromise;
}

export async function highlightCodeToHtml(
  code: string,
  options: { lang: string; theme: "github-light" | "github-dark" },
): Promise<string> {
  const highlighter = await getSharedCodeHighlighter();
  return highlighter.codeToHtml(code, options);
}
