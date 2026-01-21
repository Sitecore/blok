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


export type FilterColorScheme = "neutral" | "primary";

export interface FilterOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface FilterInputProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  icon?: string;
  showClear?: boolean;
  className?: string;
  width?: string;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  "aria-describedby"?: string;
}

export interface FilterSingleSelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  groupLabel?: string;
  colorScheme?: FilterColorScheme;
  showClear?: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  "aria-describedby"?: string;
  renderOption?: (option: FilterOption) => React.ReactNode;
}

export interface FilterMultiSelectProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  options: FilterOption[];
  placeholder?: string;
  groupLabel?: string;
  colorScheme?: FilterColorScheme;
  displayMode?: "text" | "badge";
  maxDisplayItems?: number;
  showClear?: boolean;
  showSelectedCount?: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  "aria-describedby"?: string;
  renderOption?: (option: FilterOption) => React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export interface FilterToggleProps {
  active?: boolean;
  defaultActive?: boolean;
  onChange?: (active: boolean) => void;
  label: string;
  colorScheme?: FilterColorScheme;
  showClose?: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  "aria-describedby"?: string;
}

export type FilterDefinition =
  | { type: "input"; key: string; props: FilterInputProps }
  | { type: "single-select"; key: string; props: FilterSingleSelectProps }
  | { type: "multi-select"; key: string; props: FilterMultiSelectProps }
  | { type: "toggle"; key: string; props: FilterToggleProps };

export interface FilterBarProps {
  filters: FilterDefinition[];
  values?: Record<string, unknown>;
  onChange?: (key: string, value: unknown) => void;
  onClearAll?: () => void;
  showClearAll?: boolean;
  clearAllText?: string;
  direction?: "horizontal" | "vertical";
  gap?: string;
  className?: string;
}

// FILTER INPUT COMPONENT

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
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const helperId = React.useId();
    const describedBy = helperText
      ? ariaDescribedBy
        ? `${helperId} ${ariaDescribedBy}`
        : helperId
      : ariaDescribedBy;

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
          name={name}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-describedby={describedBy}
          autoComplete="off"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          className="pl-9 pr-10"
        />
        {showClear && value && !disabled && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon-xs"
            colorScheme="neutral"
            aria-label="Clear search"
            disabled={disabled}
            className="absolute top-1/2 right-1 -translate-y-1/2 text-subtle-text hover:text-body-text hover:bg-neutral-bg-active focus:outline-none"
          >
            <Icon path={mdiClose} size={0.75} />
          </Button>
        )}
        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
FilterInput.displayName = "FilterInput";

// FILTER SINGLE SELECT COMPONENT

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
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
      renderOption,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const helperId = React.useId();
    const describedBy = helperText
      ? ariaDescribedBy
        ? `${helperId} ${ariaDescribedBy}`
        : helperId
      : ariaDescribedBy;

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

    const renderOptionContent = (option: FilterOption) => {
      if (renderOption) {
        return renderOption(option);
      }
      if (option.description) {
        return (
          <div className="flex flex-col gap-0.5">
            <span>{option.label}</span>
            <span className="text-xs text-muted-foreground">
              {option.description}
            </span>
          </div>
        );
      }
      return option.label;
    };

    return (
      <div className={cn("relative inline-flex w-fit flex-col", className)}>
        <div className="relative inline-flex w-fit">
          <Select
            value={value}
            onValueChange={handleChange}
            disabled={disabled}
            name={name}
          >
            <SelectTrigger
              ref={ref}
              aria-describedby={describedBy}
            className={cn(
              "*:data-[slot=select-value]:hidden border-border",
              hasValue && "pr-8 overflow-hidden",
              hasValue &&
                isPrimary &&
                "bg-primary-bg text-primary-fg border-primary",
              hasValue && showClear && "[&_svg]:hidden"
            )}
            >
              <SelectValue placeholder={placeholder} />
              <span className="flex items-center gap-0.5 pointer-events-none min-w-0 overflow-hidden">
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
                    {renderOptionContent(option)}
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
                "absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto hover:bg-neutral-bg-active",
                isPrimary && "text-primary-fg"
              )}
            >
              <Icon path={mdiClose} size={0.75} />
            </Button>
          )}
        </div>
        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
FilterSingleSelect.displayName = "FilterSingleSelect";

// FILTER MULTI SELECT COMPONENT

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
      showSelectedCount = false,
      className,
      disabled = false,
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
      renderOption,
      open: controlledOpen,
      onOpenChange,
    },
    ref
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledValue !== undefined;
    const isOpenControlled = controlledOpen !== undefined;
    const values = isControlled ? controlledValue : internalValue;
    const open = isOpenControlled ? controlledOpen : internalOpen;
    const helperId = React.useId();
    const describedBy = helperText
      ? ariaDescribedBy
        ? `${helperId} ${ariaDescribedBy}`
        : helperId
      : ariaDescribedBy;

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

    const handleOpenChange = (newOpen: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
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

    const renderOptionContent = (option: FilterOption) => {
      if (renderOption) {
        return renderOption(option);
      }
      if (option.description) {
        return (
          <div className="flex flex-col gap-0.5">
            <span>{option.label}</span>
            <span className="text-xs text-muted-foreground">
              {option.description}
            </span>
          </div>
        );
      }
      return option.label;
    };

    const isPrimary = colorScheme === "primary";
    const hasValues = values.length > 0;

    return (
      <div className={cn("relative inline-flex w-fit flex-col", className)}>
        {name && (
          <input type="hidden" name={name} value={values.join(",")} />
        )}
        <div className="relative inline-flex w-fit">
          <Popover open={open} onOpenChange={handleOpenChange}>
            <PopoverTrigger asChild>
              <Button
                ref={ref}
                variant="outline"
                disabled={disabled}
                aria-describedby={describedBy}
                className={cn(
                  "w-fit justify-between rounded-md px-3 py-2 h-10",
                  hasValues && "pr-8 overflow-hidden",
                  hasValues &&
                    isPrimary &&
                    "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg hover:text-primary-fg"
                )}
              >
                <span className="flex items-center gap-0.5 pointer-events-none min-w-0 overflow-hidden flex-wrap">
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
                  {hasValues && showSelectedCount && displayMode === "text" && (
                    <Badge
                      colorScheme={isPrimary ? "primary" : "neutral"}
                      size="sm"
                      className="ml-1.5"
                    >
                      {values.length}
                    </Badge>
                  )}
                  {hasValues && !showSelectedCount && displayMode === "text" && (
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
                                role="button"
                                tabIndex={0}
                                className="cursor-pointer rounded-full p-0 hover:bg-neutral-bg-active flex items-center justify-center -mr-1 pointer-events-auto focus:outline-none focus:ring-1 focus:ring-ring"
                                onClick={(e) => handleRemoveBadge(val, e)}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    handleRemoveBadge(val, e as unknown as React.MouseEvent);
                                  }
                                }}
                                aria-label={`Remove ${label}`}
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
                            <span className="sr-only">
                              {values.length - maxDisplayItems} more selected
                            </span>
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
              <div className="p-1" role="group" aria-label={groupLabel || placeholder}>
                {groupLabel && (
                  <div className="px-2 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
                    {groupLabel}
                  </div>
                )}
                {options.map((option) => (
                  <label
                    key={option.value}
                    className={cn(
                      "flex items-start gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer hover:bg-accent/50",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Checkbox
                      checked={values.includes(option.value)}
                      onCheckedChange={() => handleToggle(option.value)}
                      disabled={option.disabled}
                      className="pointer-events-auto mt-0.5"
                    />
                    {renderOptionContent(option)}
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
              <Icon path={mdiClose} size={0.75} />
            </Button>
          )}
        </div>
        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
FilterMultiSelect.displayName = "FilterMultiSelect";

// FILTER TOGGLE COMPONENT

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
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
    },
    ref
  ) => {
    const [internalActive, setInternalActive] = React.useState(defaultActive);
    const isControlled = controlledActive !== undefined;
    const active = isControlled ? controlledActive : internalActive;
    const helperId = React.useId();
    const describedBy = helperText
      ? ariaDescribedBy
        ? `${helperId} ${ariaDescribedBy}`
        : helperId
      : ariaDescribedBy;

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
      <div className="inline-flex flex-col">
        {name && (
          <input type="hidden" name={name} value={active ? "true" : "false"} />
        )}
        <Button
          ref={ref}
          onClick={handleToggle}
          variant="outline"
          disabled={disabled}
          aria-pressed={active}
          aria-describedby={describedBy}
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
          {showClose && active && (
            <span
              role="button"
              tabIndex={0}
              className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-bg-active flex items-center justify-center focus:outline-none focus:ring-1 focus:ring-ring"
              onClick={handleClose}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleClose(e as unknown as React.MouseEvent);
                }
              }}
              aria-label={`Remove ${label} filter`}
            >
              <Icon path={mdiClose} size={0.75} className="pointer-events-none" />
            </span>
          )}
        </Button>
        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);
FilterToggle.displayName = "FilterToggle";

// FILTER BAR COMPONENT (Composable Layout)

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
    const filterKey = `${filter.type}-${filter.key}`;
    const filterValue = values[filter.key];

    switch (filter.type) {
      case "input":
        return (
          <FilterInput
            key={filterKey}
            {...filter.props}
            value={filterValue as string | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "single-select":
        return (
          <FilterSingleSelect
            key={filterKey}
            {...filter.props}
            value={filterValue as string | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "multi-select":
        return (
          <FilterMultiSelect
            key={filterKey}
            {...filter.props}
            value={filterValue as string[] | undefined}
            onChange={(value) => onChange?.(filter.key, value)}
          />
        );
      case "toggle":
        return (
          <FilterToggle
            key={filterKey}
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


export {
  FilterInput,
  FilterSingleSelect,
  FilterMultiSelect,
  FilterToggle,
  FilterBar,
};

