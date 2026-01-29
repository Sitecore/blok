export const switchComponent = {
  name: "switch",
  preview: {
    defaultComponent: "switch",
  },
  usage: {
    usage: [`import { Switch } from "@/components/ui/switch";`, `<Switch />`],
  },
  components: {
    Primary: { component: "switch" },
    Danger: { component: "switch-danger" },
    Success: { component: "switch-success" },
  },
};
