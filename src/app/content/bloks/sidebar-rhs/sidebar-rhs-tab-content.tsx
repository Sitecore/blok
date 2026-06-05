"use client";

import {
  sidebarRhsDemoBriefItems,
  sidebarRhsDemoInfoFields,
  sidebarRhsDemoNavItems,
  sidebarRhsDemoUsageIntro,
} from "@/app/content/bloks/sidebar-rhs/sidebar-rhs.mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SearchInput,
  SearchInputField,
  SearchInputLeftElement,
} from "@/components/ui/search-input";
import type { StackNavigationElement } from "@/components/ui/stack-navigation";
import { Icon } from "@/lib/icon";
import { mdiContentCopy, mdiMagnify } from "@mdi/js";
import { useMemo, useState } from "react";

export {
  sidebarRhsDemoDockable as DEMO_SIDEBAR_DOCKABLE,
  sidebarRhsDemoExampleHeight as EXAMPLE_HEIGHT,
} from "@/app/content/bloks/sidebar-rhs/sidebar-rhs.mock-data";

export const navigationItems: StackNavigationElement[] =
  sidebarRhsDemoNavItems.map((item) => ({
    name: item.name,
    path: item.path,
    icon: <Icon path={item.iconPath} />,
  }));

export function ExpandableDescription() {
  const [isExpanded, setIsExpanded] = useState(false);

  const fullText =
    "Sitecore is a leading digital experience platform that empowers organizations to create, manage, and deliver personalized content across all channels. With its powerful content management system, marketers and developers can collaborate seamlessly to build engaging customer experiences.";
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

  const filteredItems = useMemo(
    () =>
      sidebarRhsDemoBriefItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchQuery],
  );

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted-foreground">
        {sidebarRhsDemoUsageIntro}
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
      {sidebarRhsDemoInfoFields.map((field) => (
        <div key={field.label} className="flex flex-col gap-1">
          <p className="text-sm font-medium text-neutral-fg">{field.label}</p>
          {field.copyable ? (
            <div className="flex items-center gap-1">
              <span className="flex-1 min-w-0 truncate text-sm text-foreground">
                {field.value}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                onClick={() => handleCopy(field.value)}
                className="shrink-0 text-muted-foreground shadow-none hover:text-foreground"
                aria-label={`Copy ${field.label.toLowerCase()}`}
              >
                <Icon path={mdiContentCopy} className="size-4" />
              </Button>
            </div>
          ) : (
            <span className="text-sm text-foreground">{field.value}</span>
          )}
        </div>
      ))}
    </div>
  );
}
