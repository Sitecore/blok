import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function LabelDemo() {
  return (
    <div className="flex items-center space-x-2 p-2">
      <Checkbox id="terms" aria-label="Accept terms and conditions" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  );
}
