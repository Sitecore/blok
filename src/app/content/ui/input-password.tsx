import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function InputPasswordDemo() {
  return (
    <div className="grid gap-2 w-75 ml-2">
      <Label htmlFor="password-input">Password</Label>
      <Input
        type="password"
        id="password-input"
        aria-label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
      />
    </div>
  );
}
