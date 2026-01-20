export const textarea = {
  name: "textarea",
  preview: {
    defaultComponent: "textarea",
  },
  usage: {
    usage: [
      `import { Textarea } from "@/components/ui/textarea";`,
      `<Textarea />`,
    ]
  },
  components: {
    Invalid: { component: "textarea-invalid", },
    "With Label": { component: "textarea-with-label", },
    "With Label and Description": { component: "textarea-with-label-and-description", },
    Disabled: { component: "textarea-disabled", },
    Small: { component: "textarea-small", },
    Large: { component: "textarea-large", },
    "With Default Value": { component: "textarea-with-default-value", },
  },
};
