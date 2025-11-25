"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CopyableTokenProps {
  token: string;
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function CopyableToken({ token }: CopyableTokenProps) {
  const handleCopy = async () => {
    await copyToClipboard(token);
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <code
          onClick={handleCopy}
          className="cursor-pointer rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm hover:bg-muted/80 transition-colors inline-block"
        >
          {token}
        </code>
      </TooltipTrigger>
      <TooltipContent>Copy to clipboard</TooltipContent>
    </Tooltip>
  );
}

