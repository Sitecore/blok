import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Icon } from "@/lib/icon";
import { mdiAccount, mdiCog, mdiHome, mdiOpenInNew } from "@mdi/js";

export function NavigationSideDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Navigation(Side)</h2>
      <div className="flex w-full max-w-full gap-4">
      
      <div id="side-preview">
      <div className="flex h-[350px] w-full">
        <SidebarProvider>
          <Sidebar className="w-62">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>
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
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
      </div>
      </div>

      <div id="side-default">
      <div className="flex h-[350px] w-full">
          <SidebarProvider>
              <Sidebar className="w-62">
                  <SidebarContent>
                      <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton isActive>Home</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton>Profile</SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton disabled>Settings</SidebarMenuButton>
                            </SidebarMenuItem>
                      </SidebarMenu>
                  </SidebarContent>
              </Sidebar>
          </SidebarProvider>
        </div>
      </div>

      <div id="side-leading-icon">
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
      </div>

      <div id="side-trailing-icon">
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
      </div>

      <div id="side-icon-combination">
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
      </div>

      </div>
    </div>
  );
}