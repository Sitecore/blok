import { EmptyStates } from "@/components/ui/empty-states";

export const emptyStates = {
  name: "empty-states",
  defaultComponent: (
    <div id="empty-states-default" className="h-[300px]">
      <EmptyStates variant="no-search-results" />
    </div>
  ),
  usage: [
    `import { EmptyStates } from "@/components/ui/empty-states";`,
    `<EmptyStates variant="no-search-results" />`,
  ],
  components: {
    "No Search Results": (
      <div id="empty-states-no-search-results" className="h-[300px]">
        <EmptyStates variant="no-search-results" />
      </div>
    ),
    "Nothing Created": (
      <div id="empty-states-nothing-created" className="h-[300px]">
        <EmptyStates variant="nothing-created" />
      </div>
    ),
    Error: (
      <div id="empty-states-error" className="h-[300px]">
        <EmptyStates variant="error" />
      </div>
    ),
  },
};

