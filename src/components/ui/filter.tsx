"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  SearchInput,
  SearchInputClearButton,
  SearchInputField,
  SearchInputLeftElement,
  SearchInputRightElement,
} from "@/components/ui/search-input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiCheck, mdiChevronDown, mdiClose, mdiMagnify } from "@mdi/js";
import { Select as SelectPrimitive } from "radix-ui";
import * as React from "react";
import type { ComponentProps } from "react";

const FILTER_DROPDOWN_WIDTH = "w-54 min-w-54";

const FILTER_DROPDOWN_CONTAINER =
  "rounded-lg border border-border bg-popover text-popover-foreground shadow-md outline-none";

const FILTER_SELECT_TRIGGER_CLASSNAME =
  "border-border text-md text-neutral-fg font-semibold outline-none focus-visible:ring-1 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 bg-body-bg hover:bg-neutral-bg dark:bg-input/30 dark:hover:bg-input/50 flex w-fit min-w-0 max-w-full items-center justify-between gap-2 rounded-md border-1 px-3 py-2 whitespace-nowrap transition-[color] h-10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 data-[state=open]:border-primary data-[state=open]:border-2 data-[state=open]:bg-primary-bg data-[state=open]:text-primary-fg data-[state=open]:hover:bg-primary-bg [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 [&>svg]:!text-current [&>svg]:!opacity-100";

function FilterSingleSelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="filter-single-select-content"
        className={cn(
          FILTER_DROPDOWN_WIDTH,
          FILTER_DROPDOWN_CONTAINER,
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) max-h-80 origin-(--radix-select-content-transform-origin) overflow-hidden outline-none",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className,
        )}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            "p-2 max-h-80 overflow-y-auto w-full scroll-my-1",
            position === "popper" && "w-full",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function getMultiSelectDisplayParts(
  labels: string[],
  maxDisplayItems: number,
): { shownLabels: string[]; overflowCount: number } {
  if (labels.length === 0) {
    return { shownLabels: [], overflowCount: 0 };
  }
  if (labels.length <= maxDisplayItems) {
    return { shownLabels: labels, overflowCount: 0 };
  }
  return {
    shownLabels: labels.slice(0, maxDisplayItems),
    overflowCount: labels.length - maxDisplayItems,
  };
}

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

export interface FilterSingleSelectGroup {
  label: string;
  options: FilterOption[];
}

export interface FilterSingleSelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  options: FilterOption[];
  placeholder?: string;
  groupLabel?: string;
  groups?: FilterSingleSelectGroup[];
  searchable?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  showClear?: boolean;
  className?: string;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  "aria-describedby"?: string;
  renderOption?: (option: FilterOption) => React.ReactNode;
  dropdownClassName?: string;
}

export interface FilterMultiSelectProps {
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  options: FilterOption[];
  placeholder?: string;
  groupLabel?: string;
  groups?: FilterSingleSelectGroup[];
  searchable?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  noResultsText?: string;
  maxButtonWidth?: number;
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
  dropdownClassName?: string;
}

export type FilterDefinition =
  | { type: "input"; key: string; props: FilterInputProps }
  | { type: "single-select"; key: string; props: FilterSingleSelectProps }
  | { type: "multi-select"; key: string; props: FilterMultiSelectProps };

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

const FilterInput = React.forwardRef<
  HTMLInputElement,
  FilterInputProps & Omit<ComponentProps<"div">, "onChange" | "ref">
>(
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
      ...props
    },
    ref,
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
      <div className={cn(width, className)} {...props}>
        <SearchInput>
          <SearchInputLeftElement>
            <Icon path={icon} />
          </SearchInputLeftElement>
          <SearchInputField
            ref={ref}
            name={name}
            placeholder={placeholder}
            aria-label={ariaLabel}
            aria-describedby={describedBy}
            autoComplete="off"
            value={value}
            onChange={handleChange}
            disabled={disabled}
          />
          {showClear && value && !disabled && (
            <SearchInputRightElement>
              <SearchInputClearButton
                onClear={handleClear}
                tooltipLabel="Clear search"
              />
            </SearchInputRightElement>
          )}
        </SearchInput>
        {helperText && (
          <p id={helperId} className="mt-1 text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
FilterInput.displayName = "FilterInput";

// FILTER SINGLE SELECT COMPONENT

const FilterSingleSelect = React.forwardRef<
  HTMLButtonElement,
  FilterSingleSelectProps & Omit<ComponentProps<"div">, "onChange" | "ref">
>(
  (
    {
      value: controlledValue,
      defaultValue = "",
      onChange,
      options,
      placeholder = "Select an option",
      groupLabel,
      groups,
      searchable = false,
      showSearch = true,
      searchPlaceholder = "Search",
      noResultsText = "No results found",
      showClear = true,
      className,
      disabled = false,
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
      renderOption,
      dropdownClassName,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;
    const open = internalOpen;
    const helperId = React.useId();
    const describedBy = helperText
      ? ariaDescribedBy
        ? `${helperId} ${ariaDescribedBy}`
        : helperId
      : ariaDescribedBy;

    const allOptions = groups ? groups.flatMap((g) => g.options) : options;
    const selectedLabel = value
      ? allOptions.find((opt) => opt.value === value)?.label
      : "";

    const handleChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleOpenChange = (newOpen: boolean) => {
      setInternalOpen(newOpen);
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) {
        setInternalValue("");
      }
      onChange?.("");
    };

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

    const filteredOptions = React.useMemo(
      () =>
        searchQuery.trim() === ""
          ? allOptions
          : allOptions.filter((opt) =>
              opt.label
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase()),
            ),
      [allOptions, searchQuery],
    );

    if (searchable) {
      return (
        <div
          className={cn("relative inline-flex w-fit flex-col", className)}
          {...props}
        >
          <div className="relative inline-flex w-fit">
            <Popover
              open={open}
              onOpenChange={(newOpen) => {
                setInternalOpen(newOpen);
                if (!newOpen) setSearchQuery("");
              }}
            >
              <PopoverTrigger asChild>
                <button
                  ref={ref}
                  type="button"
                  aria-label="Select an option"
                  aria-describedby={describedBy}
                  aria-expanded={open}
                  disabled={disabled}
                  className={cn(
                    FILTER_SELECT_TRIGGER_CLASSNAME,
                    hasValue && "pr-8 overflow-hidden",
                  )}
                >
                  <span className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden text-left pointer-events-none">
                    <span
                      className={cn(
                        "font-semibold truncate",
                        open && "text-primary-fg",
                        !open && "text-neutral-fg",
                      )}
                    >
                      {placeholder}
                    </span>
                    {selectedLabel && (
                      <>
                        <span
                          className={cn(
                            open && "text-primary-fg",
                            !open && "text-neutral-fg",
                          )}
                        >
                          :
                        </span>
                        <span
                          className={cn(
                            "font-normal truncate min-w-0 ml-0.5",
                            open && "text-primary-fg",
                            !open && "text-neutral-fg",
                          )}
                        >
                          {selectedLabel}
                        </span>
                      </>
                    )}
                  </span>
                  {!(hasValue && showClear) && (
                    <Icon
                      path={mdiChevronDown}
                      size={1.3}
                      className="size-4 shrink-0 pointer-events-none text-current"
                    />
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                className={cn(
                  FILTER_DROPDOWN_WIDTH,
                  FILTER_DROPDOWN_CONTAINER,
                  "p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 origin-(--radix-popover-content-transform-origin)",
                  dropdownClassName,
                )}
              >
                {searchable && showSearch && (
                  <div className="mb-2">
                    <SearchInput className="h-9 border-border has-[[data-slot=search-input-control]:focus-visible]:border-primary">
                      <SearchInputLeftElement>
                        <Icon
                          path={mdiMagnify}
                          size={0.9}
                          className="text-muted-foreground"
                        />
                      </SearchInputLeftElement>
                      <SearchInputField
                        placeholder={searchPlaceholder}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        aria-label={searchPlaceholder}
                        className="placeholder:text-muted-foreground"
                      />
                      {searchQuery && (
                        <SearchInputRightElement>
                          <SearchInputClearButton
                            onClear={() => setSearchQuery("")}
                            tooltipLabel="Clear search"
                          />
                        </SearchInputRightElement>
                      )}
                    </SearchInput>
                  </div>
                )}
                <div className="max-h-80 w-full -mx-1 px-1 overflow-y-auto scrollbar-hidden">
                  <div
                    className="py-0.5"
                    role="listbox"
                    aria-label={groupLabel || placeholder}
                  >
                    {filteredOptions.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        {noResultsText}
                      </div>
                    ) : (
                      filteredOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          role="option"
                          aria-selected={value === option.value}
                          disabled={option.disabled}
                          onClick={() => handleChange(option.value)}
                          className={cn(
                            "flex w-full items-center justify-between gap-2 rounded-sm px-2 py-1 text-left text-sm outline-none hover:bg-accent/50 focus:bg-accent/50",
                            option.disabled &&
                              "opacity-50 cursor-not-allowed pointer-events-none",
                          )}
                        >
                          <span className="min-w-0 truncate">
                            {renderOptionContent(option)}
                          </span>
                          {value === option.value && (
                            <Icon
                              path={mdiCheck}
                              size={0.9}
                              className="size-4 shrink-0 text-primary-fg"
                            />
                          )}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            {showClear && hasValue && (
              <Button
                onClick={handleClear}
                variant="ghost"
                size="icon-xs"
                colorScheme="neutral"
                aria-label="Clear selection"
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto text-neutral-fg hover:bg-neutral-bg-active"
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

    return (
      <div
        className={cn("relative inline-flex w-fit flex-col", className)}
        {...props}
      >
        <div className="relative inline-flex w-fit">
          <Select
            value={value}
            onValueChange={handleChange}
            disabled={disabled}
            name={name}
            open={open}
            onOpenChange={handleOpenChange}
          >
            <SelectTrigger
              ref={ref}
              aria-describedby={describedBy}
              className={cn(
                "*:data-[slot=select-value]:hidden",
                FILTER_SELECT_TRIGGER_CLASSNAME,
                hasValue && "pr-8 overflow-hidden",
                hasValue && showClear && "[&_svg]:hidden",
              )}
            >
              <SelectValue placeholder={placeholder} />
              <span className="flex min-w-0 flex-1 items-center gap-0.5 overflow-hidden text-left pointer-events-none">
                <span
                  className={cn(
                    "font-semibold truncate",
                    open && "text-primary-fg",
                    !open && "text-neutral-fg",
                  )}
                >
                  {placeholder}
                </span>
                {selectedLabel && (
                  <>
                    <span
                      className={cn(
                        open && "text-primary-fg",
                        !open && "text-neutral-fg",
                      )}
                    >
                      :
                    </span>
                    <span
                      className={cn(
                        "font-normal truncate min-w-0 ml-0.5",
                        open && "text-primary-fg",
                        !open && "text-neutral-fg",
                      )}
                    >
                      {selectedLabel}
                    </span>
                  </>
                )}
              </span>
            </SelectTrigger>
            <FilterSingleSelectContent align="start">
              {groups ? (
                groups.map((group) => (
                  <SelectGroup key={group.label}>
                    <SelectLabel className="px-2">{group.label}</SelectLabel>
                    {group.options.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={option.disabled}
                        className="pl-2"
                      >
                        {renderOptionContent(option)}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                ))
              ) : (
                <SelectGroup>
                  {groupLabel && (
                    <SelectLabel className="px-2">{groupLabel}</SelectLabel>
                  )}
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className="pl-2"
                    >
                      {renderOptionContent(option)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              )}
            </FilterSingleSelectContent>
          </Select>
          {showClear && hasValue && (
            <Button
              onClick={handleClear}
              variant="ghost"
              size="icon-xs"
              colorScheme="neutral"
              aria-label="Clear selection"
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto text-neutral-fg hover:bg-neutral-bg-active"
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
  },
);
FilterSingleSelect.displayName = "FilterSingleSelect";

// FILTER MULTI SELECT COMPONENT

const FilterMultiSelect = React.forwardRef<
  HTMLButtonElement,
  FilterMultiSelectProps & Omit<ComponentProps<"div">, "onChange" | "ref">
>(
  (
    {
      value: controlledValue,
      defaultValue = [],
      onChange,
      options,
      placeholder = "Select options",
      groupLabel,
      groups,
      searchable = false,
      showSearch = true,
      searchPlaceholder = "Search",
      noResultsText = "No results found",
      displayMode = "text",
      maxDisplayItems = 3,
      showClear = true,
      showSelectedCount = false,
      maxButtonWidth,
      className,
      disabled = false,
      name,
      helperText,
      "aria-describedby": ariaDescribedBy,
      renderOption,
      open: controlledOpen,
      onOpenChange,
      dropdownClassName,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<string[]>(defaultValue);
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
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

    const allMultiOptions = React.useMemo(
      () => (groups ? groups.flatMap((g) => g.options) : options),
      [groups, options],
    );
    const selectedLabels = values
      .map((val) => allMultiOptions.find((opt) => opt.value === val)?.label)
      .filter(Boolean) as string[];

    const setButtonRef = React.useCallback(
      (node: HTMLButtonElement | null) => {
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
            node;
        }
      },
      [ref],
    );

    const displayParts = React.useMemo(
      () => getMultiSelectDisplayParts(selectedLabels, maxDisplayItems),
      [selectedLabels, maxDisplayItems],
    );

    const isButtonWidthConstrained = maxButtonWidth != null;

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

    const hasValues = values.length > 0;

    const filteredOptions = React.useMemo(
      () =>
        searchQuery.trim() === ""
          ? options
          : options.filter((opt) =>
              opt.label
                .toLowerCase()
                .includes(searchQuery.trim().toLowerCase()),
            ),
      [options, searchQuery],
    );

    const filteredMultiGroups = React.useMemo(() => {
      if (!groups) return null;
      const q = searchQuery.trim().toLowerCase();
      return groups
        .map((g) => ({
          ...g,
          options:
            q === ""
              ? g.options
              : g.options.filter((opt) => opt.label.toLowerCase().includes(q)),
        }))
        .filter((g) => g.options.length > 0);
    }, [groups, searchQuery]);

    const handleOpenChangeWithSearch = (newOpen: boolean) => {
      if (!newOpen) setSearchQuery("");
      handleOpenChange(newOpen);
    };

    const renderMultiOptionRow = (option: FilterOption) => (
      <label
        key={option.value}
        className={cn(
          "flex items-center gap-2 px-2 py-1 text-sm rounded-sm cursor-pointer hover:bg-accent/50",
          option.disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Checkbox
          checked={values.includes(option.value)}
          onCheckedChange={() => handleToggle(option.value)}
          disabled={option.disabled}
          className="pointer-events-auto shrink-0"
        />
        {renderOptionContent(option)}
      </label>
    );

    return (
      <div
        className={cn("relative inline-flex w-fit flex-col", className)}
        {...props}
      >
        {name && <input type="hidden" name={name} value={values.join(",")} />}
        <div
          className="relative inline-flex w-fit max-w-full"
          style={
            isButtonWidthConstrained ? { maxWidth: maxButtonWidth } : undefined
          }
        >
          <Popover open={open} onOpenChange={handleOpenChangeWithSearch}>
            <PopoverTrigger asChild>
              <button
                ref={setButtonRef}
                type="button"
                disabled={disabled}
                aria-describedby={describedBy}
                aria-expanded={open}
                style={
                  isButtonWidthConstrained
                    ? { maxWidth: maxButtonWidth }
                    : undefined
                }
                className={cn(
                  FILTER_SELECT_TRIGGER_CLASSNAME,
                  hasValues && "pr-8 overflow-hidden",
                )}
              >
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-left pointer-events-none",
                    isButtonWidthConstrained &&
                      "min-w-0 flex-1 overflow-hidden",
                  )}
                >
                  <span
                    className={cn(
                      "font-semibold shrink-0",
                      open && "text-primary-fg",
                      !open && "text-neutral-fg",
                    )}
                  >
                    {placeholder}
                  </span>
                  {hasValues && showSelectedCount && displayMode === "text" && (
                    <Badge colorScheme="neutral" size="sm" className="ml-1.5">
                      {values.length}
                    </Badge>
                  )}
                  {hasValues &&
                    !showSelectedCount &&
                    displayMode === "text" && (
                      <>
                        <span
                          className={cn(
                            "shrink-0",
                            open && "text-primary-fg",
                            !open && "text-neutral-fg",
                          )}
                        >
                          :
                        </span>
                        <span
                          className={cn(
                            "font-normal",
                            isButtonWidthConstrained
                              ? "min-w-0 flex-1 truncate"
                              : "shrink-0",
                            open && "text-primary-fg",
                            !open && "text-neutral-fg",
                          )}
                          title={selectedLabels.join(", ")}
                        >
                          {displayParts.shownLabels.join(", ")}
                        </span>
                        {displayParts.overflowCount > 0 && (
                          <span
                            className={cn(
                              "shrink-0 font-normal",
                              open && "text-primary-fg",
                              !open && "text-neutral-fg",
                            )}
                          >
                            +{displayParts.overflowCount}
                          </span>
                        )}
                        <span className="sr-only">
                          {selectedLabels.join(", ")}
                        </span>
                      </>
                    )}
                  {hasValues && displayMode === "badge" && (
                    <>
                      <span className="text-neutral-fg shrink-0">:</span>
                      <span
                        className={cn(
                          "flex items-center gap-1.5 flex-nowrap ml-0.5",
                          isButtonWidthConstrained &&
                            "min-w-0 flex-1 overflow-hidden",
                        )}
                      >
                        {values.slice(0, maxDisplayItems).map((val) => {
                          const label = allMultiOptions.find(
                            (opt) => opt.value === val,
                          )?.label;
                          if (!label) return null;
                          return (
                            <Badge
                              key={val}
                              colorScheme="neutral"
                              size="sm"
                              style={{ minHeight: "1.5rem" }}
                              className="overflow-visible! shrink-0"
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
                                    handleRemoveBadge(
                                      val,
                                      e as unknown as React.MouseEvent,
                                    );
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
                      </span>
                      {values.length > maxDisplayItems && (
                        <span className="text-neutral-fg font-normal shrink-0 ml-0.5">
                          +{values.length - maxDisplayItems}
                          <span className="sr-only">
                            {values.length - maxDisplayItems} more selected
                          </span>
                        </span>
                      )}
                    </>
                  )}
                </span>
                {!(hasValues && showClear) && (
                  <Icon
                    path={mdiChevronDown}
                    size={1.3}
                    className="size-4 shrink-0 pointer-events-none text-current"
                  />
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent
              className={cn(
                FILTER_DROPDOWN_WIDTH,
                FILTER_DROPDOWN_CONTAINER,
                "p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 z-50 origin-(--radix-popover-content-transform-origin)",
                dropdownClassName,
              )}
              align="start"
            >
              {searchable && showSearch && (
                <div className="mb-2">
                  <SearchInput className="h-9 border-border has-[[data-slot=search-input-control]:focus-visible]:border-primary">
                    <SearchInputLeftElement>
                      <Icon
                        path={mdiMagnify}
                        size={0.9}
                        className="text-muted-foreground"
                      />
                    </SearchInputLeftElement>
                    <SearchInputField
                      placeholder={searchPlaceholder}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      aria-label={searchPlaceholder}
                      className="placeholder:text-muted-foreground"
                    />
                    {searchQuery && (
                      <SearchInputRightElement>
                        <SearchInputClearButton
                          onClear={() => setSearchQuery("")}
                          tooltipLabel="Clear search"
                        />
                      </SearchInputRightElement>
                    )}
                  </SearchInput>
                </div>
              )}
              <div className="max-h-80 w-full -mx-1 px-1 overflow-y-auto scrollbar-hidden">
                <div
                  className="py-0.5"
                  role="group"
                  aria-label={groupLabel || placeholder}
                >
                  {groups ? (
                    !filteredMultiGroups || filteredMultiGroups.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        {noResultsText}
                      </div>
                    ) : (
                      filteredMultiGroups.map((group) => (
                        <React.Fragment key={group.label}>
                          <div className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
                            {group.label}
                          </div>
                          {group.options.map((option) =>
                            renderMultiOptionRow(option),
                          )}
                        </React.Fragment>
                      ))
                    )
                  ) : groupLabel ? (
                    <div className="px-2 py-1 text-xs font-semibold uppercase text-muted-foreground">
                      {groupLabel}
                    </div>
                  ) : null}
                  {!groups &&
                    (filteredOptions.length === 0 ? (
                      <div className="py-6 text-center text-sm text-muted-foreground">
                        {noResultsText}
                      </div>
                    ) : (
                      filteredOptions.map((option) =>
                        renderMultiOptionRow(option),
                      )
                    ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {showClear && hasValues && (
            <Button
              onClick={handleClear}
              variant="ghost"
              size="icon-xs"
              colorScheme="neutral"
              aria-label="Clear all selections"
              className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto hover:bg-neutral-bg-active"
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
  },
);
FilterMultiSelect.displayName = "FilterMultiSelect";

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
  ...props
}: FilterBarProps & Omit<ComponentProps<"div">, "onChange">) {
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
        className,
      )}
      {...props}
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

export { FilterInput, FilterSingleSelect, FilterMultiSelect, FilterBar };
