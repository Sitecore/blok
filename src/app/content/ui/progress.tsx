import { Progress } from "@/components/ui/progress";

export default function ProgressDemo() {
  return (
    <div className="min-w-lg">
      <div className="flex items-center justify-center rounded-t-md p-10">
        <Progress value={80} />
      </div>
    </div>
  );
}
