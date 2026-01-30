import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { mdiHome, mdiAccount, mdiCog } from "@mdi/js";
import { Icon } from "@/lib/icon";

export function SidebarDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Sidebar</h2>
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
    </div>
  );
}