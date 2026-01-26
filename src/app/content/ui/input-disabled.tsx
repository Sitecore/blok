import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function DisabledInputDemo() {
  return (
    <div className="grid gap-2 w-75 ml-2">
      <Label htmlFor="disabled-input">Disabled Input</Label>
      <Input
        disabled
        id="disabled-input"
        aria-label="Disabled Input"
        placeholder="This input is disabled"
        autoComplete="off"
      />
    </div>
  );
}
