import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function DisabledTextareaDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="textarea-demo-disabled">Disabled Textarea</Label>
      <Textarea
        id="textarea-demo-disabled"
        placeholder="Type your message here."
        aria-label="Disabled Textarea"
        disabled
      />
    </div>
  );
}
