import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/inputOtp";

export const inputOtp = {
  name: "inputOtp",
  components: {
    Default: (
      <div className="grid gap-2 p-5">
        <Label htmlFor="simple">Simple</Label>
        <InputOTP id="simple" maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    ),
    Pattern: (
      <div className="grid gap-2 p-5">
        <Label htmlFor="digits-only">Digits Only</Label>
        <InputOTP id="digits-only" maxLength={6} >
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
    ),
    // With Spacing
    WithSpacing: (
      <div className="grid gap-2 p-5">
        <Label htmlFor="with-spacing">With Spacing</Label>
        <InputOTP id="with-spacing" maxLength={6}>
          <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
            <InputOTPSlot index={0} aria-invalid="true" />
            <InputOTPSlot index={1} aria-invalid="true" />
            <InputOTPSlot index={2} aria-invalid="true" />
            <InputOTPSlot index={3} aria-invalid="true" />
          </InputOTPGroup>
        </InputOTP>
      </div>
    ),
    
  },
};
 