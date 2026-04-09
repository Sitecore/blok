"use client";

import { SidebarRHS, SidebarRHSProvider } from "@/components/bloks/sidebar-rhs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
  StackNavigation,
  type StackNavigationElement,
  type StackNavigationItem,
} from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  mdiCommentOutline,
  mdiContentCopy,
  mdiDotsHorizontal,
  mdiInformationOutline,
  mdiReplyOutline,
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
            autoComplete="off"
            placeholder="Add new to-do, type @ to mention someone"
            className="flex-1 border-0 bg-transparent px-0 py-0 h-auto text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
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

function SidebarContent({ activeTab }: { activeTab: string }) {
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

export default function SidebarRHSBriefDemo() {
  const [activeTab, setActiveTab] = useState("/overview");

  const navigationItems: StackNavigationElement[] = [
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
