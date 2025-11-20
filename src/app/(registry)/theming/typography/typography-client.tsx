"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check } from "lucide-react";

type Props = {
  typography: Record<string, string>;
};

// Helper function to copy text to clipboard
async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

export function TypographyClient({ typography }: Props) {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = async (token: string) => {
    await copyToClipboard(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-4">Token</TableHead>
            <TableHead className="px-4">Value</TableHead>
            <TableHead className="px-4">PX</TableHead>
            <TableHead className="px-4">Example</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(typography).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell className="px-4 py-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <code
                      onClick={() => handleCopy(key)}
                      className="relative cursor-pointer rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
                    >
                      {key}
                      {copiedToken === key && (
                        <Check className="ml-1 inline-block h-3 w-3" />
                      )}
                    </code>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy to clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell className="px-4 py-3">
                <code className="font-mono text-sm">{value}</code>
              </TableCell>
              <TableCell className="px-4 py-3">
                <code className="font-mono text-sm">
                  {parseFloat(value) * 16}px
                </code>
              </TableCell>
              <TableCell className="px-4 py-3">
                <p className={`text-${key}`}>text-{key}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

