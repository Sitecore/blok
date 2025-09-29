import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { mdiHome, mdiAccount, mdiCog } from "@mdi/js";
import { Icon } from "@/lib/icon";

export const sidebar = {
  name: "sidebar",
  components: {
    Default: (
      <div className="flex h-[350px] w-full">
        <SidebarProvider>
          <Sidebar className="w-64 px-2 py-6">
            <SidebarHeader>
              <div className="py-1.5 text-sm font-semibold uppercase text-subtle-text">Navigation</div>
            </SidebarHeader>
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
                  <SidebarMenuButton>
                    <Icon path={mdiCog} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
    ),
  },
};
