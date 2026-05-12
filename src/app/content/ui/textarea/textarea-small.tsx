import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function SmallTextareaDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="small-textarea">Small (3 rows)</Label>
      <Textarea
        id="small-textarea"
        placeholder="Small textarea"
        aria-label="Small textarea"
        rows={3}
        className="min-h-[60px]"
      />
    </div>
  );
}
