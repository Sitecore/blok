import { DatePickerSimple } from "@/components/ui/date-picker";
import { DatePickerWithRange } from "@/components/ui/date-picker";

export function DatePickerDemo() {
  

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Date Picker</h2>

    <div className="flex w-full max-w-xl gap-4">
      {/* Single Date Picker */}
      <div id="date-picker-single">
        <DatePickerSimple />
      </div>

      {/* Date Range Picker */}
      <div id="date-picker-range">
        <DatePickerWithRange />
      </div>
    </div>  
    </div>
  );
}