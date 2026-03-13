"use client";

import { Icon } from "@/lib/icon";
import { mdiChevronRight, mdiClose, mdiWindowRestore } from "@mdi/js";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
} from "@/components/ui/dnd-context";
import { useDraggable } from "@/components/ui/draggable";
import { cn } from "@/lib/utils";
import { CSS } from "@dnd-kit/utilities";

type SidebarRHSContextProps = {
  isCollapsed: boolean;
  isDocked: boolean;
  toggleCollapse: () => void;
  toggleDock: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarRHSContext = createContext<SidebarRHSContextProps | null>(null);

export function useSidebarRHS() {
  const context = useContext(SidebarRHSContext);
  if (!context) {
    throw new Error("useSidebarRHS must be used within a SidebarRHSProvider.");
  }
  return context;
}

export interface SidebarRHSProviderProps {
  /** Initial collapsed state */
  defaultCollapsed?: boolean;
  /** Initial docked state */
  defaultDocked?: boolean;
  /** Controlled collapsed state */
  collapsed?: boolean;
  /** Controlled docked state */
  docked?: boolean;
  /** Callback when collapsed state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
  /** Callback when docked state changes */
  onDockedChange?: (docked: boolean) => void;
  /** Children */
  children: ReactNode;
}

export function SidebarRHSProvider({
  defaultCollapsed = false,
  defaultDocked = true,
  collapsed: controlledCollapsed,
  docked: controlledDocked,
  onCollapsedChange,
  onDockedChange,
  children,
}: SidebarRHSProviderProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const [internalDocked, setInternalDocked] = useState(defaultDocked);

  const isCollapsed = controlledCollapsed ?? internalCollapsed;
  const isDocked = controlledDocked ?? internalDocked;
  const open = !isCollapsed;

  const toggleCollapse = useCallback(() => {
    const newCollapsed = !isCollapsed;
    if (controlledCollapsed === undefined) {
      setInternalCollapsed(newCollapsed);
    }
    onCollapsedChange?.(newCollapsed);
  }, [isCollapsed, controlledCollapsed, onCollapsedChange]);

  const toggleDock = useCallback(() => {
    const newDocked = !isDocked;
    if (controlledDocked === undefined) {
      setInternalDocked(newDocked);
    }
    onDockedChange?.(newDocked);
  }, [isDocked, controlledDocked, onDockedChange]);

  const setOpen = useCallback(
    (open: boolean) => {
      const newCollapsed = !open;
      if (controlledCollapsed === undefined) {
        setInternalCollapsed(newCollapsed);
      }
      onCollapsedChange?.(newCollapsed);
    },
    [controlledCollapsed, onCollapsedChange],
  );

  const contextValue = useMemo<SidebarRHSContextProps>(
    () => ({
      isCollapsed,
      isDocked,
      toggleCollapse,
      toggleDock,
      open,
      setOpen,
    }),
    [isCollapsed, isDocked, toggleCollapse, toggleDock, open, setOpen],
  );

  return (
    <SidebarRHSContext.Provider value={contextValue}>
      {children}
    </SidebarRHSContext.Provider>
  );
}

export interface SidebarRHSTriggerProps {
  /** Additional className */
  className?: string;
  /** Additional style */
  style?: React.CSSProperties;
  /** Children (optional, defaults to chevron icon) */
  children?: ReactNode;
}

export function SidebarRHSTrigger({
  className,
  style,
  children,
}: SidebarRHSTriggerProps) {
  const { toggleCollapse, isCollapsed } = useSidebarRHS();

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-full shadow-lg bg-white border-border hover:bg-gray-50",
        className,
      )}
      style={style}
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={toggleCollapse}
    >
      {children || (
        <Icon
          path={mdiChevronRight}
          size={0.8}
          className={cn(
            "transition-transform text-black",
            isCollapsed && "rotate-180",
          )}
        />
      )}
    </Button>
  );
}

export interface SidebarRHSProps {
  /** Title shown in the sidebar header */
  title?: string;
  /** Custom header content (overrides title if provided) */
  header?: ReactNode;
  /** Content to display in the sidebar */
  children?: ReactNode;
  /** Main content area (shown on the left) */
  mainContent?: ReactNode;
  /** Width of the sidebar when expanded */
  width?: string;
  /** Height of the container */
  height?: string;
  /** Minimum width of the sidebar */
  minWidth?: string;
  /** Maximum width of the sidebar */
  maxWidth?: string;
  /** Callback when width changes */
  onWidthChange?: (width: string) => void;
  /** Additional className */
  className?: string;
  /** Enable collapsible functionality (default: true) */
  collapsible?: boolean;
  /** Enable dock/undock functionality (default: true) */
  dockable?: boolean;
}

// Helper function to parse width string to pixels
function parseWidth(width: string, containerWidth: number): number {
  if (width.endsWith("px")) {
    return Number.parseInt(width, 10);
  }
  if (width.endsWith("%")) {
    return (Number.parseInt(width, 10) / 100) * containerWidth;
  }
  return Number.parseInt(width, 10) || 320;
}

// Helper function to format pixels to string
function formatWidth(pixels: number): string {
  return `${pixels}px`;
}

function DockButton({ show }: { show?: boolean }) {
  const { toggleDock } = useSidebarRHS();
  if (!show) return null;
  return (
    <div className="ml-auto flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        colorScheme="neutral"
        aria-label="Undock sidebar"
        onClick={toggleDock}
        className="h-7 w-7"
      >
        <Icon path={mdiWindowRestore} size={0.9} />
      </Button>
    </div>
  );
}

function UndockButton({ show }: { show?: boolean }) {
  const { toggleDock } = useSidebarRHS();
  if (!show) return null;
  return (
    <div className="ml-auto flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        colorScheme="neutral"
        aria-label="Dock sidebar"
        onClick={toggleDock}
        className="h-7 w-7"
      >
        <Icon path={mdiClose} size={0.9} />
      </Button>
    </div>
  );
}

export function SidebarRHS({
  title,
  header,
  children,
  mainContent,
  width = "320px",
  height = "600px",
  minWidth = "200px",
  maxWidth = "800px",
  onWidthChange,
  className,
  collapsible = false,
  dockable = false,
}: SidebarRHSProps) {
  const { isCollapsed, isDocked } = useSidebarRHS();
  const [currentWidth, setCurrentWidth] = useState(width);
  const [isResizing, setIsResizing] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState<"200" | "500">(
    "200",
  );
  const [shouldHideContent, setShouldHideContent] = useState(isCollapsed);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef<number>(0);
  const startWidthRef = useRef<number>(0);
  const dragStartPositionRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const draggableElementRef = useRef<HTMLDivElement | null>(null);

  // Sync shouldHideContent with isCollapsed
  useEffect(() => {
    if (isCollapsed) {
      // Collapsing - use slower animation (500ms)
      setTransitionDuration("500");
      setTimeout(() => {
        setShouldHideContent(true);
      }, 500);
    } else {
      // Expanding - use faster animation (200ms)
      setTransitionDuration("200");
      setShouldHideContent(false);
    }

    // Reset transition duration after animation completes
    setTimeout(
      () => {
        setTransitionDuration("200");
      },
      isCollapsed ? 500 : 200,
    );
  }, [isCollapsed]);

  // Handle resize start
  const handleResizeStart = useCallback(
    (e: React.MouseEvent) => {
      if (isCollapsed) return;
      e.preventDefault();
      setIsResizing(true);
      startXRef.current = e.clientX;
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        startWidthRef.current = parseWidth(currentWidth, containerWidth);
      }
    },
    [isCollapsed, currentWidth],
  );

  // Handle resize move
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const deltaX = startXRef.current - e.clientX; // Negative because we're resizing from right
      const newWidth = startWidthRef.current + deltaX;

      const minPixels = parseWidth(minWidth, containerWidth);
      const maxPixels = parseWidth(maxWidth, containerWidth);

      const clampedWidth = Math.max(minPixels, Math.min(maxPixels, newWidth));
      const newWidthString = formatWidth(clampedWidth);

      setCurrentWidth(newWidthString);
      onWidthChange?.(newWidthString);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.body.style.cursor = "ew-resize";
    document.body.style.userSelect = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, minWidth, maxWidth, onWidthChange]);

  // Helper to constrain position to viewport
  const constrainPosition = useCallback(
    (x: number, y: number) => {
      const maxX =
        window.innerWidth - parseWidth(currentWidth, window.innerWidth);
      const maxY = window.innerHeight - 100; // Leave some space at bottom

      return {
        x: Math.max(0, Math.min(maxX, x)),
        y: Math.max(0, Math.min(maxY, y)),
      };
    },
    [currentWidth],
  );

  // Handle drag for undocked sidebar using @dnd-kit
  const handleDragStartUndocked = useCallback(
    (event: DragStartEvent) => {
      // Get the actual element position from the DOM
      const element = draggableElementRef.current;
      if (element) {
        const rect = element.getBoundingClientRect();
        // Always capture the actual position from DOM to prevent glitch
        // This ensures we're using left/top positioning even if element was using right/bottom
        const left = rect.left;
        const top = rect.top;

        // Use the actual DOM position as the starting point for the drag
        dragStartPositionRef.current = { x: left, y: top };

        // Only update state if position wasn't already set (to avoid unnecessary updates)
        const hasPosition = position.x !== 0 || position.y !== 0;
        if (!hasPosition) {
          setPosition({ x: left, y: top });
        }
      } else {
        dragStartPositionRef.current = { ...position };
      }
    },
    [position],
  );

  const handleDragEndUndocked = useCallback(
    (event: DragEndEvent) => {
      const { delta } = event;
      if (delta) {
        const newX = dragStartPositionRef.current.x + delta.x;
        const newY = dragStartPositionRef.current.y + delta.y;

        const constrained = constrainPosition(newX, newY);
        setPosition(constrained);
      }
    },
    [constrainPosition],
  );

  // When docked, render sidebar
  if (isDocked) {
    // If mainContent is provided, use the old pattern (backward compatible)
    if (mainContent) {
      return (
        <div
          ref={containerRef}
          className={cn(
            "relative w-full flex border border-border rounded-lg overflow-hidden bg-body-bg",
            className,
          )}
          style={{ height }}
        >
          {/* Main content area */}
          <div className="flex-1 overflow-auto p-4">{mainContent}</div>

          {/* Sidebar */}
          <div
            className={cn(
              "relative bg-body-bg border-l border-border shrink-0 overflow-x-visible",
              isCollapsed && "border-l-0",
              !isResizing && "transition-all ease-in-out",
              !isResizing && transitionDuration === "500" && "duration-500", // Slower when collapsing
              !isResizing && transitionDuration === "200" && "duration-200", // Faster when expanding
            )}
            style={{
              width: isCollapsed ? "0" : currentWidth,
            }}
          >
            {/* Resize handle */}
            {!shouldHideContent && (
              <div
                className="absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize z-20 hover:bg-primary/20 transition-colors group"
                onMouseDown={handleResizeStart}
                role="separator"
                aria-label="Resize sidebar"
                aria-orientation="vertical"
              >
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-border group-hover:bg-primary" />
              </div>
            )}

            {/* Collapse/Expand button - on the resize border */}
            {collapsible && (
              <SidebarRHSTrigger
                className="absolute top-1/2 -translate-y-1/2 z-30"
                style={{
                  left: isCollapsed ? "-40px" : "-20px",
                }}
              />
            )}

            <div
              className={cn(
                "flex h-full flex-col w-full overflow-hidden",
                shouldHideContent && "opacity-0 pointer-events-none",
                !shouldHideContent &&
                  "opacity-100 transition-opacity duration-200",
              )}
            >
              {/* Header */}
              <div className="flex h-12 items-center justify-between px-4 shrink-0">
                {header ||
                  (title && <h2 className="text-lg font-semibold">{title}</h2>)}
                <DockButton show={dockable} />
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto p-4">{children}</div>
            </div>
          </div>
        </div>
      );
    }

    // New pattern: just render the sidebar itself (no container)
    return (
      <div
        ref={containerRef}
        className={cn(
          "relative bg-body-bg border-l border-border shrink-0 overflow-x-visible",
          isCollapsed && "border-l-0",
          !isResizing && "transition-all ease-in-out",
          !isResizing && transitionDuration === "500" && "duration-500", // Slower when collapsing
          !isResizing && transitionDuration === "200" && "duration-200", // Faster when expanding
          className,
        )}
        style={{
          width: isCollapsed ? "0" : currentWidth,
          height: height,
        }}
      >
        {/* Resize handle */}
        {!shouldHideContent && (
          <div
            className="absolute -left-1 top-0 bottom-0 w-2 cursor-ew-resize z-20 hover:bg-primary/20 transition-colors group"
            onMouseDown={handleResizeStart}
            role="separator"
            aria-label="Resize sidebar"
            aria-orientation="vertical"
          >
            <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-0.5 bg-border group-hover:bg-primary" />
          </div>
        )}

        {/* Collapse/Expand button - on the resize border */}
        {collapsible && (
          <SidebarRHSTrigger
            className="absolute top-1/2 -translate-y-1/2 z-30"
            style={{
              left: isCollapsed ? "-40px" : "-20px",
            }}
          />
        )}

        <div
          className={cn(
            "flex h-full flex-col w-full overflow-hidden",
            shouldHideContent && "opacity-0 pointer-events-none",
            !shouldHideContent && "opacity-100 transition-opacity duration-200",
          )}
        >
          {/* Header */}
          <div className="flex h-12 items-center justify-between px-4 shrink-0">
            {header ||
              (title && <h2 className="text-lg font-semibold">{title}</h2>)}
            <DockButton show={dockable} />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    );
  }

  // Draggable sidebar component for undocked state
  function DraggableSidebarContent() {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useDraggable({
        id: "sidebar-rhs-undocked",
        disabled: false,
      });

    // Store ref for drag start position calculation
    const combinedRef = useCallback(
      (node: HTMLDivElement | null) => {
        draggableElementRef.current = node;
        setNodeRef(node);
      },
      [setNodeRef],
    );

    // Use transform during drag for smooth, glitch-free movement
    // Only update position state on dragEnd to avoid re-render glitches
    const hasPosition = position.x !== 0 || position.y !== 0;

    const style: React.CSSProperties = {
      width: currentWidth,
      height: "calc(100vh - 2rem)",
      maxHeight: "calc(100vh - 2rem)",
      left: hasPosition ? position.x : undefined,
      top: hasPosition ? position.y : undefined,
      right: !hasPosition ? "1rem" : undefined,
      bottom: !hasPosition ? "1rem" : undefined,
      // Transform is applied by @dnd-kit during drag for smooth movement
      // This is GPU-accelerated and doesn't cause re-renders
      transform: transform ? CSS.Translate.toString(transform) : undefined,
    };

    return (
      <div
        ref={combinedRef}
        className={cn(
          "fixed z-50 bg-body-bg border border-border rounded-lg shadow-lg overflow-hidden",
          // Disable transitions during drag and resize for instant movement
          !isResizing && !isDragging && "transition-all ease-in-out",
          !isResizing &&
            !isDragging &&
            transitionDuration === "500" &&
            "duration-500",
          !isResizing &&
            !isDragging &&
            transitionDuration === "200" &&
            "duration-200",
          isDragging && "cursor-grabbing opacity-90",
          className,
        )}
        style={style}
      >
        <div className="flex h-full flex-col">
          {/* Header - draggable area */}
          <div
            className="flex h-12 items-center justify-between px-4 shrink-0 cursor-grab active:cursor-grabbing"
            {...listeners}
            {...attributes}
          >
            {header ||
              (title && (
                <h2 className="text-lg font-semibold select-none">{title}</h2>
              ))}
            <UndockButton show={dockable} />
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-4">{children}</div>
        </div>
      </div>
    );
  }

  // When undocked, render as floating draggable sidebar
  if (!isDocked) {
    return typeof window !== "undefined"
      ? createPortal(
          <DndContext
            onDragStart={handleDragStartUndocked}
            onDragEnd={handleDragEndUndocked}
          >
            <DraggableSidebarContent />
          </DndContext>,
          document.body,
        )
      : null;
  }

  return null;
}

// Default export for backward compatibility
export default function SidebarRHSWrapper(
  props: SidebarRHSProps & {
    defaultCollapsed?: boolean;
    defaultDocked?: boolean;
    onCollapsedChange?: (collapsed: boolean) => void;
    onDockedChange?: (docked: boolean) => void;
  },
) {
  const {
    defaultCollapsed,
    defaultDocked,
    onCollapsedChange,
    onDockedChange,
    ...sidebarProps
  } = props;

  return (
    <SidebarRHSProvider
      defaultCollapsed={defaultCollapsed}
      defaultDocked={defaultDocked}
      onCollapsedChange={onCollapsedChange}
      onDockedChange={onDockedChange}
    >
      <SidebarRHS {...sidebarProps} />
    </SidebarRHSProvider>
  );
}
