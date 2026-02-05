"use client";

import { BasicDragandDrop } from "@/components-demo/BasicDragandDrop";
import { CustomHandle } from "@/components-demo/CustomHandle";
import { DragDropandSort } from "@/components-demo/DragDropandSort";

export function DraggableDemo() {
  
  return (

    <div className="grid gap-4">
    <h2 className="font-semibold text-4xl wrap-break-words">Draggable</h2>
      <div>
        <BasicDragandDrop/>
      </div>
      <div>
        <CustomHandle/>
      </div>
      <div>
        <DragDropandSort/>
      </div>
    </div>

  );
}
