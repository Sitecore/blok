"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiClose } from "@mdi/js";
import { cn } from "@/lib/utils";

export function FilterSingleSelect() {
  const [defaultValue, setDefaultValue] = React.useState<string>("");
  const [primaryValue, setPrimaryValue] = React.useState<string>("");

  const options = [
    { value: "XMCloud", label: "XM Cloud" },
    { value: "contentHub", label: "Content Hub" },
    { value: "CDP", label: "CDP" },
    { value: "Blok", label: "Blok" },
  ];

  const defaultSelectedLabel = defaultValue
    ? options.find((opt) => opt.value === defaultValue)?.label
    : "";

  const primarySelectedLabel = primaryValue
    ? options.find((opt) => opt.value === primaryValue)?.label
    : "";

  const handleDefaultClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDefaultValue("");
  };

  const handlePrimaryClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPrimaryValue("");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* //Default Single Select */}
      <div className="relative inline-flex">
        <Select value={defaultValue} onValueChange={setDefaultValue}>
          <SelectTrigger
            className={cn(
              "*:data-[slot=select-value]:hidden",
              defaultValue && "pr-8 [&>svg]:hidden"
            )}
          >
            <SelectValue placeholder="Select a product" />
            <span className="flex items-center gap-2 pointer-events-none">
              <span className="text-neutral-fg font-semibold">
                Select a product
              </span>
              {defaultSelectedLabel && (
                <>
                  <span className="text-neutral-fg">:</span>
                  <span className="text-neutral-fg font-normal">
                    {defaultSelectedLabel}
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
        {defaultValue && (
          <Button
            onClick={handleDefaultClear} 
            variant="ghost"
            colorScheme="neutral"
            size="icon-xs"
            aria-label="Clear selection"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>
      {/* //Simple Single Select */}
      <div className="relative inline-flex">
        <Select value={primaryValue} onValueChange={setPrimaryValue}>
          <SelectTrigger
            className={cn(
              "*:data-[slot=select-value]:hidden",
              primaryValue && "pr-8 [&>svg]:hidden bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg border-primary"
            )}
          >
            <SelectValue placeholder="Select a product" />
            <span className="flex items-center gap-2 pointer-events-none">
              <span className={cn(
                "font-semibold",
                primaryValue ? "text-primary-fg" : "text-neutral-fg"
              )}>
                Select a product
              </span>
              {primarySelectedLabel && (
                <>
                  <span className={primaryValue ? "text-primary-fg" : "text-neutral-fg"}>:</span>
                  <span className={cn(
                    "font-normal",
                    primaryValue ? "text-primary-fg" : "text-neutral-fg"
                  )}>
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
            className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-fg"
          >
            <Icon path={mdiClose} />
          </Button>
        )}
      </div>
    </div>
  );
}
