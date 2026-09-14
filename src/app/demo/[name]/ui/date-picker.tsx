export const datePicker = {
  name: "date-picker",
  preview: {
    defaultComponent: "date-picker-simple",
  },
  usage: {
    usage: [
      `import { DatePickerSimple } from "@/components/ui/date-picker"`,
      `<DatePickerSimple\n  // Optional: top-level pass-through for Calendar nav buttons\n  monthNavigationProps={{\n    previousButtonProps: {\n      "data-action": "month-previous",\n      "aria-label": "Go to previous month",\n    },\n    nextButtonProps: {\n      "data-action": "month-next",\n      "aria-label": "Go to next month",\n    },\n  }}\n  // Optional: Calendar callbacks and additional config\n  calendarProps={{\n    onPreviousAction: () => console.log("previous month"),\n    onNextAction: () => console.log("next month"),\n  }}\n/>`,
    ],
  },
  components: {
    "Date Picker Simple": { component: "date-picker-simple" },
    "Date Picker With Range": { component: "date-picker-range" },
  },
};
