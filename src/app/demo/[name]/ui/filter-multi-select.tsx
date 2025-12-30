"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/lib/icon";
import { mdiClose, mdiChevronDown } from "@mdi/js";
import { cn } from "@/lib/utils";

export function FilterMultiSelect() {
  const [defaultValues, setDefaultValues] = React.useState<string[]>([]);
  const [primaryValues, setPrimaryValues] = React.useState<string[]>([]);
  const [badgeValues, setBadgeValues] = React.useState<string[]>([]);
  const [defaultOpen, setDefaultOpen] = React.useState(false);
  const [primaryOpen, setPrimaryOpen] = React.useState(false);
  const [badgeOpen, setBadgeOpen] = React.useState(false);

  const options = [
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

  const handleDefaultToggle = (value: string) => {
    setDefaultValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handlePrimaryToggle = (value: string) => {
    setPrimaryValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleDefaultClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDefaultValues([]);
  };

  const handlePrimaryClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrimaryValues([]);
  };

  const handleBadgeToggle = (value: string) => {
    setBadgeValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleBadgeRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBadgeValues((prev) => prev.filter((v) => v !== value));
  };

  const defaultSelectedLabels = defaultValues
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean) as string[];

  const primarySelectedLabels = primaryValues
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean) as string[];

  const badgeSelectedLabels = badgeValues
    .map((val) => options.find((opt) => opt.value === val)?.label)
    .filter(Boolean) as string[];

  const getDisplayText = (labels: string[]) => {
    if (labels.length === 0) return "";
    if (labels.length <= 3) return labels.join(", ");
    const displayed = labels.slice(0, 3).join(", ");
    const remaining = labels.length - 3;
    return `${displayed} +${remaining}`;
  };

  return (
    <div className="flex flex-col gap-4">
      {/* //Default Multi Select */}
      <div className="relative inline-flex w-fit">
        <Popover open={defaultOpen} onOpenChange={setDefaultOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-fit justify-between rounded-md px-3 py-2 h-10",
                defaultValues.length > 0
                  ? "pr-8 overflow-hidden"
                  : ""
              )}
            >
              <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden">
                <span className="text-neutral-fg font-semibold truncate">
                  Select products
                </span>
                {defaultSelectedLabels.length > 0 && (
                  <>
                    <span className="text-neutral-fg">:</span>
                    <span className="text-neutral-fg font-normal truncate min-w-0 ml-0.5">
                      {getDisplayText(defaultSelectedLabels)}
                    </span>
                  </>
                )}
              </span>
              {defaultValues.length === 0 && (
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
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer",
                    option.value === "Blok" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={defaultValues.includes(option.value)}
                    onChange={() => handleDefaultToggle(option.value)}
                    disabled={option.value === "Blok"}
                    className="pointer-events-auto"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {defaultValues.length > 0 && (
          <Button
            onClick={handleDefaultClear}
            variant="ghost"
            colorScheme="neutral"
            size="icon-xs"
            aria-label="Clear all selections"
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto hover:bg-neutral-bg-active"
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
              {options.map((option) => (
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
            onClick={handlePrimaryClear}
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
      {/* //Badge Multi Select */}
      <div className="relative inline-flex w-fit">
        <Popover open={badgeOpen} onOpenChange={setBadgeOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-fit justify-between rounded-md px-3 py-2 h-10",
                badgeValues.length > 0
                  ? "pr-8 overflow-hidden"
                  : ""
              )}
            >
              <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden flex-wrap">
                <span className="text-neutral-fg font-semibold">
                  Select products
                </span>
                {badgeValues.length > 0 && (
                  <>
                    <span className="text-neutral-fg">:</span>
                    <span className="flex items-center gap-1.5 flex-wrap min-w-0 ml-0.5">
                      {badgeValues.slice(0, 3).map((value) => {
                        const label = options.find(
                          (opt) => opt.value === value
                        )?.label;
                        if (!label) return null;
                        return (
                          <Badge
                            key={value}
                            colorScheme="primary"
                            size="sm"
                            style={{
                              minHeight: "1.5rem",
                            }}
                            className="overflow-visible!"
                          >
                            <span>{label}</span>
                            <span
                              className="cursor-pointer rounded-full p-0.7 hover:bg-neutral-bg-active flex items-center justify-center ml-2 -mr-1 pointer-events-auto"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBadgeRemove(value, e);
                              }}
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
                      {badgeValues.length > 3 && (
                        <span className="text-neutral-fg font-normal">
                          +{badgeValues.length - 3}
                        </span>
                      )}
                    </span>
                  </>
                )}
              </span>
              {badgeValues.length === 0 && (
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
              {options.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm cursor-pointer",
                    option.value === "Blok" && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <input
                    type="checkbox"
                    checked={badgeValues.includes(option.value)}
                    onChange={() => handleBadgeToggle(option.value)}
                    disabled={option.value === "Blok"}
                    className="pointer-events-auto"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </PopoverContent>
        </Popover>
        {badgeValues.length > 0 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setBadgeValues([]);
            }}
            variant="ghost"
            colorScheme="neutral"
            size="icon-xs"
            aria-label="Clear all selections"
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto hover:bg-neutral-bg-active"
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>
    </div>
  );
}
