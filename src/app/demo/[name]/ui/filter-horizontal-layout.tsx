"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

export function FilterHorizontalLayout() {
  // Filter Input state
  const [value, setValue] = React.useState("");

  // Filter Single Select state (primary/second dropdown)
  const [primaryValue, setPrimaryValue] = React.useState<string>("");

  // Filter Multi Select state (primary/second dropdown)
  const [primaryValues, setPrimaryValues] = React.useState<string[]>([]);
  const [primaryOpen, setPrimaryOpen] = React.useState(false);

  // Filter Toggle state (primary/second toggle)
  const [primaryActive, setPrimaryActive] = React.useState(false);

  const options = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok" },
  ];

  const multiSelectOptions = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok" },
    { value: "OrderCloud", label: "Order cloud" },
    { value: "SitecoreXP", label: "Sitecore XP" },
    { value: "SitecoreXM", label: "Sitecore XM" },
    { value: "Send", label: "Send" },
    { value: "Discover", label: "Discover" },
    { value: "Connect", label: "Connect" },
    { value: "Personalize", label: "Personalize" },
    { value: "ContentOps", label: "Content operations" },
    { value: "Commerce", label: "Sitecore commerce" },
    { value: "Forms", label: "Sitecore forms" },
    { value: "JSS", label: "JavaScript services" },
    { value: "Headless", label: "Headless CMS" },
  ];

  const primarySelectedLabel = primaryValue
    ? options.find((opt) => opt.value === primaryValue)?.label
    : "";

  const primarySelectedLabels = primaryValues
    .map((val) => multiSelectOptions.find((opt) => opt.value === val)?.label)
    .filter(Boolean) as string[];

  const getDisplayText = (labels: string[]) => {
    if (labels.length === 0) return "";
    if (labels.length <= 3) return labels.join(", ");
    const displayed = labels.slice(0, 3).join(", ");
    const remaining = labels.length - 3;
    return `${displayed} +${remaining}`;
  };

  const handleClear = () => {
    setValue("");
  };

  const handlePrimaryClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrimaryValue("");
  };

  const handlePrimaryToggle = (value: string) => {
    setPrimaryValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePrimaryClearMulti = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrimaryValues([]);
  };

  const handlePrimaryToggleButton = () => {
    setPrimaryActive((prev) => !prev);
  };

  const handleClearAll = () => {
    setValue("");
    setPrimaryValue("");
    setPrimaryValues([]);
    setPrimaryActive(false);
  };

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Filter Input */}
      <div className="relative w-64 max-w-sm">
        <Icon
          path={mdiMagnify}
          className="absolute top-1/2 left-3 -translate-y-1/2 opacity-50 size-5 pointer-events-none"
        />
        <Input
          type="input"
          placeholder="Search..."
          aria-label="Search"
          autoComplete="off"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-9 pr-10 w-full"
        />
        {value && (
          <Button
            onClick={handleClear}
            variant="ghost"
            size="icon"
            colorScheme="neutral"
            aria-label="Clear search"
            className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-8 text-subtle-text hover:text-body-text focus:outline-none"
          >
            <Icon path={mdiClose} size={1} />
          </Button>
        )}
      </div>

      {/* //Simple Single Select */}
      <div className="relative inline-flex w-fit">
        <Select value={primaryValue} onValueChange={setPrimaryValue}>
          <SelectTrigger
            className={cn(
              "*:data-[slot=select-value]:hidden border-border",
              primaryValue &&
                "pr-8 [&>svg]:hidden bg-primary-bg text-primary-fg border-primary overflow-hidden"
            )}
          >
            <SelectValue placeholder="Select a product" />
            <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden">
              <span
                className={cn(
                  "font-semibold truncate",
                primaryValue ? "text-primary-fg" : "text-neutral-fg"
                )}
              >
                Select a product
              </span>
              {primarySelectedLabel && (
                <>
                  <span
                    className={cn(
                      primaryValue ? "text-primary-fg" : "text-neutral-fg"
                    )}
                  >
                    :
                  </span>
                  <span
                    className={cn(
                      "font-normal truncate min-w-0 ml-0.5",
                    primaryValue ? "text-primary-fg" : "text-neutral-fg"
                    )}
                  >
                    {primarySelectedLabel}
                  </span>
                </>
              )}
            </span>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Products</SelectLabel>
              <SelectItem value="XMCloud">XM Cloud</SelectItem>
              <SelectItem value="contentHub">Content Hub</SelectItem>
              <SelectItem value="CDP">CDP</SelectItem>
              <SelectItem value="Blok" disabled>
                Blok
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {primaryValue && (
          <Button
            onClick={handlePrimaryClear}
            variant="ghost"
            size="icon-xs"
            colorScheme="primary"
            aria-label="Clear selection"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-fg pointer-events-auto"
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>

      {/* //Primary Multi Select */}
      <div className="relative inline-flex w-fit">
        <Popover open={primaryOpen} onOpenChange={setPrimaryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-fit justify-between rounded-md px-3 py-2 h-10",
                primaryValues.length > 0
                  ? "pr-8 bg-primary-bg text-primary-fg border-primary overflow-hidden hover:bg-primary-bg hover:text-primary-fg"
                  : ""
              )}
            >
              <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden">
                <span
                  className={cn(
                    "font-semibold truncate",
                    primaryValues.length > 0
                      ? "text-primary-fg"
                      : "text-neutral-fg"
                  )}
                >
                  Select products
                </span>
                {primarySelectedLabels.length > 0 && (
                  <>
                    <span
                      className={cn(
                        primaryValues.length > 0
                          ? "text-primary-fg"
                          : "text-neutral-fg"
                      )}
                    >
                      :
                    </span>
                    <span
                      className={cn(
                        "font-normal truncate min-w-0 ml-0.5",
                        primaryValues.length > 0
                          ? "text-primary-fg"
                          : "text-neutral-fg"
                      )}
                    >
                      {getDisplayText(primarySelectedLabels)}
                    </span>
                  </>
                )}
              </span>
              {primaryValues.length === 0 && (
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
              <div className="px-2 py-1.5 text-xs font-semibold uppercase text-muted-foreground">
                Products
              </div>
              {multiSelectOptions.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer",
                    option.value === "Blok" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={primaryValues.includes(option.value)}
                    onChange={() => handlePrimaryToggle(option.value)}
                    disabled={option.value === "Blok"}
                    className="pointer-events-auto"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {primaryValues.length > 0 && (
          <Button
            onClick={handlePrimaryClearMulti}
            variant="ghost"
            size="icon-xs"
            colorScheme="primary"
            aria-label="Clear all selections"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-fg pointer-events-auto hover:bg-neutral-bg-active"
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>

      {/* //Primary Toggle */}
      <Button
        onClick={handlePrimaryToggleButton}
        variant="outline"
        className={cn(
          "w-fit rounded-md px-3 py-2 h-9",
          primaryActive &&
            "bg-primary-bg text-primary-fg border-primary hover:bg-primary-bg hover:text-primary-fg"
        )}
      >
        <span className="font-medium">Assigned to me</span>
        {primaryActive && (
          <span
            className="cursor-pointer rounded-full p-0.5 hover:bg-neutral-bg-active flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setPrimaryActive(false);
            }}
          >
            <Icon path={mdiClose} size={1.1} className="pointer-events-none" />
          </span>
        )}
      </Button>

      {/* Clear All Button */}
      <Button
        onClick={handleClearAll}
        variant="link"
        size="sm"
        colorScheme="primary"
        className="w-fit"
      >
        Clear all
      </Button>
    </div>
  );
}

