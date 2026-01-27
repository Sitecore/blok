export const datePicker = {
  name: "date-picker",
  preview: {
    defaultComponent: "date-picker-simple",
  },
  usage: {
    usage: [
      `import { Button } from "@/components/ui/button"\nimport { Calendar } from "@/components/ui/calendar"\nimport {\n  Popover,\n  PopoverContent,\n  PopoverTrigger,\n} from "@/components/ui/popover"`,
      `<Popover>\n  <PopoverTrigger asChild>\n    <Button variant="outline">Pick a date</Button>\n  </PopoverTrigger>\n  <PopoverContent>\n    <Calendar />\n  </PopoverContent>\n</Popover>`,
    ],
  },
  components: {
    "Date Picker Simple": { component: "date-picker-simple" },
    "Date Picker With Range": { component: "date-picker-range" },
  },
};
