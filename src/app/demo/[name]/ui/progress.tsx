import { Progress } from "@/components/ui/progress";

export const progress = {
  name: "Progress",
  components: {
    Default: (
      <div>
       <div className="flex items-center justify-center rounded-t-md bg-white p-10">
          <Progress value={80} />
        </div>
      </div>
    ),
  },
};
