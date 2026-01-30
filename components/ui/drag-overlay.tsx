"use client";
import { cn } from "@/lib/utils";
import {
  DragOverlay as DndKitDragOverlay,
  type DragOverlayProps as DndKitDragOverlayProps,
} from "@dnd-kit/core";
import { useDndMounted } from "./dnd-context";

export interface DragOverlayProps extends DndKitDragOverlayProps {
  /** Additional class names for the overlay wrapper */
  className?: string;
}

/**
 * DragOverlay renders a draggable element that follows the cursor.
 * It's removed from the normal document flow and positioned relative to the viewport.
 *
 * Use this when:
 * - Items need to move between containers
 * - You want a custom drag preview
 * - You need the dragged item to appear above all other elements
 *
 * Example:
 * ```tsx
 * const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
 *
 * <DndContext onDragStart={({active}) => setActiveId(active.id)} onDragEnd={() => setActiveId(null)}>
 *   <Droppable id="container">
 *     {items.map(item => <Draggable key={item.id} id={item.id}>{item.content}</Draggable>)}
 *   </Droppable>
 *   <DragOverlay>
 *     {activeId ? <div>{items.find(i => i.id === activeId)?.content}</div> : null}
 *   </DragOverlay>
 * </DndContext>
 * ```
 */
export function DragOverlay({
  children,
  className,
  dropAnimation = {
    duration: 250,
    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
  },
  ...props
}: DragOverlayProps) {
  const isMounted = useDndMounted();

  // Don't render on server
  if (!isMounted) {
    return null;
  }

  return (
    <DndKitDragOverlay dropAnimation={dropAnimation} {...props}>
      {children ? (
        <div className={cn("cursor-grabbing", className)}>{children}</div>
      ) : null}
    </DndKitDragOverlay>
  );
}

// Re-export for convenience
export { DragOverlay as DndKitDragOverlay } from "@dnd-kit/core";
