import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function LabelDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Label</h2>
      
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" aria-label="Accept terms and conditions" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    </div>
  );
}