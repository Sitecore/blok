"use client";

import { Calendar } from "@/components/ui/calendar";
import { format, parseISO } from "date-fns";
import * as React from "react";

export default function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(
    parseISO("2025-06-12"),
  );

  return (
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
  );
}
