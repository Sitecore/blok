import { DatePickerWithRange } from "@/components/ui/date-picker";
import { addDays } from "date-fns";

export default function DatePickerWithRangeDemo() {
  const defaultFrom = new Date(new Date().getFullYear(), 0, 20);
  return (
    <DatePickerWithRange
      defaultValue={{
        from: defaultFrom,
        to: addDays(defaultFrom, 20),
      }}
      placeholder="Pick a date range"
    />
  );
}
