import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export interface StackNavigationItem {
  name: string;
  path: string;
  icon: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export interface StackNavigationDivider {
  type: "divider";
  className?: string;
}

export type StackNavigationElement = StackNavigationItem | StackNavigationDivider;

export interface StackNavigationProps {
  items: StackNavigationElement[];
  renderItem?: (item: StackNavigationItem) => ReactNode;
  renderDivider?: (divider: StackNavigationDivider, index: number) => ReactNode;
  className?: string;
  navClassName?: string;
  width?: string;
  header?: ReactNode;
  footer?: ReactNode;
  orientation?: "vertical" | "horizontal"; // NEW
}

/* ------------------------------------------------
   Default item (Vertical untouched, Horizontal added)
   Note: horizontal item size is compact so it won't
   force the bar height.
-------------------------------------------------- */
function DefaultNavItem({
  item,
  orientation = "vertical",
}: {
  item: StackNavigationItem;
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  const isActive = pathname === item.path;

  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        // --------- VERTICAL (UNCHANGED) ---------
        !isHorizontal &&
          cn(
            "flex flex-col items-center justify-center overflow-hidden",
            "w-14 h-14 min-w-14 min-h-14",
            "p-1.5 gap-1",
            "rounded-md transition-colors",
            "text-md text-neutral-fg font-normal",
            "hover:bg-sidebar-accent cursor-pointer",
            "relative opacity-100",
            isActive &&
              "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-semibold",
            item.className
          ),

        // --------- HORIZONTAL (ADDED) ---------
        // Note: item itself does NOT have a large fixed height
        // so it won't force the container height.
        isHorizontal &&
          cn(
            "flex flex-col items-center justify-center",
            "min-w-14 w-fit h-14 p-2 gap-1 rounded-md cursor-pointer overflow-hidden",
            "text-neutral-fg hover:bg-sidebar-accent transition-colors",
            isActive &&
              "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-semibold",
            item.className
          )
      )}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 flex items-center justify-center",
          // keep icon size same as vertical
          "w-[22px] h-[22px]"
        )}
      >
        {item.icon}
      </div>

      {/* Text below icon */}
      <span
        className={cn(
          // unchanged vertical text style
          !isHorizontal &&
            "text-center overflow-hidden text-ellipsis whitespace-nowrap w-full block text-sm leading-[150%] tracking-normal",
          // horizontal text is smaller and centered below icon
          isHorizontal && "text-xs text-center whitespace-nowrap leading-tight"
        )}
        title={item.name}
      >
        {item.name}
      </span>

      {/* Badge: keep only for vertical so it doesn't overlap horizontal layout */}
      {!isHorizontal && item.badge && (
        <div className="absolute top-1 right-1">{item.badge}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------
   Divider
-------------------------------------------------- */
function DefaultDivider({
  divider,
  orientation = "vertical",
}: {
  divider: StackNavigationDivider;
  orientation?: "vertical" | "horizontal";
}) {
  if (orientation === "horizontal") {
    return <div className={cn("w-px h-6 bg-border opacity-100", divider.className)} />;
  }

  // Vertical (unchanged)
  return <div className={cn("w-14 h-px opacity-100 bg-border", divider.className)} />;
}

/* ------------------------------------------------
   MAIN COMPONENT
   - Horizontal container uses a fixed height h-[120px]
     (arbitrary value). Change `120px` to whatever you
     want. Using Tailwind arbitrary value ensures it works.
-------------------------------------------------- */
export function StackNavigation({
  items,
  renderItem,
  renderDivider,
  className,
  navClassName,
  width = "w-[72px]",
  header,
  footer,
  orientation = "vertical",
}: StackNavigationProps) {
  const isHorizontal = orientation === "horizontal";

  return (
    <aside
      className={cn(
        // VERTICAL ORIGINAL (unchanged)
        !isHorizontal &&
          cn(
            width,
            "bg-sidebar text-sidebar-foreground min-h-full flex flex-col opacity-100",
            className
          ),

        // HORIZONTAL NEW:
        // Use an explicit arbitrary height value (120px) so it definitely applies.
        // The bar is a horizontal scrollable container; items are centered vertically.
        isHorizontal &&
          cn(
            "w-full h-20 bg-sidebar text-sidebar-foreground",
            "flex flex-row items-center px-2 overflow-x-auto",
            className
          )
      )}
    >
      {/* Header only for vertical - unchanged */}
      {!isHorizontal && header && (
        <div className="shrink-0 flex w-full justify-center">{header}</div>
      )}

      <div
        className={cn(
          // vertical: original scroll behavior
          !isHorizontal && "py-6 px-2 flex-1 overflow-auto",
          // horizontal: let nav be horizontally scrollable; vertically centered
          isHorizontal && "flex-1 overflow-x-auto"
        )}
      >
        <nav
          className={cn(
            !isHorizontal && "flex flex-col gap-1",
            // horizontal: row, centered vertically inside the fixed-height bar
            isHorizontal && "flex flex-row items-center justify-center gap-3 h-full",
            navClassName
          )}
        >
          {items.map((item, index) => {
            if ("type" in item && item.type === "divider") {
              return renderDivider ? (
                <div key={`divider-${index}`}>{renderDivider(item, index)}</div>
              ) : (
                <DefaultDivider
                  key={`divider-${index}`}
                  divider={item}
                  orientation={orientation}
                />
              );
            }

            const navItem = item as StackNavigationItem;
            return (
              <div key={navItem.path || `item-${index}`}>
                {renderItem ? (
                  renderItem(navItem)
                ) : (
                  <DefaultNavItem item={navItem} orientation={orientation} />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer only for vertical */}
      {!isHorizontal && footer && (
        <div className="shrink-0 flex justify-center overflow-hidden mx-2 py-2 text-xs text-neutral-fg">
          {footer}
        </div>
      )}
    </aside>
  );
}
