"use client";

import { mdiCheck } from "@mdi/js";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import {
  extractFirstIcon,
  hasTextContent,
  isFirstChildIcon,
  toggleVariants,
} from "@/components/ui/toggle";
import { Icon } from "@/lib/icon";
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
  const itemRef = React.useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = React.useState(false);

  // Prevent outline variant from being used in toggle groups
  // Use default variant if outline is specified
  const resolvedVariant = context.variant || variant;
  const finalVariant =
    resolvedVariant === "outline" ? "default" : resolvedVariant;

  // Observe data-state attribute changes
  React.useEffect(() => {
    const element = itemRef.current;
    if (!element) return;

    const observer = new MutationObserver(() => {
      const state = element.getAttribute("data-state");
      setIsPressed(state === "on");
    });

    // Initial check
    const state = element.getAttribute("data-state");
    setIsPressed(state === "on");

    observer.observe(element, {
      attributes: true,
      attributeFilter: ["data-state"],
    });

    return () => observer.disconnect();
  }, []);

  const hasText = hasTextContent(children);
  const hasLeftIcon = isFirstChildIcon(children);
  const { icon: leftIcon, rest: restChildren } = extractFirstIcon(children);

  // Render check icon animation for text toggles
  const renderContent = () => {
    if (!hasText) {
      // Icon-only toggle - no check icon behavior
      return children;
    }

    if (hasLeftIcon && leftIcon) {
      // Text toggle with left icon - animate icon swap
      return (
        <>
          <span className="relative inline-flex items-center justify-center w-4 h-4">
            {/* Original icon */}
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-200",
                isPressed ? "opacity-0 scale-[0.8]" : "opacity-100 scale-100",
              )}
            >
              {leftIcon}
            </span>
            {/* Check icon */}
            <span
              className={cn(
                "absolute inset-0 flex items-center justify-center transition-all duration-200",
                isPressed ? "opacity-100 scale-100" : "opacity-0 scale-[0.8]",
              )}
            >
              <Icon path={mdiCheck} size={1} />
            </span>
          </span>
          {restChildren}
        </>
      );
    }
    // Text toggle without left icon - conditionally show check icon
    return (
      <>
        {isPressed && (
          <span className="inline-flex items-center justify-center transition-all duration-200 opacity-100 scale-100">
            <Icon path={mdiCheck} size={1} />
          </span>
        )}
        {children}
      </>
    );
  };

  return (
    <ToggleGroupPrimitive.Item
      ref={itemRef}
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
      {renderContent()}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
