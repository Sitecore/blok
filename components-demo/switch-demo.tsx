import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function SwitchDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Switch</h2>
      <div className="flex flex-wrap items-center gap-4">
        {/* Primary Switch */}
        <div id="switch-primary">
          <div className="flex items-center gap-2">
            <Switch id="switch-demo-airplane-mode" variant="primary" aria-label="Toggle airplane mode" />
            <Label htmlFor="switch-demo-airplane-mode">Primary</Label>
          </div>
        </div>

        {/* Danger Switch */}
        <div id="switch-danger">
          <div className="flex items-center gap-2">
            <Switch id="switch-demo-danger" variant="danger" aria-label="Toggle danger mode" />
            <Label htmlFor="switch-demo-danger">Danger</Label>
          </div>
        </div>

        {/* Success Switch */}
        <div id="switch-success">
          <div className="flex items-center gap-2">
            <Switch id="switch-demo-success" variant="success" aria-label="Toggle success mode" />
            <Label htmlFor="switch-demo-success">Success</Label>
          </div>
        </div>

      </div>
    </div>
  );
}