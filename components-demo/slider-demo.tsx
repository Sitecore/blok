import { Slider } from "@/components/ui/slider";

export function SliderDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Slider</h2>
      <div className="w-md bg-body-bg p-4 rounded-md">
        <Slider />
      </div>
    </div>
  );
}