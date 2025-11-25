"use client";

import * as React from "react";
import { Sortable as DndSortable } from "@dnd-kit/dom/sortable";
import { useDragDropContext } from "./drag-drop-context";
import { getElementFromRef, createSortableTransition, type SortableTransition } from "@/lib/drag-drop-utils";
import { cn } from "@/lib/utils";

export interface SortableProps extends Omit<React.HTMLAttributes<HTMLElement>, "id"> {
  id: string | number;
  index: number;
  group?: string | number;
  handle?: React.RefObject<HTMLElement> | HTMLElement;
  transition?: SortableTransition | null;
  disabled?: boolean;
  type?: string | number | Symbol;
  accepts?: string | number | Symbol | ((type: string | number | Symbol) => boolean);
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Sortable({
  id,
  index,
  group,
  handle,
  transition,
  disabled = false,
  type,
  accepts,
  children,
  className,
  as: Component = "div",
  ...props
}: SortableProps) {
  const { manager } = useDragDropContext();
  const elementRef = React.useRef<HTMLElement>(null);
  const sortableRef = React.useRef<DndSortable | null>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isDropTarget, setIsDropTarget] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) return;

    const handleElement = getElementFromRef(handle);

    // Adapt accepts prop to DndSortable's accept API
    // DndSortable expects accept to be a function that receives a Draggable object,
    // but our accepts prop can be a function that receives just the type
    let acceptValue: any;
    if (typeof accepts === "function") {
      // If accepts is a function, adapt it to receive a Draggable object
      acceptValue = (source: any) => {
        const sourceType = source?.type;
        return accepts(sourceType);
      };
    } else {
      acceptValue = accepts;
    }

    sortableRef.current = new DndSortable(
      {
        id,
        index,
        element: elementRef.current,
        group,
        handle: handleElement || undefined,
        transition: createSortableTransition(transition),
        disabled,
        type,
        accept: acceptValue as any,
      },
      manager
    );

    const handleDragStart = () => {
      setIsDragging(sortableRef.current?.isDragging ?? false);
    };

    const handleDragMove = () => {
      setIsDragging(sortableRef.current?.isDragging ?? false);
      setIsDropTarget(sortableRef.current?.isDropTarget ?? false);
    };

    manager.monitor.addEventListener("dragstart", handleDragStart);
    manager.monitor.addEventListener("dragmove", handleDragMove);
    manager.monitor.addEventListener("dragend", () => {
      setIsDragging(false);
      setIsDropTarget(false);
    });

    return () => {
      manager.monitor.removeEventListener("dragstart", handleDragStart);
      manager.monitor.removeEventListener("dragmove", handleDragMove);
      sortableRef.current?.destroy();
      sortableRef.current = null;
    };
  }, [id, index, group, disabled, manager, handle, transition, type, accepts]);

  React.useEffect(() => {
    if (sortableRef.current) {
      sortableRef.current.index = index;
      sortableRef.current.disabled = disabled;
    }
  }, [index, disabled]);

  return (
    <Component
      ref={elementRef as any}
      data-sortable-id={id}
      data-sortable-index={index}
      data-dragging={isDragging}
      data-drop-target={isDropTarget}
      className={cn(
        isDragging && "opacity-50 cursor-grabbing",
        !isDragging && "cursor-grab",
        isDropTarget && "ring-2 ring-primary",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

