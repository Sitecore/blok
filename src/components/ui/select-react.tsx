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
  type MenuListProps,
} from "react-select";
import { List, type ListImperativeAPI } from "react-window";

import { cn } from "@/lib/utils";

export type SelectReactOption = {
  value: string;
  label: string;
  description?: string;
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
const CustomOption = React.memo(function CustomOption<
  Option extends SelectReactOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: OptionProps<Option, IsMulti, Group>) {
  const { isSelected, data } = props;
  const hasDescription = Boolean(data.description);
  return (
    <components.Option {...props}>
      <div
        className={cn(
          "flex w-full gap-2",
          hasDescription ? "items-start py-1" : "items-center",
        )}
      >
        {data.icon && (
          <span className={cn("shrink-0", hasDescription && "mt-0.5")}>
            {data.icon}
          </span>
        )}
        <span className="min-w-0 flex-1">
          {hasDescription ? (
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold leading-tight">
                {data.label}
              </span>
              <span className="text-xs leading-snug text-subtle-text">
                {data.description}
              </span>
            </span>
          ) : (
            props.children
          )}
        </span>
        {isSelected && (
          <span className={cn("shrink-0", hasDescription && "mt-0.5")}>
            <Icon path={mdiCheck} className="size-4" />
          </span>
        )}
      </div>
    </components.Option>
  );
}) as typeof components.Option;

const MENU_VIRTUALIZE_THRESHOLD = 50;
const MENU_ROW_SINGLE = 40;
const MENU_ROW_WITH_DESCRIPTION = 64;

type VirtualMenuRowProps = { menuRows: readonly React.ReactNode[] };

function isGroupedOptions<Option>(
  options: readonly Option[] | unknown,
): boolean {
  if (!Array.isArray(options) || options.length === 0) return false;
  const first = options[0] as { options?: unknown };
  return (
    first != null &&
    typeof first === "object" &&
    "options" in first &&
    Array.isArray(first.options)
  );
}

function menuRowHeight(child: React.ReactNode): number {
  if (React.isValidElement(child)) {
    const data = (child.props as { data?: SelectReactOption }).data;
    if (data?.description) return MENU_ROW_WITH_DESCRIPTION;
  }
  return MENU_ROW_SINGLE;
}

function totalMenuContentHeight(
  menuRows: readonly React.ReactNode[],
  rowHeightFn: (index: number, props: VirtualMenuRowProps) => number,
  rowProps: VirtualMenuRowProps,
): number {
  let sum = 0;
  for (let i = 0; i < menuRows.length; i++) {
    sum += rowHeightFn(i, rowProps);
  }
  return sum;
}

type VirtualizedMenuListInnerProps<
  Option extends SelectReactOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
> = MenuListProps<Option, IsMulti, Group> & {
  items: readonly React.ReactNode[];
};

/** Holds all list virtualization hooks; only mounted when the menu uses the virtualized path. */
function VirtualizedMenuListInner<
  Option extends SelectReactOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>({ items, ...props }: VirtualizedMenuListInnerProps<Option, IsMulti, Group>) {
  const {
    maxHeight,
    innerRef,
    innerProps,
    focusedOption,
    isMulti,
    cx,
    getClassNames,
    className,
  } = props;

  const rowProps = React.useMemo<VirtualMenuRowProps>(
    () => ({ menuRows: items }),
    [items],
  );

  const rowHeightFn = React.useCallback(
    (index: number, p: VirtualMenuRowProps) => menuRowHeight(p.menuRows[index]),
    [],
  );

  const contentHeight = React.useMemo(
    () => totalMenuContentHeight(items, rowHeightFn, rowProps),
    [items, rowHeightFn, rowProps],
  );

  const listViewportHeight = Math.min(maxHeight, contentHeight);

  const listClassName = cx(
    { "menu-list": true, "menu-list--is-multi": isMulti },
    getClassNames("menuList", props),
    className,
  );

  const listRef = React.useRef<ListImperativeAPI | null>(null);
  const innerRefLatest = React.useRef(innerRef);
  innerRefLatest.current = innerRef;

  const assignMenuListElementRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      const ref = innerRefLatest.current;
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && typeof ref === "object" && "current" in ref) {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current =
          element;
      }
    },
    [],
  );

  React.useLayoutEffect(() => {
    assignMenuListElementRef(listRef.current?.element ?? null);
    return () => assignMenuListElementRef(null);
  }, [assignMenuListElementRef]);

  React.useLayoutEffect(() => {
    if (!focusedOption || items.length === 0) return;
    const index = items.findIndex(
      (row) =>
        React.isValidElement(row) &&
        (row.props as { data?: Option }).data === focusedOption,
    );
    if (index < 0) return;
    queueMicrotask(() => {
      listRef.current?.scrollToRow({ index, align: "auto" });
    });
  }, [focusedOption, items]);

  const rowComponent = React.useCallback(
    ({
      index,
      style,
      menuRows,
    }: {
      ariaAttributes: {
        "aria-posinset": number;
        "aria-setsize": number;
        role: "listitem";
      };
      index: number;
      style: React.CSSProperties;
    } & VirtualMenuRowProps) => (
      <div role="presentation" style={style}>
        {menuRows[index]}
      </div>
    ),
    [],
  );

  return (
    <List<VirtualMenuRowProps>
      {...innerProps}
      className={cn(listClassName, innerProps.className)}
      listRef={listRef}
      onResize={() =>
        assignMenuListElementRef(listRef.current?.element ?? null)
      }
      onRowsRendered={() =>
        assignMenuListElementRef(listRef.current?.element ?? null)
      }
      overscanCount={5}
      rowComponent={rowComponent}
      rowCount={items.length}
      rowHeight={rowHeightFn}
      rowProps={rowProps}
      style={{ height: listViewportHeight, width: "100%" }}
    />
  );
}

function VirtualizedMenuList<
  Option extends SelectReactOption,
  IsMulti extends boolean,
  Group extends GroupBase<Option>,
>(props: MenuListProps<Option, IsMulti, Group>) {
  const { children, selectProps } = props;
  const items = React.useMemo(
    () => React.Children.toArray(children),
    [children],
  );
  const options = selectProps.options;

  if (
    isGroupedOptions(options) ||
    items.length <= MENU_VIRTUALIZE_THRESHOLD ||
    items.length === 0
  ) {
    return <components.MenuList {...props} />;
  }

  return <VirtualizedMenuListInner {...props} items={items} />;
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
  components: userComponents,
  ...props
}: SelectReactProps<Option, IsMulti, Group>) {
  // Generate a stable ID to prevent hydration mismatches
  const id = React.useId();
  const selectInstanceId = instanceId ?? id;

  const classNames = React.useMemo<ClassNamesConfig<Option, IsMulti, Group>>(
    () => ({
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
          "bg-body-bg",
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
      option: ({ isFocused, isSelected, isDisabled: optionDisabled, data }) =>
        cn(
          // Base styles matching SelectItem
          "relative flex w-full cursor-default gap-2 rounded-sm py-1.5 px-2 !text-sm outline-hidden select-none",
          data.description ? "items-start" : "items-center",
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
    }),
    [size, className],
  );

  // Remove all default styles to use only classNames
  const styles = React.useMemo<StylesConfig<Option, IsMulti, Group>>(
    () => ({
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
    }),
    [],
  );

  const mergedComponents = React.useMemo(
    () => ({
      DropdownIndicator,
      ClearIndicator,
      MultiValueContainer,
      MultiValueRemove,
      Option: CustomOption,
      // Virtualized menu for large flat lists; a custom `MenuList` overrides this.
      MenuList: VirtualizedMenuList as typeof components.MenuList,
      ...userComponents,
    }),
    [userComponents],
  );

  return (
    <ReactSelect<Option, IsMulti, Group>
      unstyled
      instanceId={selectInstanceId}
      classNames={classNames}
      styles={styles}
      components={mergedComponents}
      isDisabled={isDisabled}
      isOptionDisabled={(option) => !!(option as SelectReactOption).disabled}
      {...props}
    />
  );
}

export { SelectReact };
