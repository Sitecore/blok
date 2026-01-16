import {
  TopbarDefault,
} from "@/app/demo/[name]/ui/topbar-demos";

export const topbar = {
  name: "topbar",
  defaultComponent: <TopbarDefault />,
  usage: [
    `import Topbar, { type NavItem, type LogoConfig, type AvatarConfig, type HelpConfig } from "@/components/ui/top-bar";
import { mdiHelpCircleOutline } from "@mdi/js";`,

    `const logo: LogoConfig = {
  light: "https://example.com/logo-light.png",
  dark: "https://example.com/logo-dark.png",
  alt: "Logo",
};

const navigation: NavItem[] = [
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

const avatar: AvatarConfig = {
  src: "",
  fallback: "SC",
  alt: "User avatar",
};

const help: HelpConfig = {
  link: "https://doc.sitecore.com/",
  icon: mdiHelpCircleOutline,
};

<Topbar
  logo={logo}
  brandName="Blok"
  navigation={navigation}
  avatar={avatar}
  help={help}
/>`,
  ],
};
