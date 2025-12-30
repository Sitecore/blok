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
      <div className="relative inline-flex w-fit">
        <Select value={defaultValue} onValueChange={setDefaultValue}>
          <SelectTrigger
            className={cn(
              "*:data-[slot=select-value]:hidden border-border",
              defaultValue && "pr-8 [&>svg]:hidden overflow-hidden"
            )}
          >
            <SelectValue placeholder="Select a product" />
            <span className="flex items-center gap-0 pointer-events-none min-w-0 overflow-hidden">
              <span className="text-neutral-fg font-semibold truncate">
                Select a product
              </span>
              {defaultSelectedLabel && (
                <>
                  <span className="text-neutral-fg">:</span>
                  <span className="text-neutral-fg font-normal truncate min-w-0 ml-0.5">
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
            className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <Icon path={mdiClose} />
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
    </div>
  );
}
