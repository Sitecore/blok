import { Spinner } from "@/components/ui/spinner";

export default function SpinnerDemo() {
  return (
    <div className="flex items-center justify-center gap-4 w-28">
      <Spinner variant="default" />
      <Spinner variant="primary" />
    </div>
  );
}
