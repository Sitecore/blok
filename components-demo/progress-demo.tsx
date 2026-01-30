import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Progress</h2>
      <div className="min-w-lg">
        <div className="flex items-center justify-center rounded-t-md p-10">
          <Progress value={80} />
        </div>
      </div>
    </div>
  );
}