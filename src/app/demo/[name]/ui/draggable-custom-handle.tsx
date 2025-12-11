"use client";

import * as React from "react";
import { DndContext, DragEndEvent, SortableContainer, arrayMove, UniqueIdentifier } from "@/components/ui/dnd-context";
import { SortableItem, SortableHandle } from "@/components/ui/sortable";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface Item {
  id: string;
  name: string;
}

function SortableCard({ item, cardColor }: { item: Item; cardColor: string }) {
  return (
    <SortableItem id={item.id} withHandle>
      <Card className={cn(cardColor, "group hover:shadow-sm transition-all duration-200")}>
        <CardContent className="p-2.5">
          <div className="flex items-center gap-2">
            <SortableHandle
              className={cn(
                "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
                "bg-card hover:bg-muted",
                "text-muted-foreground hover:text-foreground",
                "transition-all duration-200"
              )}
            >
              <GripVertical className="h-3.5 w-3.5" />
            </SortableHandle>
            <p className="font-medium text-xs">{item.name}</p>
          </div>
        </CardContent>
      </Card>
    </SortableItem>
  );
}

export function CustomHandleDemo() {
  const [items, setItems] = React.useState<Item[]>([
    { id: "A", name: "Project Alpha" },
    { id: "B", name: "Project Beta" },
    { id: "C", name: "Project Gamma" },
  ]);
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const cardColors = [
    "bg-info-bg border-border",
    "bg-success-bg border-border",
    "bg-warning-bg border-border",
  ];

  const handleDragStart = ({ active }: { active: { id: UniqueIdentifier } }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((currentItems) => {
        const oldIndex = currentItems.findIndex((item) => item.id === active.id);
        const newIndex = currentItems.findIndex((item) => item.id === over.id);
        return arrayMove(currentItems, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;
  const activeIndex = activeItem ? items.findIndex((item) => item.id === activeId) : -1;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold">Custom Drag Handle</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Drag items using the grip icon handle only.
          </p>
        </div>

        <div className="max-w-2xl">
          <SortableContainer items={items.map((item) => item.id)} strategy="vertical">
            <div className="space-y-2">
              {items.map((item, index) => (
                <SortableCard
                  key={item.id}
                  item={item}
                  cardColor={cardColors[index % cardColors.length]}
                />
              ))}
            </div>
          </SortableContainer>
        </div>
      </div>

      {/* Drag Overlay for smooth animations */}
      <DragOverlay>
        {activeItem && activeIndex >= 0 ? (
          <Card className={cn(cardColors[activeIndex % cardColors.length], "shadow-lg")}>
            <CardContent className="p-2.5">
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
                    "cursor-grabbing",
                    "bg-card",
                    "text-foreground"
                  )}
                >
                  <GripVertical className="h-3.5 w-3.5" />
                </div>
                <p className="font-medium text-xs">{activeItem.name}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
