"use client";

import { cn } from "@/lib/utils";
import { type UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import type * as React from "react";
import { useDndMounted } from "./dnd-context";

export interface DroppableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Unique identifier for this droppable area */
  id: UniqueIdentifier;
  /** Whether dropping is disabled */
  disabled?: boolean;
  /** Optional data to pass along with drop events */
  data?: Record<string, unknown>;
  /** Element type to render (default: div) */
  as?: React.ElementType;
  children: React.ReactNode;
}

function DroppableInner({
  id,
  disabled = false,
  data,
  children,
  className,
  as: Component = "div",
  ...props
}: DroppableProps) {
  const { setNodeRef, isOver, active } = useDroppable({
    id,
    disabled,
    data,
  });

  return (
    <Component
      ref={setNodeRef}
      data-droppable-id={id}
      data-drop-target={isOver}
      data-has-active={!!active}
      className={cn(
        "transition-all duration-200",
        isOver && "ring-2 ring-primary ring-offset-2",
        disabled && "opacity-60",
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Droppable({
  children,
  className,
  as: Component = "div",
  id,
  disabled,
  data,
  ...props
}: DroppableProps) {
  const isMounted = useDndMounted();

  // Render static version on server
  if (!isMounted) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <DroppableInner
      className={className}
      as={Component}
      id={id}
      disabled={disabled}
      data={data}
      {...props}
    >
      {children}
    </DroppableInner>
  );
}

// Re-export the hook for custom implementations
export { useDroppable } from "@dnd-kit/core";
