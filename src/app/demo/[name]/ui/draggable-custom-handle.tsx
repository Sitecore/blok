"use client";

import * as React from "react";
import { DragDropProvider } from "@/components/ui/drag-drop-context";
import { Sortable } from "@/components/ui/sortable";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

export function CustomHandleDemo() {
  const items = [
    { id: "A", name: "Project Alpha" },
    { id: "B", name: "Project Beta" },
    { id: "C", name: "Project Gamma" },
  ];

  const cardColors = [
    "bg-info-bg border-border",
    "bg-success-bg border-border",
    "bg-warning-bg border-border",
  ];

  return (
    <DragDropProvider>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Custom Drag Handle</h3>
        </div>

        <div className="max-w-2xl space-y-2">
          {items.map((item, index) => {
            const handleRef = React.useRef<HTMLDivElement>(null);
            return (
              <Sortable
                key={item.id}
                id={item.id}
                index={index}
                handle={handleRef as React.RefObject<HTMLElement>}
              >
                <Card className={`${cardColors[index]} group hover:shadow-sm transition-all duration-200`}>
                  <CardContent className="p-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        ref={handleRef}
                        className={cn(
                          "flex-shrink-0 w-6 h-6 rounded flex items-center justify-center",
                          "cursor-grab active:cursor-grabbing",
                          "bg-card hover:bg-muted",
                          "text-muted-foreground hover:text-foreground",
                          "transition-all duration-200"
                        )}
                      >
                        <GripVertical className="h-3.5 w-3.5" />
                      </div>
                      <p className="font-medium text-xs">{item.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </Sortable>
            );
          })}
        </div>
      </div>
    </DragDropProvider>
  );
}

