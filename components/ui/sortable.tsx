"use client";

import { cn } from "@/lib/utils";
import type { UniqueIdentifier } from "@dnd-kit/core";
import {
  type AnimateLayoutChanges,
  defaultAnimateLayoutChanges,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import * as React from "react";
import { useDndMounted } from "./dnd-context";

// Context for passing sortable props to handles
interface SortableContextValue {
  listeners: ReturnType<typeof useSortable>["listeners"];
  attributes: ReturnType<typeof useSortable>["attributes"];
  isDragging: boolean;
  isMounted: boolean;
}

// Default context value for server-side rendering
const defaultContextValue: SortableContextValue = {
  listeners: undefined,
  attributes: {} as ReturnType<typeof useSortable>["attributes"],
  isDragging: false,
  isMounted: false,
};

const SortableItemContext =
  React.createContext<SortableContextValue>(defaultContextValue);

export interface SortableItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "id"> {
  /** Unique identifier for this sortable item */
  id: UniqueIdentifier;
  /** Whether sorting is disabled for this item */
  disabled?: boolean;
  /** Optional data to pass along with drag events */
  data?: Record<string, unknown>;
  /** Element type to render (default: div) */
  as?: React.ElementType;
  /** Whether to use a handle (if true, spreading listeners won't make the whole element draggable) */
  withHandle?: boolean;
  children: React.ReactNode;
}

const animateLayoutChanges: AnimateLayoutChanges = (args) =>
  defaultAnimateLayoutChanges({ ...args, wasDragging: true });

function SortableItemInner({
  id,
  disabled = false,
  data,
  children,
  className,
  as: Component = "div",
  withHandle = false,
  ...props
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    isOver,
  } = useSortable({
    id,
    disabled,
    data,
    animateLayoutChanges,
  });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // If using a handle, don't spread listeners on the container
  const containerProps = withHandle ? {} : listeners;

  // Context value for child handles
  const contextValue = React.useMemo(
    () => ({ listeners, attributes, isDragging, isMounted: true }),
    [listeners, attributes, isDragging],
  );

  return (
    <SortableItemContext.Provider value={contextValue}>
      <Component
        ref={setNodeRef}
        style={style}
        data-sortable-id={id}
        data-dragging={isDragging}
        data-over={isOver}
        className={cn(
          "touch-none",
          isDragging && "opacity-50 z-50",
          !disabled && !withHandle && "cursor-grab",
          isDragging && "cursor-grabbing",
          isOver && "ring-2 ring-primary",
          disabled && "cursor-not-allowed opacity-60",
          className,
        )}
        {...containerProps}
        {...attributes}
        {...props}
      >
        {children}
      </Component>
    </SortableItemContext.Provider>
  );
}

export function SortableItem({
  children,
  className,
  as: Component = "div",
  id,
  disabled,
  data,
  withHandle,
  ...props
}: SortableItemProps) {
  const isMounted = useDndMounted();

  // Render static version on server with default context
  if (!isMounted) {
    return (
      <SortableItemContext.Provider value={defaultContextValue}>
        <Component className={className} {...props}>
          {children}
        </Component>
      </SortableItemContext.Provider>
    );
  }

  return (
    <SortableItemInner
      className={className}
      as={Component}
      id={id}
      disabled={disabled}
      data={data}
      withHandle={withHandle}
      {...props}
    >
      {children}
    </SortableItemInner>
  );
}

/**
 * Hook to get sortable listeners and attributes for a custom drag handle.
 * Must be used within a SortableItem with withHandle={true}.
 *
 * Example:
 * ```tsx
 * function MySortableCard({ id, content }) {
 *   return (
 *     <SortableItem id={id} withHandle>
 *       <Card>
 *         <SortableHandle>
 *           <GripVertical />
 *         </SortableHandle>
 *         <span>{content}</span>
 *       </Card>
 *     </SortableItem>
 *   );
 * }
 * ```
 */
export function useSortableItemContext() {
  return React.useContext(SortableItemContext);
}

export interface SortableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

/**
 * A component that serves as the drag handle within a SortableItem.
 * Must be used within a SortableItem with withHandle={true}.
 */
export function SortableHandle({
  children,
  className,
  as: Component = "div",
  ...props
}: SortableHandleProps) {
  const { listeners, attributes, isDragging, isMounted } =
    useSortableItemContext();

  // Render static version when not mounted
  if (!isMounted) {
    return (
      <Component className={cn("cursor-grab touch-none", className)} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <Component
      className={cn(
        "cursor-grab touch-none",
        isDragging && "cursor-grabbing",
        className,
      )}
      {...listeners}
      {...attributes}
      {...props}
    >
      {children}
    </Component>
  );
}

// Re-export the hook and utilities for custom implementations
export { useSortable } from "@dnd-kit/sortable";
export { CSS } from "@dnd-kit/utilities";
