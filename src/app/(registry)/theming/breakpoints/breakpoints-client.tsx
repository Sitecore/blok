"use client";

import { useEffect, useState } from "react";
import { convertCssVariablesToObject } from "@/lib/token-utils";
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
  content: string;
};

// Helper function to copy text to clipboard
async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value);
}

// Helper function to get the current breakpoint name
const getCurrentBreakpoint = (
  width: number,
  breakpoints: { [key: string]: string }
): string | null => {
  let activeBreakpoint: string | null = null;

  const pxBreakpoints: { [key: string]: number } = Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => {
      const remValue = parseFloat(value);
      return [key, isNaN(remValue) ? 0 : remValue * 16];
    })
  );

  const sortedBreakpoints = Object.entries(pxBreakpoints)
    .filter(([, val]) => typeof val === "number" && val >= 0)
    .sort(([, valA], [, valB]) => valA - valB);

  for (const [name, breakpointPx] of sortedBreakpoints) {
    if (width >= breakpointPx) {
      activeBreakpoint = name;
    } else {
      break;
    }
  }

  return activeBreakpoint;
};

export function BreakpointsClient({ content }: Props) {
  const rawBreakpoints = convertCssVariablesToObject(content, "--breakpoint-");

  const filteredBreakpoints = Object.fromEntries(
    Object.entries(rawBreakpoints).filter(([key]) => key !== "*")
  );

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentBreakpointName, setCurrentBreakpointName] = useState<
    string | null
  >(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const deviceMap: { [key: string]: string } = {
    base: "",
    sm: "Phone",
    md: "Tablet (portrait)",
    lg: "Tablet (landscape)",
    xl: "Desktop",
    "2xl": "Desktop (large)",
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setCurrentBreakpointName(
        getCurrentBreakpoint(newWidth, filteredBreakpoints)
      );
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setCurrentBreakpointName(
        getCurrentBreakpoint(window.innerWidth, filteredBreakpoints)
      );
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [filteredBreakpoints]);

  const handleCopy = async (token: string) => {
    await copyToClipboard(token);
    setCopiedToken(token);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-xl font-semibold">Window width: {windowWidth}px</p>
      </div>

      <div className="flex flex-row items-center gap-2 text-lg mb-6">
        <p className="font-semibold">Active breakpoint:</p>
        {Object.entries(filteredBreakpoints).map(([key]) => {
          const isActive = currentBreakpointName === key;

          return (
            <div
              key={key}
              className={isActive ? "block font-semibold" : "hidden"}
            >
              {key} - {deviceMap[key] || "N/A"}
            </div>
          );
        })}
        {currentBreakpointName === null && (
          <div className="block font-semibold">(Below smallest breakpoint)</div>
        )}
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="px-4">Token</TableHead>
              <TableHead className="px-4">Device</TableHead>
              <TableHead className="px-4">Value (rem)</TableHead>
              <TableHead className="px-4">Value (px)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.entries(filteredBreakpoints).map(([key, value]) => {
              const pxValue = parseFloat(value) * 16;

              return (
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
                    <span className="text-sm">
                      {deviceMap[key] || "N/A"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">
                      {value}
                    </code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">
                      {pxValue}px
                    </code>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

