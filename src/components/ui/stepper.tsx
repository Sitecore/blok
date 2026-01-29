"use client";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import * as React from "react";

export interface StepperStep {
  label: string;
  description?: string;
  status?: "completed" | "active" | "pending";
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: StepperStep[];
  currentStep?: number;
  orientation?: "horizontal" | "vertical";
}

const stepIconVariants = cva(
  "flex items-center justify-center rounded-full font-medium transition-colors",
  {
    variants: {
      status: {
        completed: "bg-primary text-white",
        active: "border-2 border-primary bg-background text-primary",
        pending: "border-2 border-border bg-background text-muted-foreground",
      },
      size: {
        default: "size-8 text-sm",
        sm: "size-6 text-xs",
        lg: "size-10 text-base",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
    },
  },
);

const stepLabelVariants = cva("font-medium transition-colors", {
  variants: {
    status: {
      completed: "text-foreground",
      active: "text-foreground",
      pending: "text-muted-foreground",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

const stepDescriptionVariants = cva("text-sm transition-colors", {
  variants: {
    status: {
      completed: "text-muted-foreground",
      active: "text-muted-foreground",
      pending: "text-muted-foreground/70",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

const connectorVariants = cva("transition-colors", {
  variants: {
    status: {
      completed: "bg-primary h-0.5",
      pending: "bg-border h-px",
    },
  },
  defaultVariants: {
    status: "pending",
  },
});

// Checkmark SVG path
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

function StepperStepItem({
  step,
  index,
  isLast,
  size = "default",
}: {
  step: StepperStep;
  index: number;
  isLast: boolean;
  size?: "default" | "sm" | "lg";
}) {
  const status = step.status || "pending";

  return (
    <>
      <div className="flex items-start shrink-0">
        {/* Step icon */}
        <div className="flex flex-col items-center shrink-0">
          <div className={cn(stepIconVariants({ status, size }))}>
            {status === "completed" ? (
              <CheckIcon className="size-4" />
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
        </div>

        {/* Step label and description */}
        <div className="flex flex-col ml-3 min-w-0">
          <div className={cn(stepLabelVariants({ status }))}>{step.label}</div>
          {step.description && (
            <div className={cn(stepDescriptionVariants({ status }))}>
              {step.description}
            </div>
          )}
        </div>
      </div>

      {/* Connector line - positioned between steps, aligned with circle center */}
      {!isLast && (
        <div className="flex-1 flex items-center shrink-0">
          <div
            className={cn(
              connectorVariants({
                status: status === "completed" ? "completed" : "pending",
              }),
              "w-full",
            )}
          />
        </div>
      )}
    </>
  );
}

export function Stepper({
  steps,
  currentStep,
  orientation = "horizontal",
  className,
  ...props
}: StepperProps) {
  // Determine step statuses based on currentStep if provided
  const stepsWithStatus = React.useMemo(() => {
    if (currentStep !== undefined) {
      return steps.map((step, index) => ({
        ...step,
        status:
          step.status ||
          (index < currentStep
            ? "completed"
            : index === currentStep
              ? "active"
              : "pending"),
      }));
    }
    return steps;
  }, [steps, currentStep]);

  if (orientation === "vertical") {
    return (
      <div className={cn("flex flex-col gap-4 h-full", className)} {...props}>
        {stepsWithStatus.map((step, index) => (
          <div key={index} className="flex gap-4 flex-1">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  stepIconVariants({
                    status: step.status || "pending",
                  }),
                )}
              >
                {step.status === "completed" ? (
                  <CheckIcon className="size-4" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < stepsWithStatus.length - 1 && (
                <div
                  className={cn(
                    connectorVariants({
                      status:
                        step.status === "completed" ? "completed" : "pending",
                    }),
                    "w-0.5 flex-1 mt-2",
                  )}
                />
              )}
            </div>
            <div className="flex flex-col flex-1 pb-4">
              <div
                className={cn(
                  stepLabelVariants({ status: step.status || "pending" }),
                )}
              >
                {step.label}
              </div>
              {step.description && (
                <div
                  className={cn(
                    stepDescriptionVariants({
                      status: step.status || "pending",
                    }),
                  )}
                >
                  {step.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center p-6 rounded-lg bg-muted/30 w-full gap-4",
        className,
      )}
      {...props}
    >
      {stepsWithStatus.map((step, index) => (
        <StepperStepItem
          key={index}
          step={step}
          index={index}
          isLast={index === stepsWithStatus.length - 1}
        />
      ))}
    </div>
  );
}
