export const inputOtp = {
  name: "inputOtp",
  preview: {
    defaultComponent: "inputOtp",
  },
  usage: {
    usage: [
      `import {\n  InputOTP,\n  InputOTPGroup,\n  InputOTPSeparator,\n  InputOTPSlot,\n} from "@/components/ui/inputOtp";`,
      `<InputOTP id="simple" maxLength={6}>\n  <InputOTPGroup>\n    <InputOTPSlot index={0} />\n    <InputOTPSlot index={1} />\n    <InputOTPSlot index={2} />\n  </InputOTPGroup>\n  <InputOTPSeparator />\n  <InputOTPGroup>\n    <InputOTPSlot index={3} />\n    <InputOTPSlot index={4} />\n    <InputOTPSlot index={5} />\n  </InputOTPGroup>\n</InputOTP>`,
    ],
  },
  components: {
    Pattern: { component: "inputOtp-pattern" },
    "With Spacing": { component: "inputOtp-spacing" },
  },
};
