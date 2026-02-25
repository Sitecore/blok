"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
});

function ToggleGroup({
  className,
  variant,
  size = "default", // Default to default size if not provided
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  // Prevent outline variant from being used in toggle groups
  // Use default variant if outline is specified
  const resolvedVariant = variant === "outline" ? "default" : variant;

  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={resolvedVariant}
      data-size={size}
      className={cn(
        `group/toggle-group flex w-fit items-center`,
        resolvedVariant === "rounded" ? "rounded-full" : "rounded-md", // Apply variant-specific styles
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant: resolvedVariant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>) {
  const context = React.useContext(ToggleGroupContext);

  // Prevent outline variant from being used in toggle groups
  // Use default variant if outline is specified
  const resolvedVariant = context.variant || variant;
  const finalVariant =
    resolvedVariant === "outline" ? "default" : resolvedVariant;

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={finalVariant}
      data-size={context.size || size}
      className={cn(
        toggleVariants({
          variant: finalVariant,
          size: context.size || size,
        }),
        "min-w-0 flex-1 shrink-0 shadow-none focus:z-10 focus-visible:z-10",
        className,
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
