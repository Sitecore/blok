import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxDemo() {
  return (
    <div className="flex items-center gap-3 p-4">
      <Checkbox id="terms" aria-label="Accept terms and conditions" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
