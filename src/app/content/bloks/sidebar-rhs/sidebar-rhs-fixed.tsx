"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import { StackNavigation } from "@/components/ui/stack-navigation";
import { useState } from "react";

import {
  DEMO_SIDEBAR_DOCKABLE,
  EXAMPLE_HEIGHT,
  InfoSection,
  UsageSection,
  navigationItems,
} from "./sidebar-rhs-tab-content";

function SidebarContent({ activeTab }: { activeTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    "/overview": (
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold">Description</h3>
        <p className="text-sm text-foreground">
          A fixed sidebar stays open with no collapse control or left-edge
          resize interaction.
        </p>
      </div>
    ),
    "/usage": <UsageSection />,
    "/comments": (
      <p className="text-sm text-muted-foreground">Comments tab content.</p>
    ),
    "/info": <InfoSection />,
  };

  return <>{tabContent[activeTab] || tabContent["/overview"]}</>;
}

export default function SidebarRHSFixedDemo() {
  const [activeTab, setActiveTab] = useState("/overview");

  const stackedNavigationHeader = (
    <StackNavigation
      items={navigationItems}
      orientation="horizontal"
      colorScheme="neutral"
      pathname={activeTab}
      onItemClick={(item, event) => {
        event.preventDefault();
        setActiveTab(item.path);
        return false;
      }}
      navClassName="justify-start gap-1"
      className="shadow-none h-auto bg-transparent p-0 w-full"
    />
  );

  return (
    <div className={`${EXAMPLE_HEIGHT} w-full shrink-0 overflow-hidden`}>
      <SidebarRHSProvider>
        <div className={`flex w-full ${EXAMPLE_HEIGHT} bg-body-bg`}>
          {/* Main content area */}
          <main className="flex-1 overflow-auto bg-subtle-bg p-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Main Content Area</h2>
              <p className="text-muted-foreground">
                Fixed sidebar — always visible with no collapse or resize
                controls.
              </p>
            </div>
          </main>

          {/* Sidebar */}
          <SidebarRHS
            header={stackedNavigationHeader}
            width="340px"
            minWidth="250px"
            maxWidth="600px"
            height="100%"
            collapsible={false}
            dockable={DEMO_SIDEBAR_DOCKABLE}
          >
            <SidebarContent activeTab={activeTab} />
          </SidebarRHS>
        </div>
      </SidebarRHSProvider>
    </div>
  );
}
