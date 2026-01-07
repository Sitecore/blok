import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Icon } from "@/lib/icon";
import { mdiHome, mdiAccount, mdiCog } from "@mdi/js";

export default function SidebarDemo() {
  return (
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
  );
}