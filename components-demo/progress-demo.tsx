import { Progress } from "@/components/ui/progress";

export function ProgressDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Progress</h2>
      <div className="min-w-lg">
      <div className="flex flex-col items-center space-y-10 justify-center rounded-t-md p-10">
        <Progress variant="default" value={80} />
        <Progress variant="indeterminate" />
      </div>
    </div>
    </div>
  );
}