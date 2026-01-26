import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputDemo() {
  return (
    <div className="grid gap-2 w-75 ml-2">
      <Label htmlFor="input">Name</Label>
      <Input
        type="text"
        id="input"
        placeholder="Enter your name"
        aria-label="Name"
      />
    </div>
  );
}
