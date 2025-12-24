"use client";

import * as React from "react";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  SortableContainer,
  arrayMove,
  type UniqueIdentifier,
  pointerWithin,
  rectIntersection,
} from "@/components/ui/dnd-context";
import type { CollisionDetection } from "@dnd-kit/core";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";
import { SortableItem } from "@/components/ui/sortable";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Card, CardContent } from "@/components/ui/card";
import { Move } from "lucide-react";
import { cn } from "@/lib/utils";

interface CardItem {
  id: string;
  name: string;
}

const initialCards: CardItem[] = [
  { id: "card-1", name: "Design System" },
  { id: "card-2", name: "API Integration" },
  { id: "card-3", name: "User Testing" },
  { id: "card-4", name: "Documentation" },
  { id: "card-5", name: "Performance" },
];

const cardColors = [
  "bg-info-bg border-border",
  "bg-success-bg border-border",
  "bg-warning-bg border-border",
  "bg-purple-50 dark:bg-purple-950/30 border-border",
  "bg-pink-50 dark:bg-pink-950/30 border-border",
];

function getCardColor(id: string) {
  const index = initialCards.findIndex((c) => c.id === id);
  return cardColors[index % cardColors.length];
}

// Custom collision detection that prioritizes items over containers
// This ensures that when dragging over sortable items, they get detected first
const customCollisionDetection: CollisionDetection = (args) => {
  // First, try pointerWithin to find items directly under the cursor
  const pointerCollisions = pointerWithin(args);
  
  if (pointerCollisions.length > 0) {
    // Filter to prioritize sortable items (cards) over containers
    const itemCollisions = pointerCollisions.filter(
      (collision) => 
        collision.id !== "source-drop" && 
        collision.id !== "favorites-drop"
    );
    
    // If we're over a specific item, return that
    if (itemCollisions.length > 0) {
      return itemCollisions;
    }
    
    // Otherwise return container collisions
    return pointerCollisions;
  }
  
  // Fallback to rectIntersection for edge cases
  return rectIntersection(args);
};

function ItemCard({ item, index }: { item: CardItem; index?: number }) {
  return (
    <Card className={cn(getCardColor(item.id), "hover:shadow-sm transition-all duration-200")}>
      <CardContent className="p-2.5">
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-semibold text-foreground">
              {index + 1}
            </span>
          )}
          <p className="font-medium text-xs">{item.name}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function DragDropSortableDemo() {
  // Cards that are available to drag (source pool)
  const [sourceCards, setSourceCards] = React.useState<CardItem[]>(initialCards);
  // Cards in the favorites list (sortable)
  const [favoriteCards, setFavoriteCards] = React.useState<CardItem[]>([]);
  // Currently dragging item
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);
  const [activeItem, setActiveItem] = React.useState<CardItem | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    
    // Find the item being dragged
    const fromSource = sourceCards.find((c) => c.id === active.id);
    const fromFavorites = favoriteCards.find((c) => c.id === active.id);
    setActiveItem(fromSource || fromFavorites || null);
  };

  // Note: We intentionally don't modify state in handleDragOver to avoid infinite re-renders.
  // All item transfers are handled in handleDragEnd.

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const isFromSource = sourceCards.some((c) => c.id === activeId);
    const isFromFavorites = favoriteCards.some((c) => c.id === activeId);
    const isOverInFavorites = favoriteCards.some((c) => c.id === overId);
    const isOverInSource = sourceCards.some((c) => c.id === overId);

    // Handle sorting within favorites
    if (isFromFavorites && isOverInFavorites && activeId !== overId) {
      setFavoriteCards((prev) => {
        const oldIndex = prev.findIndex((c) => c.id === activeId);
        const newIndex = prev.findIndex((c) => c.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    // Handle dropping from source to favorites (either container or item)
    if (isFromSource && (overId === "favorites-drop" || isOverInFavorites)) {
      const cardToMove = sourceCards.find((c) => c.id === activeId);
      if (cardToMove) {
        setSourceCards((prev) => prev.filter((c) => c.id !== activeId));
        if (isOverInFavorites) {
          // Insert at the position of the item we're hovering over
          const overIndex = favoriteCards.findIndex((c) => c.id === overId);
          setFavoriteCards((prev) => {
            const newItems = [...prev];
            newItems.splice(overIndex, 0, cardToMove);
            return newItems;
          });
        } else {
          // Append to the end
          setFavoriteCards((prev) => [...prev, cardToMove]);
        }
      }
      return;
    }

    // Handle dropping from favorites to source (either container or item)
    if (isFromFavorites && (overId === "source-drop" || isOverInSource)) {
      const cardToMove = favoriteCards.find((c) => c.id === activeId);
      if (cardToMove) {
        setFavoriteCards((prev) => prev.filter((c) => c.id !== activeId));
        setSourceCards((prev) => [...prev, cardToMove]);
      }
      return;
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  // Get the index of the active item in favorites for the overlay
  const activeIndexInFavorites = activeItem 
    ? favoriteCards.findIndex((c) => c.id === activeItem.id) 
    : -1;

  return (
    <DndContext
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold">Drag, Drop & Sort</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Drag cards between panels. Reorder items in favorites by dragging.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Source Cards Panel - Now Droppable */}
          <div className="flex-1">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase">
              Source
            </div>
            <Droppable
              id="source-drop"
              className={cn(
                "p-4 rounded-xl border-2 border-dashed min-h-[200px] transition-all duration-200",
                "bg-gradient-to-br from-background to-muted/30 border-muted",
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5"
              )}
            >
              {sourceCards.length > 0 ? (
                <div className="space-y-2">
                  {sourceCards.map((card) => (
                    <Draggable key={card.id} id={card.id}>
                      <ItemCard item={card} />
                    </Draggable>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-center">
                  <p className="text-sm font-medium text-muted-foreground">No items</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Drag items back here
                  </p>
                </div>
              )}
            </Droppable>
          </div>

          {/* Drop Zone Panel (Droppable + Sortable) */}
          <div className="flex-1">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase">
              Drop Zone
            </div>
            <Droppable
              id="favorites-drop"
              className={cn(
                "p-4 rounded-xl border-2 border-dashed min-h-[200px] transition-all duration-200",
                "bg-gradient-to-br from-muted/20 to-muted/10",
                "hover:from-muted/30 hover:to-muted/20",
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5 data-[drop-target=true]:shadow-lg data-[drop-target=true]:shadow-primary/10"
              )}
            >
              {favoriteCards.length > 0 ? (
                <SortableContainer items={favoriteCards.map((c) => c.id)} strategy="vertical">
                  <div className="space-y-2">
                    {favoriteCards.map((card, index) => (
                      <SortableItem key={card.id} id={card.id}>
                        <ItemCard item={card} index={index} />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[150px] text-center space-y-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Move className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">Drop Zone</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drop items here and reorder them
                    </p>
                  </div>
                </div>
              )}
            </Droppable>
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 space-y-1">
          <p><strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-0.5 ml-2">
            <li>Drag items from Source to Drop Zone</li>
            <li>Drag items back from Drop Zone to Source</li>
            <li>Reorder items in Drop Zone by dragging them</li>
          </ul>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeItem ? (
          <Card className={cn(getCardColor(activeItem.id), "shadow-sm")}>
            <CardContent className="p-2.5">
              <div className="flex items-center gap-2">
                {activeIndexInFavorites >= 0 && (
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-semibold text-foreground">
                    {activeIndexInFavorites + 1}
                  </span>
                )}
                <p className="font-medium text-xs">{activeItem.name}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
