"use client";

import { Icon } from "@/lib/icon";
import { mdiDotsGrid } from "@mdi/js";
import type { ReactNode } from "react";

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

export interface NavDropdownItem {
  id?: string;
  label: string;
  href: string;
}
export interface NavItem {
  id?: string;
  label: string;
  href?: string;
  isActive?: boolean;
  children?: NavDropdownItem[];
}

export interface LogoConfig {
  light: string;
  dark: string;
  alt?: string;
}

export interface MenuButtonConfig {
  icon?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

export interface RightSideItem {
  id: string;
  content: ReactNode;
}

/** Main Topbar component props */
export interface TopbarProps {
  logo?: LogoConfig;
  brandName?: string;
  navigation?: NavItem[];
  rightSideItems?: RightSideItem[];
  menuButton?: MenuButtonConfig | false;
  className?: string;
}

// MAIN COMPONENT
export default function Topbar({
  logo,
  brandName,
  navigation = [],
  rightSideItems = [],
  menuButton,
  className,
}: TopbarProps) {
  return (
    <header className={`border-b bg-body-bg ${className ?? ""}`}>
      <div className="flex h-16 items-center px-4">
        {/* Left section: Menu button + Logo + Brand */}
        <div className="flex items-center gap-4">
          {menuButton !== false && (
            <Button
              variant="ghost"
              size="icon"
              colorScheme="neutral"
              aria-label={menuButton?.ariaLabel ?? "Menu"}
              onClick={menuButton?.onClick}
            >
              <Icon path={menuButton?.icon ?? mdiDotsGrid} size={1} />
            </Button>
          )}
          <div className="flex items-center gap-1">
            {logo && (
              <span className="shrink-0">
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
            )}
            {brandName && (
              <span className="text-lg font-semibold">{brandName}</span>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        {navigation.length > 0 && (
          <NavigationMenu
            className="ml-6 md:inline-flex hidden"
            viewport={false}
          >
            <NavigationMenuList>
              {navigation.map((item) => (
                <NavigationMenuItem key={item.id ?? item.label}>
                  {item.children && item.children.length > 0 ? (
                    <>
                      <NavigationMenuTrigger>
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-2">
                          {item.children.map((child) => (
                            <li key={child.id ?? child.label}>
                              <NavigationMenuLink href={child.href}>
                                {child.label}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
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
          {rightSideItems.map((item) => (
            <div key={item.id}>{item.content}</div>
          ))}
        </div>
      </div>
    </header>
  );
}
