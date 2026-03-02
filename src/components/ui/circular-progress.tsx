"use client";

import type React from "react";

import { cn } from "@/lib/utils";

const CIRCLE_CX = 50;
const CIRCLE_CY = 50;
const CIRCLE_R = 42;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_R;

/** Keyframes injected by component (no global CSS) - same pattern as Progress. */
const CIRCULAR_PROGRESS_KEYFRAMES = `
@keyframes circular-progress-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes circular-progress-spin {
  0% { stroke-dasharray: 1, 400; stroke-dashoffset: 0; }
  50% { stroke-dasharray: 400, 400; stroke-dashoffset: -100; }
  100% { stroke-dasharray: 400, 400; stroke-dashoffset: -260; }
}
`;

const sizePresets: Record<string, string> = {
  xs: "16px",
  sm: "24px",
  md: "48px",
  lg: "64px",
  xl: "96px",
};

export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value 0–100 (default variant only). */
  value?: number;
  min?: number;
  max?: number;
  /** When true, uses indeterminate variant (spinning). */
  isIndeterminate?: boolean;
  /** Rounded line cap on the progress arc. */
  capIsRound?: boolean;
  /** Overall size: preset (xs/sm/md/lg/xl) or CSS length (e.g. 48px). Default: 48px. */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | string | number;
  /** Stroke width of track and indicator. Default: 10px. */
  thickness?: string | number;
  /** Variant: default (determinate) or indeterminate. */
  variant?: "default" | "indeterminate";
}

/** Default stroke colors: indicator = primary, track = gray-200. Override via className, e.g. [&_[data-slot=circular-progress-indicator]]:stroke-blue-500 */
const DEFAULT_TRACK_CLASS = "stroke-gray-200";
const DEFAULT_INDICATOR_CLASS = "stroke-primary";

function CircularProgress({
  value = 0,
  min = 0,
  max = 100,
  isIndeterminate,
  capIsRound = false,
  size = "48px",
  thickness = "10px",
  variant = "default",
  className,
  ...props
}: CircularProgressProps) {
  const indeterminate = isIndeterminate ?? variant === "indeterminate";
  const sizeCss =
    typeof size === "number"
      ? `${size}px`
      : (sizePresets[size as string] ?? size);
  const thicknessCss =
    typeof thickness === "number" ? `${thickness}px` : thickness;

  const percent = Math.min(
    100,
    Math.max(0, ((value - min) / (max - min)) * 100),
  );
  const strokeDashoffset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div
      role="progressbar"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={indeterminate ? undefined : value}
      aria-label={
        indeterminate ? undefined : `Progress: ${Math.round(percent)}%`
      }
      data-slot="circular-progress"
      data-variant={indeterminate ? "indeterminate" : "default"}
      className={cn("inline-block", className)}
      style={{ fontSize: sizeCss }}
      {...props}
    >
      <style
        dangerouslySetInnerHTML={{ __html: CIRCULAR_PROGRESS_KEYFRAMES }}
      />
      <svg
        width={sizeCss}
        height={sizeCss}
        viewBox="0 0 100 100"
        style={
          indeterminate
            ? { animation: "circular-progress-rotate 2s linear infinite" }
            : undefined
        }
      >
        <circle
          data-slot="circular-progress-track"
          cx={CIRCLE_CX}
          cy={CIRCLE_CY}
          r={CIRCLE_R}
          fill="none"
          strokeWidth={thicknessCss}
          className={DEFAULT_TRACK_CLASS}
        />
        <circle
          data-slot="circular-progress-indicator"
          cx={CIRCLE_CX}
          cy={CIRCLE_CY}
          r={CIRCLE_R}
          fill="none"
          strokeWidth={thicknessCss}
          strokeLinecap={capIsRound ? "round" : "butt"}
          strokeDasharray={
            indeterminate ? undefined : `${CIRCUMFERENCE} ${CIRCUMFERENCE}`
          }
          strokeDashoffset={indeterminate ? undefined : strokeDashoffset}
          transform="rotate(-90 50 50)"
          className={cn(
            DEFAULT_INDICATOR_CLASS,
            !indeterminate &&
              "transition-[stroke-dasharray,stroke-dashoffset] duration-300",
          )}
          style={
            indeterminate
              ? {
                  animation: "circular-progress-spin 1.5s linear infinite",
                }
              : undefined
          }
        />
      </svg>
    </div>
  );
}

export { CircularProgress };
