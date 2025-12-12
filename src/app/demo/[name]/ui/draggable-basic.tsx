"use client";

import * as React from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@/components/ui/dnd-context";
import { DragOverlay } from "@/components/ui/drag-overlay";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Move, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BasicDragDrop() {
  // Track which container the item is in: "source" or "drop-zone"
  const [container, setContainer] = React.useState<"source" | "drop-zone">("source");
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  const handleDragStart = ({ active }: { active: { id: UniqueIdentifier } }) => {
    setActiveId(active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    setActiveId(null);
    
    if (over) {
      // Move to whichever container it was dropped on
      if (over.id === "drop-zone") {
        setContainer("drop-zone");
      } else if (over.id === "source") {
        setContainer("source");
      }
    }
    // If dropped outside any droppable, stay where it was
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const draggableContent = (
    <Button
      className={cn(
        "w-full shadow-md hover:shadow-lg transition-all duration-200",
        "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
      )}
      size="lg"
    >
      <Move className="mr-2 h-4 w-4" />
      draggable
    </Button>
  );

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold">Basic Drag & Drop</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Drag the button between the source and drop zone areas.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Source Area - Now a Droppable */}
          <div className="flex-shrink-0">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase">
              Source
            </div>
            <Droppable
              id="source"
              className={cn(
                "w-64 min-h-[140px] rounded-xl border-2 border-dashed p-4 transition-all duration-200",
                "bg-gradient-to-br from-background to-muted/30 border-muted",
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5"
              )}
            >
              <div className="space-y-3 h-full flex flex-col justify-center">
                {container === "source" ? (
                  <>
                    <Draggable id="draggable-button">
                      {draggableContent}
                    </Draggable>
                    {!activeId && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                        <span>Drag me to the drop zone</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center text-xs text-muted-foreground py-4">
                    <p>Drop here to return</p>
                  </div>
                )}
              </div>
            </Droppable>
          </div>

          {/* Drop Zone */}
          <div className="flex-1 min-w-0">
            <div className="mb-3 text-xs font-medium text-muted-foreground uppercase">
              Drop Zone
            </div>
            <Droppable
              id="drop-zone"
              className={cn(
                "w-full min-h-[280px] rounded-xl border-2 border-dashed p-8 flex items-center justify-center transition-all duration-200",
                "bg-gradient-to-br from-muted/20 to-muted/10",
                "hover:from-muted/30 hover:to-muted/20",
                "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5 data-[drop-target=true]:shadow-lg data-[drop-target=true]:shadow-primary/10"
              )}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                {container === "drop-zone" ? (
                  <div className="text-center space-y-3 animate-in fade-in duration-300">
                    <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">Successfully Dropped!</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Drag the button back to the source area
                      </p>
                    </div>
                    <Draggable id="draggable-button">
                      {draggableContent}
                    </Draggable>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                      <Move className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-sm text-muted-foreground">Drop Zone</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Release the button here to drop it
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Droppable>
          </div>
        </div>
      </div>

      {/* Drag Overlay for smooth animations */}
      <DragOverlay>
        {activeId ? draggableContent : null}
      </DragOverlay>
    </DndContext>
  );
}
