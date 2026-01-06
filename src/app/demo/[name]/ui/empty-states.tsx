export const emptyStates = {
  name: "empty-states",
  defaultComponent: "empty-states-no-results",
  usage: [
    `import { EmptyStates } from "@/components/ui/empty-states";`,
    `<EmptyStates variant="no-search-results" />`,
  ],
  components: {
    "No Search Results": "empty-states-no-results",
    "Nothing Created": "empty-states-nothing-created",
    Error: "empty-states-error",
  },
};

