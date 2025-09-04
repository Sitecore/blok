import { MultiCalendar } from "@/app/demo/[name]/ui/multi-calendar";
import { SingleCalendar } from "@/app/demo/[name]/ui/single-calendar";

export const calendar = {
  name: "calendar",
  components: {
    Default: <SingleCalendar />,
    TwoMonths: <MultiCalendar numberOfMonths={2} />,
    ThreeMonths: <MultiCalendar numberOfMonths={3} />,
  },
};
