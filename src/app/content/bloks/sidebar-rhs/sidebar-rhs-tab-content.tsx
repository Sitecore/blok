"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SearchInput,
  SearchInputField,
  SearchInputLeftElement,
} from "@/components/ui/search-input";
import type { StackNavigationElement } from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import {
  mdiCommentOutline,
  mdiContentCopy,
  mdiInformationOutline,
  mdiLayers,
  mdiMagnify,
  mdiViewDashboard,
} from "@mdi/js";
import { useState } from "react";

export const EXAMPLE_HEIGHT = "h-[720px]";

/** Demos hide pop-out by default. Set to true to show dock/undock controls again. */
export const DEMO_SIDEBAR_DOCKABLE = false;

export const navigationItems: StackNavigationElement[] = [
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
    name: "Comments",
    path: "/comments",
    icon: <Icon path={mdiCommentOutline} />,
  },
  {
    name: "Info",
    path: "/info",
    icon: <Icon path={mdiInformationOutline} />,
  },
];

export function ExpandableDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText = `Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, marketers and developers can collaborate seamlessly to build engaging customer experiences.`;

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
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-body-bg to-transparent pointer-events-none" />
        )}
      </div>
      {shouldTruncate && (
        <Button
          type="button"
          variant="link"
          colorScheme="neutral"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-center font-semibold"
        >
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </div>
  );
}

export function UsageSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const briefItems = [
    {
      name: "Campaign Brief Q1",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Product Launch Brief",
      status: "Published",
      statusColor: "success" as const,
    },
    {
      name: "Homepage Refresh Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Holiday Campaign Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Partner Portal Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Brand Guidelines Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Email Nurture Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "App Onboarding Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Regional Launch Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Content Hub Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Analytics Rollout Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
    {
      name: "Support Portal Brief",
      status: "Draft",
      statusColor: "neutral" as const,
    },
  ];

  const filteredItems = briefItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        Briefs that are using this brief type
      </p>

      <SearchInput className="w-full">
        <SearchInputLeftElement>
          <Icon path={mdiMagnify} />
        </SearchInputLeftElement>
        <SearchInputField
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchInput>

      <div className="flex flex-col">
        {filteredItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 rounded-lg p-2"
          >
            <p className="flex-1 min-w-0 truncate text-sm font-semibold text-foreground">
              {item.name}
            </p>
            <Badge
              size="sm"
              colorScheme={item.statusColor}
              className="shrink-0"
            >
              {item.status}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}

export function InfoSection() {
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-fg">Label</p>
        <div className="flex items-center gap-1">
          <span className="flex-1 min-w-0 truncate text-sm text-foreground">
            The label
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleCopy("The label")}
            className="shrink-0 text-muted-foreground shadow-none hover:text-foreground"
            aria-label="Copy label"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-fg">Name</p>
        <div className="flex items-center gap-1">
          <span className="flex-1 min-w-0 truncate text-sm text-foreground">
            Value
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => handleCopy("Value")}
            className="shrink-0 text-muted-foreground shadow-none hover:text-foreground"
            aria-label="Copy name"
          >
            <Icon path={mdiContentCopy} className="size-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-fg">Created by</p>
        <span className="text-sm text-foreground">Value</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-fg">Created</p>
        <span className="text-sm text-foreground">Person, Date</span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-neutral-fg">Updated</p>
        <span className="text-sm text-foreground">Person, Date</span>
      </div>
    </div>
  );
}
