import { MultiCalendar } from "@/app/demo/[name]/ui/multi-calendar";
import { SingleCalendar } from "@/app/demo/[name]/ui/single-calendar";

export const calendar = {
  name: "calendar",
  defaultComponent: (
    <SingleCalendar />
  ),
  usage: [
    `import { SingleCalendar } from "@/app/demo/[name]/ui/single-calendar"`,
    `<SingleCalendar />`
  ],
  components: {
    "Two Months": <MultiCalendar numberOfMonths={2} />,
    "Three Months": <MultiCalendar numberOfMonths={3} />,
  },
};
