import StepperExample from "@/app/demo/[name]/ui//stepper-example";

export const stepper = {
  name: "stepper",
  defaultComponent: <StepperExample />,
  usage: [
    `import { Stepper } from "@/components/ui/stepper";`,
    `<Stepper steps={steps} />`,
  ]
};
