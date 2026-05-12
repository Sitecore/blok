import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LargeTextareaDemo() {
  return (
    <div className="grid gap-3 m-2 w-75">
      <Label htmlFor="large-textarea">Large (8 rows)</Label>
      <Textarea
        id="large-textarea"
        placeholder="Large textarea"
        aria-label="Large textarea"
        rows={8}
        className="min-h-[160px]"
      />
    </div>
  );
}
