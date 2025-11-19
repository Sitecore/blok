import { DatePickerSimple, DatePickerWithRange } from "@/components/ui/date-picker";

export const datePicker = {
  name: "date-picker",
  defaultComponent: (
    <DatePickerSimple />
  ),
  usage: [
    `import { Button } from "@/components/ui/button"\nimport { Calendar } from "@/components/ui/calendar"\nimport {\n  Popover,\n  PopoverContent,\n  PopoverTrigger,\n} from "@/components/ui/popover"`,
    `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Pick a date</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <Calendar />\n  </PopoverContent>\n</Popover>`,
  ],
  components: {
    "Date Picker Simple": <DatePickerSimple />,
    "Date Picker With Range": <DatePickerWithRange />,
  },
};
