import { Stepper } from "@/components/ui/stepper";

const StepperDemo = () => {
  const steps = [
    {
      label: "First",
      description: "Contact info",
      status: "completed" as const,
    },
    {
      label: "Second",
      description: "Date & time",
      status: "active" as const,
    },
    {
      label: "Third",
      description: "Select rooms",
      status: "pending" as const,
    },
  ];

  return (
    <div className="w-200">
      <Stepper steps={steps} />
    </div>
  );
};

export default StepperDemo;