import type {
  LogoConfig,
  MenuButtonConfig,
  NavItem,
} from "@/components/bloks/top-bar";
import { mdiDotsGrid } from "@mdi/js";

export const TOPBAR_DEMO_BRAND_NAME = "Blok";

export const mockTopbarLogo: LogoConfig = {
  light:
    "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore",
  dark: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore-dark",
  alt: "Logo",
};

export const mockTopbarNavigation: NavItem[] = [
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

export const mockTopbarMenuButton: MenuButtonConfig = {
  icon: mdiDotsGrid,
  onClick: () => {},
  ariaLabel: "Menu",
};
