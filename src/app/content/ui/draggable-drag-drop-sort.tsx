"use client"; // comment this line if you are not using next.js

import { Button } from "@/components/ui/button";
import {
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  SortableContainer,
  type UniqueIdentifier,
  arrayMove,
  pointerWithin,
  rectIntersection,
} from "@/components/ui/dnd-context";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";
import { SortableItem } from "@/components/ui/sortable";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import type { CollisionDetection } from "@dnd-kit/core";
import { mdiTextShort } from "@mdi/js";
import { ChevronDown, GripVertical, List, Trash2 } from "lucide-react";
import * as React from "react";

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
}

const initialFields: FieldItem[] = [
  {
    id: "field-1",
    label: "Click to edit field label",
    name: "Click to edit field name",
    type: "Text",
  },
  {
    id: "field-2",
    label: "Click to edit field label",
    name: "Click to edit field name",
    type: "Text",
  },
  {
    id: "field-3",
    label: "Click to edit field label",
    name: "Click to edit field name",
    type: "Text",
  },
];

// Custom collision detection for better drop experience
const customCollisionDetection: CollisionDetection = (args) => {
  const pointerCollisions = pointerWithin(args);

  if (pointerCollisions.length > 0) {
    const itemCollisions = pointerCollisions.filter(
      (collision) =>
        collision.id !== "source-drop" && collision.id !== "dropzone-drop",
    );

    if (itemCollisions.length > 0) {
      return itemCollisions;
    }

    return pointerCollisions;
  }

  return rectIntersection(args);
};

// Draggable field card (source) - same style as custom handle
function DraggableFieldCard({ item }: { item: FieldItem }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing group">
      <div className="flex-shrink-0 text-muted-foreground">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex-shrink-0 p-1.5 rounded bg-primary/10">
        <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground cursor-text hover:text-primary truncate">
        {item.label}
      </div>
      <div className="flex-shrink-0 text-sm text-muted-foreground cursor-text hover:text-foreground truncate max-w-[150px]">
        {item.name}
      </div>
      <div className="flex-shrink-0 text-sm text-muted-foreground/50">|</div>
      <div className="flex-shrink-0 text-sm text-muted-foreground">
        {item.type}
      </div>
    </div>
  );
}

// Sortable field card - same style as custom handle
function SortableFieldCard({
  item,
  onRemove,
}: {
  item: FieldItem;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group">
      <div className="flex-shrink-0 text-muted-foreground cursor-grab active:cursor-grabbing">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="flex-shrink-0 p-1.5 rounded bg-primary/10">
        <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground cursor-text hover:text-primary truncate">
        {item.label}
      </div>
      <div className="flex-shrink-0 text-sm text-muted-foreground cursor-text hover:text-foreground truncate max-w-[150px]">
        {item.name}
      </div>

      {/* Separator */}
      <div className="flex-shrink-0 text-sm text-muted-foreground/50">|</div>

      {/* Type Label */}
      <div className="flex-shrink-0 text-sm text-muted-foreground">
        {item.type}
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-danger-fg"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground"
      >
        <ChevronDown className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function DraggableDragDropSortableDemo() {
  const [sourceFields, setSourceFields] =
    React.useState<FieldItem[]>(initialFields);
  const [dropzoneFields, setDropzoneFields] = React.useState<FieldItem[]>([]);
  const [_activeId, setActiveId] = React.useState<UniqueIdentifier | null>(
    null,
  );
  const [activeItem, setActiveItem] = React.useState<FieldItem | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);

    const fromSource = sourceFields.find((f) => f.id === active.id);
    const fromDropzone = dropzoneFields.find((f) => f.id === active.id);
    setActiveItem(fromSource || fromDropzone || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    setActiveItem(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const isFromSource = sourceFields.some((f) => f.id === activeId);
    const isFromDropzone = dropzoneFields.some((f) => f.id === activeId);
    const isOverInDropzone = dropzoneFields.some((f) => f.id === overId);
    const isOverInSource = sourceFields.some((f) => f.id === overId);

    // Sorting within dropzone
    if (isFromDropzone && isOverInDropzone && activeId !== overId) {
      setDropzoneFields((prev) => {
        const oldIndex = prev.findIndex((f) => f.id === activeId);
        const newIndex = prev.findIndex((f) => f.id === overId);
        return arrayMove(prev, oldIndex, newIndex);
      });
      return;
    }

    // Source to dropzone
    if (isFromSource && (overId === "dropzone-drop" || isOverInDropzone)) {
      const fieldToMove = sourceFields.find((f) => f.id === activeId);
      if (fieldToMove) {
        setSourceFields((prev) => prev.filter((f) => f.id !== activeId));
        if (isOverInDropzone) {
          const overIndex = dropzoneFields.findIndex((f) => f.id === overId);
          setDropzoneFields((prev) => {
            const newItems = [...prev];
            newItems.splice(overIndex, 0, fieldToMove);
            return newItems;
          });
        } else {
          setDropzoneFields((prev) => [...prev, fieldToMove]);
        }
      }
      return;
    }

    // Dropzone back to source
    if (isFromDropzone && (overId === "source-drop" || isOverInSource)) {
      const fieldToMove = dropzoneFields.find((f) => f.id === activeId);
      if (fieldToMove) {
        setDropzoneFields((prev) => prev.filter((f) => f.id !== activeId));
        setSourceFields((prev) => [...prev, fieldToMove]);
      }
      return;
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setActiveItem(null);
  };

  const handleRemove = (id: string) => {
    const field = dropzoneFields.find((f) => f.id === id);
    if (field) {
      setDropzoneFields((prev) => prev.filter((f) => f.id !== id));
      setSourceFields((prev) => [...prev, field]);
    }
  };

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
            Drag fields between panels. The drop zone shows an active state when
            fields can be dropped. After dropping, fields transform to show
            editable properties.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Source Panel - Available Fields */}
          <div className="flex-1">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Available Fields
            </div>
            <Droppable
              id="source-drop"
              className={cn(
                "p-4 rounded-lg border-2 border-dashed min-h-[280px] transition-all duration-200",
                "bg-card border-border",
                // Active state - highlighted when dragging over
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5 data-[drop-target=true]:shadow-md",
              )}
            >
              {sourceFields.length > 0 ? (
                <div className="space-y-2">
                  {sourceFields.map((field) => (
                    <Draggable key={field.id} id={field.id}>
                      <DraggableFieldCard item={field} />
                    </Draggable>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-muted-foreground/50 mb-3">
                    <List className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drop (fields) in this area to (return) (items)
                  </p>
                </div>
              )}
            </Droppable>
          </div>

          {/* Drop Zone Panel - Form Builder */}
          <div className="flex-1">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Form Builder
            </div>
            <Droppable
              id="dropzone-drop"
              className={cn(
                "p-4 rounded-lg border-2 border-dashed min-h-[280px] transition-all duration-200",
                "bg-primary/5 border-primary/40",
                // Active state - stronger highlight when dragging over
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/10 data-[drop-target=true]:shadow-md data-[drop-target=true]:border-solid",
              )}
            >
              {dropzoneFields.length > 0 ? (
                // Content transformation: fields become editable after dropping
                <SortableContainer
                  items={dropzoneFields.map((f) => f.id)}
                  strategy="vertical"
                >
                  <div className="space-y-2">
                    {dropzoneFields.map((field) => (
                      <SortableItem key={field.id} id={field.id}>
                        <SortableFieldCard
                          item={field}
                          onRemove={handleRemove}
                        />
                      </SortableItem>
                    ))}
                  </div>
                </SortableContainer>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-muted-foreground/50 mb-3">
                    <List className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drop (fields) in this area to (build) (form)
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Border highlights when you can drop here
                  </p>
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeItem ? (
          <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-primary rounded-lg shadow-lg">
            <div className="flex-shrink-0 text-foreground cursor-grabbing">
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
            <div className="flex-shrink-0 text-sm text-muted-foreground/50">
              |
            </div>
            <div className="flex-shrink-0 text-sm text-muted-foreground">
              {activeItem.type}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
