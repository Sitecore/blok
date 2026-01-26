import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/inputOtp";
import { Label } from "@/components/ui/label";

export default function InputOTPPatternDemo() {
  return (
    <div className="grid gap-2 p-5">
      <Label htmlFor="digits-only">Digits Only</Label>
      <InputOTP id="digits-only" maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
