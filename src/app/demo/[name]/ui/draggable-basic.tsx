"use client";

import * as React from "react";
import { DragDropProvider, useDragDropContext } from "@/components/ui/drag-drop-context";
import { Draggable } from "@/components/ui/draggable";
import { Droppable } from "@/components/ui/droppable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Move, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

function DragDropDemo() {
  const { manager } = useDragDropContext();
  const appRef = React.useRef<HTMLDivElement>(null);
  const sourceContainerRef = React.useRef<HTMLDivElement>(null);
  const droppableRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isDropped, setIsDropped] = React.useState(false);

  React.useEffect(() => {
    const handleDragStart = (event: any) => {
      if (event.operation.source?.id === "draggable-button") {
        setIsDragging(true);
      }
    };

    const handleDragEnd = (event: any) => {
      const { operation, canceled } = event;
      const { source, target } = operation;

      setIsDragging(false);

      // Skip if drag operation was canceled (e.g. if escape key was pressed)
      if (canceled) return;

      if (!source?.element || !(source.element instanceof HTMLElement)) return;

      // Move element to drop target if dropped on droppable
      if (target && target.id === "droppable-container" && droppableRef.current) {
        droppableRef.current.appendChild(source.element);
        setIsDropped(true);
      } else if (sourceContainerRef.current) {
        // Move back to original position (prepend to source container)
        sourceContainerRef.current.insertBefore(source.element, sourceContainerRef.current.firstChild);
        setIsDropped(false);
      }
    };

    manager.monitor.addEventListener("dragstart", handleDragStart);
    manager.monitor.addEventListener("dragend", handleDragEnd);

    return () => {
      manager.monitor.removeEventListener("dragstart", handleDragStart);
      manager.monitor.removeEventListener("dragend", handleDragEnd);
    };
  }, [manager]);

  return (
    <div ref={appRef} className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight">Basic Drag & Drop</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Drag the button from the source area to the drop zone. The element will move between containers.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Source Area */}
        <div className="flex-shrink-0">
          <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Source
          </div>
          <Card className="w-64 p-4 bg-gradient-to-br from-background to-muted/30 border-2 border-dashed border-muted">
            <CardContent className="p-0">
              <div ref={sourceContainerRef} className="space-y-3">
                <Draggable id="draggable-button">
                  <Button
                    className={cn(
                      "w-full cursor-grab active:cursor-grabbing shadow-md hover:shadow-lg transition-all duration-200",
                      "bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary",
                      isDragging && "opacity-50 scale-95"
                    )}
                    size="lg"
                  >
                    <Move className="mr-2 h-4 w-4" />
                    draggable
                  </Button>
                </Draggable>
                {!isDropped && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ArrowRight className="h-3 w-3" />
                    <span>Drag me to the drop zone</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drop Zone */}
        <div className="flex-1 min-w-0">
          <div className="mb-3 text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Drop Zone
          </div>
          <Droppable
            id="droppable-container"
            className={cn(
              "w-full min-h-[280px] rounded-xl border-2 border-dashed p-8 flex items-center justify-center transition-all duration-200",
              "bg-gradient-to-br from-muted/20 to-muted/10",
              "hover:from-muted/30 hover:to-muted/20",
              "data-[drop-target=true]:border-primary data-[drop-target=true]:bg-primary/5 data-[drop-target=true]:shadow-lg data-[drop-target=true]:shadow-primary/10"
            )}
          >
            <div ref={droppableRef} className="w-full h-full flex flex-col items-center justify-center gap-4">
              {isDropped ? (
                <div className="text-center space-y-3 animate-in fade-in duration-300">
                  <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Successfully Dropped!</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Drag the button again to move it back
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-3">
                  <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
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
  );
}

export function BasicDragDrop() {
  return (
    <DragDropProvider>
      <DragDropDemo />
    </DragDropProvider>
  );
}

