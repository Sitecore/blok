"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";

interface CopyableTokenProps {
  token: string;
  /** Telemetry: page/section (e.g. "theming/colors"). */
  page?: string;
}

async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function CopyableToken({ token, page }: CopyableTokenProps) {
  const handleCopy = async () => {
    await copyToClipboard(token);
    if (page) {
      track(TELEMETRY_EVENTS.copy_token, { token, page });
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <code
          dir="ltr"
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
