"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  StackNavigation,
  type StackNavigationElement,
  type StackNavigationItem,
} from "@/components/ui/stack-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiArchiveOutline,
  mdiClockOutline,
  mdiDotsHorizontal,
  mdiHistory,
  mdiLayers,
  mdiPencilOutline,
  mdiPlus,
  mdiTrashCanOutline,
  mdiViewDashboard,
} from "@mdi/js";
import { useState } from "react";

function ExpandableDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, marketers and developers can collaborate seamlessly to build engaging customer experiences. The platform offers advanced personalization capabilities, allowing businesses to deliver tailored content based on user behavior, preferences, and context. Sitecore's headless architecture enables content to be distributed across websites, mobile apps, IoT devices, and other digital touchpoints. The platform integrates with various marketing tools and analytics solutions, providing comprehensive insights into customer journeys and content performance. With robust security features, multi-language support, and scalable infrastructure, Sitecore helps enterprises deliver exceptional digital experiences that drive engagement, conversions, and customer loyalty. The platform's flexible deployment options, including cloud and on-premises solutions, ensure organizations can adapt to their specific needs and requirements.`;

  const truncatedText = fullText.substring(0, 200);
  const shouldTruncate = fullText.length > 200;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">Description</h3>
      <div className="relative">
        <p className="text-sm text-foreground">
          {isExpanded ? fullText : truncatedText}
        </p>
        {!isExpanded && shouldTruncate && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-center text-foreground hover:underline cursor-pointer font-semibold"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}

function TodoSection() {
  const [todoChecked, setTodoChecked] = useState(true);
  const [newTodoChecked, setNewTodoChecked] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">To do</h3>
      <div className="space-y-3">
        {/* Completed Todo Item */}
        <div className="flex items-center gap-2 group">
          <Checkbox
            checked={todoChecked}
            onCheckedChange={(checked) => setTodoChecked(checked === true)}
            className="shrink-0"
          />
          <span className="text-sm flex-1">
            <Badge size="sm" colorScheme="neutral" className="mr-1">
              @Anne Schmeler
            </Badge>
            please review
          </span>
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 text-muted-foreground hover:text-foreground"
            aria-label="Delete todo"
          >
            <Icon path={mdiTrashCanOutline} size={0.9} />
          </button>
        </div>

        {/* Add New Todo Input */}
        <div className="flex items-center gap-2">
          <Checkbox
            checked={newTodoChecked}
            onCheckedChange={(checked) => setNewTodoChecked(checked === true)}
            className="shrink-0"
          />
          <Input
            type="text"
            placeholder="Add new to-do, type @ to mention someone"
            className="flex-1 border-0 bg-transparent px-0 py-0 h-auto text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </div>
  );
}

function VersionsSection() {
  const versions = [
    {
      id: "v5",
      title: "Final + Typo fixes",
      version: "v5",
      status: "Published on Nov 17, 2024",
      icon: mdiClockOutline,
      iconBg: "bg-green-100 dark:bg-green-900",
      iconColor: "text-green-600 dark:text-green-400",
      isActive: true,
    },
    {
      id: "v4",
      title: "Final content",
      version: "v4",
      status: "Archived on Nov 16, 2024",
      icon: mdiArchiveOutline,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-600 dark:text-gray-400",
      isActive: false,
    },
    {
      id: "v3",
      title: "Idiation",
      version: "v3",
      status: "Last updated on Nov 3, 2024",
      icon: mdiPencilOutline,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-600 dark:text-gray-400",
      isActive: false,
    },
    {
      id: "v2",
      title: "initial design",
      version: "v2",
      status: "Last updated on Nov 1, 2024",
      icon: mdiPencilOutline,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-600 dark:text-gray-400",
      isActive: false,
    },
    {
      id: "v1",
      title: "First draft",
      version: "v1",
      status: "Last updated on Nov 1, 2024",
      icon: mdiPencilOutline,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      iconColor: "text-gray-600 dark:text-gray-400",
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Header with Create button */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Versions</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary text-sm"
        >
          <Icon path={mdiPlus} className="mr-1.5" size={0.9} />
          Create version
        </Button>
      </div>

      {/* Versions Accordion */}
      <Accordion type="single" collapsible className="w-full">
        {versions.map((version) => (
          <AccordionItem
            key={version.id}
            value={version.id}
            className={cn(
              version.isActive && "border border-primary rounded-md",
            )}
          >
            <AccordionTrigger
              className="px-3 py-3 hover:no-underline"
              actions={
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      className="h-6 w-6 p-1"
                    >
                      <Icon
                        path={mdiDotsHorizontal}
                        className="size-4 text-muted-foreground"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuItem>Archive</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              }
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                {/* Icon */}
                <div
                  className={cn(
                    "shrink-0 size-8 rounded-full flex items-center justify-center",
                    version.iconBg,
                  )}
                >
                  <Icon
                    path={version.icon}
                    className={cn("size-4", version.iconColor)}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 text-left">
                  <div className="flex items-baseline gap-2 mb-0.5 flex-wrap">
                    <span className="text-sm font-semibold text-foreground break-words">
                      {version.title}
                    </span>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {version.version}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground break-words">
                    {version.status}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-3 pb-3">
              <p className="text-sm text-muted-foreground">
                {version.id === "v5" &&
                  "This version includes final content review and correction of all typographical errors identified during the publishing process."}
                {version.id === "v4" &&
                  "Finalized content version with all approved changes and stakeholder feedback incorporated."}
                {version.id === "v3" &&
                  "Early iteration exploring different content approaches and ideation concepts."}
                {version.id === "v2" &&
                  "initial design and early content structure for review and feedback."}
                {version.id === "v1" &&
                  "First draft version created as the starting point for content development."}
              </p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

function UsageSection() {
  const usedByItems = [
    {
      label: "Product Hero Banner",
      language: "en-US",
      count: 3,
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      label: "Homepage Layout",
      language: "en-US",
      count: 2,
      status: "Published",
      statusColor: "success" as const,
      hasClockIcon: true,
    },
    {
      label: "Navigation Menu",
      language: "en-US",
      count: 1,
      status: "Published",
      statusColor: "success" as const,
      hasClockIcon: false,
    },
    {
      label: "Footer Component",
      language: "en-US",
      count: 4,
      status: "Queued",
      statusColor: "warning" as const,
    },
    {
      label: "Sidebar Widget",
      language: "en-US",
      count: 5,
      status: "Archived",
      statusColor: "neutral" as const,
    },
  ];

  const usingItems = [
    {
      label: "Button Component",
      language: "en-US",
      count: 2,
      status: "Published",
      statusColor: "success" as const,
      hasClockIcon: false,
    },
    {
      label: "Card Layout",
      language: "en-US",
      count: 1,
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      label: "Image Gallery",
      language: "en-US",
      count: 3,
      status: "Published",
      statusColor: "success" as const,
      hasClockIcon: true,
    },
    {
      label: "Text Block",
      language: "en-US",
      count: 1,
      status: "Queued",
      statusColor: "warning" as const,
    },
  ];

  return (
    <Tabs defaultValue="used-by" className="flex flex-col gap-4">
      <TabsList variant="soft-rounded" className="h-7">
        <TabsTrigger
          value="used-by"
          variant="soft-rounded"
          className="h-7 text-sm px-3"
        >
          Used by
        </TabsTrigger>
        <TabsTrigger
          value="using"
          variant="soft-rounded"
          className="h-7 text-sm px-3"
        >
          Using
        </TabsTrigger>
      </TabsList>

      {/* Description */}
      <p className="text-sm text-muted-foreground">
        All the items that this item is referenced in
      </p>

      {/* Usage Items List */}
      <TabsContent value="used-by" className="mt-0">
        <div className="flex flex-col">
          {usedByItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 first:pt-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {item.label} {item.language}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Used {item.count} {item.count === 1 ? "time" : "times"}
                </div>
              </div>
              <Badge
                size="sm"
                colorScheme={item.statusColor}
                className="shrink-0 ml-2"
              >
                {item.hasClockIcon && (
                  <Icon path={mdiClockOutline} className="size-3" />
                )}
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="using" className="mt-0">
        <div className="flex flex-col">
          {usingItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 first:pt-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground">
                  {item.label} {item.language}
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  Used {item.count} {item.count === 1 ? "time" : "times"}
                </div>
              </div>
              <Badge
                size="sm"
                colorScheme={item.statusColor}
                className="shrink-0 ml-2"
              >
                {item.hasClockIcon && (
                  <Icon path={mdiClockOutline} className="size-3" />
                )}
                {item.status}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}

function SidebarContent({ activeTab }: { activeTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    "/overview": (
      <div className="flex flex-col gap-6">
        {/* Description Section */}
        <ExpandableDescription />

        {/* To do Section */}
        <TodoSection />
      </div>
    ),
    "/versions": (
      <div className="flex flex-col gap-4">
        <VersionsSection />
      </div>
    ),
    "/usage": (
      <div className="flex flex-col gap-4">
        <UsageSection />
      </div>
    ),
  };

  return <>{tabContent[activeTab] || tabContent["/overview"]}</>;
}

export default function SidebarRHSHeadingWithTabsDemo() {
  const [activeTab, setActiveTab] = useState("/overview");

  const navigationItems: StackNavigationElement[] = [
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
          "min-w-12 w-fit h-9 px-1.5 py-0.5 gap-0.5 rounded-md cursor-pointer overflow-hidden",
          "text-neutral-fg hover:bg-sidebar-accent transition-colors font-medium",
          isActive &&
            "bg-neutral-bg text-neutral-fg hover:bg-neutral-bg hover:text-neutral-fg font-medium",
        )}
        onClick={() => handleTabClick(item.path)}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          aria-hidden="true"
          className="shrink-0 flex items-center justify-center w-[16px] h-[16px]"
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

  const customHeader = (
    <div className="flex-1 flex items-center">
      <StackNavigation
        items={navigationItems}
        orientation="horizontal"
        renderItem={renderTabItem}
        navClassName="justify-start gap-1"
        className="shadow-none h-auto"
      />
    </div>
  );

  return (
    <div className="h-screen">
      <SidebarRHSProvider>
        <div className="w-full h-full flex bg-body-bg">
          {/* Main content area */}
          <main className="flex-1 overflow-auto p-4">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Main Content Area</h2>
              <p className="text-muted-foreground">
                This sidebar demonstrates a header with stack navigation
                horizontal tabs. Click on the tabs in the sidebar header to see
                them in action.
              </p>
            </div>
          </main>

          {/* Sidebar */}
          <SidebarRHS
            header={customHeader}
            width="340px"
            minWidth="250px"
            maxWidth="600px"
            height="100%"
            collapsible={true}
            dockable={true}
          >
            <SidebarContent activeTab={activeTab} />
          </SidebarRHS>
        </div>
      </SidebarRHSProvider>
    </div>
  );
}
