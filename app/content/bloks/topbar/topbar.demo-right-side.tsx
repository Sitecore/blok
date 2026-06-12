"use client";

import type { RightSideItem } from "@/components/bloks/top-bar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { mdiHelpCircleOutline } from "@mdi/js";

export function createTopbarDemoRightSideItems(): RightSideItem[] {
  return [
    {
      id: "help",
      content: (
        <Button
          variant="ghost"
          size="icon"
          colorScheme="neutral"
          aria-label="Help"
          asChild
        >
          <a href="https://doc.sitecore.com/">
            <Icon path={mdiHelpCircleOutline} size={1} />
          </a>
        </Button>
      ),
    },
    {
      id: "avatar",
      content: (
        <Avatar className="h-8 w-8 cursor-pointer" onClick={() => {}}>
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      ),
    },
  ];
}
