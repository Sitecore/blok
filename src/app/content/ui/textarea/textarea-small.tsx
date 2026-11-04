"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function SmallTextareaDemo() {
  const fieldId = useId();

  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor={fieldId}>Small (3 rows)</Label>
      <Textarea
        id={fieldId}
        placeholder="Small textarea"
        rows={3}
        className="min-h-[60px]"
      />
    </div>
  );
}
