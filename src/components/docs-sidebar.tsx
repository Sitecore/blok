"use client"

import type { source } from "@/lib/source"
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
import { getBlocks, getComponents } from "@/lib/registry";
import { themingItems, graphicsItems } from "@/config/nav";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
import {
  Menu,
  X,
} from "lucide-react";

const componentItems = getComponents();
const blockItems = getBlocks();

// Sidebar width configuration
export const REGISTRY_SIDEBAR_WIDTH = "13rem";

export function MobileSidebarTrigger() {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Only show mobile trigger if sidebar should be visible
  const shouldShowSidebar = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/resources") || pathname.startsWith("/mcp")) {
      return false;
    }
    return pathname.startsWith("/docs") ||
           pathname.startsWith("/primitives") || 
           pathname.startsWith("/bloks") || 
           pathname.startsWith("/theming") || 
           pathname.startsWith("/graphics") ||
           pathname.startsWith("/registry");
  }, [pathname]);

  if (!shouldShowSidebar) {
    return null;
  }

  return (
    <div className="absolute top-8 right-4 md:hidden">
      <Button aria-label="Open menu" onClick={() => setOpenMobile(true)}>
        <Menu className="size-5" />
      </Button>
    </div>
  );
}

export function DocsSidebar({
  tree,
}: { tree: typeof source.pageTree }) {


  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  // Determine which sidebar content to show based on pathname
  const sidebarType = useMemo(() => {
    if (pathname === "/" || pathname.startsWith("/resources") || pathname.startsWith("/mcp")) {
      return null; // No sidebar for homepage, resources, or mcp
    }
    if (pathname.startsWith("/docs")) {
      return "docs";
    }
    if (pathname.startsWith("/primitives") || pathname.startsWith("/registry")) {
      return "components";
    }
    if (pathname.startsWith("/bloks")) {
      return "blocks";
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

      <SidebarContent className="ml-4">
        <ScrollArea className="h-full w-full pr-2">
          <SidebarMenu >
            {sidebarType === "docs" &&
              (tree.children || []).map((node) => {
                // Handle folder nodes
                if (node.type === 'folder' && node.children) {
                  return (
                    <div key={String(node.name)}>
                      <div className="px-2 py-2 text-sm font-semibold text-muted-foreground">
                        {node.name}
                      </div>
                      {node.children.filter((child) => child.type === 'page').map((child) => (
                        <SidebarMenuItem key={child.url}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname === child.url}
                            className="hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
                          >
                            <Link
                              onClick={() => setOpenMobile(false)}
                              href={child.url}
                            >
                              {child.name}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </div>
                  );
                }
                
                // Handle page nodes at root level
                if (node.type === 'page') {
                  return (
                    <SidebarMenuItem key={node.url}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === node.url}
                        className="hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
                      >
                        <Link
                          onClick={() => setOpenMobile(false)}
                          href={node.url}
                        >
                          {node.name}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                }
                
                return null;
              })}

            {sidebarType === "components" &&
              componentItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === `/registry/${item.name}`}
                    className="hover:bg-gray-100 hover:dark:bg-gray-700 hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={`/registry/${item.name}`}
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
                    isActive={pathname === `/registry/${item.name}`}
                    className="hover:bg-muted hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
                  >
                    <Link
                      onClick={() => setOpenMobile(false)}
                      href={`/registry/${item.name}`}
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
                    className="hover:bg-muted hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
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
                    className="hover:bg-muted hover:text-foreground data-[active=true]:text-primary data-[active=true]:bg-primary-background"
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
