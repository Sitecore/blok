import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithLabelDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="textarea-demo-message">Message</Label>
      <Textarea
        id="textarea-demo-message"
        placeholder="Type your message here."
        aria-label="Message"
        rows={6}
      />
    </div>
  );
}
