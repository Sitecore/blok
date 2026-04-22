"use client";

import { Icon } from "@/lib/icon";
import { mdiCalendarBlankOutline } from "@mdi/js";
import { type Locale, format } from "date-fns";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import type { DropdownProps } from "react-day-picker";

type CalendarProps = React.ComponentProps<typeof Calendar>;

/**
 * Optional ARIA strings for the date picker UI outside the calendar grid.
 * For DayPicker label creators (nav, days, etc.), use `calendarProps.ariaLabels`.
 */
export type DatePickerAriaLabels = {
  /** `aria-label` on the popover trigger button */
  popoverTrigger?: string;
};

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
        className="z-50 px-3 text-sm text-neutral-fg [&_svg:not([class*='text-'])]:text-accent-foreground bg-transparent dark:bg-transparent dark:hover:bg-transparent"
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

export type DatePickerSimpleCalendarProps = Omit<
  CalendarProps,
  "mode" | "selected" | "onSelect"
>;

export type DatePickerSimpleProps = {
  /** Uncontrolled initial selection */
  defaultValue?: Date;
  /** Fires when the selected date changes */
  onChange?: (date: Date | undefined) => void;
  /** Trigger label when empty (e.g. translated placeholder) */
  placeholder?: React.ReactNode;
  /** `date-fns` format string for the trigger when a date is selected */
  dateFormat?: string;
  /** Used with `format()` and forwarded to `Calendar` */
  locale?: Locale;
  disabled?: boolean;
  id?: string;
  className?: string;
  ariaLabels?: DatePickerAriaLabels;
  /** Props forwarded to `Calendar`; `mode`, `selected`, and `onSelect` are fixed */
  calendarProps?: DatePickerSimpleCalendarProps;
} & (
  | {
      /** Controlled value; pass `undefined` to clear. Omit for uncontrolled usage. */
      value: Date | undefined;
    }
  | { value?: never }
);

function DatePickerSimple(props: DatePickerSimpleProps) {
  const {
    defaultValue,
    onChange,
    placeholder = "Pick a date",
    dateFormat = "PPP",
    locale,
    disabled,
    id,
    className,
    ariaLabels,
    calendarProps,
  } = props;

  const isControlled = "value" in props;
  const valueProp = isControlled ? props.value : undefined;

  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    defaultValue,
  );

  const date = isControlled ? valueProp : internalDate;

  const setDate = React.useCallback(
    (next: Date | undefined) => {
      if (!isControlled) {
        setInternalDate(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const formatOpts = locale ? { locale } : undefined;
  const mergedLocale = locale ?? calendarProps?.locale;

  return (
    <Popover>
      <PopoverTrigger id={id} asChild>
        <Button
          type="button"
          id={id}
          variant="outline"
          colorScheme="neutral"
          disabled={disabled}
          aria-label={
            ariaLabels?.popoverTrigger ??
            (typeof placeholder === "string" ? placeholder : undefined)
          }
          className={cn(
            "border-input border-1 data-[state=open]:border-2 data-[state=open]:border-primary rounded-md text-md data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-body-bg px-3 py-2 whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 h-10",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <Icon
            path={mdiCalendarBlankOutline}
            size={1}
            className="text-muted-foreground"
            aria-hidden
          />
          {date ? (
            format(date, dateFormat, formatOpts)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus={calendarProps?.initialFocus ?? true}
          captionLayout={calendarProps?.captionLayout ?? "dropdown"}
          locale={mergedLocale}
          components={{
            Dropdown: CustomDropdown,
            ...calendarProps?.components,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export type DatePickerWithRangeCalendarProps = Omit<
  CalendarProps,
  "mode" | "selected" | "onSelect"
>;

export type DatePickerWithRangeProps = {
  defaultValue?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  placeholder?: React.ReactNode;
  /** `date-fns` format for each boundary in the trigger */
  rangeDateFormat?: string;
  /** Between start and end when both are set */
  rangeSeparator?: React.ReactNode;
  locale?: Locale;
  disabled?: boolean;
  id?: string;
  className?: string;
  ariaLabels?: DatePickerAriaLabels;
  calendarProps?: DatePickerWithRangeCalendarProps;
} & ({ value: DateRange | undefined } | { value?: never });

function DatePickerWithRange(props: DatePickerWithRangeProps) {
  const {
    defaultValue,
    onChange,
    placeholder = "Pick a date",
    rangeDateFormat = "LLL dd, y",
    rangeSeparator = " - ",
    locale,
    disabled,
    id,
    className,
    ariaLabels,
    calendarProps,
  } = props;

  const isControlled = "value" in props;
  const valueProp = isControlled ? props.value : undefined;

  const [internalRange, setInternalRange] = React.useState<
    DateRange | undefined
  >(defaultValue);

  const range = isControlled ? valueProp : internalRange;

  const setRange = React.useCallback(
    (next: DateRange | undefined) => {
      if (!isControlled) {
        setInternalRange(next);
      }
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const formatOpts = locale ? { locale } : undefined;
  const mergedLocale = locale ?? calendarProps?.locale;

  const triggerLabel = (() => {
    if (!range?.from) {
      return <span>{placeholder}</span>;
    }
    if (range.to) {
      return (
        <>
          {format(range.from, rangeDateFormat, formatOpts)}
          {rangeSeparator}
          {format(range.to, rangeDateFormat, formatOpts)}
        </>
      );
    }
    return format(range.from, rangeDateFormat, formatOpts);
  })();

  return (
    <Popover>
      <PopoverTrigger id={id} asChild>
        <Button
          type="button"
          id={id}
          variant="outline"
          colorScheme="neutral"
          disabled={disabled}
          aria-label={
            ariaLabels?.popoverTrigger ??
            (typeof placeholder === "string" ? placeholder : undefined)
          }
          className={cn(
            "border-input border-1 data-[state=open]:border-2 data-[state=open]:border-primary rounded-md text-md data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 bg-body-bg px-3 py-2 whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[2px] disabled:cursor-not-allowed disabled:opacity-50 h-10",
            !range?.from && "text-muted-foreground",
            className,
          )}
        >
          <Icon
            path={mdiCalendarBlankOutline}
            size={1}
            className="text-muted-foreground"
            aria-hidden
          />
          {triggerLabel}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="range"
          defaultMonth={range?.from ?? calendarProps?.defaultMonth}
          selected={range}
          onSelect={setRange}
          numberOfMonths={calendarProps?.numberOfMonths ?? 2}
          initialFocus={calendarProps?.initialFocus ?? true}
          captionLayout={calendarProps?.captionLayout ?? "dropdown"}
          locale={mergedLocale}
          components={{
            Dropdown: CustomDropdown,
            ...calendarProps?.components,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePickerSimple, DatePickerWithRange };
