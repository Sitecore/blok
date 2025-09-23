"use client";

import { useEffect, useState } from "react";

import { convertCssVariablesToObject } from "@/lib/token-utils";

type Props = {
  content: string; // The CSS content containing your @theme breakpoints
};

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

const BreakpointsDemo = ({ content }: Props) => {
  const rawBreakpoints = convertCssVariablesToObject(content, "--breakpoint-");

  const filteredBreakpoints = Object.fromEntries(
    Object.entries(rawBreakpoints).filter(([key]) => key !== "*")
  );

  const [windowWidth, setWindowWidth] = useState(0);
  const [currentBreakpointName, setCurrentBreakpointName] = useState<
    string | null
  >(null);

  // Define a mapping for device names.
  // You'll need to update these based on your actual breakpoint names.
  const deviceMap: { [key: string]: string } = {
    sm: "Small Phone",
    md: "Tablet (Portrait)",
    lg: "Tablet (Landscape)",
    xl: "Desktop",
    "2xl": "Large Desktop",
    // Add any other custom breakpoints you have
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

  return (
    <div style={{ width: "100%", overflowX: "auto" }}>
      <p className="text-xl font-semibold">Window width: {windowWidth}px</p>

      <div className="flex flex-row items-center gap-2 text-lg">
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

      <div style={{ width: "100%", overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "1rem",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Token</th>
              <th style={{ padding: "0.8rem", textAlign: "left" }}>Device</th>
              <th style={{ padding: "0.8rem", textAlign: "center" }}>
                Value (rem)
              </th>
              <th style={{ padding: "0.8rem", textAlign: "center" }}>
                Value (px)
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(filteredBreakpoints).map(([key, value]) => {
              //   const isActiveRow = currentBreakpointName === key
              const pxValue = parseFloat(value) * 16;

              return (
                <tr key={key} style={{ borderBottom: "1px solid #eee" }}>
                  <td
                    style={{ padding: "0.8rem" }}
                    // className={isActiveRow ? "font-bold" : "font-normal"}
                  >
                    {key}
                  </td>
                  <td
                    style={{ padding: "0.8rem" }}
                    // className={isActiveRow ? "font-bold" : "font-normal"}
                  >
                    {deviceMap[key] || "N/A"}
                    {/* Display device name, or 'N/A' if not mapped */}
                  </td>
                  <td style={{ padding: "0.8rem" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      {value}
                    </span>
                  </td>
                  <td style={{ padding: "0.8rem" }}>
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontSize: "0.9rem",
                        color: "#555",
                      }}
                    >
                      {pxValue}px
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BreakpointsDemo;
