import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type * as React from "react";

/**
 * Dashboard widget types (3 main types by size):
 * - gray-bg-large: Large widget with gray background
 * - white-bg-large: Large widget with white background (same size/dimensions as gray-bg-large)
 * - white-bg-small: Small widget for RHS column
 * - marketplace-apps: Small widget with icon and settings (same size/dimensions as white-bg-small)
 */
export type DashboardWidgetType =
  | "gray-bg-large"
  | "white-bg-large"
  | "white-bg-small"
  | "marketplace-apps";

function DashboardWidget({
  type = "white-bg-large",
  className,
  children,
}: {
  type?: DashboardWidgetType;
  className?: string;
  children?: React.ReactNode;
}) {
  const isGrayBg = type === "gray-bg-large";
  const isSmallVariant =
    type === "white-bg-small" || type === "marketplace-apps";

  return (
    <Card
      style={isGrayBg ? "filled" : "outline"}
      padding="md"
      data-slot="dashboard-widget"
      className={cn(
        "overflow-hidden w-full",
        isGrayBg && "bg-neutral-50",
        isSmallVariant && "max-w-[420px]",
        !isSmallVariant && "min-w-[420px]",
        className,
      )}
    >
      <div className="flex flex-col flex-1">{children}</div>
    </Card>
  );
}

function DashboardWidgetHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-header"
      className={cn(
        "grid auto-rows-min items-center gap-x-4 has-data-[slot=dashboard-widget-action]:grid-cols-[1fr_auto] has-data-[slot=dashboard-widget-description]:items-start has-data-[slot=dashboard-widget-description]:gap-y-1.5",
        className,
      )}
      {...props}
    />
  );
}

function DashboardWidgetTitle({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-title"
      className={cn(
        "flex items-center gap-2 font-semibold text-base leading-none min-w-0",
        className,
      )}
      {...props}
    />
  );
}

function DashboardWidgetDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-description"
      className={cn("text-sm text-subtle-text col-start-1", className)}
      {...props}
    />
  );
}

function DashboardWidgetAction({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-action"
      className={cn("col-start-2 row-start-1", className)}
      {...props}
    />
  );
}

function DashboardWidgetToolbar({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-toolbar"
      className={cn("flex justify-end mt-4", className)}
      {...props}
    />
  );
}

function DashboardWidgetContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dashboard-widget-content"
      className={cn(
        "mt-4 min-h-[120px] flex-1 flex items-center justify-center rounded-lg bg-subtle-bg overflow-hidden",
        className,
      )}
      {...props}
    />
  );
}

export {
  DashboardWidget,
  DashboardWidgetHeader,
  DashboardWidgetTitle,
  DashboardWidgetDescription,
  DashboardWidgetAction,
  DashboardWidgetToolbar,
  DashboardWidgetContent,
};
