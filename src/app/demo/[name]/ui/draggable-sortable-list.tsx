"use client";

import * as React from "react";
import { DndContext, DragEndEvent, SortableContainer, arrayMove, UniqueIdentifier } from "@/components/ui/dnd-context";
import { SortableItem } from "@/components/ui/sortable";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Item {
  id: number;
  name: string;
}

export function SortableListDemo() {
  const [items, setItems] = React.useState<Item[]>([
    { id: 1, name: "Design System" },
    { id: 2, name: "API Integration" },
    { id: 3, name: "User Testing" },
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
          <h3 className="text-2xl font-semibold">Sortable List</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Drag items to reorder them in the list.
          </p>
        </div>

        <div className="max-w-2xl">
          <SortableContainer items={items.map((item) => item.id)} strategy="vertical">
            <div className="space-y-2">
              {items.map((item, index) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                  className="transition-transform duration-200"
                >
                  <Card className={cn(cardColors[index % cardColors.length], "hover:shadow-sm transition-all duration-200")}>
                    <CardContent className="p-2.5">
                      <div className="flex items-center gap-2">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-semibold text-foreground">
                          {index + 1}
                        </span>
                        <p className="font-medium text-xs">{item.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </SortableItem>
              ))}
            </div>
          </SortableContainer>
        </div>
      </div>

      {/* Drag Overlay for smooth animations */}
      <DragOverlay>
        {activeItem && activeIndex >= 0 ? (
          <Card className={cn(cardColors[activeIndex % cardColors.length], "shadow-sm")}>
            <CardContent className="p-2.5">
              <div className="flex items-center gap-2">
                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-card flex items-center justify-center text-[10px] font-semibold text-foreground">
                  {activeIndex + 1}
                </span>
                <p className="font-medium text-xs">{activeItem.name}</p>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
