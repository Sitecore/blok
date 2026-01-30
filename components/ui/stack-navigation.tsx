import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import * as React from "react";

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

export type StackNavigationElement =
  | StackNavigationItem
  | StackNavigationDivider;

export interface StackNavigationProps {
  items: StackNavigationElement[];
  renderItem?: (item: StackNavigationItem) => ReactNode;
  renderDivider?: (divider: StackNavigationDivider, index: number) => ReactNode;
  className?: string;
  navClassName?: string;
  width?: string;
  header?: ReactNode;
  footer?: ReactNode;
  orientation?: "vertical" | "horizontal";
  /**
   * For framework-specific routers, user can pass the pathname from their hooks:
   * - TanStack Router: `useLocation().pathname`
   * - React Router: `useLocation().pathname`
   * - Next.js: `usePathname()`
   */
  pathname?: string;

  onItemClick?: (
    item: StackNavigationItem,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => undefined | boolean;
}

function DefaultNavItem({
  item,
  orientation = "vertical",
  pathname,
  onItemClick,
}: {
  item: StackNavigationItem;
  orientation?: "vertical" | "horizontal";
  pathname: string;
  onItemClick?: (
    item: StackNavigationItem,
    event: React.MouseEvent<HTMLAnchorElement>,
  ) => undefined | boolean;
}) {
  const isActive = pathname === item.path;

  const isHorizontal = orientation === "horizontal";

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onItemClick) {
      const result = onItemClick(item, e);
      if (result === false) {
        e.preventDefault();
      }
    }
  };

  return (
    <a
      href={item.path}
      onClick={handleClick}
      className={cn(
        // ---------VERTICAL--------------
        !isHorizontal &&
          cn(
            "flex flex-col items-center justify-center overflow-hidden",
            "h-14 min-w-14 min-h-14",
            "p-1.5 gap-1",
            "rounded-md transition-colors",
            "text-3xs text-neutral-fg font-medium",
            "hover:bg-sidebar-accent cursor-pointer",
            "relative opacity-100",
            "no-underline",
            isActive &&
              "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-medium",
            item.className,
          ),

        // --------- HORIZONTAL ---------
        isHorizontal &&
          cn(
            "flex flex-col items-center justify-center",
            "min-w-14 w-fit h-14 p-1.5 gap-1 rounded-md cursor-pointer overflow-hidden",
            "text-neutral-fg hover:bg-sidebar-accent transition-colors font-medium",
            "no-underline",
            isActive &&
              "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-medium",
            item.className,
          ),
      )}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={item.name}
    >
      {/* Icon */}
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 flex items-center justify-center",
          "w-[22px] h-[22px]",
        )}
      >
        {item.icon}
      </div>

      {/* Text below icon */}
      <span
        className={cn(
          !isHorizontal &&
            "text-3xs text-center overflow-hidden text-ellipsis whitespace-nowrap w-full block leading-[150%] tracking-normal",
          isHorizontal &&
            "text-3xs text-center whitespace-nowrap leading-tight",
        )}
        title={item.name}
      >
        {item.name}
      </span>

      {!isHorizontal && item.badge && (
        <div className="absolute top-1 right-1">{item.badge}</div>
      )}
    </a>
  );
}

function DefaultDivider({
  divider,
  orientation = "vertical",
}: {
  divider: StackNavigationDivider;
  orientation?: "vertical" | "horizontal";
}) {
  if (orientation === "horizontal") {
    return (
      <div
        className={cn("w-px h-6 bg-border opacity-100", divider.className)}
      />
    );
  }

  return (
    <div className={cn("w-14 h-px opacity-100 bg-border", divider.className)} />
  );
}

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
  pathname: providedPathname,
  onItemClick,
}: StackNavigationProps) {
  // Use provided pathname or fall back to window.location.pathname
  const [clientPathname, setClientPathname] = React.useState("");

  React.useEffect(() => {
    // Only set pathname on client side to avoid hydration mismatch
    if (typeof window !== "undefined" && !providedPathname) {
      setClientPathname(window.location.pathname);
    }
  }, [providedPathname]);

  const pathname = providedPathname ?? clientPathname;
  const isHorizontal = orientation === "horizontal";
  const hasShadowNone = className?.includes("shadow-none");
  const shadowClass = hasShadowNone ? "" : "shadow-base";

  return (
    <aside
      className={cn(
        !isHorizontal &&
          cn(
            width,
            "bg-background p-1.5 text-sidebar-foreground min-h-full flex flex-col opacity-100",
            shadowClass,
            className,
          ),
        isHorizontal &&
          cn(
            " bg-background w-full p-1.5 text-sidebar-foreground",
            shadowClass,
            "flex flex-row items-center p-1.5 overflow-x-auto",
            className,
          ),
      )}
    >
      {/* HEADER */}
      {!isHorizontal && header && (
        <div className="shrink-0 flex w-full justify-center">{header}</div>
      )}

      <div
        className={cn(
          !isHorizontal && " flex-1 overflow-auto",
          isHorizontal && "flex-1 overflow-x-auto",
        )}
      >
        <nav
          className={cn(
            !isHorizontal && "flex flex-col gap-1",
            isHorizontal &&
              "flex flex-row items-center justify-center gap-1 h-full",
            navClassName,
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
                  <DefaultNavItem
                    item={navItem}
                    orientation={orientation}
                    pathname={pathname}
                    onItemClick={onItemClick}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer only for vertical */}
      {!isHorizontal && footer && (
        <div className="shrink-0 flex justify-center overflow-hidden mx-2 py-1.5 text-3xs text-neutral-fg">
          {footer}
        </div>
      )}
    </aside>
  );
}
