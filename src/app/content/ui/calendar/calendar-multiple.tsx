"use client";

import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

export function MultiCalendar({
  numberOfMonths = 1,
}: { numberOfMonths?: number }) {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 20),
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
      labels={{
        labelDayButton: (day) => {
          const visible = format(day, "d");
          const longLabel = format(day, "PPPP");
          return `${visible} – ${longLabel}`;
        },
      }}
    />
  );
}

export default function MultipleCalendarDemo() {
  return <MultiCalendar numberOfMonths={2} />;
}
