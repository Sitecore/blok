'use client'

import { blockItems, uiItems, themeItems } from "@/lib/registry-items";
import { cn } from "@/registry/new-york/lib/utils";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/registry/new-york/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AppSidebar() {
    const pathname = usePathname();

    // Dynamically generate the sidebar items based on the registry
    const items =
        (pathname.startsWith("/blocks") && blockItems) ||
        (pathname.startsWith("/theming") && themeItems) ||
        uiItems;

    return (
        <Sidebar className="w-[200px] bg-[#f7f7f7] py-6 px-2">
            <SidebarContent className="flex-1 overflow-y-auto scrollbar-hidden">
                <SidebarMenu className="space-y-2">
                    {items.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    className={cn(
                                        "rounded-md px-2.5",
                                        "hover:bg-primary-background hover:text-primary-fg active:bg-primary-background active:text-primary-fg",
                                        isActive && "bg-primary-background text-primary-fg"
                                    )}
                                    asChild
                                >
                                    <Link href={item.href} className="text-md font-medium">{item.label}</Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}