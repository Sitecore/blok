"use client";

import {
  PAGE_HEADER_DEMO_DESCRIPTION,
  PAGE_HEADER_DEMO_PEOPLE,
  PAGE_HEADER_DEMO_TAGS,
  PAGE_HEADER_DEMO_TITLE,
  PAGE_HEADER_FLAVORFUL_ICON,
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
  PageHeaderMain,
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
  "rounded-none border-b-2 border-transparent px-4 data-[state=active]:border-primary-fg data-[state=active]:text-primary-fg data-[state=inactive]:border-transparent";

const TABS = [
  { value: "overview", label: "Overview" },
  { value: "tab-2", label: "Tab" },
  { value: "tab-3", label: "Tab" },
  { value: "tab-4", label: "Tab" },
];

export default function PageHeaderSiteSummaryDemo() {
  return (
    <PageHeader surface="card">
      <PageHeaderTop>
        <PageHeaderMedia>
          <img
            src={PAGE_HEADER_MEDIA_16_9}
            alt=""
            className="size-full object-cover"
            decoding="async"
          />
        </PageHeaderMedia>

        <PageHeaderMain>
          <PageHeaderBack>Back to portfolio</PageHeaderBack>
          <PageHeaderHeading>
            <PageHeaderTitle>{PAGE_HEADER_DEMO_TITLE}</PageHeaderTitle>
            <div className="flex shrink-0 items-center gap-2 pt-1.5">
              <PageHeaderSeparator />
              <PageHeaderStatus>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      <Badge colorScheme="blue" size="lg">
                        In progress
                        <Icon
                          path={mdiChevronDown}
                          size={1}
                          className="size-4 shrink-0"
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
            </div>
          </PageHeaderHeading>
          <PageHeaderDescription>
            {PAGE_HEADER_DEMO_DESCRIPTION}
          </PageHeaderDescription>
          <PageHeaderTags>
            {[...PAGE_HEADER_DEMO_TAGS, "+3"].map((tag) => (
              <Badge
                key={tag}
                colorScheme="neutral"
                size="sm"
                className="shrink-0 font-normal leading-none text-neutral-fg"
              >
                {tag}
              </Badge>
            ))}
          </PageHeaderTags>
        </PageHeaderMain>

        <PageHeaderAside>
          <PageHeaderActions>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  colorScheme="neutral"
                  size="sm"
                  className="w-36 min-w-36 gap-2 px-3 font-semibold"
                >
                  <img
                    src={PAGE_HEADER_FLAVORFUL_ICON}
                    alt=""
                    className="size-5 shrink-0 rounded-full object-cover"
                  />
                  <span className="min-w-0 flex-1 truncate text-left">
                    Flavorful
                  </span>
                  <Icon
                    path={mdiChevronDown}
                    size={0.65}
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
            <Button size="sm" className="px-4">
              Primary
            </Button>
            <Button
              variant="ghost"
              size="sm"
              colorScheme="neutral"
              className="px-2 font-semibold"
            >
              <Icon path={mdiPencilOutline} size={0.85} />
              Edit
            </Button>
          </PageHeaderActions>
          <PageHeaderPeople>
            {PAGE_HEADER_DEMO_PEOPLE.map((person) => (
              <Avatar key={person.name} className="size-8">
                <AvatarImage src={person.src} alt={person.name} />
                <AvatarFallback className="bg-subtle-bg text-xs">
                  {person.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            <div className="flex size-8 items-center justify-center rounded-full border-2 border-body-bg bg-primary-bg text-xs font-medium text-primary-fg">
              +1
            </div>
          </PageHeaderPeople>
        </PageHeaderAside>
      </PageHeaderTop>

      <PageHeaderFooter>
        <PageHeaderTabs>
          <Tabs defaultValue="overview" className="h-9 w-full min-w-0 gap-0">
            <TabsList
              variant="line"
              className="h-9 w-fit min-w-0 justify-start bg-transparent p-0"
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
        <PageHeaderTimeline>
          <Progress value={60} className="h-1 w-24" />
          <span className="whitespace-nowrap">Jun 26, 2025 - Aug 1, 2025</span>
          <PageHeaderSeparator />
          <span className="whitespace-nowrap">
            <span className="font-semibold">Day 3</span>
            <span> of 36</span>
          </span>
        </PageHeaderTimeline>
      </PageHeaderFooter>
    </PageHeader>
  );
}
