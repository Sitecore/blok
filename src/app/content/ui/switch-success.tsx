import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SwitchSuccessDemo() {
  return (
    <div className="flex items-center gap-2">
      <Switch
        id="switch-demo-success"
        variant="success"
        aria-label="Toggle success mode"
      />
      <Label htmlFor="switch-demo-success">Success</Label>
    </div>
  );
}
