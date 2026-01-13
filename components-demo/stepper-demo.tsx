import { Stepper } from "@/components/ui/stepper";

export function StepperDemo() {

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
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Stepper</h2>

        <div id="stepper">
          <div className="w-200">
            <Stepper steps={steps} />
          </div>
        </div>

    </div>
  );
}