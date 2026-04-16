"use client";
import { DatePickerSimple } from "@/components/ui/date-picker";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { addDays } from "date-fns";
import * as React from "react";

export function DatePickerDemo() {
  
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
  const defaultFrom = new Date(new Date().getFullYear(), 0, 20);

  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Date Picker</h2>

    <div className="flex w-full max-w-xl gap-4">
      {/* Simple Date Picker */}
        <div id="date-picker-simple">
          <DatePickerSimple
            value={date}
            onChange={setDate}
            placeholder="Pick a date"
          />
      </div>

      {/* Date Range Picker */}
      <div id="date-picker-range">
        <DatePickerWithRange
          defaultValue={{
            from: defaultFrom,
            to: addDays(defaultFrom, 20),
          }}
          placeholder="Pick a date range"
        />
      </div>
    </div>

    </div>
  );
}