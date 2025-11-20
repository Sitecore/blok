import { EmptyStates } from "@/components/ui/empty-states";

export const emptyStates = {
  name: "empty-states",
  components: {
    "No Search Results": (
      <div className="h-[300px]">
        <EmptyStates variant="no-search-results" />
      </div>
    ),
    "Nothing Created": (
      <div className="h-[300px]">
        <EmptyStates variant="nothing-created" />
      </div>
    ),
    Error: (
      <div className="h-[300px]">
        <EmptyStates variant="error" />
      </div>
    ),
  },
};

