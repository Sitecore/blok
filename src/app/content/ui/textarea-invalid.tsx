import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InvalidTextareaDemo() {
  return (
    <div className="grid gap-2 m-2 w-75">
      <Label htmlFor="invalid-textarea">Message</Label>
      <Textarea
        id="invalid-textarea"
        placeholder="Type your message here."
        aria-label="Message"
        aria-invalid="true"
      />
    </div>
  );
}
