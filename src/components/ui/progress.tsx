"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import { useEffect } from "react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const PROGRESS_STYLE_ID = "progress-indeterminate-styles";

//  bar is 50% width, slides from left -40% to 100%
const indeterminateKeyframes = `@keyframes progressIndeterminate{0%{left:-40%}100%{left:100%}}`;

function useProgressStyles(needed: boolean | undefined) {
  useEffect(() => {
    if (!needed || document.getElementById(PROGRESS_STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = PROGRESS_STYLE_ID;
    style.textContent = indeterminateKeyframes;
    document.head.appendChild(style);
  }, [needed]);
}

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  variant?: "default" | "indeterminate";
  isIndeterminate?: boolean;
}

function Progress({
  className,
  value,
  variant,
  isIndeterminate,
  ...props
}: ProgressProps) {
  const indeterminate = variant === "indeterminate" || isIndeterminate;
  useProgressStyles(indeterminate);

  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-indeterminate={indeterminate ? "" : undefined}
      aria-label={indeterminate ? "Progress" : `Progress: ${value ?? 0}%`}
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-neutral-bg",
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={cn(
          "h-full rounded-full transition-all",
          indeterminate
            ? "absolute min-w-[50%] w-[50%] bg-primary"
            : "flex-1 w-full bg-primary",
        )}
        style={
          indeterminate
            ? { animation: "progressIndeterminate 1.5s ease infinite" }
            : { transform: `translateX(-${100 - (value ?? 0)}%)` }
        }
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress, type ProgressProps };
