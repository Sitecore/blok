import { Progress } from "@/components/ui/progress";

export const progress = {
  name: "Progress",
  defaultComponent: (
    <div className="min-w-lg">
      <div className="flex items-center justify-center rounded-t-md p-10">
        <Progress value={80} />
      </div>
    </div>
  ),
  usage: [
    `import { Progress } from "@/components/ui/progress";`,
    `<Progress value={80} />`,
  ],
};
