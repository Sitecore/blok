import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputTextDemo() {
  return (
    <div className="grid gap-2 w-75 ml-2">
      <Label htmlFor="text-input">Text Input</Label>
      <Input
        type="text"
        id="text-input"
        placeholder="Enter text"
        aria-label="Text Input"
        aria-invalid="true"
        autoComplete="off"
      />
    </div>
  );
}
