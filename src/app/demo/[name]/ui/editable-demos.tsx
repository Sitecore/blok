"use client";

import { useState } from "react";
import {
  Editable,
  EditableRootProvider,
  EditablePreview,
  EditableInput,
  useEditable,
} from "@/components/ui/editable";

export function ControlledDemo() {
  const [value, setValue] = useState("Hello World");
  
  return (
    <div className="flex flex-col gap-4">
      <Editable 
        value={value} 
        onValueChange={setValue}
        placeholder="Enter text..."
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <p className="text-sm text-muted-foreground ps-2">
        Current value: <span className="font-medium text-foreground">{value}</span>
      </p>
    </div>
  );
}

export function StoreDemo() {
  const editable = useEditable({
    defaultValue: "Click to edit",
  });

  return (
    <div className="flex flex-col items-start gap-4">
      <EditableRootProvider value={editable}>
        <EditablePreview />
        <EditableInput />
      </EditableRootProvider>
      <code className="text-xs px-2 py-1 bg-muted rounded font-mono">
        {editable.editing ? "editing" : "not editing"}
      </code>
    </div>
  );
}

