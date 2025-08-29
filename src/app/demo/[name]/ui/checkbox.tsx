import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const checkbox = {
  name: "checkbox",
  components: {
    Default: (
      <div className="flex items-center gap-3 p-4">
        <Checkbox id="terms" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
    WithDescriptionCheckBox: (
      <div className="flex items-start gap-3 p-4">
        <Checkbox id="terms-2" defaultChecked />
        <div className="grid gap-2">
          <Label htmlFor="terms-2">Accept terms and conditions</Label>
          <p className="text-muted-foreground text-sm">
            By clicking this checkbox, you agree to the terms and conditions.
          </p>
        </div>
      </div>
    ),
    DisabledCheckBox: (
      <div className="flex items-start gap-3 p-4">
        <Checkbox id="toggle" disabled />
        <Label htmlFor="toggle">Disabled notifications</Label>
      </div>
    ),
    EnabledLabelCheckBox: (
      <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-info-600 has-[[aria-checked=true]]:bg-info-50 dark:has-[[aria-checked=true]]:border-info-900 dark:has-[[aria-checked=true]]:bg-info-950">
        <Checkbox
          id="toggle-2"
          defaultChecked
          className="data-[state=checked]:border-info-600 data-[state=checked]:bg-info-600 data-[state=checked]:text-white dark:data-[state=checked]:border-info-700 dark:data-[state=checked]:bg-info-700"
        />
        <div className="grid gap-1.5 font-normal">
          <p className="text-sm leading-none font-medium">
            Enable notifications
          </p>
          <p className="text-muted-foreground text-sm">
            You can enable or disable notifications at any time.
          </p>
        </div>
      </Label>
    )

  },
};
