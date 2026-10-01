"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export default function SwitchSuccessDemo() {
  const switchId = useId();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={switchId}
        variant="success"
        aria-label="Toggle success mode"
      />
      <Label htmlFor={switchId}>Success</Label>
    </div>
  );
}
