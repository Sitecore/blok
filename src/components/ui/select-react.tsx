"use client";

import { Badge } from "@/components/ui/badge";
import { Icon } from "@/lib/icon";
import { mdiCheck, mdiChevronDown, mdiClose } from "@mdi/js";
import * as React from "react";
import ReactSelect, {
  type Props as ReactSelectProps,
  type GroupBase,
  type StylesConfig,
  type ClassNamesConfig,
  components,
  type DropdownIndicatorProps,
  type ClearIndicatorProps,
  type MultiValueRemoveProps,
  type MultiValueGenericProps,
  type OptionProps,
} from "react-select";

import { cn } from "@/lib/utils";

export type SelectReactOption = {
  value: string;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

export type SelectReactProps<
  Option = SelectReactOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Omit<ReactSelectProps<Option, IsMulti, Group>, "classNames" | "styles"> & {
  size?: "sm" | "default";
  className?: string;
};

// Custom dropdown indicator matching Blok select styling
function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <Icon path={mdiChevronDown} className="size-5 opacity-50" />
    </components.DropdownIndicator>
  );
}

// Custom clear indicator matching Blok styling
function ClearIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: ClearIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.ClearIndicator {...props}>
      <Icon path={mdiClose} className="size-4 opacity-50 hover:opacity-100" />
    </components.ClearIndicator>
  );
}

// Custom multi-value container using Badge component
function MultiValueContainer<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: MultiValueGenericProps<Option, IsMulti, Group>) {
  return (
    <Badge size="md" colorScheme="neutral" className="gap-1 pr-0.5">
      {props.children}
    </Badge>
  );
}

// Custom multi-value remove button
function MultiValueRemove<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: MultiValueRemoveProps<Option, IsMulti, Group>) {
  return (
    <components.MultiValueRemove {...props}>
      <Icon path={mdiClose} className="size-3 opacity-60 hover:opacity-100" />
    </components.MultiValueRemove>
  );
}

// Custom option component with checkmark for selected items
function CustomOption<
  Option extends SelectReactOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>) {
  const { isSelected, data } = props;
  return (
    <components.Option {...props}>
      <div className="flex w-full items-center gap-2">
        {data.icon && <span className="shrink-0">{data.icon}</span>}
        <span className="flex-1">{props.children}</span>
        {isSelected && (
          <span className="shrink-0">
            <Icon path={mdiCheck} className="size-4" />
          </span>
        )}
      </div>
    </components.Option>
  );
}

function SelectReact<
  Option extends SelectReactOption = SelectReactOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  size = "default",
  className,
  isDisabled,
  instanceId,
  ...props
}: SelectReactProps<Option, IsMulti, Group>) {
  // Generate a stable ID to prevent hydration mismatches
  const id = React.useId();
  const selectInstanceId = instanceId ?? id;
  const classNames: ClassNamesConfig<Option, IsMulti, Group> = {
    control: ({ isFocused, isDisabled: controlDisabled, menuIsOpen }) =>
      cn(
        // Base styles matching SelectTrigger
        "border-input text-md flex w-full items-center gap-2 rounded-md border-1 px-3 transition-[color] outline-none",
        // Size variants
        size === "default" ? "min-h-10" : "min-h-8",
        // Focus states - only apply ring when focused but menu is closed
        isFocused && !menuIsOpen && "border-input ring-ring/50 ring-1",
        // When menu is open, use border-2 (no ring to avoid double border)
        menuIsOpen && "border-primary border-2",
        // Disabled state
        controlDisabled && "cursor-not-allowed opacity-50",
        // Dark mode
        "dark:bg-input/30 dark:hover:bg-input/50",
        // Remove default react-select background
        "bg-transparent",
        className,
      ),
    placeholder: () => "text-muted-foreground",
    input: () => "text-foreground",
    singleValue: () => "text-foreground",
    valueContainer: () => "gap-1 p-0",
    indicatorSeparator: () => "hidden",
    indicatorsContainer: () => "gap-1",
    dropdownIndicator: () => "text-muted-foreground p-0",
    clearIndicator: () => "text-muted-foreground p-0 cursor-pointer",
    menu: () =>
      cn(
        "bg-popover text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden rounded-md border shadow-md",
        // Animation classes matching SelectContent
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      ),
    menuList: () => "p-1 max-h-[300px]",
    option: ({ isFocused, isSelected, isDisabled: optionDisabled }) =>
      cn(
        // Base styles matching SelectItem
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 px-2 text-sm outline-hidden select-none",
        // Hover/focus state
        isFocused && "bg-accent text-accent-foreground",
        // Selected state
        isSelected && "bg-accent text-accent-foreground",
        // Disabled state
        optionDisabled && "pointer-events-none opacity-50",
      ),
    group: () => "",
    groupHeading: () =>
      "text-muted-foreground px-2 py-1.5 text-xs font-semibold uppercase",
    noOptionsMessage: () => "text-muted-foreground py-6 text-center text-sm",
    loadingMessage: () => "text-muted-foreground py-6 text-center text-sm",
    multiValue: () => "",
    multiValueLabel: () => "text-sm",
    multiValueRemove: () =>
      "hover:bg-destructive/20 hover:text-destructive rounded-sm p-0.5 transition-colors cursor-pointer",
  };

  // Remove all default styles to use only classNames
  const styles: StylesConfig<Option, IsMulti, Group> = {
    control: () => ({
      boxShadow: "none",
    }),
    option: (base) => ({
      ...base,
      backgroundColor: undefined,
      color: undefined,
      "&:active": {
        backgroundColor: undefined,
      },
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: undefined,
    }),
    menuList: (base) => ({
      ...base,
      padding: undefined,
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: undefined,
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: undefined,
      padding: undefined,
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: undefined,
      "&:hover": {
        backgroundColor: undefined,
        color: undefined,
      },
    }),
    input: (base) => ({
      ...base,
      color: undefined,
    }),
    placeholder: (base) => ({
      ...base,
      color: undefined,
    }),
    singleValue: (base) => ({
      ...base,
      color: undefined,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: undefined,
      padding: 0,
    }),
    clearIndicator: (base) => ({
      ...base,
      color: undefined,
      padding: 0,
    }),
  };

  return (
    <ReactSelect<Option, IsMulti, Group>
      unstyled
      instanceId={selectInstanceId}
      classNames={classNames}
      styles={styles}
      components={{
        DropdownIndicator,
        ClearIndicator,
        MultiValueContainer,
        MultiValueRemove,
        Option: CustomOption as typeof components.Option,
        ...props.components,
      }}
      isDisabled={isDisabled}
      isOptionDisabled={(option) => !!(option as SelectReactOption).disabled}
      {...props}
    />
  );
}

export { SelectReact };
