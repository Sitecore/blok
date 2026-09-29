"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export default function SwitchDangerDemo() {
  const switchId = useId();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={switchId}
        variant="danger"
        aria-label="Toggle danger mode"
      />
      <Label htmlFor={switchId}>Danger</Label>
    </div>
  );
}
