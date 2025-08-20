import React from "react";
import { Switch } from "@/registry/new-york/ui/switch";
import { Label } from "@/registry/new-york/ui/label";

type SwitchVariant = "primary" | "danger" | "success";

interface SwitchExampleProps {
  variant: SwitchVariant;
  label: string;
}

export const SwitchExample: React.FC<SwitchExampleProps> = ({ variant, label }) => {
  return (
    <div className="flex items-center gap-2">
      <Switch variant={variant} />
      <Label>{label}</Label>
    </div>
  );
};
