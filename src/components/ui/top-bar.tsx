import { mdiDotsGrid, mdiHelpCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

export default function Topbar() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" colorScheme="neutral">
            <Icon path={mdiDotsGrid} size={1} />
          </Button>
          <div className="flex items-center gap-1">
            <span className="text-xl font-bold text-red-500">
              <img
                alt="Logo"
                className="flex-shrink-0 flex-grow-0 rounded-md object-cover object-left p-1"
                src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore"
              />
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <NavigationMenu className="ml-6 md:inline-flex hidden">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Content model</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2">
                  <li>
                    <NavigationMenuLink href="#">Components</NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#">
                      Documentation
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#">Blocks</NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className={`${navigationMenuTriggerStyle()} active`}
              >
                Content
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                Media
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="#"
                className={navigationMenuTriggerStyle()}
              >
                Settings
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Button variant="ghost" size="icon" colorScheme="neutral">
            <Icon path={mdiHelpCircleOutline} size={1} />
          </Button>
          <Avatar className="h-8 w-8">
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
