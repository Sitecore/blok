import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiCog, mdiHome } from "@mdi/js";

export default function SidebarLeadingIconDemo() {
    return (
        <div className="flex h-[350px] w-full">
            <SidebarProvider>
                <Sidebar className="w-62">
                    <SidebarContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive>
                                    <Icon path={mdiHome} />
                                    <span>Home</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Icon path={mdiAccount} />
                                    <span>Profile</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton disabled>
                                    <Icon path={mdiCog} />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    )
}