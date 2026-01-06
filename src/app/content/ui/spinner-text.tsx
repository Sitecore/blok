import { Spinner } from "@/components/ui/spinner";

export default function WithTextSpinnerDemo() {
  return (
    <div className="flex items-start justify-center w-28"> <Spinner variant="circular" size="md" message="Loading..." /></div>
  );
}