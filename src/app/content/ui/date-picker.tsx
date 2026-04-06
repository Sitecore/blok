"use client";

import { DatePickerSimple } from "@/components/ui/date-picker";
import * as React from "react";

export default function DatePickerSimpleDemo() {
  const [date, setDate] = React.useState<Date | undefined>(() => new Date());

  return (
    <DatePickerSimple
      value={date}
      onChange={setDate}
      placeholder="Pick a date"
    />
  );
}
