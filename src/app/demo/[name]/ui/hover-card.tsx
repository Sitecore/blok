import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { mdiCalendar } from "@mdi/js";
import { Icon } from "@/lib/icon";

export const hoverCard = {
  name: "hover-card",
  components: {
    Default: (
      <HoverCard>
        <HoverCardTrigger asChild>
          <Button variant="link">@blok</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80" side="right">
          <div className="flex space-x-5">
            <Avatar>
              <AvatarImage src="/favicon.svg" />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-foreground">Blok</h4>
              <p className="text-sm text-muted-foreground">
                The Sitecore design system
              </p>
              <div className="mt-1 flex items-center gap-2">
                <Icon
                  path={mdiCalendar}
                  className="text-muted-foreground size-5"
                />
                <span className="text-muted-foreground text-xs">
                  Created October 2025
                </span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    ),
  },
};
