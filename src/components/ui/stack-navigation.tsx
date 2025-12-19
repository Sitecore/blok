import type { ReactNode } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";

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
  orientation?: "vertical" | "horizontal";
  /**
   * For framework-specific routers, user can pass the pathname from their hooks:
   * - TanStack Router: `useLocation().pathname`
   * - React Router: `useLocation().pathname`
   * - Next.js: `usePathname()`
   */
  pathname?: string;
}

function DefaultNavItem({
  item,
  orientation = "vertical",
  pathname,
  onNavigate,
}: {
  item: StackNavigationItem;
  orientation?: "vertical" | "horizontal";
  pathname: string;
  onNavigate?: (path: string) => void;
}) {
  const isActive = pathname === item.path;
  const isHorizontal = orientation === "horizontal";
  
  const [TanStackLink, setTanStackLink] = React.useState<any>(null);
  const [isLoadingRouter, setIsLoadingRouter] = React.useState(false);

  const loadTanStackRouter = React.useCallback(async () => {
    // Skip in Next.js (runtime check) or if other conditions are met
    if (
      onNavigate ||
      TanStackLink ||
      isLoadingRouter ||
      typeof window === "undefined" ||
      typeof (window as any).__NEXT_DATA__ !== "undefined"
    ) {
      return;
    }

    setIsLoadingRouter(true);
    try {
      // Only attempt in non-Next.js environments 
      // Build the import dynamically to avoid static analysis
      const getModulePath = () => {
        const p1 = "@tanstack";
        const p2 = "/react-router";
        return p1 + p2;
      };

      const routerModule = getModulePath();

      // Use Function constructor to create import at runtime
      // This prevents Turbopack from statically analyzing the import
      const importFn = Function("specifier", "return import(specifier)");
      const router = await importFn(routerModule);
      if (router?.Link) {
        setTanStackLink(() => router.Link);
      }
    } catch {
      // TanStack Router not available
    } finally {
      setIsLoadingRouter(false);
    }
  }, [onNavigate, TanStackLink, isLoadingRouter]);

  const handleClick = async (e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(item.path);
      return;
    }

    // Try to load TanStack Router on first click if not already loaded
    if (!TanStackLink && !isLoadingRouter) {
      await loadTanStackRouter();
      // If TanStack Router loaded, let it handle navigation
      if (TanStackLink) {
        return;
      }
    }

    // Fallback to window.location
    e.preventDefault();
    if (
      typeof window !== "undefined" &&
      window.location.pathname !== item.path
    ) {
      window.location.href = item.path;
    }
  };

  const navItemContent = (
    <>
      {/* Icon */}
      <div
        aria-hidden="true"
        className={cn(
          "shrink-0 flex items-center justify-center",
          "w-[22px] h-[22px]"
        )}
      >
        {item.icon}
      </div>

      {/* Text below icon */}
      <span
        className={cn(
          !isHorizontal &&
            "text-3xs text-center overflow-hidden text-ellipsis whitespace-nowrap w-full block leading-[150%] tracking-normal",
          isHorizontal && "text-3xs text-center whitespace-nowrap leading-tight"
        )}
        title={item.name}
      >
        {item.name}
      </span>

      {!isHorizontal && item.badge && (
        <div className="absolute top-1 right-1">{item.badge}</div>
      )}
    </>
  );

  const className = cn(
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
        isActive &&
          "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-medium",
        item.className
      ),

    // --------- HORIZONTAL ---------
    isHorizontal &&
      cn(
        "flex flex-col items-center justify-center",
        "min-w-14 w-fit h-14 p-1.5 gap-1 rounded-md cursor-pointer overflow-hidden",
        "text-neutral-fg hover:bg-sidebar-accent transition-colors font-medium",
        isActive &&
          "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-medium",
        item.className
      )
  );

  // Use TanStack Router Link if available and no custom handler
  if (TanStackLink && !onNavigate) {
    return (
      <TanStackLink
        to={item.path}
        className={className}
        onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
      >
        {navItemContent}
      </TanStackLink>
    );
  }

  // Default: use anchor or div with onClick handler
  const Component = onNavigate || TanStackLink ? "div" : "a";
  return (
    <Component
      href={!onNavigate && !TanStackLink ? item.path : undefined}
      className={className}
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
      role={onNavigate || TanStackLink ? "button" : undefined}
      tabIndex={onNavigate || TanStackLink ? 0 : undefined}
      onKeyDown={
        onNavigate || TanStackLink
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(e as any);
              }
            }
          : undefined
      }
    >
      {navItemContent}
    </Component>
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
    return <div className={cn("w-px h-6 bg-border opacity-100", divider.className)} />;
  }

  return <div className={cn("w-14 h-px opacity-100 bg-border", divider.className)} />;
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
}: StackNavigationProps) {
  // Use provided pathname or fall back to window.location.pathname
  const [clientPathname, setClientPathname] = React.useState("");

  React.useEffect(() => {
    // Only set pathname on client side to avoid hydration mismatch
    if (typeof window !== "undefined" && !providedPathname) {
      const updatePathname = () => {
        setClientPathname(window.location.pathname);
      };

      // Set initial pathname
      updatePathname();

      // Listen for navigation events (back/forward buttons)
      window.addEventListener("popstate", updatePathname);

      // Listen for programmatic navigation (pushState/replaceState)
      const originalPushState = history.pushState;
      const originalReplaceState = history.replaceState;

      history.pushState = function (...args) {
        originalPushState.apply(history, args);
        updatePathname();
      };

      history.replaceState = function (...args) {
        originalReplaceState.apply(history, args);
        updatePathname();
      };

      return () => {
        window.removeEventListener("popstate", updatePathname);
        history.pushState = originalPushState;
        history.replaceState = originalReplaceState;
      };
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
            className
          ),
        isHorizontal &&
          cn(
            " bg-background w-full p-1.5 text-sidebar-foreground",
            shadowClass,
            "flex flex-row items-center p-1.5 overflow-x-auto",
            className
          )
      )}
    >
      {/* HEADER */}
      {!isHorizontal && header && (
        <div className="shrink-0 flex w-full justify-center">{header}</div>
      )}

      <div
        className={cn(
          !isHorizontal && " flex-1 overflow-auto",
          isHorizontal && "flex-1 overflow-x-auto"
        )}
      >
        <nav
          className={cn(
            !isHorizontal && "flex flex-col gap-1",
            isHorizontal && "flex flex-row items-center justify-center gap-1 h-full",
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
                  <DefaultNavItem item={navItem} orientation={orientation} pathname={pathname} />
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