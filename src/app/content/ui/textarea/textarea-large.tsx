"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function LargeTextareaDemo() {
  const fieldId = useId();

  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor={fieldId}>Large (8 rows)</Label>
      <Textarea
        id={fieldId}
        placeholder="Large textarea"
        rows={8}
        className="min-h-[160px]"
      />
    </div>
  );
}
