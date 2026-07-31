"use client";

import { copyToClipboard } from "@/components/docsite/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TELEMETRY_EVENTS, track } from "@/lib/telemetry";
import {
  mdiBullhornVariantOutline,
  mdiCalendarClockOutline,
  mdiClipboardOutline,
  mdiCodeJson,
  mdiEmailOutline,
  mdiFilePdfBox,
  mdiFilePowerpointBox,
  mdiFileWordBox,
  mdiFolderOutline,
  mdiFormatFloatLeft,
  mdiFormatListChecks,
  mdiImageOutline,
  mdiLinkVariant,
  mdiMusicBoxOutline,
  mdiNewspaperVariantOutline,
  mdiNumeric,
  mdiPlayBoxOutline,
  mdiTextLong,
  mdiTextShort,
  mdiToggleSwitchOutline,
  mdiToyBrickOutline,
  mdiVectorLink,
} from "@mdi/js";
import type { ComponentProps } from "react";

type IconColorScheme = NonNullable<ComponentProps<typeof Icon>["colorScheme"]>;

type ContentItem = {
  label: string;
  mdi: string;
  path: string;
  mdiCode: string;
  colorScheme: IconColorScheme;
  description: string;
};

const contentItems: ContentItem[] = [
  {
    label: "Article",
    mdi: "newspaper-variant-outline",
    path: mdiNewspaperVariantOutline,
    mdiCode: "mdiNewspaperVariantOutline",
    colorScheme: "warning",
    description: "Article, Newspaper",
  },
  {
    label: "Audio",
    mdi: "music-box-outline",
    path: mdiMusicBoxOutline,
    mdiCode: "mdiMusicBoxOutline",
    colorScheme: "danger",
    description: "Audio file",
  },
  {
    label: "Campaign",
    mdi: "bullhorn-variant-outline",
    path: mdiBullhornVariantOutline,
    mdiCode: "mdiBullhornVariantOutline",
    colorScheme: "warning",
    description: "Campaign, Feedback",
  },
  {
    label: "Component",
    mdi: "toy-brick-outline",
    path: mdiToyBrickOutline,
    mdiCode: "mdiToyBrickOutline",
    colorScheme: "warning",
    description: "Component",
  },
  {
    label: "Email",
    mdi: "email-outline",
    path: mdiEmailOutline,
    mdiCode: "mdiEmailOutline",
    colorScheme: "cyan",
    description: "Email, Invitation",
  },
  {
    label: "Image",
    mdi: "image-outline",
    path: mdiImageOutline,
    mdiCode: "mdiImageOutline",
    colorScheme: "danger",
    description: "Image, Media",
  },
  {
    label: "PDF",
    mdi: "file-pdf-box",
    path: mdiFilePdfBox,
    mdiCode: "mdiFilePdfBox",
    colorScheme: "danger",
    description: "PDF document",
  },
  {
    label: "PowerPoint",
    mdi: "file-powerpoint-box",
    path: mdiFilePowerpointBox,
    mdiCode: "mdiFilePowerpointBox",
    colorScheme: "warning",
    description: "PowerPoint presentation",
  },
  {
    label: "Project",
    mdi: "folder-outline",
    path: mdiFolderOutline,
    mdiCode: "mdiFolderOutline",
    colorScheme: "neutral",
    description: "Folder, Project",
  },
  {
    label: "URL",
    mdi: "link-variant",
    path: mdiLinkVariant,
    mdiCode: "mdiLinkVariant",
    colorScheme: "neutral",
    description: "Link, URL",
  },
  {
    label: "Video",
    mdi: "play-box-outline",
    path: mdiPlayBoxOutline,
    mdiCode: "mdiPlayBoxOutline",
    colorScheme: "danger",
    description: "Video file",
  },
  {
    label: "Word",
    mdi: "file-word-box",
    path: mdiFileWordBox,
    mdiCode: "mdiFileWordBox",
    colorScheme: "blue",
    description: "Word document",
  },
];

const fieldItems: ContentItem[] = [
  {
    label: "Boolean",
    mdi: "toggle-switch-outline",
    path: mdiToggleSwitchOutline,
    mdiCode: "mdiToggleSwitchOutline",
    colorScheme: "neutral",
    description: "Boolean, Toggle, Switch",
  },
  {
    label: "Date and time",
    mdi: "calendar-clock-outline",
    path: mdiCalendarClockOutline,
    mdiCode: "mdiCalendarClockOutline",
    colorScheme: "pink",
    description: "Date and time",
  },
  {
    label: "JSON",
    mdi: "code-json",
    path: mdiCodeJson,
    mdiCode: "mdiCodeJson",
    colorScheme: "cyan",
    description: "JSON code",
  },
  {
    label: "Media",
    mdi: "image-outline",
    path: mdiImageOutline,
    mdiCode: "mdiImageOutline",
    colorScheme: "danger",
    description: "Media attachment",
  },
  {
    label: "Number",
    mdi: "numeric",
    path: mdiNumeric,
    mdiCode: "mdiNumeric",
    colorScheme: "blue",
    description: "Number, Integer",
  },
  {
    label: "Reference",
    mdi: "vector-link",
    path: mdiVectorLink,
    mdiCode: "mdiVectorLink",
    colorScheme: "warning",
    description: "Referenced content",
  },
  {
    label: "Rich text",
    mdi: "format-float-left",
    path: mdiFormatFloatLeft,
    mdiCode: "mdiFormatFloatLeft",
    colorScheme: "purple",
    description: "Formatted rich text",
  },
  {
    label: "Select",
    mdi: "format-list-checks",
    path: mdiFormatListChecks,
    mdiCode: "mdiFormatListChecks",
    colorScheme: "neutral",
    description: "Dropdown select",
  },
  {
    label: "Text (short)",
    mdi: "text-short",
    path: mdiTextShort,
    mdiCode: "mdiTextShort",
    colorScheme: "purple",
    description: "Text (short)",
  },
  {
    label: "Text (long)",
    mdi: "text-long",
    path: mdiTextLong,
    mdiCode: "mdiTextLong",
    colorScheme: "purple",
    description: "Text (long)",
  },
];

function usageSnippet(item: ContentItem) {
  return `<Icon path={${item.mdiCode}} variant="subtle" colorScheme="${item.colorScheme}" />`;
}

function ContentItemsTable({
  items,
  section,
}: {
  items: ContentItem[];
  section: "content" | "fields";
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-28 px-4">Icon</TableHead>
            <TableHead className="w-40 px-4">Title</TableHead>
            <TableHead className="px-4">MDI link</TableHead>
            <TableHead className="px-4">MDI code</TableHead>
            <TableHead className="px-4">Usage</TableHead>
            <TableHead className="w-16 px-4">
              <span className="sr-only">Copy</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => {
            const snippet = usageSnippet(item);
            return (
              <TableRow key={`${section}-${item.label}`}>
                <TableCell className="w-28 px-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          copyToClipboard(snippet);
                          track(TELEMETRY_EVENTS.copy_icon_code, {
                            page: "content-icons",
                            type: section,
                            icon: item.mdiCode,
                            colorScheme: item.colorScheme,
                          });
                        }}
                        aria-label={`Copy Icon usage for ${item.label}`}
                        className="cursor-pointer inline-flex w-10 h-10 hover:bg-muted rounded transition-colors"
                      >
                        <Icon
                          path={item.path}
                          variant="subtle"
                          colorScheme={item.colorScheme}
                          size="md"
                          title={item.label}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy Icon usage</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="w-40 px-4 text-sm font-medium">
                  {item.label}
                </TableCell>
                <TableCell className="px-4">
                  <a
                    href={`https://pictogrammers.com/library/mdi/icon/${item.mdi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 hover:underline text-sm transition-colors"
                  >
                    {item.mdi}
                  </a>
                </TableCell>
                <TableCell className="px-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={() => {
                          copyToClipboard(item.mdiCode);
                          track(TELEMETRY_EVENTS.copy_icon_code, {
                            page: "content-icons",
                            type: section,
                            icon: item.mdiCode,
                          });
                        }}
                        className="cursor-pointer bg-muted px-2 py-1 rounded text-sm hover:bg-muted/80 transition-colors inline-block"
                      >
                        {item.mdiCode}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy to clipboard</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell className="px-4 text-sm">
                  {item.description}
                </TableCell>
                <TableCell className="w-16 px-4">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => {
                          copyToClipboard(snippet);
                          track(TELEMETRY_EVENTS.copy_icon_code, {
                            page: "content-icons",
                            type: section,
                            icon: item.mdiCode,
                            colorScheme: item.colorScheme,
                          });
                        }}
                        aria-label={`Copy Icon usage for ${item.label}`}
                        className="shrink-0"
                      >
                        <Icon
                          path={mdiClipboardOutline}
                          size="sm"
                          colorScheme="neutral"
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Copy Icon usage</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default function ContentIconsPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl">Content icons</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Alert variant="primary">
          <AlertDescription className="flex flex-row flex-wrap gap-1">
            To learn how to implement these icons, see{" "}
            <a
              href="/primitives/icon"
              className="text-primary hover:text-primary/80 no-underline whitespace-nowrap"
            >
              Icon component
            </a>
          </AlertDescription>
        </Alert>

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">Content</h2>
          <p className="text-muted-foreground max-w-[65ch]">
            Icons for file and media content formats such as PDF, Word, and
            image types.
          </p>
        </div>
        <ContentItemsTable items={contentItems} section="content" />

        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold mt-6">Fields</h2>
          <p className="text-muted-foreground max-w-[65ch]">
            Icons for input field types such as Boolean, date and time, and text
            fields.
          </p>
        </div>
        <ContentItemsTable items={fieldItems} section="fields" />
      </div>
    </div>
  );
}
