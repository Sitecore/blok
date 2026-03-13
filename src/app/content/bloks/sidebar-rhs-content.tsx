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
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
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
  mdiChartBar,
  mdiClockOutline,
  mdiContentCopy,
  mdiDotsHorizontal,
  mdiInformationOutline,
  mdiLayers,
  mdiPencilOutline,
  mdiPlus,
  mdiTrashCanOutline,
  mdiViewDashboard,
  mdiViewListOutline,
} from "@mdi/js";
import { useState } from "react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  // Insights chart data
  const insightsChartData = [
    { channel: "sitename", instances: 80, fill: "var(--chart-1)" },
    { channel: "green-everbloo", instances: 80, fill: "var(--chart-1)" },
    { channel: "sunstone-cliffs", instances: 65, fill: "var(--chart-1)" },
    { channel: "whisperwind-p", instances: 65, fill: "var(--chart-1)" },
    { channel: "shadowbrook", instances: 45, fill: "var(--chart-1)" },
    { channel: "silverleaf-glade", instances: 45, fill: "var(--chart-1)" },
    { channel: "emberg glow-for", instances: 30, fill: "var(--chart-1)" },
    { channel: "frostpeak-mou", instances: 30, fill: "var(--chart-1)" },
    { channel: "thunderclap-m", instances: 18, fill: "var(--chart-1)" },
    { channel: "starlight-citadel", instances: 12, fill: "var(--chart-1)" },
  ];

  const insightsChartConfig = {
    instances: {
      label: "Instances",
      color: "var(--chart-1)",
    },
    sitename: {
      label: "{SiteName}",
      color: "var(--chart-1)",
    },
    "green-everbloo": {
      label: "Green Everbloo...",
      color: "var(--chart-1)",
    },
    "sunstone-cliffs": {
      label: "Sunstone Cliffs",
      color: "var(--chart-1)",
    },
    "whisperwind-p": {
      label: "Whisperwind P...",
      color: "var(--chart-1)",
    },
    shadowbrook: {
      label: "Shadowbrook...",
      color: "var(--chart-1)",
    },
    "silverleaf-glade": {
      label: "Silverleaf Glade",
      color: "var(--chart-1)",
    },
    "emberg glow-for": {
      label: "Emberglow For...",
      color: "var(--chart-1)",
    },
    "frostpeak-mou": {
      label: "Frostpeak Mou...",
      color: "var(--chart-1)",
    },
    "thunderclap-m": {
      label: "Thunderclap M...",
      color: "var(--chart-1)",
    },
    "starlight-citadel": {
      label: "Starlight Citadel",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  // Sites chart data
  const sitesChartData = [
    { site: "production", instances: 85, fill: "var(--chart-1)" },
    { site: "staging", instances: 70, fill: "var(--chart-1)" },
    { site: "development", instances: 55, fill: "var(--chart-1)" },
    { site: "qa", instances: 40, fill: "var(--chart-1)" },
    { site: "demo", instances: 25, fill: "var(--chart-1)" },
  ];

  const sitesChartConfig = {
    instances: {
      label: "Instances",
      color: "var(--chart-1)",
    },
    production: {
      label: "Production",
      color: "var(--chart-1)",
    },
    staging: {
      label: "Staging",
      color: "var(--chart-1)",
    },
    development: {
      label: "Development",
      color: "var(--chart-1)",
    },
    qa: {
      label: "QA",
      color: "var(--chart-1)",
    },
    demo: {
      label: "Demo",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  return (
    <Tabs defaultValue="insights" className="flex flex-col gap-4">
      <TabsList variant="soft-rounded" className="h-7">
        <TabsTrigger
          value="insights"
          variant="soft-rounded"
          className="h-7 text-sm px-3"
        >
          <Icon path={mdiChartBar} size={1.2} />
          Insights
        </TabsTrigger>
        <TabsTrigger
          value="sites"
          variant="soft-rounded"
          className="h-7 text-sm px-3"
        >
          <Icon path={mdiViewListOutline} size={1.2} />
          Sites
        </TabsTrigger>
      </TabsList>

      {/* Insights Tab Content */}
      <TabsContent value="insights" className="mt-0">
        <div className="flex flex-col gap-6">
          {/* Total Rendered Instances */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-muted-foreground">
              Total Rendered Instances
            </label>
            <span className="text-2xl font-bold text-foreground">240</span>
          </div>

          {/* Rendered Instances Per Channel Chart */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase text-muted-foreground">
              Rendered Instances Per Channel
            </label>
            <ChartContainer
              config={insightsChartConfig}
              className="h-[400px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={insightsChartData}
                layout="vertical"
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <YAxis
                  dataKey="channel"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={120}
                  tickFormatter={(value) =>
                    insightsChartConfig[
                      value as keyof typeof insightsChartConfig
                    ]?.label || value
                  }
                  className="text-xs"
                />
                <XAxis
                  dataKey="instances"
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="instances"
                  layout="vertical"
                  radius={4}
                  fill="var(--chart-1)"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </TabsContent>

      {/* Sites Tab Content */}
      <TabsContent value="sites" className="mt-0">
        <div className="flex flex-col gap-6">
          {/* Total Sites */}
          <div className="flex flex-col gap-1">
            <label className="text-xs uppercase text-muted-foreground">
              Total Sites
            </label>
            <span className="text-2xl font-bold text-foreground">5</span>
          </div>

          {/* Instances Per Site Chart */}
          <div className="flex flex-col gap-3">
            <label className="text-xs uppercase text-muted-foreground">
              Instances Per Site
            </label>
            <ChartContainer
              config={sitesChartConfig}
              className="h-[300px] w-full"
            >
              <BarChart
                accessibilityLayer
                data={sitesChartData}
                layout="vertical"
                margin={{
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                }}
              >
                <YAxis
                  dataKey="site"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  width={100}
                  tickFormatter={(value) =>
                    sitesChartConfig[value as keyof typeof sitesChartConfig]
                      ?.label || value
                  }
                  className="text-xs"
                />
                <XAxis
                  dataKey="instances"
                  type="number"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  className="text-xs"
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="instances"
                  layout="vertical"
                  radius={4}
                  fill="var(--chart-1)"
                />
              </BarChart>
            </ChartContainer>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}

function InfoSection() {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Details Title */}
      <h3 className="text-base font-semibold text-foreground">Details</h3>
      {/* Label */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Label</label>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">The label</span>
          <button
            onClick={() => handleCopy("The label")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy to clipboard"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </button>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Name</label>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Value</span>
          <button
            onClick={() => handleCopy("Value")}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy to clipboard"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </button>
        </div>
      </div>

      {/* Created by */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Created by</label>
        <span className="text-sm font-medium text-foreground">Value</span>
      </div>

      {/* Created */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Created</label>
        <span className="text-sm font-medium text-foreground">
          Person, Date
        </span>
      </div>

      {/* Updated */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Updated</label>
        <span className="text-sm font-medium text-foreground">
          Person, Date
        </span>
      </div>
    </div>
  );
}

function StatisticsSection() {
  return (
    <div className="flex flex-col gap-4">
      {/* Statistics Grid */}
      <div className="grid grid-cols-[auto_auto] gap-4">
        {/* Total Variants */}
        <div className="flex flex-col gap-1 min-w-0">
          <label className="text-xs uppercase text-muted-foreground">
            Total Variants
          </label>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground shrink-0">
              18
            </span>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge
                size="sm"
                colorScheme="neutral"
                className="text-xs whitespace-nowrap"
              >
                3 Draft
              </Badge>
              <Badge
                size="sm"
                colorScheme="success"
                className="text-xs whitespace-nowrap"
              >
                3 Active
              </Badge>
            </div>
          </div>
        </div>

        {/* Sites */}
        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-xs uppercase text-muted-foreground">
            Sites
          </label>
          <span className="text-2xl font-bold text-foreground">3</span>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ activeTab }: { activeTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    "/overview": (
      <div className="flex flex-col gap-6">
        {/* Statistics Section */}
        <StatisticsSection />

        {/* Description Section */}
        <ExpandableDescription />
      </div>
    ),
    "/usage": (
      <div className="flex flex-col gap-4">
        <UsageSection />
      </div>
    ),
    "/info": (
      <div className="flex flex-col gap-4">
        <InfoSection />
      </div>
    ),
  };

  return <>{tabContent[activeTab] || tabContent["/overview"]}</>;
}

export default function SidebarRHSContentDemo() {
  const [activeTab, setActiveTab] = useState("/overview");

  const navigationItems: StackNavigationElement[] = [
    {
      name: "Overview",
      path: "/overview",
      icon: <Icon path={mdiViewDashboard} />,
    },
    {
      name: "Usage",
      path: "/usage",
      icon: <Icon path={mdiLayers} />,
    },
    {
      name: "Info",
      path: "/info",
      icon: <Icon path={mdiInformationOutline} />,
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
    <div className="h-[550px]">
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
