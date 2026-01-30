"use client";

import { cn } from "@/lib/utils";
import { type UniqueIdentifier, useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import type * as React from "react";
import { useDndMounted } from "./dnd-context";

export interface DraggableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "id"> {
  /** Unique identifier for this draggable item */
  id: UniqueIdentifier;
  /** Whether dragging is disabled */
  disabled?: boolean;
  /** Optional data to pass along with drag events */
  data?: Record<string, unknown>;
  /** Element type to render (default: div) */
  as?: React.ElementType;
  children: React.ReactNode;
}

function DraggableInner({
  id,
  disabled = false,
  data,
  children,
  className,
  as: Component = "div",
  ...props
}: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      disabled,
      data,
    });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Component
      ref={setNodeRef}
      style={style}
      data-draggable-id={id}
      data-dragging={isDragging}
      className={cn(
        isDragging && "opacity-50 z-50",
        !disabled && "cursor-grab",
        isDragging && "cursor-grabbing",
        disabled && "cursor-not-allowed opacity-60",
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

export function Draggable({
  children,
  className,
  as: Component = "div",
  id,
  disabled,
  data,
  ...props
}: DraggableProps) {
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
    <DraggableInner
      className={className}
      as={Component}
      id={id}
      disabled={disabled}
      data={data}
      {...props}
    >
      {children}
    </DraggableInner>
  );
}

export interface DraggableHandleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

/**
 * Use this component to create a drag handle within a Draggable.
 * Pass the listeners and attributes from useDraggable to this component.
 */
export function DraggableHandle({
  children,
  className,
  ...props
}: DraggableHandleProps) {
  return (
    <div
      className={cn("cursor-grab active:cursor-grabbing", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Re-export the hook for custom implementations
export { useDraggable } from "@dnd-kit/core";
