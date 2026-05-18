import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-3">
        <RadioGroupItem value="default" id="r1" aria-label="Default option" />
        <Label htmlFor="r1">Admin</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem
          value="comfortable"
          id="r2"
          aria-label="Comfortable option"
        />
        <Label htmlFor="r2">Write</Label>
      </div>
      <div className="flex items-center gap-3">
        <RadioGroupItem value="compact" id="r3" aria-label="Compact option" />
        <Label htmlFor="r3">Read</Label>
      </div>
    </RadioGroup>
  );
}
