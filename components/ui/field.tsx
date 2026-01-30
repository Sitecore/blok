import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

// FieldSet - Container that renders a semantic fieldset
function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset
      data-slot="fieldset"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

// FieldLegend - Legend element for a FieldSet
const fieldLegendVariants = cva("", {
  variants: {
    variant: {
      legend: "text-lg font-semibold",
      label: "text-md font-medium",
    },
  },
  defaultVariants: {
    variant: "legend",
  },
});

function FieldLegend({
  className,
  variant = "legend",
  ...props
}: React.ComponentProps<"legend"> & VariantProps<typeof fieldLegendVariants>) {
  return (
    <legend
      data-slot="field-legend"
      className={cn(fieldLegendVariants({ variant }), className)}
      {...props}
    />
  );
}

// FieldGroup - Layout wrapper that stacks Field components
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-group"
      className={cn("flex flex-col gap-3 mt-5", className)}
      {...props}
    />
  );
}

// Field - Core wrapper for a single field
const fieldVariants = cva("flex gap-2", {
  variants: {
    orientation: {
      vertical: "flex-col gap-2.5",
      horizontal: "flex-row items-center gap-4",
      responsive:
        "flex-col gap-2.5 @container/field-group:flex-row @container/field-group:items-center @container/field-group:gap-4",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

function Field({
  className,
  orientation = "vertical",
  "data-invalid": dataInvalid,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof fieldVariants> & {
    "data-invalid"?: boolean;
  }) {
  return (
    <div
      data-slot="field"
      role="group"
      data-invalid={dataInvalid}
      className={cn(
        fieldVariants({ orientation }),
        dataInvalid &&
          "data-[invalid=true]:[&_input]:border-destructive data-[invalid=true]:[&_select]:border-destructive data-[invalid=true]:[&_textarea]:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

// FieldContent - Flex column that groups label and description
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-col gap-1", className)}
      {...props}
    />
  );
}

// FieldLabel - Label styled for form fields
function FieldLabel({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="field-label"
      className={cn(
        "text-md text-neutral-fg flex items-center gap-2 leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

// FieldTitle - Renders a title with label styling inside FieldContent
function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-title"
      className={cn("text-md font-medium", className)}
      {...props}
    />
  );
}

// FieldDescription - Helper text slot
function FieldDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-description"
      className={cn("text-sm text-muted-foreground -mt-1", className)}
      {...props}
    />
  );
}

// FieldSeparator - Visual divider to separate sections
function FieldSeparator({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  if (children) {
    return (
      <div
        data-slot="field-separator"
        className={cn(
          "relative flex items-center gap-2 py-4",
          "before:flex-1 before:border-t before:border-border",
          "after:flex-1 after:border-t after:border-border",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
  return (
    <div
      data-slot="field-separator"
      className={cn("border-t border-border", className)}
      {...props}
    />
  );
}

// FieldError - Accessible error container
function FieldError({
  className,
  errors,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const errorMessages = errors?.filter(Boolean) || [];

  if (errorMessages.length === 0 && !children) {
    return null;
  }

  return (
    <div
      data-slot="field-error"
      role="alert"
      aria-live="polite"
      className={cn("text-sm text-destructive -mt-1", className)}
      {...props}
    >
      {children ||
        (errorMessages.length === 1 ? (
          <span>{errorMessages[0]?.message}</span>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {errorMessages.map((error, index) => (
              <li key={index}>{error?.message}</li>
            ))}
          </ul>
        ))}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
