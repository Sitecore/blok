"use client";

import {
  SelectReact,
  type SelectReactOption,
  type SelectReactProps,
} from "@/components/ui/select-react";
import * as React from "react";
import { type GroupBase, type MenuListProps, components } from "react-select";
import { List, type ListImperativeAPI } from "react-window";

import { cn } from "@/lib/utils";

export type { SelectReactOption, SelectReactProps };

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

function VirtualizedSelect<
  Option extends SelectReactOption = SelectReactOption,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components: userComponents,
  ...props
}: SelectReactProps<Option, IsMulti, Group>) {
  return (
    <SelectReact<Option, IsMulti, Group>
      {...props}
      components={{
        MenuList: VirtualizedMenuList as typeof components.MenuList,
        ...userComponents,
      }}
    />
  );
}

export { VirtualizedSelect };
