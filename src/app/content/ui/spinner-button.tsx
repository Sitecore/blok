import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerButtonDemo() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button disabled size="sm">
        <Spinner />
        Loading...
      </Button>
      <Button variant="outline" disabled size="sm">
        <Spinner />
        Please wait
      </Button>
      <Button variant="ghost" disabled size="sm">
        <Spinner />
        Processing
      </Button>
    </div>
  );
}
