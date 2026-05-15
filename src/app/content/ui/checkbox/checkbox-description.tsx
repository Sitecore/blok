import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function CheckboxWithDescriptionDemo() {
  return (
    <div className="flex items-start gap-3 p-4">
      <Checkbox
        id="terms-2"
        defaultChecked
        aria-label="Accept terms and conditions"
      />
      <div className="grid gap-2">
        <Label htmlFor="terms-2">Accept terms and conditions</Label>
        <p className="text-muted-foreground text-sm">
          By clicking this checkbox, you agree to the terms and conditions.
        </p>
      </div>
    </div>
  );
}
