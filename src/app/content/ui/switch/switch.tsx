"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export default function SwitchDemo() {
  const switchId = useId();

  return (
    <div className="flex items-center gap-2">
      <Switch
        id={switchId}
        variant="primary"
        aria-label="Toggle airplane mode"
      />
      <Label htmlFor={switchId}>Primary</Label>
    </div>
  );
}
