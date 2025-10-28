"use client";

import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Calendar } from "@/components/ui/calendar";

export function MultiCalendar({numberOfMonths = 1}: {numberOfMonths?: number}) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={dateRange?.from}
      selected={dateRange}
      onSelect={setDateRange}
      numberOfMonths={numberOfMonths}
      className="rounded-lg border shadow-sm"
      captionLayout="dropdown"

    />
  );
}
