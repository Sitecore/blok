"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { FilterSingleSelect } from "@/components/ui/filter";
import type { FilterOption } from "@/components/ui/filter";
import { cn } from "@/lib/utils";
import { ChevronRight, Settings } from "lucide-react";
import type * as React from "react";

/**
 * Dashboard widget variant types (3 main types by size):
 * - gray-bg-large: Large widget with gray background
 * - white-bg-large: Large widget with white background (same size/dimensions as gray-bg-large)
 * - white-bg-small: Small widget for RHS column
 * - marketplace-apps: Small widget with icon and settings (same size/dimensions as white-bg-small)
 */
export type DashboardWidgetVariant =
  | "gray-bg-large"
  | "white-bg-large"
  | "white-bg-small"
  | "marketplace-apps";

export interface DashboardWidgetFilter {
  value: string;
  onChange: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  groupLabel?: string;
}

export interface DashboardWidgetProps {
  /** Widget display name (title) */
  name: string;
  /** Optional description below the title */
  description?: string;
  /** Link text for "Go to {name}" - omit to hide navigation action */
  goToHref?: string;
  /** Optional handler for "Go to" click - use with goToHref or standalone */
  onGoTo?: () => void;
  /** Settings action (gear icon) - used for marketplace-apps variant instead of "Go to" */
  onSettings?: () => void;
  /** Optional dropdown filter - placed below description, above content */
  filter?: DashboardWidgetFilter;
  /** Main content area */
  children: React.ReactNode;
  /** Widget visual variant */
  variant?: DashboardWidgetVariant;
  /** Optional icon for marketplace-apps variant (shown next to name) */
  icon?: React.ReactNode;
  className?: string;
}

const DASHBOARD_WIDGET_SPECS = {
  hoverablePadding: "p-1", // 4px inner padding for hoverable items
  nameDescriptionGap: "gap-1.5", // 6px
  descriptionFilterGap: "gap-3.5", // 14px
  filterContentGap: "gap-6", // 24px
} as const;

export function DashboardWidget({
  name,
  description,
  goToHref,
  onGoTo,
  onSettings,
  filter,
  children,
  variant = "white-bg-large",
  icon,
  className,
}: DashboardWidgetProps) {
  const isGrayBg = variant === "gray-bg-large";
  const isMarketplace = variant === "marketplace-apps";
  const isSmallVariant =
    variant === "white-bg-small" || variant === "marketplace-apps";

  const showGoTo = (goToHref || onGoTo) && !isMarketplace;
  const showSettings = isMarketplace && onSettings;

  const handleGoTo = (e: React.MouseEvent) => {
    if (onGoTo) {
      e.preventDefault();
      onGoTo();
    }
  };

  return (
    <Card
      style={isGrayBg ? "filled" : "outline"}
      padding="md"
      className={cn(
        "flex flex-col overflow-hidden w-full",
        isGrayBg && "bg-neutral-50",
        isSmallVariant && "max-w-[420px]",
        !isSmallVariant && "min-w-[420px]",
        className,
      )}
    >
      <div className="flex flex-col w-full">
        {/* Header: Title + Description (left) | Action (top right) */}
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "flex flex-col min-w-0 flex-1",
              description && DASHBOARD_WIDGET_SPECS.nameDescriptionGap,
            )}
          >
            <CardTitle className="flex items-center gap-2 font-semibold text-base">
              {isMarketplace && icon && (
                <span
                  className={cn(
                    "flex shrink-0 items-center justify-center rounded",
                    DASHBOARD_WIDGET_SPECS.hoverablePadding,
                  )}
                >
                  {icon}
                </span>
              )}
              <span className="truncate">{name}</span>
            </CardTitle>
            {description && (
              <CardDescription className="text-sm text-subtle-text">
                {description}
              </CardDescription>
            )}
          </div>
          {(showGoTo || showSettings) && (
            <CardAction className="shrink-0">
              {showGoTo && (
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="primary"
                  className={cn(
                    "text-sm font-medium -m-1",
                    DASHBOARD_WIDGET_SPECS.hoverablePadding,
                  )}
                  asChild={!!goToHref}
                  onClick={goToHref ? undefined : handleGoTo}
                >
                  {goToHref ? (
                    <a href={goToHref} onClick={handleGoTo}>
                      Go to {name}
                      <ChevronRight className="ml-0.5 h-4 w-4" />
                    </a>
                  ) : (
                    <>
                      Go to {name}
                      <ChevronRight className="ml-0.5 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
              {showSettings && (
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "h-8 w-8",
                    DASHBOARD_WIDGET_SPECS.hoverablePadding,
                  )}
                  onClick={onSettings}
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              )}
            </CardAction>
          )}
        </div>

        {/* Filter: 14px below description, right-aligned */}
        {filter && (
          <div className="flex justify-end mt-3.5">
            <FilterSingleSelect
              value={filter.value}
              onChange={filter.onChange}
              options={filter.options}
              placeholder={filter.placeholder ?? "Filter"}
              groupLabel={filter.groupLabel}
              className="w-fit"
            />
          </div>
        )}

        {/* Content: 24px below filter (or description/name if no filter) */}
        {children && (
          <div className="mt-6 min-h-[120px] rounded-lg bg-subtle-bg overflow-hidden">
            {children}
          </div>
        )}
      </div>
    </Card>
  );
}
