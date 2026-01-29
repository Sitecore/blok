import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaDemo() {
  return (
    <div className="grid gap-2 m-2 w-75">
      <Label htmlFor="basic-textarea">Message</Label>
      <Textarea
        id="basic-textarea"
        aria-label="Message"
        placeholder="Type your message here."
      />
    </div>
  );
}
