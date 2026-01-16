"use client";

import Topbar, {
  type NavItem,
  type LogoConfig,
  type AvatarConfig,
  type HelpConfig,
} from "@/components/ui/top-bar";
import { mdiHelpCircleOutline } from "@mdi/js";

const defaultLogo: LogoConfig = {
  light: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore",
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

const defaultAvatar: AvatarConfig = {
  src: "",
  fallback: "SC",
  alt: "User avatar",
  onClick: () => {},
};

const defaultHelp: HelpConfig = {
  link: "https://doc.sitecore.com/",
  icon: mdiHelpCircleOutline,
};

export function TopbarDefault() {
  return (
    <Topbar
      logo={defaultLogo}
      brandName="Blok"
      navigation={defaultNavigation}
      avatar={defaultAvatar}
      help={defaultHelp}
      onMenuClick={() => {}}
    />
  );
}

