import { Button } from "@/components/ui/button";

export default function ButtonDisabledDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Disabled Default</Button>
      <Button disabled colorScheme="success">
        Disabled Success
      </Button>
      <Button disabled colorScheme="danger">
        Disabled Danger
      </Button>
      <Button disabled variant="outline">
        Disabled Outline
      </Button>
      <Button disabled variant="ghost">
        Disabled Ghost
      </Button>
      <Button disabled variant="link">
        Disabled Link
      </Button>
    </div>
  );
}
