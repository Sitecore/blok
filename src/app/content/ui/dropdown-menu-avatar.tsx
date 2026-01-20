import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import {
  mdiBellOutline,
  mdiCheck,
  mdiChevronDown,
  mdiCreditCardOutline,
  mdiLogout,
  mdiStarOutline,
} from "@mdi/js";

export default function DropdownMenuAvatarDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          colorScheme="neutral"
          className="h-12 justify-start px-2 md:max-w-[200px]"
        >
          <Avatar>
            <AvatarImage src="/ThomasKelly.png" alt="thomas" />
            <AvatarFallback className="rounded-lg">TK</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Thomas</span>
            <span className="text-muted-foreground truncate text-xs">
              kell@sitecore.com
            </span>
          </div>
          <Icon
            path={mdiChevronDown}
            size={1.5}
            className="text-muted-foreground ml-auto"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="start"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src="/ThomasKelly.png" alt="Shadcn" />
              <AvatarFallback className="rounded-lg">TK</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">Thomas Kelly</span>
              <span className="text-muted-foreground truncate text-xs">
                kell@sitecore.com
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon path={mdiStarOutline} size={1.5} />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon path={mdiCheck} size={1.5} />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiCreditCardOutline} size={1.5} />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiBellOutline} size={1.5} />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Icon path={mdiLogout} size={1.5} />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
