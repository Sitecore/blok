import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function TextareaWithDefaultValueDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="textarea-with-value">Pre-filled Textarea</Label>
      <Textarea
        id="textarea-with-value"
        defaultValue="This textarea comes with some pre-filled content. You can edit this text or add more content as needed."
        aria-label="Pre-filled Textarea"
        rows={4}
      />
    </div>
  );
}
