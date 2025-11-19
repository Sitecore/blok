import { Slider } from "@/components/ui/slider";

export const slider = {
  name: "slider",
  defaultComponent: (
    <div className="w-md bg-body-bg p-4 rounded-md">
      <Slider />
    </div>
  ),
  usage: [
    `import { Slider } from "@/components/ui/slider";`,
    `<Slider />`,
  ],
};
