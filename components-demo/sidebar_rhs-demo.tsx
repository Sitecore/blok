"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
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
  import {
    Editable,
    EditablePreview,
    EditableTextarea,
  } from "@/components/ui/editable";
  import { Input } from "@/components/ui/input";
  import {
    SearchInput,
    SearchInputField,
    SearchInputLeftElement,
  } from "@/components/ui/search-input";
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
    mdiCommentOutline,
    mdiContentCopy,
    mdiDotsHorizontal,
    mdiHistory,
    mdiInformationOutline,
    mdiLayers,
    mdiMagnify,
    mdiPencilOutline,
    mdiPlus,
    mdiReplyOutline,
    mdiTrashCanOutline,
    mdiViewDashboard,
    mdiViewListOutline,
  } from "@mdi/js";
  import { useState } from "react";
  import { Bar, BarChart, XAxis, YAxis } from "recharts";

function SidebarContent() {
    return (
      <div className="flex flex-col gap-4">
        <Card>
          <CardHeader className="border-b-0 pb-0">
            <CardTitle>Sidebar Content</CardTitle>
            <CardDescription>
              This sidebar uses a simple heading in the header
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The header contains just a simple title text, which is the default
              behavior for the sidebar component.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

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

  function OverviewSection() {
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

  function SidebarContentTabs({ activeTab }: { activeTab: string }) {
    const tabContent: Record<string, React.ReactNode> = {
      "/overview": (
        <div className="flex flex-col gap-6">
          {/* Description Section */}
          <ExpandableDescription />
          {/* To do Section */}
          <OverviewSection />
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
  
  function CommentsSection() {
    const [comments, setComments] = useState([
      {
        id: "1",
        author: "Thomas Kelly",
        avatar: "/ThomasKelly.png",
        avatarFallback: "TK",
        timestamp: "Yesterday",
        text: "This looks great! I think we should consider adding more context here to help users understand the flow better.",
      },
      {
        id: "2",
        author: "Christian Hahn",
        avatar: "/ChristianHahn.png",
        avatarFallback: "CH",
        timestamp: "8 hours ago",
        text: "Agreed, let's move forward with this approach.",
      },
      {
        id: "3",
        author: "Thomas Kelly",
        avatar: "/ThomasKelly.png",
        avatarFallback: "TK",
        timestamp: "10 minutes ago",
        text: "Can we schedule a follow-up meeting?",
      },
      {
        id: "4",
        author: "Christian Hahn",
        avatar: "/ChristianHahn.png",
        avatarFallback: "CH",
        timestamp: "9 minutes ago",
        text: "Actually, let me check the requirements first and get back to you.",
      },
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const handleEdit = (id: string, newText: string) => {
      setComments(
        comments.map((comment) =>
          comment.id === id ? { ...comment, text: newText } : comment,
        ),
      );
      setEditingId(null);
    };
    const handleDelete = (id: string) => {
      setComments(comments.filter((comment) => comment.id !== id));
    };
    const handleStartEdit = (id: string) => {
      setEditingId(id);
    };
    const handleCancelEdit = () => {
      setEditingId(null);
    };
    return (
      <div className="flex flex-col gap-4">
        {comments.map((comment) => {
          const isEditing = editingId === comment.id;
          return (
            <div key={comment.id} className="flex gap-3">
              {/* Avatar */}
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs">
                  {comment.avatarFallback}
                </AvatarFallback>
              </Avatar>
              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                {/* Name and Timestamp Row */}
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {comment.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {comment.timestamp}
                  </span>
                  <div className="flex items-center gap-1 ml-auto">
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors p-1"
                      aria-label="Reply"
                    >
                      <Icon path={mdiReplyOutline} className="size-4" />
                    </button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                          aria-label="More options"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Icon path={mdiDotsHorizontal} className="size-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleStartEdit(comment.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(comment.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Comment Text - Editable only when Edit is clicked */}
                {isEditing ? (
                  <Editable
                    defaultValue={comment.text}
                    onSubmit={(value) => handleEdit(comment.id, value)}
                    onCancel={handleCancelEdit}
                    submitOnBlur={true}
                    startWithEditView={true}
                  >
                    <EditablePreview className="text-sm text-foreground" />
                    <EditableTextarea className="text-sm w-full min-h-[60px] resize-none" />
                  </Editable>
                ) : (
                  <p className="text-sm text-foreground">{comment.text}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
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

  function SidebarContentBrief({ activeTab }: { activeTab: string }) {
    const tabContent: Record<string, React.ReactNode> = {
      "/overview": (
        <div className="flex flex-col gap-6">
          {/* Description Section */}
          <ExpandableDescription />
          {/* To do Section */}
          <OverviewSection />
        </div>
      ),
      "/comments": (
        <div className="flex flex-col gap-4">
          <CommentsSection />
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

  function UsageSectionBriefType() {
    const [searchQuery, setSearchQuery] = useState("");
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
    const filteredItems = usedByItems.filter((item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return (
      <div className="flex flex-col gap-4">
        {/* Title */}
        <h3 className="text-base font-semibold text-foreground">
          Briefs that are using this brief type
        </h3>
        {/* Search Input */}
        <SearchInput>
          <SearchInputLeftElement>
            <Icon path={mdiMagnify} />
          </SearchInputLeftElement>
          <SearchInputField
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchInput>
        {/* Items List */}
        <div className="flex flex-col">
          {filteredItems.map((item, index) => (
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
      </div>
    );
  }

  function SidebarContentBriefType({ activeTab }: { activeTab: string }) {
    const tabContent: Record<string, React.ReactNode> = {
      "/overview": (
        <div className="flex flex-col gap-6">
          {/* Description Section */}
          <ExpandableDescription />
        </div>
      ),
      "/usage": (
        <div className="flex flex-col gap-4">
          <UsageSectionBriefType />
        </div>
      ),
      "/comments": (
        <div className="flex flex-col gap-4">
          <CommentsSection />
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

  function UsageSectionContent() {
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

  function SidebarContentContent({ activeTab }: { activeTab: string }) {
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
          <UsageSectionContent />
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


export function SidebarRHSDemo() {

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
  

    const navigationItemsBrief: StackNavigationElement[] = [
      {
        name: "Overview",
        path: "/overview",
        icon: <Icon path={mdiViewDashboard} />,
      },
      {
        name: "Comment",
        path: "/comments",
        icon: <Icon path={mdiCommentOutline} />,
      },
      {
        name: "Info",
        path: "/info",
        icon: <Icon path={mdiInformationOutline} />,
      },
    ];
    
    const customHeaderBrief = (
      <div className="flex-1 flex items-center">
        <StackNavigation
          items={navigationItemsBrief}
          orientation="horizontal"
          renderItem={renderTabItem}
          navClassName="justify-start gap-1"
          className="shadow-none h-auto"
        />
      </div>
    );  

    const navigationItemsBriefType: StackNavigationElement[] = [
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
          name: "Comment",
          path: "/comments",
          icon: <Icon path={mdiCommentOutline} />,
        },
        {
          name: "Info",
          path: "/info",
          icon: <Icon path={mdiInformationOutline} />,
        },
      ];

      const customHeaderBriefType = (
        <div className="flex-1 flex items-center">
          <StackNavigation
            items={navigationItemsBriefType}
            orientation="horizontal"
            renderItem={renderTabItem}
            navClassName="justify-start gap-1"
            className="shadow-none h-auto"
          />
        </div>
      );

      const navigationItemsContent: StackNavigationElement[] = [
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

      const customHeaderContent = (
        <div className="flex-1 flex items-center">
          <StackNavigation
            items={navigationItemsContent}
            orientation="horizontal"
            renderItem={renderTabItem}
            navClassName="justify-start gap-1"
            className="shadow-none h-auto"
          />
        </div>
      );

    return (

        <div className="grid gap-4">
        <h2 className="font-semibold text-4xl wrap-break-words">Sidebar RHS</h2> 
    
          <div id="sidebar-rhs">
            <div className="h-screen">
              <SidebarRHSProvider>
                <div className="w-full h-full flex bg-body-bg">
                {/* Main content area */}
                <main className="flex-1 overflow-auto p-4">
                    <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Main Content Area</h2>
                    <p className="text-muted-foreground">
                        This sidebar demonstrates a simple heading-only header. This is
                        the default style for the sidebar component.
                    </p>
                    </div>
                </main>
                {/* Sidebar */}
                <SidebarRHS
                    title="Sidebar RHS"
                    width="340px"
                    minWidth="250px"
                    maxWidth="600px"
                    height="100%"
                    collapsible={true}
                    dockable={true}
                >
                    <SidebarContent />
                </SidebarRHS>
                </div>
              </SidebarRHSProvider>
            </div>
          </div>

          <div id="sidebar-rhs-tabs">
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
                    <SidebarContentTabs activeTab={activeTab} />
                </SidebarRHS>
                </div>
              </SidebarRHSProvider>
            </div>
          </div>

          <div id="sidebar-rhs-brief">
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
                    header={customHeaderBrief}
                    width="340px"
                    minWidth="250px"
                    maxWidth="600px"
                    height="100%"
                    collapsible={true}
                    dockable={true}
                >
                    <SidebarContentBrief activeTab={activeTab} />
                </SidebarRHS>
                </div>
              </SidebarRHSProvider>
            </div>
          </div>

          <div id="sidebar-rhs-brief-type">
            <div className="h-screen">
              <SidebarRHSProvider>
                <div className="w-full h-full flex bg-body-bg">
                {/* Main content area */}
                <main className="flex-1 overflow-auto p-4">
                    <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Main Content Area</h2>
                    <p className="text-muted-foreground">
                        This sidebar demonstrates a brief-type example with horizontal
                        tabs for Overview, Usage, Comment, and Info.
                    </p>
                    </div>
                </main>
                {/* Sidebar */}
                <SidebarRHS
                    header={customHeaderBriefType}
                    width="340px"
                    minWidth="250px"
                    maxWidth="600px"
                    height="100%"
                    collapsible={true}
                    dockable={true}
                >
                    <SidebarContentBriefType activeTab={activeTab} />
                </SidebarRHS>
                </div>
              </SidebarRHSProvider>
            </div>
          </div>

          <div id="sidebar-rhs-content">
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
                    header={customHeaderContent}
                    width="340px"
                    minWidth="250px"
                    maxWidth="600px"
                    height="100%"
                    collapsible={true}
                    dockable={true}
                >
                    <SidebarContentContent activeTab={activeTab} />
                </SidebarRHS>
                </div>
              </SidebarRHSProvider>
            </div>
          </div>
    
        </div>
        
  );
}