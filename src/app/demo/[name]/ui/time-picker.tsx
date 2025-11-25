import { TimePickerExample } from "@/app/demo/[name]/ui/time-picker-example";

export const timePicker = {
  name: "time-picker",
  defaultComponent: (
    <TimePickerExample />
  ),
  usage: [
    `import { TimePicker } from "@/components/ui/time-picker";`,
    `<TimePicker />`,
  ],
};
