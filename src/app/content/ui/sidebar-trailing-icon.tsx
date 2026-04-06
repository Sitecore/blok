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
                <SidebarMenuAction>
                  <Icon path={mdiOpenInNew} />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <span>Profile</span>
                </SidebarMenuButton>
                <SidebarMenuAction>
                  <Icon path={mdiOpenInNew} />
                </SidebarMenuAction>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton disabled>
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
  );
}
