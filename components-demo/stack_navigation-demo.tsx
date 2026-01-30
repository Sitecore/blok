"use client";

import { useState } from "react";

import {
  StackNavigation,
  type StackNavigationElement,
  type StackNavigationItem,
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { mdiAccountMultipleOutline, mdiArchiveOutline, mdiCogOutline, mdiFileOutline, mdiHomeVariantOutline, mdiViewDashboard, mdiHistory, mdiLayers } from "@mdi/js";
import { cn } from "@/lib/utils";

const navigationItems: StackNavigationElement[] = [
  {
    name: "Home",
    path: "/demo/stack-navigation",
    icon: <Icon path={mdiHomeVariantOutline} />,
  },
  {
    name: "User management",
    path: "/user",
    icon: <Icon path={mdiAccountMultipleOutline} />,
  },
  {
    name: "Documents",
    path: "/documents",
    icon: <Icon path={mdiFileOutline} />,
  },
  {
    name: "Archive",
    path: "/archive",
    icon: <Icon path={mdiArchiveOutline} />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Icon path={mdiCogOutline} />,
  },
];


export function StackNavigationDemo  (){

  const [activeTab, setActiveTab] = useState("/overview");
  const navigationItemsTabs: StackNavigationElement[] = [
    {
      name: "Overview",
      path: "/overview",
      icon: <Icon path={mdiViewDashboard} />,
    },
    {
      name: "Versions",
      path: "/versions",
      icon: <Icon path={mdiHistory} />,
    },
    {
      name: "Usage",
      path: "/usage",
      icon: <Icon path={mdiLayers} />,
    },
  ];
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };
  const renderTabItem = (item: StackNavigationItem) => {
    const isActive = activeTab === item.path;
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center",
          "min-w-14 w-fit h-14 p-1.5 gap-1 rounded-md cursor-pointer overflow-hidden",
          "text-neutral-fg hover:bg-sidebar-accent transition-colors font-medium",
          isActive &&
            "bg-primary-bg text-primary-fg hover:bg-primary-bg hover:text-primary-fg font-medium"
        )}
        onClick={() => handleTabClick(item.path)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center w-[22px] h-[22px]"
        >
          {item.icon}
        </div>
        <span
          className="text-3xs text-center whitespace-nowrap leading-tight"
          title={item.name}
        >
          {item.name}
        </span>
      </div>
    );
  };
  const tabContent: Record<string, React.ReactNode> = {
    "/overview": (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Overview</h3>
        <p className="text-sm text-muted-foreground">
          This is the overview content. Here you can see a summary of all the
          important information.
        </p>
      </div>
    ),
    "/versions": (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Versions</h3>
        <p className="text-sm text-muted-foreground">
          This is the versions content. View and manage different versions of
          your project.
        </p>
      </div>
    ),
    "/usage": (
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2">Usage</h3>
        <p className="text-sm text-muted-foreground">
          This is the usage content. Learn how to use this component
          effectively.
        </p>
      </div>
    ),
  };
  
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Stack Navigation</h2>
      <div className="flex w-full max-w-full gap-4">
        <div id="stack-navigation-vertical">
          <StackNavigation
            items={navigationItems}
          />
        </div>
  <br />
        <div id="stack-navigation-horizontal">
          <StackNavigation
            items={navigationItems}
            orientation="horizontal"
          />
        </div>
  <br />
        <div id="stack-navigation-horizontal-tabs">
          <div className="w-full border rounded-md bg-background overflow-hidden">
            <div className="border-b">
              <StackNavigation
                items={navigationItemsTabs}
                orientation="horizontal"
                renderItem={renderTabItem}
                navClassName="justify-start"
                className="shadow-none"
              />
            </div>
            <div className="w-full">{tabContent[activeTab]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

