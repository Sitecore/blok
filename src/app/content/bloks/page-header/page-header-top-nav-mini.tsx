"use client";

import {
  PAGE_HEADER_DEMO_PEOPLE,
  PAGE_HEADER_DEMO_TAGS,
  PAGE_HEADER_FLAVORFUL_ICON,
  PAGE_HEADER_ICE_CREAM_DESCRIPTION,
  PAGE_HEADER_ICE_CREAM_TITLE,
  PAGE_HEADER_MEDIA_16_9,
} from "@/app/content/bloks/page-header/page-header.mock-data";
import {
  PageHeader,
  PageHeaderActions,
  PageHeaderAside,
  PageHeaderBack,
  PageHeaderDescription,
  PageHeaderFooter,
  PageHeaderHeading,
  PageHeaderMedia,
  PageHeaderPeople,
  PageHeaderSeparator,
  PageHeaderStatus,
  PageHeaderTabs,
  PageHeaderTags,
  PageHeaderTimeline,
  PageHeaderTitle,
  PageHeaderTop,
} from "@/components/bloks/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { mdiChevronDown, mdiPencilOutline } from "@mdi/js";

const TAB_TRIGGER_CLASSNAME =
  "h-8 rounded-none border-b-2 border-transparent px-3 text-xs data-[state=active]:border-primary-fg data-[state=active]:text-primary-fg data-[state=inactive]:border-transparent";

const TABS = [
  { value: "overview", label: "Overview" },
  ...Array.from({ length: 7 }, (_, index) => ({
    value: `tab-${index + 2}`,
    label: "Tab",
  })),
];

export default function PageHeaderTopNavMiniDemo() {
  return (
    <PageHeader
      surface="outline"
      size="compact"
      className="sm:grid-cols-[minmax(0,1fr)_auto]"
    >
      <PageHeaderTop>
        <div className="flex min-w-0 items-stretch gap-2 sm:col-start-1 sm:row-start-1">
          <PageHeaderBack
            showLabel={false}
            label="Back to portfolio"
            className="shrink-0 self-start"
          />

          <PageHeaderMedia size="stretch">
            <img
              src={PAGE_HEADER_MEDIA_16_9}
              alt=""
              className="size-full object-cover"
              decoding="async"
            />
          </PageHeaderMedia>

          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <PageHeaderHeading className="gap-x-2">
              <PageHeaderTitle size="compact">
                {PAGE_HEADER_ICE_CREAM_TITLE}
              </PageHeaderTitle>
              <PageHeaderStatus className="pt-0.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <Badge
                        colorScheme="blue"
                        size="md"
                        className="gap-0.5 pr-1.5 text-xs"
                      >
                        In progress
                        <Icon
                          path={mdiChevronDown}
                          size={14 / 24}
                          className="size-3.5 shrink-0"
                          aria-hidden
                        />
                      </Badge>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuItem>Not started</DropdownMenuItem>
                    <DropdownMenuItem>In progress</DropdownMenuItem>
                    <DropdownMenuItem>Completed</DropdownMenuItem>
                    <DropdownMenuItem>On hold</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </PageHeaderStatus>
            </PageHeaderHeading>
            <PageHeaderDescription size="compact">
              {PAGE_HEADER_ICE_CREAM_DESCRIPTION}
            </PageHeaderDescription>
            <PageHeaderTags className="gap-1 pt-0.5">
              {[...PAGE_HEADER_DEMO_TAGS, "+3"].map((tag) => (
                <Badge
                  key={tag}
                  colorScheme="neutral"
                  size="sm"
                  className="shrink-0 px-2 text-xs font-normal leading-none text-neutral-fg"
                >
                  {tag}
                </Badge>
              ))}
            </PageHeaderTags>
          </div>
        </div>

        <PageHeaderAside className="gap-1.5 sm:col-start-2 sm:row-start-1 sm:self-stretch">
          <PageHeaderActions className="gap-1.5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  colorScheme="neutral"
                  size="sm"
                  className="h-7 gap-1.5 px-2 text-xs font-semibold"
                >
                  <img
                    src={PAGE_HEADER_FLAVORFUL_ICON}
                    alt=""
                    className="size-4 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 truncate text-left">Flavorful</span>
                  <Icon
                    path={mdiChevronDown}
                    size={0.55}
                    className="shrink-0 text-subtle-text"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Flavorful</DropdownMenuItem>
                <DropdownMenuItem>Marketing</DropdownMenuItem>
                <DropdownMenuItem>Product</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" className="h-7 px-3 text-xs">
              Primary
            </Button>
            <Button
              variant="ghost"
              size="sm"
              colorScheme="neutral"
              className="h-7 px-2 text-xs font-semibold"
            >
              <Icon path={mdiPencilOutline} size={0.7} />
              Edit
            </Button>
          </PageHeaderActions>
          <PageHeaderPeople className="mt-auto">
            {PAGE_HEADER_DEMO_PEOPLE.map((person) => (
              <Avatar key={person.name} className="size-6">
                <AvatarImage src={person.src} alt={person.name} />
                <AvatarFallback className="bg-subtle-bg text-3xs">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="flex size-6 items-center justify-center rounded-full border-2 border-body-bg bg-primary-bg text-3xs font-medium text-primary-fg">
              +1
            </div>
          </PageHeaderPeople>
        </PageHeaderAside>
      </PageHeaderTop>

      <PageHeaderFooter size="compact" className="sm:col-span-2 sm:col-start-1">
        <PageHeaderTabs>
          <Tabs defaultValue="overview" className="h-8 w-full min-w-0 gap-0">
            <TabsList
              variant="line"
              className="h-8 w-fit min-w-0 justify-start bg-transparent p-0"
            >
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  variant="line"
                  className={TAB_TRIGGER_CLASSNAME}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </PageHeaderTabs>
        <PageHeaderTimeline size="compact">
          <Progress value={60} className="h-1 w-20" />
          <span className="whitespace-nowrap">Jun 26, 2025 - Aug 1, 2025</span>
          <PageHeaderSeparator className="data-[orientation=vertical]:h-4" />
          <span className="whitespace-nowrap">
            <span className="font-semibold">Day 3</span>
            <span> of 36</span>
          </span>
        </PageHeaderTimeline>
      </PageHeaderFooter>
    </PageHeader>
  );
}
