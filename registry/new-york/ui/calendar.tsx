"use client"

import * as React from "react"
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js"
import Icon from "@mdi/react"
import { DayPicker } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/registry/new-york/ui/button"
import { dir } from "node:console"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "ghost", colorScheme: "neutral", size: "icon" }),
          "size-icon bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-x-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost", colorScheme: "neutral" }),
          "hover:rounded-md size-8 p-0 font-normal aria-selected:opacity-100 border border-transparent hover:border-primary text-body-text hover:bg-white"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary-500 aria-selected:text-primary-foreground rounded-l-md rounded-r-none",
        day_range_end:
          "day-range-end aria-selected:bg-primary-500 aria-selected:text-primary-foreground rounded-r-md rounded-l-none",
        day_selected:
          "bg-primary-500 text-primary-foreground hover:bg-primary-500 hover:text-primary-foreground focus:bg-primary-500 focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground text-primary rounded-md",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50 rounded-md",
        day_range_middle:
          "aria-selected:bg-primary-bg aria-selected:text-body-text rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <Icon
            path={mdiChevronLeft}
            size={0.9}
            className={cn("size-4 text-neutral", className)}
            {...props}
          />
        ),
        IconRight: ({ className, ...props }) => (
          <Icon
            path={mdiChevronRight}
            size={0.9}
            className={cn("size-4 text-neutral", className)}
            {...props}
          />
        ),
      }}
      {...props}
    />
  )
}

export { Calendar }
