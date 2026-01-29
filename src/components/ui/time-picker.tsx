"use client";

import { Icon } from "@/lib/icon";
import { mdiClockOutline } from "@mdi/js";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TimeValue {
  hour: string;
  minute: string;
  period?: "AM" | "PM";
}

interface TimePickerProps {
  value?: TimeValue;
  onChange?: (value: TimeValue) => void;
  placeholder?: string;
}

export function TimePicker({
  value,
  onChange,
  placeholder = "Pick a time",
}: TimePickerProps) {
  const [time, setTime] = React.useState<TimeValue | undefined>(value);
  const [isOpen, setIsOpen] = React.useState(false);

  // Generate hours (12-hour format)
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return { value: hour.toString().padStart(2, "0"), label: hour.toString() };
  });

  // Generate minutes
  const minutes = Array.from({ length: 60 }, (_, i) => {
    const minute = i.toString().padStart(2, "0");
    return { value: minute, label: minute };
  });

  const periods = [
    { value: "AM", label: "AM" },
    { value: "PM", label: "PM" },
  ];

  const handleTimeChange = (field: keyof TimeValue, val: string) => {
    const newTime = {
      hour: time?.hour || "12",
      minute: time?.minute || "00",
      period: time?.period || "AM",
      [field]: val,
    };
    setTime(newTime);
    onChange?.(newTime);
  };

  const formatTime = (timeValue?: TimeValue) => {
    if (!timeValue) return null;
    return `${timeValue.hour}:${timeValue.minute} ${timeValue.period}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          colorScheme={"neutral"}
          className={cn(
            "border-input border-1 data-[state=open]:border-1 data-[state=open]:border-primary rounded-md text-md data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-body-bg px-3 py-2 whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 h-10",
            !time && "text-muted-foreground",
          )}
        >
          {time ? formatTime(time) : <span>{placeholder}</span>}
          <Icon
            path={mdiClockOutline}
            size={1}
            className="text-muted-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-2">
            <label className="text-xs text-muted-foreground font-medium">
              Hour
            </label>
            <Select
              value={time?.hour || "12"}
              onValueChange={(val) => handleTimeChange("hour", val)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="p-0 min-w-20">
                {hours.map((hour) => (
                  <SelectItem key={hour.value} value={hour.value}>
                    {hour.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <span className="text-2xl font-bold mt-6">:</span>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-muted-foreground font-medium">
              Minute
            </label>
            <Select
              value={time?.minute || "00"}
              onValueChange={(val) => handleTimeChange("minute", val)}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="p-0 min-w-20 max-h-[400px]">
                {minutes.map((minute) => (
                  <SelectItem key={minute.value} value={minute.value}>
                    {minute.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-muted-foreground font-medium">
              Period
            </label>
            <Select
              value={time?.period || "AM"}
              onValueChange={(val) =>
                handleTimeChange("period", val as "AM" | "PM")
              }
            >
              <SelectTrigger className="w-[75px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="outline"
            className="flex-1"
            onClick={() => {
              setTime(undefined);
              onChange?.(undefined as any);
              setIsOpen(false);
            }}
          >
            Clear
          </Button>
          <Button size="sm" className="flex-1" onClick={() => setIsOpen(false)}>
            Done
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
