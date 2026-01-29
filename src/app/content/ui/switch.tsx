import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="switch-demo-airplane-mode"
        variant="primary"
        aria-label="Toggle airplane mode"
      />
      <Label htmlFor="switch-demo-airplane-mode">Primary</Label>
    </div>
  );
}
