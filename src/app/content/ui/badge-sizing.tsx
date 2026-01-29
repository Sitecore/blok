import { Badge } from "@/components/ui/badge";

export default function BadgeSizingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge size="sm">Size sm</Badge>
      <Badge size="md">Size md</Badge>
      <Badge size="lg">Size lg</Badge>
    </div>
  );
}
