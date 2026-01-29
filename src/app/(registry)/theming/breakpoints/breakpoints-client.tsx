"use client";

import { CopyableToken } from "@/components/docsite/copyable-token";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertCssVariablesToObject } from "@/lib/token-utils";
import { useEffect, useState } from "react";

type Props = {
  content: string;
};

// Helper function to get the current breakpoint name
const getCurrentBreakpoint = (
  width: number,
  breakpoints: { [key: string]: string },
): string | null => {
  let activeBreakpoint: string | null = null;

  const pxBreakpoints: { [key: string]: number } = Object.fromEntries(
    Object.entries(breakpoints).map(([key, value]) => {
      const remValue = Number.parseFloat(value);
      return [key, Number.isNaN(remValue) ? 0 : remValue * 16];
    }),
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
    Object.entries(rawBreakpoints).filter(([key]) => key !== "*"),
  );

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentBreakpointName, setCurrentBreakpointName] = useState<
    string | null
  >(null);

  const deviceMap: { [key: string]: string } = {
    base: "",
    sm: "Small Phone",
    md: "Tablet (portrait)",
    lg: "Tablet (landscape)",
    xl: "Desktop",
    "2xl": "Large Desktop",
  };

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setWindowWidth(newWidth);
      setCurrentBreakpointName(
        getCurrentBreakpoint(newWidth, filteredBreakpoints),
      );
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      setCurrentBreakpointName(
        getCurrentBreakpoint(window.innerWidth, filteredBreakpoints),
      );
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, [filteredBreakpoints]);

  return (
    <div className="w-full">
      <div className="mb-2">
        <p className="text-lg text-muted-foreground font-semibold">
          Window width: {windowWidth}px
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-lg mb-10 font-semibold text-muted-foreground">
        <p>Active breakpoint:</p>
        {Object.entries(filteredBreakpoints).map(([key]) => {
          const isActive = currentBreakpointName === key;

          return (
            <div key={key} className={isActive ? "block" : "hidden"}>
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
              const pxValue = Number.parseFloat(value) * 16;

              return (
                <TableRow key={key}>
                  <TableCell className="px-4 py-3">
                    <CopyableToken token={key} />
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <span className="text-sm">{deviceMap[key] || "N/A"}</span>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{value}</code>
                  </TableCell>
                  <TableCell className="px-4 py-3">
                    <code className="font-mono text-sm">{pxValue}px</code>
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
