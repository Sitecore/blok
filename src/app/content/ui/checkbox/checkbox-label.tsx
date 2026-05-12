import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function EnabledCheckboxLabelDemo() {
  return (
    <Label className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-info-fg has-[[aria-checked=true]]:bg-info-bg dark:has-[[aria-checked=true]]:border-info-fg dark:has-[[aria-checked=true]]:bg-info-bg">
      <Checkbox
        id="toggle-2"
        defaultChecked
        aria-label="Enable notifications"
        className="data-[state=checked]:border-info-fg data-[state=checked]:bg-info-fg data-[state=checked]:text-inverse-text dark:data-[state=checked]:border-info-fg dark:data-[state=checked]:bg-info-fg"
      />
      <div className="grid gap-1.5 font-normal">
        <p className="text-sm leading-none font-medium">Enable notifications</p>
        <p className="text-muted-foreground text-sm">
          You can enable or disable notifications at any time.
        </p>
      </div>
    </Label>
  );
}
