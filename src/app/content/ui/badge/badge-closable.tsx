import { Badge } from "@/components/ui/badge";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

export default function ClosableBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>
        Closable Neutral <Icon path={mdiClose} className="size-3" />
      </Badge>
      <Badge colorScheme="primary">
        Closable Primary <Icon path={mdiClose} className="size-3" />
      </Badge>
      <Badge colorScheme="danger">
        Closable Danger <Icon path={mdiClose} className="size-3" />
      </Badge>
    </div>
  );
}
