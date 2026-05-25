"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { highlightCodeToHtml } from "@/lib/shiki-highlighter";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import type { CopyCodePayload } from "@/lib/telemetry";
import { cn } from "@/lib/utils";
import { mdiClipboardOutline } from "@mdi/js";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Context for copy_code telemetry. Section is required; others are added from pathname when on primitives/bloks. */
export interface CopyCodeContext {
  section: string;
  page_name?: string;
  package_manager?: string;
  example_id?: string;
  example_title?: string;
}

interface CodeBlockProps {
  code: string;
  lang?: string;
  showLineNumbers?: boolean;
  className?: string;
  /** When set, copy triggers copy_code with normalized payload (section, path, page_type, component_name/block_name). */
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

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const rawHtml = await highlightCodeToHtml(code, {
          lang,
          theme: isDark ? "github-dark" : "github-light",
        });
        if (!cancelled) {
          setHtml(
            showLineNumbers
              ? addLineNumbers(rawHtml)
              : makeShikiPreBackgroundTransparent(rawHtml),
          );
        }
      } catch {
        if (!cancelled) {
          setHtml("");
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [code, lang, showLineNumbers, isDark]);

  async function copyToClipboard() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    if (copyCodeContext?.section) {
      const payload: CopyCodePayload = {
        section: copyCodeContext.section,
        path: pathname ?? undefined,
        page_type: pathname?.startsWith("/primitives/")
          ? "primitive"
          : pathname?.startsWith("/bloks/")
            ? "blok"
            : undefined,
        ...(copyCodeContext.page_name &&
          pathname?.startsWith("/primitives/") && {
            component_name: copyCodeContext.page_name,
          }),
        ...(copyCodeContext.page_name &&
          pathname?.startsWith("/bloks/") && {
            block_name: copyCodeContext.page_name,
          }),
        ...(copyCodeContext.package_manager && {
          package_manager: copyCodeContext.package_manager,
        }),
        ...(copyCodeContext.example_id && {
          example_id: copyCodeContext.example_id,
        }),
        ...(copyCodeContext.example_title && {
          example_title: copyCodeContext.example_title,
        }),
      };
      track(TELEMETRY_EVENTS.copy_code, payload);
    }
  }

  return (
    <div
      dir="ltr"
      role="region"
      aria-label="Code sample"
      className={cn(
        "scrollbar-themed relative rounded-md bg-muted max-h-[400px] overflow-auto",
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
        className="text-md min-w-0 p-4 font-mono wrap-break-words [&_.shiki]:!bg-transparent"
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

/** Adds a gutter while keeping Shiki token colors and theme classes on `<pre>`. */
function addLineNumbers(html: string) {
  const match = html.match(
    /<pre\s+([^>]*)>\s*<code[^>]*>([\s\S]*?)<\/code>\s*<\/pre>/,
  );
  if (!match) return html;

  let preAttrs = match[1];
  const codeContent = match[2];
  const lines = codeContent.split("\n");

  preAttrs = preAttrs.includes('class="')
    ? preAttrs.replace(/class="([^"]*)"/, 'class="$1 codeblock table w-full"')
    : `${preAttrs} class="codeblock table w-full"`;

  if (preAttrs.includes('style="')) {
    preAttrs = preAttrs.replace(
      /style="([^"]*)"/,
      (_, style) =>
        `style="${stripShikiBackground(style)};table-layout:fixed;width:100%;max-width:100%;background-color:transparent"`,
    );
  } else {
    preAttrs +=
      ' style="table-layout:fixed;width:100%;max-width:100%;background-color:transparent"';
  }

  const numbered = lines
    .map(
      (line, i) => `
            <div class="table-row">
                <span class="w-8 table-cell select-none pr-3 text-right text-zinc-500">${i + 1}</span>
                <span class="table-cell">${line || "&nbsp;"}</span>
            </div>`,
    )
    .join("");

  return `<pre ${preAttrs}><code class="table-row-group">${numbered}</code></pre>`;
}

function stripShikiBackground(style: string) {
  return style
    .replace(/background-color:\s*[^;]+;?/gi, "")
    .replace(/;\s*;/g, ";")
    .trim()
    .replace(/;$/, "");
}

function makeShikiPreBackgroundTransparent(html: string) {
  return html.replace(/<pre\s+([^>]*)>/, (_, attrs: string) => {
    if (attrs.includes('style="')) {
      return `<pre ${attrs.replace(
        /style="([^"]*)"/,
        (_, style) =>
          `style="${stripShikiBackground(style)};background-color:transparent"`,
      )}>`;
    }
    return `<pre ${attrs} style="background-color:transparent">`;
  });
}
