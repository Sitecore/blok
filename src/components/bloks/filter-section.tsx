"use client";

import * as React from "react";
import { Search, CheckIcon, ChevronsUpDown } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Filter option types
export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface MultiSelectFilterConfig {
  id: string;
  label: string;
  placeholder?: string;
  options: FilterOption[];
  searchable?: boolean;
}

export interface SingleSelectFilterConfig {
  id: string;
  label: string;
  placeholder?: string;
  options: FilterOption[];
}

export interface ToggleFilterConfig {
  id: string;
  label: string;
}

export interface FilterSectionProps {
  // Search configuration
  searchPlaceholder?: string;
  showSearch?: boolean;

  // Multi-select filters (like Project with checkboxes)
  multiSelectFilters?: MultiSelectFilterConfig[];

  // Single-select filters (like Type, Status)
  singleSelectFilters?: SingleSelectFilterConfig[];

  // Toggle filters (like "Assigned to me")
  toggleFilters?: ToggleFilterConfig[];

  // Callbacks
  onFilterChange?: (filters: FilterState) => void;

  // Custom styling
  className?: string;
}

export interface FilterState {
  search: string;
  multiSelects: Record<string, string[]>;
  singleSelects: Record<string, string>;
  toggles: Record<string, boolean>;
}

// Multi-select dropdown with checkboxes
function MultiSelectFilter({
  config,
  selectedValues,
  onSelectionChange,
}: {
  config: MultiSelectFilterConfig;
  selectedValues: string[];
  onSelectionChange: (values: string[]) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (value: string, option: FilterOption) => {
    if (selectedValues.includes(value)) {
      onSelectionChange(selectedValues.filter((v) => v !== value));
    } else {
      onSelectionChange([...selectedValues, value]);
    }
  };

  const displayText = React.useMemo(() => {
    if (selectedValues.length === 0) return config.label;
    
    // Get all selected labels
    const selectedLabels = selectedValues
      .map((value) => config.options.find((o) => o.value === value)?.label)
      .filter(Boolean) as string[];
    
    // Show first 2 items as text, then +X for remaining
    if (selectedLabels.length <= 2) {
      return selectedLabels.join(", ");
    }
    
    // Show first 2 labels + count of remaining
    const firstTwo = selectedLabels.slice(0, 2).join(", ");
    const remaining = selectedLabels.length - 2;
    return `${firstTwo} +${remaining}`;
  }, [selectedValues, config]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          colorScheme="neutral"
          role="combobox"
          aria-expanded={open}
          aria-label={`Select ${config.label.toLowerCase()}`}
          className={cn(
            "w-fit justify-between rounded-md",
            open && "ring-primary ring-[2px]"
          )}
        >
          {displayText}
          <ChevronsUpDown className="text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          {config.searchable && (
            <CommandInput placeholder={config.placeholder || `Search ${config.label.toLowerCase()}...`} />
          )}
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {config.options.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.value}
                  onSelect={(currentValue) => handleSelect(currentValue, option)}
                >
                  <div
                    className="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-inverse-text pointer-events-none size-4 shrink-0 rounded-[4px] border transition-all select-none *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100"
                    data-selected={selectedValues.includes(option.value)}
                  >
                    <CheckIcon className="size-3.5 text-current" />
                  </div>
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Single-select dropdown using Blok Select
function SingleSelectFilter({
  config,
  selectedValue,
  onSelectionChange,
}: {
  config: SingleSelectFilterConfig;
  selectedValue: string;
  onSelectionChange: (value: string) => void;
}) {
  return (
    <Select
      value={selectedValue || undefined}
      onValueChange={onSelectionChange}
    >
      <SelectTrigger className="w-fit min-w-[120px]">
        <SelectValue placeholder={config.label} />
      </SelectTrigger>
      <SelectContent>
        {config.options.map((option) => (
          <SelectItem key={option.id} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// Toggle button filter
function ToggleFilter({
  config,
  isActive,
  onToggle,
}: {
  config: ToggleFilterConfig;
  isActive: boolean;
  onToggle: (active: boolean) => void;
}) {
  return (
    <Button
      variant="outline"
      colorScheme="neutral"
      className={cn(
        isActive && "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg-active hover:text-primary-fg"
      )}
      onClick={() => onToggle(!isActive)}
    >
      {config.label}
    </Button>
  );
}

export function FilterSection({
  searchPlaceholder = "Search",
  showSearch = true,
  multiSelectFilters = [],
  singleSelectFilters = [],
  toggleFilters = [],
  onFilterChange,
  className,
}: FilterSectionProps) {
  // State management
  const [search, setSearch] = React.useState("");
  const [multiSelects, setMultiSelects] = React.useState<Record<string, string[]>>({});
  const [singleSelects, setSingleSelects] = React.useState<Record<string, string>>({});
  const [toggles, setToggles] = React.useState<Record<string, boolean>>({});

  // Store callback in ref to avoid stale closures
  const onFilterChangeRef = React.useRef(onFilterChange);
  onFilterChangeRef.current = onFilterChange;

  // Notify parent of filter changes
  React.useEffect(() => {
    onFilterChangeRef.current?.({
      search,
      multiSelects,
      singleSelects,
      toggles,
    });
  }, [search, multiSelects, singleSelects, toggles]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMultiSelectChange = (filterId: string, values: string[]) => {
    setMultiSelects((prev) => ({ ...prev, [filterId]: values }));
  };

  const handleSingleSelectChange = (filterId: string, value: string) => {
    setSingleSelects((prev) => ({ ...prev, [filterId]: value }));
  };

  const handleToggleChange = (filterId: string, active: boolean) => {
    setToggles((prev) => ({ ...prev, [filterId]: active }));
  };

  const handleClearAll = () => {
    setSearch("");
    setMultiSelects({});
    setSingleSelects({});
    setToggles({});
  };

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search Input */}
        {showSearch && (
          <div className="relative min-w-[200px] max-w-[280px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={handleSearchChange}
              className="pl-9 h-10"
            />
          </div>
        )}

        {/* Multi-Select Filters */}
        {multiSelectFilters.map((filter) => (
          <MultiSelectFilter
            key={filter.id}
            config={filter}
            selectedValues={multiSelects[filter.id] || []}
            onSelectionChange={(values) => handleMultiSelectChange(filter.id, values)}
          />
        ))}

        {/* Single-Select Filters */}
        {singleSelectFilters.map((filter) => (
          <SingleSelectFilter
            key={filter.id}
            config={filter}
            selectedValue={singleSelects[filter.id] || ""}
            onSelectionChange={(value) => handleSingleSelectChange(filter.id, value)}
          />
        ))}

        {/* Toggle Filters */}
        {toggleFilters.map((filter) => (
          <ToggleFilter
            key={filter.id}
            config={filter}
            isActive={toggles[filter.id] || false}
            onToggle={(active) => handleToggleChange(filter.id, active)}
          />
        ))}

        {/* Clear All Button */}
        <Button
          variant="link"
          onClick={handleClearAll}
        >
          Clear all
        </Button>
      </div>
    </div>
  );
}
