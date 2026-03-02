import { CircularProgress } from "@/components/ui/circular-progress";

export default function CircularProgressDemo() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <CircularProgress value={70} capIsRound />
      <CircularProgress isIndeterminate capIsRound />
    </div>
  );
}
