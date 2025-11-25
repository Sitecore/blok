import { MultiCalendar } from "@/app/demo/[name]/ui/multi-calendar";
import { SingleCalendar } from "@/app/demo/[name]/ui/single-calendar";

export const calendar = {
  name: "calendar",
  defaultComponent: (
    <SingleCalendar />
  ),
  usage: [
    `import { Calendar } from "@/components/ui/calendar";`,
    `const [date, setDate] = React.useState<Date | undefined>(new Date())\n\nreturn (\n  <Calendar\n    mode="single"\n    selected={date}\n    onSelect={setDate}\n    className="rounded-lg border"\n  />\n)`,
  ],
  components: {
    "Single": <SingleCalendar />,
    "Two Months": <MultiCalendar numberOfMonths={2} />,
    "Three Months": <MultiCalendar numberOfMonths={3} />,
  },
};
