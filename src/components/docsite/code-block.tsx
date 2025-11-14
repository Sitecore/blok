"use client";

import { Check } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { mdiClipboardOutline } from "@mdi/js";
import Icon from "@mdi/react";

export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export interface CodeblocksProps {
  code: string;
  showLineNumbers?: boolean;
}

export function Codeblocks({ code, showLineNumbers = true }: CodeblocksProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const codeLines = code.split("\n");

  useEffect(() => {
    if (hasCopied) {
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    }
  }, [hasCopied]);

  return (
    <div className="relative">
      <div className="absolute top-1 right-3 flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            copyToClipboard(code);
            setHasCopied(true);
          }}
          className="shadow-none"
          aria-label={hasCopied ? "Code copied to clipboard" : "Copy code to clipboard"}
        >
          {hasCopied ? (
            <Check />
          ) : (
            <Icon
              className="text-muted-foreground"
              path={mdiClipboardOutline}
              size={1}
            />
          )}
        </Button>
      </div>

      <div className="mt-16 sm:mt-0 flex rounded-lg border bg-subtle-bg">
        {showLineNumbers && (
          <div className="flex flex-col items-center justify-start py-2 px-2 text-sm text-muted-foreground gap-y-1">
            {codeLines.map((_, index) => (
              <span key={index} className="w-6 text-center py-1 leading-none">
                {index + 1}
              </span>
            ))}
          </div>
        )}

        <pre className="flex-1 overflow-x-auto p-2">
          <code className="relative bg-transparent font-mono text-sm text-muted-foreground leading-none whitespace-pre-wrap break-words">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
