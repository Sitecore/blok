"use client";

import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiArrowLeft } from "@mdi/js";

const pageHeaderVariants = cva(
  "grid w-full grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:items-start",
  {
    variants: {
      surface: {
        none: "",
        card: "rounded-lg bg-body-bg shadow-sm",
        outline: "rounded-lg border border-border-color bg-body-bg",
      },
      size: {
        default: "gap-x-6 gap-y-6",
        compact: "gap-x-3 gap-y-2",
      },
    },
    compoundVariants: [
      { surface: ["card", "outline"], size: "default", class: "p-6" },
      { surface: ["card", "outline"], size: "compact", class: "p-3" },
    ],
    defaultVariants: {
      surface: "none",
      size: "default",
    },
  },
);

function PageHeader({
  className,
  surface,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageHeaderVariants>) {
  return (
    <div
      data-slot="page-header"
      className={cn(pageHeaderVariants({ surface, size }), className)}
      {...props}
    />
  );
}

function PageHeaderTop({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-top"
      className={cn("contents", className)}
      {...props}
    />
  );
}

const pageHeaderMediaVariants = cva(
  "relative max-w-full shrink-0 overflow-hidden bg-subtle-bg sm:col-start-1 sm:row-start-1",
  {
    variants: {
      size: {
        /** Figma spec for the full site summary header. */
        default: "h-[197px] w-[295.5px] rounded-lg",
        /** Fixed compact thumbnail. */
        sm: "h-19 w-40 rounded-md",
        /** Compact thumbnail that matches the height of the text beside it. */
        stretch: "h-auto w-40 self-stretch rounded-md",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function PageHeaderMedia({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof pageHeaderMediaVariants>) {
  return (
    <div
      data-slot="page-header-media"
      className={cn(pageHeaderMediaVariants({ size }), className)}
      {...props}
    />
  );
}

function PageHeaderMain({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-main"
      className={cn(
        "flex min-w-0 flex-col gap-2 sm:col-start-2 sm:row-start-1",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderAside({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-aside"
      className={cn(
        "flex shrink-0 flex-col items-stretch gap-2 sm:col-start-3 sm:row-start-1 sm:items-end",
        className,
      )}
      {...props}
    />
  );
}

type PageHeaderBackProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "size" | "variant" | "colorScheme"
> & {
  /** Visible label next to the arrow. Hidden when `showLabel` is false. */
  children?: React.ReactNode;
  /** When false, renders icon-only with required tooltip (narrow layouts). */
  showLabel?: boolean;
  /** Accessible name; required for icon-only mode. Defaults to children text or "Back". */
  label?: string;
  asChild?: boolean;
};

function PageHeaderBack({
  className,
  children = "Back",
  showLabel = true,
  label,
  asChild = false,
  ...props
}: PageHeaderBackProps) {
  const accessibleLabel =
    label ?? (typeof children === "string" ? children : "Back");

  if (!showLabel) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            colorScheme="neutral"
            aria-label={accessibleLabel}
            data-slot="page-header-back"
            className={cn("text-subtle-text", className)}
            {...props}
          >
            <Icon path={mdiArrowLeft} size={1} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>{accessibleLabel}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      colorScheme="neutral"
      asChild={asChild}
      data-slot="page-header-back"
      className={cn(
        "h-8 w-fit gap-1 px-0 py-0 text-xs font-semibold leading-none text-subtle-text hover:bg-transparent hover:text-body-text",
        className,
      )}
      {...(!asChild ? { type: "button" as const } : {})}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          <Icon path={mdiArrowLeft} size={0.9} className="shrink-0" />
          <span>{children}</span>
        </>
      )}
    </Button>
  );
}

function PageHeaderHeading({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-heading"
      className={cn(
        "flex min-w-0 flex-wrap items-start gap-x-3 gap-y-2",
        className,
      )}
      {...props}
    />
  );
}

const pageHeaderTitleVariants = cva(
  "inline-block min-w-0 max-w-full font-semibold leading-[1.2] text-body-text",
  {
    variants: {
      size: {
        default: "text-3xl",
        compact: "text-xl",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function PageHeaderTitle({
  className,
  size,
  ...props
}: React.ComponentProps<"h1"> & VariantProps<typeof pageHeaderTitleVariants>) {
  return (
    <h1
      data-slot="page-header-title"
      className={cn(pageHeaderTitleVariants({ size }), className)}
      {...props}
    />
  );
}

function PageHeaderStatus({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-status"
      className={cn("flex shrink-0 items-center gap-2", className)}
      {...props}
    />
  );
}

/** Vertical rule used between heading, status and timeline details. */
function PageHeaderSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof Separator>, "orientation">) {
  return (
    <Separator
      data-slot="page-header-separator"
      orientation="vertical"
      className={cn("shrink-0 data-[orientation=vertical]:h-6", className)}
      {...props}
    />
  );
}

const pageHeaderDescriptionVariants = cva(
  "font-normal leading-[1.42] text-subtle-text",
  {
    variants: {
      size: {
        default: "max-w-3xl text-base",
        compact: "max-w-none text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function PageHeaderDescription({
  className,
  size,
  ...props
}: React.ComponentProps<"p"> &
  VariantProps<typeof pageHeaderDescriptionVariants>) {
  return (
    <p
      data-slot="page-header-description"
      className={cn(pageHeaderDescriptionVariants({ size }), className)}
      {...props}
    />
  );
}

function PageHeaderTags({
  className,
  wrap = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Allow tags to wrap onto multiple lines. Defaults to a single row. */
  wrap?: boolean;
}) {
  return (
    <div
      data-slot="page-header-tags"
      className={cn(
        "flex min-w-0 items-center gap-1.5 pt-1",
        wrap ? "flex-wrap" : "flex-nowrap",
        className,
      )}
      {...props}
    />
  );
}

function PageHeaderActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-actions"
      className={cn("flex flex-wrap items-center justify-end gap-2", className)}
      {...props}
    />
  );
}

function PageHeaderPeople({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-people"
      className={cn(
        "flex items-center justify-end -space-x-2 **:data-[slot=avatar]:border-2 **:data-[slot=avatar]:border-body-bg",
        className,
      )}
      {...props}
    />
  );
}

const pageHeaderFooterVariants = cva(
  "flex w-full flex-row items-end justify-between gap-4 sm:col-span-3 sm:col-start-1 sm:row-start-2",
  {
    variants: {
      size: {
        default: "h-9",
        compact: "h-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function PageHeaderFooter({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof pageHeaderFooterVariants>) {
  return (
    <div
      data-slot="page-header-footer"
      className={cn(pageHeaderFooterVariants({ size }), className)}
      {...props}
    />
  );
}

function PageHeaderTabs({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-tabs"
      className={cn("min-w-0 shrink-0", className)}
      {...props}
    />
  );
}

const pageHeaderTimelineVariants = cva(
  "flex shrink-0 flex-wrap items-center font-normal leading-[1.42] text-subtle-text",
  {
    variants: {
      size: {
        default: "h-9 gap-2 text-base",
        compact: "h-8 gap-1.5 text-xs",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function PageHeaderTimeline({
  className,
  size,
  ...props
}: React.ComponentProps<"div"> &
  VariantProps<typeof pageHeaderTimelineVariants>) {
  return (
    <div
      data-slot="page-header-timeline"
      className={cn(pageHeaderTimelineVariants({ size }), className)}
      {...props}
    />
  );
}

type PageHeaderIconActionProps = Omit<
  React.ComponentProps<typeof Button>,
  "children" | "size"
> & {
  /** Accessible tooltip / aria-label — required for icon-only actions. */
  label: string;
  children: React.ReactNode;
  size?: "icon" | "icon-sm" | "icon-xs" | "icon-lg";
};

/**
 * Icon-only action with a required Tooltip label (ticket a11y rule).
 */
function PageHeaderIconAction({
  label,
  children,
  className,
  size = "icon-sm",
  variant = "ghost",
  colorScheme = "neutral",
  ...props
}: PageHeaderIconActionProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant={variant}
          size={size}
          colorScheme={colorScheme}
          aria-label={label}
          data-slot="page-header-icon-action"
          className={className}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function PageHeaderBreadcrumb({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="page-header-breadcrumb"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export {
  PageHeader,
  PageHeaderTop,
  PageHeaderMedia,
  PageHeaderMain,
  PageHeaderAside,
  PageHeaderBack,
  PageHeaderHeading,
  PageHeaderTitle,
  PageHeaderStatus,
  PageHeaderSeparator,
  PageHeaderDescription,
  PageHeaderTags,
  PageHeaderActions,
  PageHeaderPeople,
  PageHeaderFooter,
  PageHeaderTabs,
  PageHeaderTimeline,
  PageHeaderIconAction,
  PageHeaderBreadcrumb,
};
