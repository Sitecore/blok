"use client";
import * as React from "react";
import { TimePicker } from "@/components/ui/time-picker";

export function TimePickerExample() {
  const [time, setTime] = React.useState<{
    hour: string;
    minute: string;
    period?: "AM" | "PM";
  }>();

  React.useEffect(() => {
    if (time) {
      console.log("Time:", time);
    }
  }, [time]);

  return (
    <div id="time-picker-example" className="p-2">
      <TimePicker value={time} onChange={setTime} />
    </div>
  );
}

