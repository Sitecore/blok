import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuAction, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiCog, mdiHome, mdiOpenInNew } from "@mdi/js";

export default function SidebarIconCombinationDemo() {
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
                                <SidebarMenuAction>
                                    <Icon path={mdiOpenInNew} />
                                </SidebarMenuAction>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Icon path={mdiAccount} />
                                    <span>Profile</span>
                                </SidebarMenuButton>
                                <SidebarMenuAction>
                                    <Icon path={mdiOpenInNew} />
                                </SidebarMenuAction>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton disabled>
                                    <Icon path={mdiCog} />
                                    <span>Settings</span>
                                </SidebarMenuButton>
                                <SidebarMenuAction>
                                    <Icon path={mdiOpenInNew} />
                                </SidebarMenuAction>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarContent>
                </Sidebar>
            </SidebarProvider>
        </div>
    )
}