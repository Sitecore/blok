import { Button } from "@/components/ui/button";

export default function ButtonSizingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="lg">Solid lg</Button>
      <Button size="default">Solid</Button>
      <Button size="sm">Solid sm</Button>
      <Button size="xs">Solid xs</Button>
    </div>
  );
}
