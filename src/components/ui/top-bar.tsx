import { mdiDotsGrid, mdiHelpCircleOutline } from "@mdi/js";
import { Icon } from "@/lib/icon";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

// Types for navigation items
export interface NavDropdownItem {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  isActive?: boolean;
  children?: NavDropdownItem[];
}

// Logo configuration
export interface LogoConfig {
  light: string;
  dark: string;
  alt?: string;
}

// Avatar configuration
export interface AvatarConfig {
  src?: string;
  fallback: string;
}

// Main Topbar props
export interface TopbarProps {
  logo?: LogoConfig;
  /** Brand name displayed next to the logo */
  brandName?: string;
  menuIcon?: string;
  /** Callback when menu button is clicked */
  onMenuClick?: () => void;
  /** Navigation items to display */
  navigation?: NavItem[];
  /** Icon path for the help button (MDI icon path) */
  helpIcon?: string;
  onHelpClick?: () => void;
  showHelp?: boolean;
  avatar?: AvatarConfig;
  rightContent?: React.ReactNode;
  /** Additional class names for the header */
  className?: string;
}

// Default values
const defaultLogo: LogoConfig = {
  light: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore",
  dark: "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore-dark",
  alt: "Logo",
};

const defaultNavigation: NavItem[] = [
  { label: "Home", href: "#" },
  {
    label: "Content model",
    children: [
      { label: "Components", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Blocks", href: "#" },
    ],
  },
  { label: "Content", href: "#", isActive: true },
  { label: "Media", href: "#" },
  { label: "Settings", href: "#" },
];

const defaultAvatar: AvatarConfig = {
  fallback: "SC",
};

export default function Topbar({
  logo = defaultLogo,
  brandName = "Blok",
  menuIcon = mdiDotsGrid,
  onMenuClick,
  navigation = defaultNavigation,
  helpIcon = mdiHelpCircleOutline,
  onHelpClick,
  showHelp = true,
  avatar = defaultAvatar,
  rightContent,
  className,
}: TopbarProps) {
  return (
    <header className={`border-b bg-body-bg ${className ?? ""}`}>
      <div className="flex h-16 items-center px-4">
        {/* Left section: Menu button + Logo + Brand */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            colorScheme="neutral"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <Icon path={menuIcon} size={1} />
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-red-500">
              <img
                alt={logo.alt ?? "Logo"}
                className="shrink-0 grow-0 rounded-md object-cover object-left p-1 block dark:hidden"
                src={logo.light}
              />
              <img
                alt={logo.alt ?? "Logo"}
                className="shrink-0 grow-0 rounded-md object-cover object-left p-1 hidden dark:block"
                src={logo.dark}
              />
            </span>
            {brandName && (
              <span className="text-lg font-semibold">{brandName}</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        {navigation.length > 0 && (
          <NavigationMenu className="ml-6 md:inline-flex hidden">
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.label}>
                  {item.children ? (
                    // Dropdown navigation item
                    <>
                      <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                          {item.children.map((child) => (
                            <li key={child.label}>
                              <NavigationMenuLink href={child.href}>
                                {child.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    // Simple navigation link
                    <NavigationMenuLink
                      href={item.href}
                      className={`${navigationMenuTriggerStyle()}${item.isActive ? " active" : ""}`}
                    >
                      {item.label}
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Right section */}
        <div className="ml-auto flex items-center space-x-4">
          {rightContent ?? (
            <>
              {showHelp && (
                <Button
                  variant="ghost"
                  size="icon"
                  colorScheme="neutral"
                  aria-label="Help"
                  onClick={onHelpClick}
                >
                  <Icon path={helpIcon} size={1} />
                </Button>
              )}
              {avatar && (
                <Avatar className="h-8 w-8">
                  {avatar.src && <AvatarImage src={avatar.src} />}
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
