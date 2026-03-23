"use client";

import type * as React from "react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

const TABLE_SIZE_STYLES = {
  sm: {
    header: "h-[26px] min-h-[26px] py-1 px-4",
    cell: "min-h-[36px] py-1 px-4",
  },
  md: {
    header: "h-[34px] min-h-[34px] py-2 px-5",
    cell: "min-h-[48px] py-2 px-5",
  },
  lg: {
    header: "h-[42px] min-h-[42px] py-3 px-5",
    cell: "min-h-[56px] py-3 px-5",
  },
} as const;

export type TableSize = keyof typeof TABLE_SIZE_STYLES;

type TableContextValue = {
  size: TableSize;
  stickyHeader: boolean;
  pinnedColumnsCount: number;
};

const TableContext = createContext<TableContextValue>({
  size: "md",
  stickyHeader: true,
  pinnedColumnsCount: 0,
});

function useTableContext() {
  return useContext(TableContext);
}

export interface TableProps extends React.ComponentProps<"table"> {
  /** Size variant: sm (26/36px), md (34/48px), lg (42/56px). Default: md */
  size?: TableSize;
  /** Sticky header when body scrolls. Default: true */
  stickyHeader?: boolean;
  /** Max width of the table container (e.g. "100%", "800px"). Enables horizontal scroll when content overflows. */
  maxWidth?: string | number;
  /** Max height of the scrollable body. Enables vertical scroll with sticky header. */
  maxHeight?: string | number;
  /** Number of columns to pin (sticky) on horizontal scroll. */
  pinnedColumnsCount?: number;
  /** Additional classes for the outer wrapper (e.g. `border border-border`). Base: rounded-xl, bg-body-bg. */
  containerClassName?: string;
}

function Table({
  className,
  size = "md",
  stickyHeader = true,
  maxWidth,
  maxHeight,
  pinnedColumnsCount = 0,
  containerClassName,
  style,
  ...props
}: TableProps) {
  const containerStyle: React.CSSProperties = {};
  if (maxWidth != null)
    containerStyle.maxWidth =
      typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth;
  if (maxHeight != null) {
    const h = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;
    containerStyle.maxHeight = h;
    containerStyle.height = h;
  }

  const hasVerticalScroll = Boolean(maxHeight);
  const hasHorizontalScroll = maxWidth != null;
  const ctx: TableContextValue = {
    size,
    stickyHeader: stickyHeader && hasVerticalScroll,
    pinnedColumnsCount,
  };

  return (
    <TableContext.Provider value={ctx}>
      <div
        data-slot="table-container"
        className={cn(
          "relative w-full overflow-hidden rounded-xl bg-body-bg",
          hasVerticalScroll && "flex flex-col",
          containerClassName,
        )}
        style={Object.keys(containerStyle).length ? containerStyle : undefined}
      >
        <div
          className={cn(
            "w-full",
            hasHorizontalScroll && "isolate",
            hasVerticalScroll && "min-h-0 flex-1 overflow-y-auto",
            hasVerticalScroll && maxWidth == null
              ? "overflow-x-hidden"
              : "overflow-x-auto",
          )}
        >
          <table
            data-slot="table"
            data-table-size={size}
            className={cn(
              "w-full caption-bottom text-sm",
              hasHorizontalScroll && "border-separate border-spacing-0",
              className,
            )}
            style={style}
            {...props}
          />
        </div>
      </div>
    </TableContext.Provider>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  const { stickyHeader } = useTableContext();
  return (
    <thead
      data-slot="table-header"
      className={cn(
        "[&_tr]:border-b [&_tr]:border-border",
        stickyHeader &&
          "sticky top-0 z-10 bg-body-bg shadow-[0_1px_0_0_hsl(var(--border))]",
        className,
      )}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn(
        "[&_tr]:border-b [&_tr]:border-border [&_tr:last-child]:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
}

export interface TableHeadProps extends React.ComponentProps<"th"> {
  /** When true, keeps this column pinned (sticky) on horizontal scroll. Set left offset via className if needed. */
  pinned?: boolean;
  /** Use for the checkbox column so it stays narrow (e.g. w-12). */
  checkboxColumn?: boolean;
}

function TableHead({
  className,
  pinned,
  checkboxColumn,
  ...props
}: TableHeadProps) {
  const { size } = useTableContext();
  const sizeStyles = TABLE_SIZE_STYLES[size].header;
  return (
    <th
      data-slot="table-head"
      data-checkbox-column={checkboxColumn || undefined}
      className={cn(
        "whitespace-nowrap text-left align-middle font-medium text-neutral-fg",
        sizeStyles,
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        checkboxColumn && "w-12",
        pinned && "sticky left-0 z-20 bg-body-bg",
        className,
      )}
      {...props}
    />
  );
}

export interface TableCellProps extends React.ComponentProps<"td"> {
  /** When true, keeps this column pinned (sticky) on horizontal scroll. */
  pinned?: boolean;
  /** Use for the checkbox column so it stays narrow. */
  checkboxColumn?: boolean;
}

function TableCell({
  className,
  pinned,
  checkboxColumn,
  ...props
}: TableCellProps) {
  const { size } = useTableContext();
  const sizeStyles = TABLE_SIZE_STYLES[size].cell;
  return (
    <td
      data-slot="table-cell"
      data-checkbox-column={checkboxColumn || undefined}
      className={cn(
        "whitespace-nowrap align-middle",
        sizeStyles,
        "[&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        checkboxColumn && "w-12",
        pinned && "sticky left-0 z-20 bg-body-bg",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  useTableContext,
  TABLE_SIZE_STYLES,
};
