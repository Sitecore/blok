export const checkbox = {
  name: "checkbox",
  preview: {
    defaultComponent: "checkbox",
  },
  usage: {
    usage: [
      `import { Checkbox } from "@/components/ui/checkbox"`,
      `<Checkbox id="terms" />`,
    ],
  },
  components: {
    "With Description": { component: "checkbox-description" },
    Disabled: { component: "checkbox-disabled" },
    "Enabled Label": { component: "checkbox-label" },
  },
};
