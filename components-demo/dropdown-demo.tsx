"use client";

import * as React from "react";
import {
  mdiAccountOutline,
  mdiBellOutline,
  mdiCreditCardOutline,
  mdiCogOutline,
  mdiChevronDown,
  mdiCheck,
  mdiDeleteOutline,
  mdiDotsHorizontal,
  mdiLogout,
  mdiPencilOutline,
  mdiShareOutline,
  mdiStarOutline,
} from "@mdi/js";
import { Icon } from "@/lib/icon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemDescription,
  DropdownMenuItemText,
  DropdownMenuItemTitle,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { mdiInformationOutline } from "@mdi/js";

type DescItem = {
  title: string;
  textValue: string;
  description: string;
};

const itemsAuthoring: DescItem[] = [
  {
    title: "XM Cloud",
    textValue: "XM Cloud",
    description:
      "Cloud-native Sitecore CMS with managed hosting, previews, and deployments.",
  },
  {
    title: "Component Builder",
    textValue: "Component Builder",
    description:
      "Front-end-as-a-service style guide and visual component prototyping for your brand.",
  },
  {
    title: "XMC Forms",
    textValue: "XMC Forms",
    description: "Design clear, on-brand forms for use directly on the page.",
  },
  {
    title: "Page builder",
    textValue: "Page builder",
    description:
      "Create and edit pages visually, with layout, content, and multi-user authoring in one place.",
  },
];

const itemsPlatform: DescItem[] = [
  {
    title: "Experience Edge",
    textValue: "Experience Edge",
    description:
      "Deliver structured content over GraphQL and the CDN for headless experiences.",
  },
  {
    title: "Blok",
    textValue: "Blok",
    description:
      "Sitecore design system for building consistent product experiences.",
  },
  {
    title: "Sitecore Search",
    textValue: "Sitecore Search",
    description:
      "Unified search across content and commerce to power discovery on your sites.",
  },
  {
    title: "Sitecore CDP",
    textValue: "Sitecore CDP",
    description:
      "Unify customer profiles and activate audiences across marketing channels.",
  },
];

export function DropdownDemo() {

  const [showStatusBar, setShowStatusBar] = React.useState(true);
  const [showActivityBar, setShowActivityBar] = React.useState(false);
  const [showPanel, setShowPanel] = React.useState(false);
  const [position, setPosition] = React.useState("bottom");

  return (
    <div className="flex w-full max-w-full gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Dropdown</h2>
      <div id="dropdown-default">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" colorScheme="neutral">
            Open
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Keyboard shortcuts
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem>
              New Team
              <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>GitHub</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuItem disabled>API</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <div id="dropdown-checkboxes">
      {/* Checkboxes */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" colorScheme="neutral">
          Checkboxes
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <Icon path={mdiAccountOutline} size={1.5} /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiCreditCardOutline} size={1.5} /> Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Icon path={mdiCogOutline} size={1.5} /> Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showStatusBar}
            onCheckedChange={setShowStatusBar}
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showActivityBar}
            onCheckedChange={setShowActivityBar}
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={showPanel}
            onCheckedChange={setShowPanel}
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Icon path={mdiLogout} size={1.5} /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>

    <div id="dropdown-radio-group">
      {/* Radio Group */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" colorScheme="neutral">
          Radio Group
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel inset>Panel Position</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right" disabled>
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>

    <div id="dropdown-avatar">
      {/* Avatar */}
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
    </div>

    <div id="dropdown-avatar-only">
      {/* Avatar only */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          colorScheme="neutral"
          className="size-8 rounded-full border-none p-0"
        >
          <Avatar>
            <AvatarImage src="/ArshadHannan.svg" alt="arshadHannan" />
            <AvatarFallback className="rounded-lg">AH</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56"
        align="start"
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar>
              <AvatarImage src="/ArshadHannan.svg" alt="arshadHannan" />
              <AvatarFallback className="rounded-lg">AR</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">arshad</span>
              <span className="text-muted-foreground truncate text-xs">
                arshad@sitecore.com
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
    </div>

    <div id="dropdown-icon-only">
      {/* Icon only */}
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" colorScheme="neutral" size="icon" aria-label="Toggle menu">
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
    </div>

    <div id="dropdown-with-description">
    <div className="flex flex-wrap items-start gap-8">
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" colorScheme="neutral">
              XM Cloud Authoring
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[22rem]">
            <DropdownMenuGroup>
              {itemsAuthoring.map(({ title, textValue, description }) => (
                <DropdownMenuItem
                  key={textValue}
                  className="py-2"
                  textValue={textValue}
                >
                  <DropdownMenuItemText>
                    <DropdownMenuItemTitle>{title}</DropdownMenuItemTitle>
                    <DropdownMenuItemDescription>
                      {description}
                    </DropdownMenuItemDescription>
                  </DropdownMenuItemText>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" colorScheme="neutral">
              Platform & Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[22rem]">
            <DropdownMenuGroup>
              {itemsPlatform.map(({ title, textValue, description }) => (
                <DropdownMenuItem
                  key={textValue}
                  className="py-2"
                  textValue={textValue}
                >
                  <Icon
                    path={mdiInformationOutline}
                    size={1}
                    className="size-5 shrink-0 text-subtle-text"
                  />
                  <DropdownMenuItemText>
                    <DropdownMenuItemTitle>{title}</DropdownMenuItemTitle>
                    <DropdownMenuItemDescription>
                      {description}
                    </DropdownMenuItemDescription>
                  </DropdownMenuItemText>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
    </div>

  </div>
  );
}