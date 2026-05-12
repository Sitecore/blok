export const datePicker = {
  name: "date-picker",
  preview: {
    defaultComponent: "date-picker-simple",
  },
  usage: {
    usage: [
      `import { DatePickerSimple } from "@/components/ui/date-picker"`,
      `<DatePickerSimple />`,
    ],
  },
  components: {
    "Date Picker Simple": { component: "date-picker-simple" },
    "Date Picker With Range": { component: "date-picker-range" },
  },
};
