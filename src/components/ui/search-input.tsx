"use client";

import { mdiClose } from "@mdi/js";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

// SearchInput wrapper (similar to InputGroup)
function SearchInput({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="search-input"
      role="group"
      className={cn(
        "relative flex w-full items-center rounded-md border border-input transition-[color,box-shadow] outline-none",
        "h-9 min-w-0",
        "bg-white dark:bg-input/30",
        // Focus state (border-2 primary, no ring)
        "has-[[data-slot=search-input-control]:focus-visible]:border-2 has-[[data-slot=search-input-control]:focus-visible]:border-primary",
        // Error state
        "has-[[data-slot=search-input-control][aria-invalid=true]]:ring-destructive/20 has-[[data-slot=search-input-control][aria-invalid=true]]:border-destructive dark:has-[[data-slot=search-input-control][aria-invalid=true]]:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

// SearchInputLeftElement (for icons, similar to InputLeftElement)
function SearchInputLeftElement({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="search-input-left-element"
      className={cn(
        "text-muted-foreground flex h-auto cursor-text items-center justify-center pl-3 pointer-events-none",
        "[&>svg:not([class*='size-'])]:size-5",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// SearchInputRightElement (for clear button, similar to InputRightElement)
function SearchInputRightElement({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="search-input-right-element"
      className={cn("flex h-auto items-center justify-center pr-1", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// SearchInputField (the actual input field, identical to Input but without ring)
const SearchInputField = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, type = "text", ...props }, ref) => {
  return (
    <Input
      ref={ref}
      type={type}
      data-slot="search-input-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none dark:bg-transparent",
        "focus-visible:ring-0 focus:ring-0 focus:border-0 focus-visible:border-0",
        "pl-2 pr-2",
        className,
      )}
      {...props}
    />
  );
});
SearchInputField.displayName = "SearchInputField";

// Helper component for clear button with tooltip
interface SearchInputClearButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  onClear?: () => void;
  tooltipLabel?: string;
}

function SearchInputClearButton({
  onClear,
  tooltipLabel = "Clear search",
  className,
  ...props
}: SearchInputClearButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          colorScheme="neutral"
          aria-label={tooltipLabel}
          onClick={onClear}
          className={cn(
            "text-subtle-text hover:text-body-text hover:bg-neutral-bg-active focus:outline-none",
            className,
          )}
          {...props}
        >
          <Icon path={mdiClose} size={0.75} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{tooltipLabel}</TooltipContent>
    </Tooltip>
  );
}

export {
  SearchInput,
  SearchInputLeftElement,
  SearchInputRightElement,
  SearchInputField,
  SearchInputClearButton,
};
