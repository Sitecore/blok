import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithLabelAndDescriptionDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="textarea-demo-message-2">Message</Label>
      <Textarea
        id="textarea-demo-message-2"
        placeholder="Type your message here."
        aria-label="Message"
        rows={6}
      />
      <div className="text-muted-foreground text-sm">
        Type your message and press enter to send.
      </div>
    </div>
  );
}
