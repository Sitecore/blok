"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import { Badge } from "@/components/ui/badge";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  StackNavigation,
  type StackNavigationElement,
  type StackNavigationItem,
} from "@/components/ui/stack-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiChartBar,
  mdiContentCopy,
  mdiInformationOutline,
  mdiLayers,
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
          <label htmlFor="total-variants" className="text-xs uppercase text-muted-foreground">
            Total Variants
          </label>
          <div id="total-variants" className="flex items-baseline gap-2">
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
          <label htmlFor="sites" className="text-xs uppercase text-muted-foreground">
            Sites
          </label>
          <span id="sites" className="text-2xl font-bold text-foreground">3</span>
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
