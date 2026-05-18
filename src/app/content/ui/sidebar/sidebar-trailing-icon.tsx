import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Icon } from "@/lib/icon";
import { mdiOpenInNew } from "@mdi/js";

export default function SidebarTrailingIconDemo() {
  return (
    <div className="flex h-[350px] w-full">
      <SidebarProvider>
        <Sidebar className="w-62">
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <span>Home</span>
                </SidebarMenuButton>
                <SidebarMenuAction aria-label="open home in new tab">
                  <Icon path={mdiOpenInNew} />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Profile</span>
                </SidebarMenuButton>
                <SidebarMenuAction aria-label="open profile in new tab">
                  <Icon path={mdiOpenInNew} />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
                  <span>Settings</span>
                </SidebarMenuButton>
                <SidebarMenuAction aria-label="open settings in new tab">
                  <Icon path={mdiOpenInNew} />
                </SidebarMenuAction>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
}
