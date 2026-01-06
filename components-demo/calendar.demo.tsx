"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import type { DropdownProps , DateRange } from "react-day-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { format } from "date-fns";

export function CustomDropdown({
  options = [],
  value,
  onChange,
  disabled,
  name,
  id,
}: DropdownProps) {
  return (
    <Select
      disabled={disabled}
      name={name}
      value={value != null ? String(value) : ""}
      onValueChange={(val) => {
        const e = {
          target: { value: val },
        } as unknown as React.ChangeEvent<HTMLSelectElement>;
        onChange?.(e);
      }}
    >
      <SelectTrigger
        id={id}
        size="sm"
        aria-label={value ? undefined : "Select an option"}
        className="z-50 px-3 text-sm [&_svg:not([class*='text-'])]:text-accent-foreground bg-transparent dark:bg-transparent dark:hover:bg-transparent"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="rounded-md borde p-0 min-w-20">
        {options.map(({ value: v, label, disabled }) => (
          <SelectItem
            key={String(v)}
            value={String(v)}
            disabled={disabled}
            className="cursor-pointer px-3 py-1.5 text-sm"
          >
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}



export function CalendarDemo() {

  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 6, 12),
  );

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(2025, 5, 9),
    to: new Date(2025, 5, 26),
  });
    
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
            components={{ Dropdown: CustomDropdown }}
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
          <Calendar
            mode="range"
            defaultMonth={dateRange?.from}
            selected={dateRange}
            onSelect={setDateRange}
            numberOfMonths={2}
            className="rounded-lg border shadow-sm"
            captionLayout="dropdown"
            components={{ Dropdown: CustomDropdown }}
            labels={{
                    labelDayButton: (day) => {
                      const visible = format(day, "d");
                      const longLabel = format(day, "PPPP");
                      return `${visible} – ${longLabel}`;
                    },
                  }}
          />
        </div>
        
      </div>

      
  )

    
      
}