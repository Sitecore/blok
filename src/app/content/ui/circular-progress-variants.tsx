import { CircularProgress } from "@/components/ui/circular-progress";

export default function CircularProgressVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-30">
      <CircularProgress variant="default" size="md" />
      <CircularProgress variant="circular" size="md" />
    </div>
  );
}
