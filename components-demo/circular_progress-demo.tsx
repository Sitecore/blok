import { CircularProgress } from "@/components/ui/circular-progress";

export function CircularProgressDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Circular Progress</h2>
        <div className="flex flex-wrap items-center gap-6">
          <CircularProgress value={70} capIsRound />
          <CircularProgress isIndeterminate capIsRound />
        </div>
    </div>
  );
}