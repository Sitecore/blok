"use client";

import { Button } from "@/components/ui/button";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import { mdiClipboardOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { cva } from "class-variance-authority";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

/** Optional context for copy_code telemetry on non-demo pages (e.g. home, rtl, mcp). */
export interface CopyCodeContextProps {
  location?: string;
  page_path?: string;
}

export interface CodeblocksProps {
  variant?: "outline" | "filled";
  code: string;
  showLineNumbers?: boolean;
  /** When set, copy triggers copy_code event. */
  copyCodeContext?: CopyCodeContextProps;
}

const codeBlockVariants = cva("mt-16 sm:mt-0 flex rounded-lg", {
  variants: {
    variant: {
      outline: "border bg-body-bg text-body-text",
      filled: "bg-subtle-bg text-body-text border-none",
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});

export function Codeblocks({
  variant,
  code,
  showLineNumbers = true,
  copyCodeContext,
}: CodeblocksProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const codeLines = code.split("\n");

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }
  }, [hasCopied]);

  const handleCopy = () => {
    copyToClipboard(code);
    setHasCopied(true);
    if (copyCodeContext?.location ?? copyCodeContext?.page_path) {
      track(TELEMETRY_EVENTS.copy_code, { ...copyCodeContext });
    }
  };

  return (
    <div className="relative" dir="ltr">
      <div className="absolute top-1 right-3 flex gap-2" dir="ltr">
        <Button
          size="icon-sm"
          variant="ghost"
          onClick={handleCopy}
          aria-label={
            hasCopied ? "Code copied to clipboard" : "Copy code to clipboard"
          }
        >
          {hasCopied ? (
            <Check className="size-4" />
          ) : (
            <Icon
              className="text-muted-foreground"
              path={mdiClipboardOutline}
              size={0.8}
            />
          )}
        </Button>
      </div>

      <div className={codeBlockVariants({ variant })} dir="ltr">
        {showLineNumbers && (
          <div
            className="flex flex-col items-center justify-start py-2 px-2 text-md gap-y-1"
            dir="ltr"
          >
            {codeLines.map((_, index) => (
              <span key={index} className="w-6 text-center py-1 leading-none">
                {index + 1}
              </span>
            ))}
          </div>
        )}

        <pre className="flex-1 overflow-x-auto p-2" dir="ltr">
          <code
            className="relative bg-transparent font-mono text-md leading-none whitespace-pre-wrap overflow-wrap-break-word"
            dir="ltr"
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
