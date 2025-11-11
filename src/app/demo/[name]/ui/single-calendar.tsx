"use client";

import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import type { DropdownProps } from "react-day-picker";
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

export function SingleCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(
    new Date(2025, 5, 12),
  );

  return (
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
  );
}
