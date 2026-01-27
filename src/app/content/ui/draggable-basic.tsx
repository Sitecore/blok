"use client"; // comment this line if you are not using next.js

import { Button } from "@/components/ui/button";
import {
  DndContext,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@/components/ui/dnd-context";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { mdiTextShort } from "@mdi/js";
import { GripVertical, List, Trash2 } from "lucide-react";
import * as React from "react";

interface FieldItem {
  id: string;
  label: string;
  name: string;
  type: string;
}

const initialFields: FieldItem[] = [
  { id: "field-1", label: "First Name", name: "first_name", type: "Text" },
  { id: "field-2", label: "Last Name", name: "last_name", type: "Text" },
  { id: "field-3", label: "Email Address", name: "email", type: "Text" },
];

// Draggable field card (source) - same style as sortable-drop
function DraggableFieldCard({ item }: { item: FieldItem }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors cursor-grab active:cursor-grabbing group">
      <div className="shrink-0 text-muted-foreground">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="shrink-0 p-1.5 rounded bg-primary/10">
        <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
        {item.label}
      </div>
      <div className="shrink-0 text-sm text-muted-foreground truncate max-w-[150px]">
        {item.name}
      </div>
      <div className="shrink-0 text-sm text-muted-foreground/50">|</div>
      <div className="shrink-0 text-sm text-muted-foreground">{item.type}</div>
    </div>
  );
}

// Dropped field card - shows in drop zone
function DroppedFieldCard({
  item,
  onRemove,
}: {
  item: FieldItem;
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group">
      <div className="shrink-0 text-muted-foreground">
        <GripVertical className="w-4 h-4" />
      </div>
      <div className="shrink-0 p-1.5 rounded bg-primary/10">
        <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
        {item.label}
      </div>
      <div className="shrink-0 text-sm text-muted-foreground truncate max-w-[150px]">
        {item.name}
      </div>
      <div className="shrink-0 text-sm text-muted-foreground/50">|</div>
      <div className="shrink-0 text-sm text-muted-foreground">{item.type}</div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-danger-fg"
        onClick={() => onRemove(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}

export default function DraggableBasicDragDropDemo() {
  const [sourceFields, setSourceFields] =
    React.useState<FieldItem[]>(initialFields);
  const [droppedFields, setDroppedFields] = React.useState<FieldItem[]>([]);
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const handleDragStart = ({
    active,
  }: { active: { id: UniqueIdentifier } }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (over?.id === "drop-zone") {
      const field = sourceFields.find((f) => f.id === active.id);
      if (field) {
        setDroppedFields((prev) => [...prev, field]);
        setSourceFields((prev) => prev.filter((f) => f.id !== active.id));
      }
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const handleRemove = (id: string) => {
    const field = droppedFields.find((f) => f.id === id);
    if (field) {
      setDroppedFields((prev) => prev.filter((f) => f.id !== id));
      setSourceFields((prev) => [...prev, field]);
    }
  };

  const activeField = activeId
    ? sourceFields.find((f) => f.id === activeId)
    : null;

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-semibold">Basic Drag & Drop</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Drag fields from the source to the drop zone. The drop zone shows an
            active state when fields can be dropped.
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
                    All fields have been moved
                  </p>
                </div>
              )}
            </Droppable>
          </div>

          {/* Drop Zone Panel */}
          <div className="flex-1">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Drop Zone
            </div>
            <Droppable
              id="drop-zone"
              className={cn(
                "p-4 rounded-lg border-2 border-dashed min-h-[280px] transition-all duration-200",
                "bg-primary/5 border-primary/40",
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/10 data-[drop-target=true]:shadow-md data-[drop-target=true]:border-solid",
              )}
            >
              {droppedFields.length > 0 ? (
                <div className="space-y-2">
                  {droppedFields.map((field) => (
                    <DroppedFieldCard
                      key={field.id}
                      item={field}
                      onRemove={handleRemove}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
                  <div className="w-12 h-12 flex items-center justify-center text-muted-foreground/50 mb-3">
                    <List className="w-8 h-8" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Drop (fields) in this area to (add) (items)
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
        {activeField ? (
          <div className="flex items-center gap-3 px-3 py-2.5 bg-card border border-primary rounded-lg shadow-lg">
            <div className="shrink-0 text-foreground cursor-grabbing">
              <GripVertical className="w-4 h-4" />
            </div>
            <div className="shrink-0 p-1.5 rounded bg-primary/10">
              <Icon path={mdiTextShort} className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0 text-sm font-medium text-foreground truncate">
              {activeField.label}
            </div>
            <div className="shrink-0 text-sm text-muted-foreground truncate max-w-[150px]">
              {activeField.name}
            </div>
            <div className="shrink-0 text-sm text-muted-foreground/50">|</div>
            <div className="shrink-0 text-sm text-muted-foreground">
              {activeField.type}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
