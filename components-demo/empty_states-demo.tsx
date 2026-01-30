import { EmptyStates } from "@/components/ui/empty-states";

export function EmptyStatesDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Empty States</h2>
    <div className="flex w-full max-w-xl gap-4">
      {/* No search results */}
      <div id="empty-states-no-search-results">
        <div className="h-[300px]">
          <EmptyStates variant="no-search-results" />
        </div>
      </div>

      {/* Nothing created */}
      <div id="empty-states-nothing-created">
        <div className="h-[300px]">
          <EmptyStates variant="nothing-created" />
        </div>
      </div>

      {/* Error */}
      <div id="empty-states-error">
        <div className="h-[300px]">
          <EmptyStates variant="error" />
        </div>
      </div>
    </div>
    </div>
  );
}