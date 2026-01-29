import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function DisabledCheckboxDemo() {
  return (
    <div className="flex items-start gap-3 p-4">
      <Checkbox id="toggle" disabled aria-label="Disabled notifications" />
      <Label htmlFor="toggle">Disabled notifications</Label>
    </div>
  );
}
