import { Spinner } from "@/components/ui/spinner";

export default function SpinnerVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-30">
      <Spinner variant="default" size="md" />
      <Spinner variant="circular" size="md" />
    </div>
  );
}