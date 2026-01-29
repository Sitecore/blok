import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";

export default function SpinnerBadgeDemo() {
  return (
    <div className="flex items-center gap-4">
      <Badge>
        <Spinner />
        Syncing
      </Badge>
      <Badge variant="bold" colorScheme="primary">
        <Spinner />
        Updating
      </Badge>
      <Badge variant="bold" colorScheme="success">
        <Spinner />
        Processing
      </Badge>
    </div>
  );
}
