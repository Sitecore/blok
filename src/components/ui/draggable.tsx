"use client";

import * as React from "react";
import { Draggable as DndDraggable } from "@dnd-kit/dom";
import { useDragDropContext } from "./drag-drop-context";
import { getElementFromRef } from "@/lib/drag-drop-utils";
import { cn } from "@/lib/utils";

export interface DraggableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'onDragStart' | 'onDragEnd'> {
  id: string | number;
  disabled?: boolean;
  handle?: React.RefObject<HTMLElement> | HTMLElement;
  onDragStart?: (event: { id: string | number }) => void;
  onDragEnd?: (event: { id: string | number; canceled: boolean }) => void;
  children: React.ReactNode;
}

export function Draggable({
  id,
  disabled = false,
  handle,
  onDragStart,
  onDragEnd,
  children,
  className,
  ...props
}: DraggableProps) {
  const { manager } = useDragDropContext();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const draggableRef = React.useRef<DndDraggable | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const handleElement = getElementFromRef(handle);

    draggableRef.current = new DndDraggable(
      {
        id,
        element: elementRef.current,
        handle: handleElement || undefined,
        disabled,
      },
      manager
    );

    const handleDragStart = (event: any) => {
      if (event.operation.source?.id === id) {
        setIsDragging(true);
        onDragStart?.({ id });
      }
    };

    const handleDragEnd = (event: any) => {
      if (event.operation.source?.id === id) {
        setIsDragging(false);
        onDragEnd?.({ id, canceled: event.canceled });
      }
    };

    manager.monitor.addEventListener("dragstart", handleDragStart);
    manager.monitor.addEventListener("dragend", handleDragEnd);

    return () => {
      manager.monitor.removeEventListener("dragstart", handleDragStart);
      manager.monitor.removeEventListener("dragend", handleDragEnd);
      draggableRef.current?.destroy();
      draggableRef.current = null;
    };
  }, [id, disabled, manager, onDragStart, onDragEnd, handle]);

  React.useEffect(() => {
    if (draggableRef.current) {
      draggableRef.current.disabled = disabled;
    }
  }, [disabled]);

  return (
    <div
      ref={elementRef}
      data-draggable-id={id}
      data-dragging={isDragging}
      className={cn(
        isDragging && "opacity-50 cursor-grabbing",
        !isDragging && "cursor-grab",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

