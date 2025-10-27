import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const label = {
  name: "label",
  components: {
    Default: (
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" aria-label="Accept terms and conditions" />
        <Label htmlFor="terms">Accept terms and conditions</Label>
      </div>
    ),
  },
};
