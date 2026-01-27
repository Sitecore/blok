"use client";

import {
  type CollisionDetection,
  DndContext as DndKitContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  type UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  type SortingStrategy,
  horizontalListSortingStrategy,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import * as React from "react";

// Context to track if DndContext is mounted (client-side only)
const DndMountedContext = React.createContext(false);

export function useDndMounted() {
  return React.useContext(DndMountedContext);
}

export interface DndContextProps {
  children: React.ReactNode;
  onDragStart?: (event: DragStartEvent) => void;
  onDragMove?: (event: DragMoveEvent) => void;
  onDragOver?: (event: DragOverEvent) => void;
  onDragEnd?: (event: DragEndEvent) => void;
  onDragCancel?: () => void;
  collisionDetection?: CollisionDetection;
}

export function DndContext({
  children,
  onDragStart,
  onDragMove,
  onDragOver,
  onDragEnd,
  onDragCancel,
  collisionDetection = closestCenter,
}: DndContextProps) {
  // Prevent hydration mismatch by only rendering DndKit on client
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Render children with mounted context but without DndKit on server
  if (!isMounted) {
    return (
      <DndMountedContext.Provider value={false}>
        {children}
      </DndMountedContext.Provider>
    );
  }

  return (
    <DndMountedContext.Provider value={true}>
      <DndKitContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={onDragStart}
        onDragMove={onDragMove}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        {children}
      </DndKitContext>
    </DndMountedContext.Provider>
  );
}

export interface SortableContainerProps {
  children: React.ReactNode;
  items: UniqueIdentifier[];
  strategy?: "vertical" | "horizontal" | "grid";
}

export function SortableContainer({
  children,
  items,
  strategy = "vertical",
}: SortableContainerProps) {
  const isMounted = useDndMounted();

  const sortingStrategy: SortingStrategy =
    strategy === "horizontal"
      ? horizontalListSortingStrategy
      : strategy === "grid"
        ? rectSortingStrategy
        : verticalListSortingStrategy;

  // Render children without SortableContext on server
  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <SortableContext items={items} strategy={sortingStrategy}>
      {children}
    </SortableContext>
  );
}

// Re-export utilities for convenience
export { arrayMove } from "@dnd-kit/sortable";
export {
  closestCenter,
  closestCorners,
  rectIntersection,
  pointerWithin,
} from "@dnd-kit/core";
export type {
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
  DragMoveEvent,
  UniqueIdentifier,
};
