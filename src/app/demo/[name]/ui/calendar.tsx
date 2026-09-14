export const calendar = {
  name: "calendar",
  preview: {
    defaultComponent: "calendar",
  },
  usage: {
    usage: [
      `import { Calendar } from "@/components/ui/calendar";`,
      `const [date, setDate] = React.useState<Date | undefined>(new Date())\n\nreturn (\n  <Calendar\n    mode="single"\n    selected={date}\n    onSelect={setDate}\n    // Optional: metadata/handlers for month nav buttons\n    monthNavigationProps={{\n      previousButtonProps: {\n        "data-action": "month-previous",\n        "aria-label": "Go to previous month",\n      },\n      nextButtonProps: {\n        "data-action": "month-next",\n        "aria-label": "Go to next month",\n      },\n    }}\n    // Optional: callback when previous month navigation occurs\n    onPreviousAction={() => console.log("previous month")}\n    // Optional: callback when next month navigation occurs\n    onNextAction={() => console.log("next month")}\n    className="rounded-lg border"\n  />\n)`,
    ],
  },
  components: {
    Single: { component: "calendar" },
    "Two Months": { component: "calendar-multiple" },
  },
};
