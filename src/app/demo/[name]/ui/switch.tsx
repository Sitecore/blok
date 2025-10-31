import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const switchComponent = {
  name: "switch",
  components: {
    Primary: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-airplane-mode" variant="primary" aria-label="Toggle airplane mode" />
        <Label htmlFor="switch-demo-airplane-mode">Primary</Label>
      </div>
    ),
    Danger: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-danger" variant="danger" aria-label="Toggle danger mode" />
        <Label htmlFor="switch-demo-danger">Danger</Label>
      </div>
    ),
    Success: (
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-success" variant="success" aria-label="Toggle success mode" />
        <Label htmlFor="switch-demo-success">Success</Label>
      </div>
    )
  },
};
