export const emptyStates = {
  name: "empty-states",
  preview: {
    defaultComponent: "empty-states-no-results",
  },
  usage: {
    usage: [
      `import { EmptyStates } from "@/components/ui/empty-states";`,
      `<EmptyStates variant="no-search-results" />`,
    ],
  },
  components: {
    "No Search Results": { component: "empty-states-no-results" },
    "Nothing Created": { component: "empty-states-nothing-created" },
    Error: { component: "empty-states-error" },
  },
};
