import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function RoundedToggleGroupDemo() {
  return (
    <ToggleGroup
      variant="rounded"
      type="single"
      defaultValue="all"
      className="p-0.5 gap-0.5 border border-border-color bg-transparent"
    >
      <ToggleGroupItem value="all" aria-label="Toggle all" className="w-20">
        All
      </ToggleGroupItem>
      <ToggleGroupItem
        value="missed"
        aria-label="Toggle missed"
        className="w-20"
      >
        Missed
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
