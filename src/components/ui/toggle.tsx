"use client";

import { mdiCheck } from "@mdi/js";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-md font-medium text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-primary-bg data-[state=on]:text-primary-fg [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none transition-[color,box-shadow] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent rounded-md",
        outline:
          "border bg-backgrounds hover:bg-neutral-bg hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md",
        square: "bg-transparent rounded-md",
        rounded: "bg-transparent rounded-full",
      },
      size: {
        default: "h-10 min-w-10 px-4",
        sm: "h-8 min-w-8 px-3",
        xs: "h-6 min-w-6 px-2 text-xs [&>svg]:!size-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Helper function to check if children contain text
export function hasTextContent(children: React.ReactNode): boolean {
  if (typeof children === "string" || typeof children === "number") {
    return true;
  }
  if (Array.isArray(children)) {
    return children.some((child) => hasTextContent(child));
  }
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (
      typeof props.children === "string" ||
      typeof props.children === "number"
    ) {
      return true;
    }
    if (props.children) {
      return hasTextContent(props.children);
    }
  }
  return false;
}

// Helper function to check if first child is an icon/SVG
export function isFirstChildIcon(children: React.ReactNode): boolean {
  if (!children) return false;
  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length === 0) return false;

  const firstChild = childrenArray[0];
  if (React.isValidElement(firstChild)) {
    // Check if it's an Icon component or SVG element
    const props = firstChild.props as { path?: string; d?: string };
    return (
      firstChild.type === Icon ||
      firstChild.type === "svg" ||
      !!(props && (props.path || props.d))
    );
  }
  return false;
}

// Helper function to extract the first icon if it exists
export function extractFirstIcon(children: React.ReactNode): {
  icon: React.ReactElement | null;
  rest: React.ReactNode;
} {
  if (!children) return { icon: null, rest: children };

  const childrenArray = React.Children.toArray(children);
  if (childrenArray.length === 0) return { icon: null, rest: null };

  const firstChild = childrenArray[0];
  if (React.isValidElement(firstChild)) {
    const props = firstChild.props as { path?: string; d?: string };
    if (
      firstChild.type === Icon ||
      firstChild.type === "svg" ||
      !!(props && (props.path || props.d))
    ) {
      return {
        icon: firstChild as React.ReactElement,
        rest: childrenArray.slice(1),
      };
    }
  }

  return { icon: null, rest: children };
}

function Toggle({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const [isPressed, setIsPressed] = React.useState(false);

  // Observe data-state attribute changes
  React.useEffect(() => {
    const element = toggleRef.current;
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
    <TogglePrimitive.Root
      ref={toggleRef}
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {renderContent()}
    </TogglePrimitive.Root>
  );
}

export { Toggle, toggleVariants };
