import { EmptyStates } from "@/components/ui/empty-states";

export default function EmptyStatesWithoutImageDemo() {
  return (
    <div className="h-[300px]">
      <EmptyStates
        showImage={false}
        variant="nothing-created"
        title="No briefs yet"
        description="There are no briefs associated with this brand"
      />
    </div>
  );
}
