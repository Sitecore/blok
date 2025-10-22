import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const switchComponent = {
  name: "switch",
  components: {
    Primary: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-airplane-mode" variant="primary" aria-label="Toggle airplane mode" />
        <Label htmlFor="switch-demo-airplane-mode">Airplane Mode</Label>
      </div>
    ),
    Danger: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-danger" variant="danger" aria-label="Toggle danger mode" />
        <Label htmlFor="switch-demo-danger">Danger Mode</Label>
      </div>
    ),
    Success: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-success" variant="success" aria-label="Toggle success mode" />
        <Label htmlFor="switch-demo-success">Success Mode</Label>
      </div>
    ),
    FocusMode: (
      <Label className="flex items-center gap-6 rounded-lg border p-4 has-[[data-state=checked]]:border-info-600">
        <div className="flex flex-col gap-1">
          <div className="font-medium">Share across devices</div>
          <div className="text-muted-foreground text-sm font-normal">
            Focus is shared across devices, and turns off when you leave the
            app.
          </div>
        </div>
        <Switch id="switch-demo-focus-mode" variant="primary" aria-label="Toggle focus mode" />
      </Label>
    ),
  },
};
