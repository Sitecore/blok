import { Badge } from "@/components/ui/badge";
import { Icon } from "@/lib/icon";
import { mdiArrowRight } from "@mdi/js";

export default function BadgeLinksDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge asChild>
        <a href="#">
          Default Link <Icon path={mdiArrowRight} className="size-3" />
        </a>
      </Badge>
      <Badge asChild colorScheme="primary">
        <a href="#">
          Primary Link <Icon path={mdiArrowRight} className="size-3" />
        </a>
      </Badge>
      <Badge asChild colorScheme="danger">
        <a href="#">
          Danger Link <Icon path={mdiArrowRight} className="size-3" />
        </a>
      </Badge>
    </div>
  );
}
