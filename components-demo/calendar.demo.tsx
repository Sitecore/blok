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

export function CalendarDemo() {

  const [date, setDate] = React.useState<Date | undefined>(() => new Date());
    
    return (
      <div className="flex w-full max-w-xl gap-4">
        <h2 className="font-semibold text-4xl wrap-break-words">Calendar</h2>
        
        <div id="calendar-single">
          <Calendar
            mode="single"
            defaultMonth={date}
            selected={date}
            onSelect={setDate}
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
        </div>

        <div id="calendar-range">
          <MultiCalendar numberOfMonths={2} />
        </div>
        
      </div>

      
  )

    
      
}