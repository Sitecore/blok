import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchDangerDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="switch-demo-danger"
        variant="danger"
        aria-label="Toggle danger mode"
      />
      <Label htmlFor="switch-demo-danger">Danger</Label>
    </div>
  );
}
