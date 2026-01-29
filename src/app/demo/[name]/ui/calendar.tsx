export const calendar = {
  name: "calendar",
  preview: {
    defaultComponent: "calendar",
  },
  usage: {
    usage: [
      `import { Calendar } from "@/components/ui/calendar";`,
      `const [date, setDate] = React.useState<Date | undefined>(new Date())\n\nreturn (\n  <Calendar\n    mode="single"\n    selected={date}\n    onSelect={setDate}\n    className="rounded-lg border"\n  />\n)`,
    ],
  },
  components: {
    Single: { component: "calendar" },
    "Two Months": { component: "calendar-multiple" },
  },
};
