import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import {
  mdiDeleteOutline,
  mdiDotsHorizontal,
  mdiPencilOutline,
  mdiShareOutline,
} from "@mdi/js";

export default function DropdownMenuIconColorDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          colorScheme="neutral"
          size="icon"
          aria-label="Toggle menu"
        >
          <Icon path={mdiDotsHorizontal} size={0.8} />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuGroup className="*:data-[slot=dropdown-menu-item]:[&>svg]:text-muted-foreground">
          <DropdownMenuItem>
            <Icon path={mdiPencilOutline} size={1.5} />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiShareOutline} size={1.5} />
            Share
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive">
            <Icon path={mdiDeleteOutline} size={1.5} />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
