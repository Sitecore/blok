"use client";

import {
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import { useDirection } from "@radix-ui/react-direction";

import { RegistryLogo } from "@/components/docsite/registry-logo";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/docsite/docsite-sidebar";
import { getBlocks, getComponents, getRegistryItem } from "@/lib/registry";
import { themingItems, graphicsItems } from "@/config/nav";

const componentItems = getComponents();
const blockItems = getBlocks();

// Sidebar width configuration
export const REGISTRY_SIDEBAR_WIDTH = "13rem";

export function MobileSidebarTrigger() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const direction = useDirection();

  // Only show mobile trigger if sidebar should be visible
  const shouldShowSidebar = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/resources") || pathname.startsWith("/mcp") || pathname.startsWith("/rtl")) {
      return false;
    }
    return (
      pathname.startsWith("/primitives") ||
      pathname.startsWith("/bloks") ||
      pathname.startsWith("/theming") ||
      pathname.startsWith("/graphics") ||
      pathname.startsWith("/registry")
    );
  }, [pathname]);

  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <div className={`absolute top-8 ${direction === "rtl" ? "left-4" : "right-4"} md:hidden`}>
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Menu className="size-5" />
      </Button>
    </div>
  );
}

export function RegistrySidebar() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();
  const direction = useDirection();

  // Determine which sidebar content to show based on pathname
  const sidebarType = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/resources") || pathname.startsWith("/mcp") || pathname.startsWith("/rtl")) {
      return null; // No sidebar for homepage, resources, mcp, or rtl
    }
    if (pathname.startsWith("/primitives")) {
      return "components";
    }
    if (pathname.startsWith("/bloks")) {
      return "blocks";
    }
    if (pathname.startsWith("/registry")) {
      const segments = pathname.split("/").filter(Boolean);
      const itemName = segments[segments.length - 1];

      if (itemName) {
        try {
          const item = getRegistryItem(itemName);

          if (
            item.type === "registry:block" ||
            item.type === "registry:component"
          ) {
            return "blocks";
          } else if (item.type === "registry:ui") {
            return "components";
          }
        } catch (error) {
          return "components";
        }
      }
      return "components";
    }
    if (pathname.startsWith("/theming")) {
      return "theming";
    }
    if (pathname.startsWith("/graphics")) {
      return "graphics";
    }
    return null;
  }, [pathname]);

  // Don't render sidebar if sidebarType is null
  if (!sidebarType) {
    return null;
  }

  return (
    <Sidebar
      side={direction === "rtl" ? "right" : "left"}
      collapsible="icon"
      className="[&>div[data-slot='sidebar-inner']]:bg-subtle-bg [&>div[data-mobile='true']]:bg-subtle-bg"
    >
      <SidebarHeader className="mb-3 pt-5">
        <div className="flex items-center justify-between px-2 py-2">
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar"
          >
            <X />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className={`${direction === "rtl" ? "mr-4" : "ml-4"} py-4`}>
        <ScrollArea className="h-full w-full pr-4">
          <SidebarMenu >
            {sidebarType === "components" &&
              componentItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/primitives/${item.name}`}
                    className="h-10 font-medium text-md text-neutral-fg hover:bg-gray-100 hover:dark:bg-gray-700 data-[active=true]:text-primary-fg data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={`/primitives/${item.name}`}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            {sidebarType === "blocks" &&
              blockItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/bloks/${item.name}`}
                    className="h-10 font-medium text-md text-neutral-fg hover:bg-gray-100 hover:dark:bg-gray-700 data-[active=true]:text-primary-fg data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={`/bloks/${item.name}`}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            {sidebarType === "theming" &&
              themingItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.path}
                    className="h-10 font-medium text-md text-neutral-fg hover:bg-gray-100 hover:dark:bg-gray-700 data-[active=true]:text-primary-fg data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

            {sidebarType === "graphics" &&
              graphicsItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.path}
                    className="h-10 font-medium text-md text-neutral-fg hover:bg-gray-100 hover:dark:bg-gray-700 data-[active=true]:text-primary-fg data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={item.path}
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
