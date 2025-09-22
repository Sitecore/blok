import { Slider } from "@/components/ui/slider";

export const slider = {
  name: "slider",
  components: {
    Default: (
      <div className="w-full py-4">
        <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />
      </div>
    ),
  },
};
