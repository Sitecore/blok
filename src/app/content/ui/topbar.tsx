"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Topbar, {
  type NavItem,
  type LogoConfig,
  type RightSideItem,
  type MenuButtonConfig,
} from "@/components/ui/top-bar";
import { Icon } from "@/lib/icon";
import { mdiDotsGrid, mdiHelpCircleOutline } from "@mdi/js";

const defaultLogo: LogoConfig = {
  light:
    "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore",
  dark: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore-dark",
  alt: "Logo",
};

const defaultNavigation: NavItem[] = [
  { id: "home", label: "Home", href: "#" },
  {
    id: "content-model",
    label: "Content model",
    children: [
      { id: "components", label: "Components", href: "#" },
      { id: "documentation", label: "Documentation", href: "#" },
      { id: "blocks", label: "Blocks", href: "#" },
    ],
  },
  { id: "content", label: "Content", href: "#", isActive: true },
  { id: "media", label: "Media", href: "#" },
  { id: "settings", label: "Settings", href: "#" },
];

const defaultRightSideItems: RightSideItem[] = [
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

const defaultMenuButton: MenuButtonConfig = {
  icon: mdiDotsGrid,
  onClick: () => {},
  ariaLabel: "Menu",
};

export default function TopbarDemo() {
  return (
    <Topbar
      logo={defaultLogo}
      brandName="Blok"
      navigation={defaultNavigation}
      rightSideItems={defaultRightSideItems}
      menuButton={defaultMenuButton}
    />
  );
}
