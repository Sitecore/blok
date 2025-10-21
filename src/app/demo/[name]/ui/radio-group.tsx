import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const plans = [
  {
    id: "starter",
    name: "Starter Plan",
    description:
      "Perfect for small businesses getting started with our platform",
    price: "$10",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Advanced features for growing businesses with higher demands",
    price: "$20",
  },
];

export const radioGroup = {
  name: "radio-group",
  components: {
    Default: (
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="default" id="r1" aria-label="Default option" />
          <Label htmlFor="r1">Default</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="comfortable" id="r2" aria-label="Comfortable option" />
          <Label htmlFor="r2">Comfortable</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="compact" id="r3" aria-label="Compact option" />
          <Label htmlFor="r3">Compact</Label>
        </div>
      </RadioGroup>
    ),
    Descriptive: (
      <RadioGroup defaultValue="starter" className="max-w-sm">
        {plans.map((plan) => (
          <Label
            className="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-4 has-[[data-state=checked]]:border-info-fg has-[[data-state=checked]]:bg-info-bg dark:has-[[data-state=checked]]:border-info-fg dark:has-[[data-state=checked]]:bg-info-bg"
            key={plan.id}
          >
            <RadioGroupItem
              value={plan.id}
              id={plan.name}
              aria-label={`Select ${plan.name} plan`}
              className="shadow-none data-[state=checked]:border-info-fg data-[state=checked]:bg-info-fg *:data-[slot=radio-group-indicator]:[&>svg]:fill-inverse-text *:data-[slot=radio-group-indicator]:[&>svg]:stroke-inverse-text"
            />
            <div className="grid gap-1 font-normal">
              <div className="font-medium">{plan.name}</div>
              <div className="text-muted-foreground leading-snug">
                {plan.description}
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    ),
  },
};
