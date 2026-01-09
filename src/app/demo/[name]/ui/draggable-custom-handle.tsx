"use client"; // comment this line if you are not using next.js

import * as React from "react";
import { DndContext, type DragEndEvent, SortableContainer, arrayMove, type UniqueIdentifier } from "@/components/ui/dnd-context";
import { SortableItem, SortableHandle } from "@/components/ui/sortable";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { GripVertical, Trash2, ChevronDown } from "lucide-react";
import { mdiTextShort } from "@mdi/js";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
}

// Sitecore-style field item with custom drag handle
function SortableFieldItem({ 
  item, 
  onDelete 
}: { 
  item: FieldItem;
  onDelete?: (id: string) => void;
}) {
  return (
    <SortableItem id={item.id} withHandle>
      <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group">
        {/* Sortable Grip Handle - only this part is draggable */}
        <SortableHandle
          className={cn(
            "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
            "text-muted-foreground hover:text-foreground hover:bg-muted",
            "cursor-grab active:cursor-grabbing",
            "transition-all duration-200"
          )}
        >
          <GripVertical className="w-4 h-4" />
        </SortableHandle>

        {/* Field Icon with purple background */}
        <div className="flex-shrink-0 p-1.5 rounded bg-primary/10">
          <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
        </div>

        {/* Label */}
        <div className="flex-1 min-w-0 text-sm font-medium text-foreground cursor-text hover:text-primary truncate">
          {item.label}
        </div>

        {/* Name */}
        <div className="flex-shrink-0 text-sm text-muted-foreground cursor-text hover:text-foreground truncate max-w-[150px]">
          {item.name}
        </div>

        {/* Separator */}
        <div className="flex-shrink-0 text-sm text-muted-foreground/50">|</div>

        {/* Type Label */}
        <div className="flex-shrink-0 text-sm text-muted-foreground">
          {item.type}
        </div>

        {/* Delete Button - using standard Button component */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-danger-fg hover:bg-danger-bg"
          onClick={() => onDelete?.(item.id)}
        >
          <Trash2 className="w-2 h-2" />
        </Button>

        {/* Expand/Collapse Icon */}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </SortableItem>
  );
}

export default function CustomHandleDemo() {
  const [items, setItems] = React.useState<FieldItem[]>([
    { id: "field-A", label: "Click to edit field label", name: "Click to edit field name", type: "Text" },
    { id: "field-B", label: "Click to edit field label", name: "Click to edit field name", type: "Text" },
    { id: "field-C", label: "Click to edit field label", name: "Click to edit field name", type: "Text" },
  ]);
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

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

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const activeItem = activeId ? items.find((item) => item.id === activeId) : null;

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
            Drag fields using the grip icon handle only. Other parts of the item (labels, dropdowns, buttons) are interactive and won&apos;t trigger dragging.
          </p>
        </div>

        <div className="max-w-3xl">
          {/* Sitecore-style field list container */}
          <div className="rounded-lg border-2 border-dashed border-primary/40 p-4 bg-primary/5">
            <SortableContainer items={items.map((item) => item.id)} strategy="vertical">
              <div className="space-y-2">
                {items.map((item) => (
                  <SortableFieldItem
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </SortableContainer>
            
            {items.length === 0 && (
              <div className="text-center py-8 text-sm text-muted-foreground">
                No fields. Add some fields to get started.
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3 space-y-1">
          <p><strong>Tip:</strong> Only the grip handle (⋮⋮) on the left side initiates dragging.</p>
          <p>You can click on labels, names, and action buttons without triggering a drag.</p>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeItem ? (
          <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-primary rounded-lg shadow-lg">
            <div className="flex-shrink-0 w-6 h-6 rounded flex items-center justify-center text-foreground cursor-grabbing bg-muted">
              <GripVertical className="w-4 h-4" />
            </div>
            <div className="flex-shrink-0 p-1.5 rounded bg-primary/10">
              <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
              {activeItem.label}
            </div>
            <div className="flex-shrink-0 text-sm text-muted-foreground truncate max-w-[150px]">
              {activeItem.name}
            </div>
            <div className="flex-shrink-0 text-sm text-muted-foreground/50">|</div>
            <div className="flex-shrink-0 text-sm text-muted-foreground">
              {activeItem.type}
            </div>
            <div className="flex-shrink-0 p-1.5 text-muted-foreground">
              <Trash2 className="w-3 h-3" />
            </div>
            <div className="flex-shrink-0 p-1.5 text-muted-foreground">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
