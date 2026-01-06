"use client";

import { useState } from "react";
import {
  Editable,
  EditablePreview,
  EditableInput,
} from "@/components/ui/editable";

export function ControlledDemo() {
  const [value, setValue] = useState("Hello World");
  
  return (
    <div className="flex flex-col gap-4 w-80">
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
  const [name, setName] = useState("John Doe");
  const [savedName, setSavedName] = useState("John Doe");
  
  return (
    <div className="flex flex-col gap-4 w-80 p-4 border border-border rounded-lg">
      <Editable 
        value={name} 
        onValueChange={setName}
        onSubmit={(val) => setSavedName(val)}
        placeholder="Enter name..."
      >
        <EditablePreview />
        <EditableInput />
      </Editable>
      <div className="text-sm space-y-1">
        <p className="text-muted-foreground">
          Editing: <span className="font-medium text-foreground">{name}</span>
        </p>
        <p className="text-muted-foreground">
          Saved: <span className="font-medium text-success-fg">{savedName}</span>
        </p>
      </div>
    </div>
  );
}

