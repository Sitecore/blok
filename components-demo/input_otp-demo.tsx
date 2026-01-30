import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/inputOtp";

export function InputOTPDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Input OTP</h2>

    <div className="flex w-full max-w-full gap-4">
      {/* Simple Input OTP */}
      <div id="input-otp-simple">
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
      </div>

      {/* Pattern Input OTP */}
      <div id="input-otp-digits-only">
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
      </div>

      {/* With Spacing */}
      <div id="input-otp-with-spacing">
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
      </div>
    </div>
    </div>
  );
}