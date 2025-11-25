"use client";

import * as React from "react";
import { Droppable as DndDroppable } from "@dnd-kit/dom";
import { useDragDropContext } from "./drag-drop-context";
import { cn } from "@/lib/utils";

export interface DroppableProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'id' | 'onDrop'> {
  id: string | number;
  accepts?: string | number | Symbol | ((type: string | number | Symbol) => boolean);
  disabled?: boolean;
  onDrop?: (event: { 
    source: { id: string | number; element: HTMLElement };
    target: { id: string | number; element: HTMLElement };
  }) => void;
  children: React.ReactNode;
}

export function Droppable({
  id,
  accepts,
  disabled = false,
  onDrop,
  children,
  className,
  ...props
}: DroppableProps) {
  const { manager } = useDragDropContext();
  const elementRef = React.useRef<HTMLDivElement>(null);
  const droppableRef = React.useRef<DndDroppable | null>(null);
  const [isDropTarget, setIsDropTarget] = React.useState(false);

  React.useEffect(() => {
    if (!elementRef.current) return;

    // Match the documentation pattern exactly
    // The effects function returns a cleanup that will be called later by the library
    // At that point, droppableRef.current will be set
    const droppableConfig: any = {
      id,
      element: elementRef.current,
      disabled,
      effects() {
        return [
          () => {
            // Match documentation pattern: access isDropTarget directly from droppable instance
            // This cleanup function is called later by the library, so droppableRef.current will be set
            setIsDropTarget(droppableRef.current?.isDropTarget ?? false);
          },
        ];
      },
    };

    // Only set accept if accepts prop is explicitly provided
    // Following documentation: when accept is not set, it defaults to accepting all
    if (accepts !== undefined) {
      if (typeof accepts === "function") {
        // If accepts is a function, adapt it to receive a Draggable object
        droppableConfig.accept = (source: any) => {
          const sourceType = source?.type;
          return accepts(sourceType);
        };
      } else {
        // If accepts is a value, check if source type matches
        droppableConfig.accept = (source: any) => {
          return source?.type === accepts;
        };
      }
    }
    // When accepts is undefined, we don't set accept prop at all (library default behavior)

    // Create droppable instance - matching documentation pattern
    droppableRef.current = new DndDroppable(droppableConfig, manager);

    const handleDragMove = () => {
      setIsDropTarget(droppableRef.current?.isDropTarget ?? false);
    };

    const handleDragEnd = (
      event: Parameters<
        NonNullable<
          Parameters<typeof manager.monitor.addEventListener<"dragend">>[1]
        >
      >[0]
    ) => {
      setIsDropTarget(false);
      
      // Skip if drag operation was canceled (e.g. if escape key was pressed)
      if (event.canceled) return;
      
      const { operation } = event;
      const { source, target } = operation;
      
      // Move element to drop target if dropped on droppable
      // Following the documentation pattern: if (target && target.id === droppable.id)
      if (target && target.id === id && onDrop && elementRef.current && source && source.element) {
        const sourceElement = source.element;
        if (sourceElement instanceof HTMLElement) {
          onDrop({
            source: {
              id: source.id,
              element: sourceElement,
            },
            target: {
              id,
              element: elementRef.current,
            },
          });
        }
      }
    };

    manager.monitor.addEventListener("dragmove", handleDragMove);
    manager.monitor.addEventListener("dragend", handleDragEnd);

    return () => {
      manager.monitor.removeEventListener("dragmove", handleDragMove);
      manager.monitor.removeEventListener("dragend", handleDragEnd);
      droppableRef.current?.destroy();
      droppableRef.current = null;
    };
  }, [id, accepts, disabled, manager, onDrop]);

  React.useEffect(() => {
    if (droppableRef.current) {
      droppableRef.current.disabled = disabled;
    }
  }, [disabled]);

  return (
    <div
      ref={elementRef}
      data-droppable-id={id}
      data-drop-target={isDropTarget}
      className={cn(
        isDropTarget && "ring-2 ring-primary ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

