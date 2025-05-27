import { Label } from "@/registry/new-york/ui/label"
import { Switch } from "@/registry/new-york/ui/switch"

export function SwitchDemo() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Switch id="switch-demo-airplane-mode" variant="primary" />
        <Label htmlFor="switch-demo-airplane-mode">Airplane Mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="switch-demo-danger"
          variant="danger"
        />
        <Label htmlFor="switch-demo-danger">Danger Mode</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="switch-demo-success"
          variant="success"
        />
        <Label htmlFor="switch-demo-success">Success Mode</Label>
      </div>
      <Label className="flex items-center gap-6 rounded-lg border p-4 has-[[data-state=checked]]:border-info-600">
        <div className="flex flex-col gap-1">
          <div className="font-medium">Share across devices</div>
          <div className="text-muted-foreground text-sm font-normal">
            Focus is shared across devices, and turns off when you leave the
            app.
          </div>
        </div>
        <Switch
          id="switch-demo-focus-mode"
          variant="primary"
        />
      </Label>
    </div>
  )
}
