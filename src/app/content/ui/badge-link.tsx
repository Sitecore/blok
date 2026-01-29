import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";

export default function BadgeLinksDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge asChild>
        <a href="#">
          Default Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
      <Badge asChild colorScheme="primary">
        <a href="#">
          Primary Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
      <Badge asChild colorScheme="danger">
        <a href="#">
          Danger Link <ArrowRightIcon className="size-3" />
        </a>
      </Badge>
    </div>
  );
}
