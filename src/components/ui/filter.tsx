"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/lib/icon";
import { mdiClose, mdiMagnify, mdiChevronDown } from "@mdi/js";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type FilterColorScheme = "neutral" | "primary";

export interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface FilterInputProps {
  /** Current input value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Aria label for accessibility */
  ariaLabel?: string;
  /** Icon path for the search icon */
  icon?: string;
  /** Whether to show the clear button */
  showClear?: boolean;
  /** Additional class names */
  className?: string;
  /** Input width */
  width?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
}

export interface FilterSingleSelectProps {
  /** Current selected value */
  value?: string;
  /** Default value for uncontrolled mode */
  defaultValue?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Available options */
  options: FilterOption[];
  /** Placeholder/label text */
  placeholder?: string;
  /** Group label for the options */
  groupLabel?: string;
  /** Color scheme when selected */
  colorScheme?: FilterColorScheme;
  /** Whether to show the clear button */
  showClear?: boolean;
  /** Additional class names */
  className?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
}

export interface FilterMultiSelectProps {
  /** Current selected values */
  value?: string[];
  /** Default values for uncontrolled mode */
  defaultValue?: string[];
  /** Callback when values change */
  onChange?: (values: string[]) => void;
  /** Available options */
  options: FilterOption[];
  /** Placeholder/label text */
  placeholder?: string;
  /** Group label for the options */
  groupLabel?: string;
  /** Color scheme when selected */
  colorScheme?: FilterColorScheme;
  /** Display mode for selected items */
  displayMode?: "text" | "badge";
  /** Maximum items to display before showing "+N" */
  maxDisplayItems?: number;
  /** Whether to show the clear button */
  showClear?: boolean;
  /** Additional class names */
  className?: string;
  /** Whether the multi-select is disabled */
  disabled?: boolean;
}

export interface FilterToggleProps {
  /** Current active state */
  active?: boolean;
  /** Default active state for uncontrolled mode */
  defaultActive?: boolean;
  /** Callback when active state changes */
  onChange?: (active: boolean) => void;
  /** Toggle label */
  label: string;
  /** Color scheme when active */
  colorScheme?: FilterColorScheme;
  /** Whether to show close button when active */
  showClose?: boolean;
  /** Additional class names */
  className?: string;
  /** Whether the toggle is disabled */
  disabled?: boolean;
}

export type FilterDefinition =
  | { type: "input"; key: string; props: FilterInputProps }
  | { type: "single-select"; key: string; props: FilterSingleSelectProps }
  | { type: "multi-select"; key: string; props: FilterMultiSelectProps }
  | { type: "toggle"; key: string; props: FilterToggleProps };

export interface FilterBarProps {
  /** Array of filter definitions */
  filters: FilterDefinition[];
  /** Current filter values (controlled mode) */
  values?: Record<string, unknown>;
  /** Callback when any filter value changes */
  onChange?: (key: string, value: unknown) => void;
  /** Callback when clear all is clicked */
  onClearAll?: () => void;
  /** Whether to show the clear all button */
  showClearAll?: boolean;
  /** Clear all button text */
  clearAllText?: string;
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Gap between filters */
  gap?: string;
  /** Additional class names */
  className?: string;
}

// ============================================================================
// FILTER INPUT COMPONENT
// ============================================================================

const FilterInput = React.forwardRef<HTMLInputElement, FilterInputProps>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      placeholder = "Search...",
      ariaLabel = "Search",
      icon = mdiMagnify,
      showClear = true,
      className,
      width = "w-full max-w-sm",
      disabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onChange?.("");
    };

    return (
      <div className={cn("relative", width, className)}>
        <Icon
          path={icon}
          className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 size-5 pointer-events-none"
        />
        <Input
          ref={ref}
          type="text"
          placeholder={placeholder}
          aria-label={ariaLabel}
          autoComplete="off"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="pl-9 pr-10"
        />
        {showClear && value && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon"
            colorScheme="neutral"
            aria-label="Clear search"
            disabled={disabled}
            className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-subtle-text hover:text-body-text focus:outline-none"
          >
            <Icon path={mdiClose} size={1} />
          </Button>
        )}
      </div>
    );
  }
);
FilterInput.displayName = "FilterInput";

// ============================================================================
// FILTER SINGLE SELECT COMPONENT
// ============================================================================

const FilterSingleSelect = React.forwardRef<
  HTMLButtonElement,
  FilterSingleSelectProps
>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      options,
      placeholder = "Select an option",
      groupLabel,
      colorScheme = "neutral",
      showClear = true,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const selectedLabel = value
      ? options.find((opt) => opt.value === value)?.label
      : "";

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue("");
      }
      onChange?.("");
    };

    const isPrimary = colorScheme === "primary";
    const hasValue = Boolean(value);

    return (
      <div className={cn("relative inline-flex w-fit", className)}>
        <Select value={value} onValueChange={handleChange} disabled={disabled}>
          <SelectTrigger
            ref={ref}
            className={cn(
              "*:data-[slot=select-value]:hidden border-border",
              hasValue && "pr-8 [&>svg]:hidden overflow-hidden",
              hasValue &&
                isPrimary &&
                "bg-primary-bg text-primary-fg border-primary"
            )}
          >
            <SelectValue placeholder={placeholder} />
            <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden">
              <span
                className={cn(
                  "font-semibold truncate",
                  hasValue && isPrimary ? "text-primary-fg" : "text-neutral-fg"
                )}
              >
                {placeholder}
              </span>
              {selectedLabel && (
                <>
                  <span
                    className={cn(
                      hasValue && isPrimary
                        ? "text-primary-fg"
                        : "text-neutral-fg"
                    )}
                  >
                    :
                  </span>
                  <span
                    className={cn(
                      "font-normal truncate min-w-0 ml-0.5",
                      hasValue && isPrimary
                        ? "text-primary-fg"
                        : "text-neutral-fg"
                    )}
                  >
                    {selectedLabel}
                  </span>
                </>
              )}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {groupLabel && <SelectLabel>{groupLabel}</SelectLabel>}
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {showClear && hasValue && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon-xs"
            colorScheme={isPrimary ? "primary" : "neutral"}
            aria-label="Clear selection"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto",
              isPrimary && "text-primary-fg"
            )}
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>
    );
  }
);
FilterSingleSelect.displayName = "FilterSingleSelect";

// ============================================================================
// FILTER MULTI SELECT COMPONENT
// ============================================================================

const FilterMultiSelect = React.forwardRef<
  HTMLButtonElement,
  FilterMultiSelectProps
>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      options,
      placeholder = "Select options",
      groupLabel,
      colorScheme = "neutral",
      displayMode = "text",
      maxDisplayItems = 3,
      showClear = true,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);
    const [open, setOpen] = React.useState(false);
    const isControlled = controlledValue !== undefined;
    const values = isControlled ? controlledValue : internalValue;

    const selectedLabels = values
      .map((val) => options.find((opt) => opt.value === val)?.label)
      .filter(Boolean) as string[];

    const getDisplayText = (labels: string[]) => {
      if (labels.length === 0) return "";
      if (labels.length <= maxDisplayItems) return labels.join(", ");
      const displayed = labels.slice(0, maxDisplayItems).join(", ");
      const remaining = labels.length - maxDisplayItems;
      return `${displayed} +${remaining}`;
    };

    const handleToggle = (optionValue: string) => {
      const newValues = values.includes(optionValue)
        ? values.filter((v) => v !== optionValue)
        : [...values, optionValue];
      if (!isControlled) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue([]);
      }
      onChange?.([]);
    };

    const handleRemoveBadge = (optionValue: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const newValues = values.filter((v) => v !== optionValue);
      if (!isControlled) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    };

    const isPrimary = colorScheme === "primary";
    const hasValues = values.length > 0;

    return (
      <div className={cn("relative inline-flex w-fit", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              ref={ref}
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-fit justify-between rounded-md px-3 py-2 h-10",
                hasValues && "pr-8 overflow-hidden",
                hasValues &&
                  isPrimary &&
                  "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg hover:text-primary-fg"
              )}
            >
              <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden flex-wrap">
                <span
                  className={cn(
                    "font-semibold truncate",
                    hasValues && isPrimary
                      ? "text-primary-fg"
                      : "text-neutral-fg"
                  )}
                >
                  {placeholder}
                </span>
                {hasValues && displayMode === "text" && (
                  <>
                    <span
                      className={cn(
                        hasValues && isPrimary
                          ? "text-primary-fg"
                          : "text-neutral-fg"
                      )}
                    >
                      :
                    </span>
                    <span
                      className={cn(
                        "font-normal truncate min-w-0 ml-0.5",
                        hasValues && isPrimary
                          ? "text-primary-fg"
                          : "text-neutral-fg"
                      )}
                    >
                      {getDisplayText(selectedLabels)}
                    </span>
                  </>
                )}
                {hasValues && displayMode === "badge" && (
                  <>
                    <span className="text-neutral-fg">:</span>
                    <span className="flex items-center gap-1.5 flex-wrap min-w-0 ml-0.5">
                      {values.slice(0, maxDisplayItems).map((val) => {
                        const label = options.find(
                          (opt) => opt.value === val
                        )?.label;
                        if (!label) return null;
                        return (
                          <Badge
                            key={val}
                            colorScheme="primary"
                            size="sm"
                            style={{ minHeight: "1.5rem" }}
                            className="overflow-visible!"
                          >
                            <span>{label}</span>
                            <span
                              className="cursor-pointer rounded-full p-0.7 hover:bg-neutral-bg-active flex items-center justify-center ml-2 -mr-1 pointer-events-auto"
                              onClick={(e) => handleRemoveBadge(val, e)}
                            >
                              <Icon
                                path={mdiClose}
                                size={0.7}
                                className="pointer-events-none"
                              />
                            </span>
                          </Badge>
                        );
                      })}
                      {values.length > maxDisplayItems && (
                        <span className="text-neutral-fg font-normal">
                          +{values.length - maxDisplayItems}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </span>
              {!hasValues && (
                <Icon
                  path={mdiChevronDown}
                  size={1.3}
                  className="opacity-50 pointer-events-none"
                />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-(--radix-popover-trigger-width) p-1"
            align="start"
          >
            <div className="p-1">
              {groupLabel && (
                <div className="px-2 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
                  {groupLabel}
                </div>
              )}
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent/50",
                    option.disabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Checkbox
                    checked={values.includes(option.value)}
                    onCheckedChange={() => handleToggle(option.value)}
                    disabled={option.disabled}
                    className="pointer-events-auto"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {showClear && hasValues && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon-xs"
            colorScheme={isPrimary ? "primary" : "neutral"}
            aria-label="Clear all selections"
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto hover:bg-neutral-bg-active",
              isPrimary && "text-primary-fg"
            )}
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>
    );
  }
);
FilterMultiSelect.displayName = "FilterMultiSelect";

// ============================================================================
// FILTER TOGGLE COMPONENT
// ============================================================================

const FilterToggle = React.forwardRef<HTMLButtonElement, FilterToggleProps>(
  (
    {
      active: controlledActive,
      defaultActive = false,
      onChange,
      label,
      colorScheme = "neutral",
      showClose = false,
      className,
      disabled = false,
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = React.useState(defaultActive);
    const isControlled = controlledActive !== undefined;
    const active = isControlled ? controlledActive : internalActive;

    const handleToggle = () => {
      const newActive = !active;
      if (!isControlled) {
        setInternalActive(newActive);
      }
      onChange?.(newActive);
    };

    const handleClose = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalActive(false);
      }
      onChange?.(false);
    };

    const isPrimary = colorScheme === "primary";

    return (
      <Button
        ref={ref}
        onClick={handleToggle}
        variant="outline"
        disabled={disabled}
        className={cn(
          "w-fit rounded-md px-3 py-2 h-9",
          active && !isPrimary && "bg-neutral-bg",
          active &&
            isPrimary &&
            "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg hover:text-primary-fg",
          className
        )}
      >
        <span className="font-medium">{label}</span>
        {showClose && active && isPrimary && (
          <span
            className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-bg-active flex items-center justify-center"
            onClick={handleClose}
          >
            <Icon path={mdiClose} size={1.1} className="pointer-events-none" />
          </span>
        )}
      </Button>
    );
  }
);
FilterToggle.displayName = "FilterToggle";

// ============================================================================
// FILTER BAR COMPONENT (Composable Layout)
// ============================================================================

function FilterBar({
  filters,
  values = {},
  onChange,
  onClearAll,
  showClearAll = true,
  clearAllText = "Clear all",
  direction = "horizontal",
  gap = "gap-3",
  className,
}: FilterBarProps) {
  const renderFilter = (filter: FilterDefinition) => {
    const filterValue = values[filter.key];

    switch (filter.type) {
      case "input":
        return (
          <FilterInput
            key={filter.key}
            {...filter.props}
            value={filterValue as string | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "single-select":
        return (
          <FilterSingleSelect
            key={filter.key}
            {...filter.props}
            value={filterValue as string | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "multi-select":
        return (
          <FilterMultiSelect
            key={filter.key}
            {...filter.props}
            value={filterValue as string[] | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "toggle":
        return (
          <FilterToggle
            key={filter.key}
            {...filter.props}
            active={filterValue as boolean | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal"
          ? "flex-row flex-wrap items-center"
          : "flex-col items-start",
        gap,
        className
      )}
    >
      {filters.map(renderFilter)}
      {showClearAll && onClearAll && (
        <Button
          onClick={onClearAll}
          variant="link"
          size="sm"
          colorScheme="primary"
          className="w-fit"
        >
          {clearAllText}
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// EXPORTS
// ============================================================================

export {
  FilterInput,
  FilterSingleSelect,
  FilterMultiSelect,
  FilterToggle,
  FilterBar,
};

