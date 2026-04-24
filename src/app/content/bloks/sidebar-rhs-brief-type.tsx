"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiClockOutline,
  mdiCommentOutline,
  mdiContentCopy,
  mdiDotsHorizontal,
  mdiInformationOutline,
  mdiLayers,
  mdiMagnify,
  mdiReplyOutline,
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
        <Button
          type="button"
          variant="link"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-center font-semibold"
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </div>
  );
}

function UsageSection() {
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="p-1 text-muted-foreground shadow-none transition-colors hover:text-foreground"
                    aria-label="Reply"
                  >
                    <Icon path={mdiReplyOutline} className="size-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        className="p-1 text-muted-foreground shadow-none transition-colors hover:text-foreground"
                        aria-label="More options"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Icon path={mdiDotsHorizontal} className="size-4" />
                      </Button>
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
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleCopy("The label")}
            className="text-muted-foreground shadow-none transition-colors hover:text-foreground"
            aria-label="Copy to clipboard"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </Button>
        </div>
      </div>

      {/* Name */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted-foreground">Name</label>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Value</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleCopy("Value")}
            className="text-muted-foreground shadow-none transition-colors hover:text-foreground"
            aria-label="Copy to clipboard"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </Button>
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

function SidebarContent({ activeTab }: { activeTab: string }) {
  const tabContent: Record<string, React.ReactNode> = {
    "/overview": (
      <div className="flex flex-col gap-6">
        {/* Description Section */}
        <ExpandableDescription />
      </div>
    ),
    "/usage": (
      <div className="flex flex-col gap-4">
        <UsageSection />
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

export default function SidebarRHSBriefTypeDemo() {
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
                This sidebar demonstrates a brief-type example with horizontal
                tabs for Overview, Usage, Comment, and Info.
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
