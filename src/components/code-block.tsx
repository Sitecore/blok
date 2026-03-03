"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { cn } from "@/lib/utils";
import { mdiClipboardOutline } from "@mdi/js";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import * as shiki from "shiki";

/** Optional context for copy_code telemetry (e.g. section, page_name, example_id). */
export interface CopyCodeContext {
  section?: string;
  page_name?: string;
  package_manager?: string;
  example_id?: string;
  example_title?: string;
  position?: string;
  location?: string;
  page_path?: string;
}

interface CodeBlockProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
  /** When set, copy triggers copy_code event with this context (and component_name/block_name from pathname). */
  copyCodeContext?: CopyCodeContext;
}

export function CodeBlock({
  code,
  lang = "tsx",
  showLineNumbers = true,
  className,
  copyCodeContext,
}: CodeBlockProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [html, setHtml] = useState<string>("");
  const [isDark, setIsDark] = useState(false);

  // detect theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // highlight code
  useEffect(() => {
    async function load() {
      const highlighter = await shiki.createHighlighter({
        themes: ["github-light", "github-dark"],
        langs: [
          "typescript",
          "javascript",
          "tsx",
          "jsx",
          "json",
          "css",
          "html",
        ],
      });

      const rawHtml = highlighter.codeToHtml(code, {
        lang,
        theme: isDark ? "github-dark" : "github-light",
      });

      setHtml(showLineNumbers ? addLineNumbers(rawHtml) : rawHtml);
    }

    load();
  }, [code, lang, showLineNumbers, isDark]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    if (copyCodeContext) {
      const payload: Record<string, unknown> = {
        ...copyCodeContext,
      };
      if (copyCodeContext.page_name && pathname) {
        if (pathname.startsWith("/primitives/")) {
          payload.component_name = copyCodeContext.page_name;
        } else if (pathname.startsWith("/bloks/")) {
          payload.block_name = copyCodeContext.page_name;
        }
      }
      track(TELEMETRY_EVENTS.copy_code, payload);
    }
  }

  return (
    <div
      dir="ltr"
      className={cn(
        "relative rounded-md bg-muted max-h-[400px] overflow-auto",
        className,
      )}
      style={{ width: "100%", maxWidth: "100%" }}
    >
      <div className="sticky top-0 h-0 z-10">
        <div className="absolute top-2 right-2" dir="ltr">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={copyToClipboard}
            className="p-4 bg-muted backdrop-blur-sm "
            aria-label={
              copied ? "Code copied to clipboard" : "Copy code to clipboard"
            }
          >
            {copied ? (
              <Check className="size-4" />
            ) : (
              <Icon
                path={mdiClipboardOutline}
                className="text-muted-foreground"
              />
            )}
          </Button>
        </div>
      </div>
      <div
        dir="ltr"
        className="text-md overflow-x-auto p-4 wrap-break-words"
        style={{ minWidth: 0, width: "100%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

function addLineNumbers(html: string) {
  const match = html.match(/<code.*?>([\s\S]*?)<\/code>/);
  if (!match) return html;

  const codeContent = match[1];
  const lines = codeContent.split("\n");

  const numbered = lines
    .map(
      (line, i) => `
            <div class="table-row">
                <span class="w-5 table-cell select-none text-zinc-500">${i + 1}</span>
                <span class="table-cell">${line || "&nbsp;"}</span>
            </div>
        `,
    )
    .join("");

  return `
        <pre class="shiki codeblock table w-full" style="table-layout: fixed; width: 100%; max-width: 100%;">
            <code class="table-row-group">${numbered}</code>
        </pre>
    `;
}
