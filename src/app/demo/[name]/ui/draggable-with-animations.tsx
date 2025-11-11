"use client";

import * as React from "react";
import { Sortable as DndSortable } from "@dnd-kit/dom/sortable";
import { DragDropProvider, useDragDropContext } from "@/components/ui/drag-drop-context";
import { Card, CardContent } from "@/components/ui/card";
import { createSortableTransition } from "@/lib/drag-drop-utils";
import { cn } from "@/lib/utils";

function WithAnimationsContent() {
  const { manager } = useDragDropContext();
  const [items, setItems] = React.useState([
    { id: 1, title: "Smooth Transitions" },
    { id: 2, title: "Easing Functions" },
    { id: 3, title: "Performance" },
  ]);

  const cardColors = [
    "bg-info-bg border-border",
    "bg-success-bg border-border",
    "bg-warning-bg border-border",
  ];

  const transition = {
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    idle: false,
  };

  const itemRefs = React.useRef<Map<number, HTMLElement>>(new Map());
  const sortableRefs = React.useRef<Map<number, DndSortable>>(new Map());
  const [dragStates, setDragStates] = React.useState<Map<number, { isDragging: boolean; isDropTarget: boolean }>>(new Map());

  // Initialize drag states
  React.useEffect(() => {
    const states = new Map<number, { isDragging: boolean; isDropTarget: boolean }>();
    items.forEach((item) => {
      states.set(item.id, { isDragging: false, isDropTarget: false });
    });
    setDragStates(states);
  }, [items]);

  // Create and manage DndSortable instances
  React.useEffect(() => {
    const sortables = sortableRefs.current;
    const elements = itemRefs.current;

    // Create sortable instances for all items
    items.forEach((item, index) => {
      const element = elements.get(item.id);
      if (!element) return;

      // Skip if sortable already exists
      if (sortables.has(item.id)) {
        const sortable = sortables.get(item.id)!;
        sortable.index = index;
        return;
      }

      // Create new sortable instance with transition
      const sortable = new DndSortable(
        {
          id: item.id,
          index,
          element,
          transition: createSortableTransition(transition),
        },
        manager
      );

      sortables.set(item.id, sortable);
    });

    // Remove sortables for items that no longer exist
    const currentIds = new Set(items.map((item) => item.id));
    for (const [id, sortable] of sortables.entries()) {
      if (!currentIds.has(id)) {
        sortable.destroy();
        sortables.delete(id);
      }
    }

    // Event handlers for drag state
    const handleDragStart = () => {
      setDragStates((prev) => {
        const next = new Map(prev);
        let changed = false;
        for (const [id, sortable] of sortables.entries()) {
          const state = next.get(id)!;
          const isDragging = sortable.isDragging;
          if (state.isDragging !== isDragging) {
            next.set(id, { ...state, isDragging });
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    };

    const handleDragMove = () => {
      setDragStates((prev) => {
        const next = new Map(prev);
        let changed = false;
        for (const [id, sortable] of sortables.entries()) {
          const state = next.get(id)!;
          const isDragging = sortable.isDragging;
          const isDropTarget = sortable.isDropTarget;
          if (state.isDragging !== isDragging || state.isDropTarget !== isDropTarget) {
            next.set(id, { isDragging, isDropTarget });
            changed = true;
          }
        }
        return changed ? next : prev;
      });
    };

    const handleDragEnd = (
      event: Parameters<
        NonNullable<Parameters<typeof manager.monitor.addEventListener<"dragend">>[1]>
      >[0]
    ) => {
      // Reset drag states
      setDragStates((prev) => {
        const next = new Map(prev);
        let changed = false;
        for (const [id] of next.entries()) {
          const state = next.get(id)!;
          if (state.isDragging || state.isDropTarget) {
            next.set(id, { isDragging: false, isDropTarget: false });
            changed = true;
          }
        }
        return changed ? next : prev;
      });

      // Handle reordering
      if (event.canceled) return;
      if (!event.operation.target) return;
      if (!event.operation.source) return;

      const sourceId = event.operation.source.id as number;
      const targetId = event.operation.target.id as number;

      // Find indices
      const sourceIndex = items.findIndex((item) => item.id === sourceId);
      const targetIndex = items.findIndex((item) => item.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return;
      if (sourceIndex === targetIndex) return;

      // Reorder items
      const newItems = [...items];
      const [movedItem] = newItems.splice(sourceIndex, 1);
      newItems.splice(targetIndex, 0, movedItem);

      setItems(newItems);
    };

    manager.monitor.addEventListener("dragstart", handleDragStart);
    manager.monitor.addEventListener("dragmove", handleDragMove);
    manager.monitor.addEventListener("dragend", handleDragEnd);

    return () => {
      manager.monitor.removeEventListener("dragstart", handleDragStart);
      manager.monitor.removeEventListener("dragmove", handleDragMove);
      manager.monitor.removeEventListener("dragend", handleDragEnd);

      // Cleanup all sortable instances
      for (const sortable of sortables.values()) {
        sortable.destroy();
      }
      sortables.clear();
    };
  }, [manager, items, transition]);

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const state = dragStates.get(item.id) || { isDragging: false, isDropTarget: false };
        const elementRef = (el: HTMLElement | null) => {
          if (el) {
            itemRefs.current.set(item.id, el);
          } else {
            itemRefs.current.delete(item.id);
          }
        };

        return (
          <div
            key={item.id}
            ref={elementRef}
            data-sortable-id={item.id}
            data-sortable-index={index}
            data-dragging={state.isDragging}
            data-drop-target={state.isDropTarget}
            className={cn(
              "transition-all duration-300",
              state.isDragging && "opacity-50 cursor-grabbing",
              !state.isDragging && "cursor-grab",
              state.isDropTarget && "ring-2 ring-primary"
            )}
          >
            <Card
              className={`${cardColors[index]} group hover:shadow-sm transition-all duration-300 hover:scale-[1.01]`}
            >
              <CardContent className="p-2.5">
                <div className="flex items-center gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <p className="font-medium text-xs">{item.title}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}

export function WithAnimationsDemo() {
  return (
    <DragDropProvider>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">With Custom Animations</h3>
        </div>

        <div className="max-w-2xl">
          <WithAnimationsContent />
        </div>
      </div>
    </DragDropProvider>
  );
}

