"use client";

import { copyToClipboard } from "@/components/docsite/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
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

const illustrationsData = [
  {
    name: "account-group",
    usage: "Group, Collaboration",
  },
  {
    name: "account-supervisor-circle",
    usage: "Audience",
  },
  {
    name: "actionbar-content",
    usage: "Actionbar content",
  },
  {
    name: "actionbar-media",
    usage: "Actionbar media",
  },
  {
    name: "ai",
    usage: "AI",
  },
  {
    name: "alert",
    usage: "Warning",
  },
  {
    name: "alert-circle",
    usage: "Error, Bad request",
  },
  {
    name: "badge-account",
    usage: "Guest profile",
  },
  {
    name: "briefcase-outline-ai",
    usage: "Brand Kits",
  },
  {
    name: "bullseye-arrow",
    usage: "Target",
  },
  {
    name: "bullhorn",
    usage: "Campaign, Brand voice",
  },
  {
    name: "bullhorn-ai",
    usage: "Campaign, Brand voice (AI)",
  },
  {
    name: "cactus",
    usage: "No content (yet)",
  },
  {
    name: "calendar",
    usage: "Calendar, Datepicker",
  },
  {
    name: "cellphone-link",
    usage: "Responsive, Breakpoints",
  },
  {
    name: "chart-areaspline",
    usage: "Analytics, Stats",
  },
  {
    name: "chat-ai",
    usage: "AI chat",
  },
  {
    name: "check-circle",
    usage: "Success",
  },
  {
    name: "clipboard",
    usage: "Clipboard",
  },
  {
    name: "clock",
    usage: "",
  },
  {
    name: "cloud-arrow-up",
    usage: "Publish",
  },
  {
    name: "cloud-key",
    usage: "Single sign-on",
  },
  {
    name: "cloud-lock-open",
    usage: "",
  },
  {
    name: "comment-account",
    usage: "Interview",
  },
  {
    name: "compass",
    usage: "Discovery, Navigation",
  },
  {
    name: "connection",
    usage: "Connection",
  },
  {
    name: "crane",
    usage: "Maintenance, Construction",
  },
  {
    name: "crown",
    usage: "",
  },
  {
    name: "directions-fork",
    usage: "Decision",
  },
  {
    name: "drag-items",
    usage: "Drag and drop",
  },
  {
    name: "email-newsletter",
    usage: "",
  },
  {
    name: "feather",
    usage: "Content, Authoring",
  },
  {
    name: "feather-ai",
    usage: "Content, Authoring (AI)",
  },
  {
    name: "file-upload",
    usage: "Upload",
  },
  {
    name: "file-tree",
    usage: "File tree, References",
  },
  {
    name: "folder-image",
    usage: "",
  },
  {
    name: "gesture-tap-button",
    usage: "Interaction",
  },
  {
    name: "help-circle",
    usage: "Help",
  },
  {
    name: "image-multiple",
    usage: "Media",
  },
  {
    name: "image-search-outline",
    usage: "Image search",
  },
  {
    name: "inbox",
    usage: "",
  },
  {
    name: "key-chain",
    usage: "",
  },
  {
    name: "lifebuoy",
    usage: "Support",
  },
  {
    name: "lightbulb",
    usage: "Tip, Inspiration",
  },
  {
    name: "list",
    usage: "Lists, Forms",
  },
  {
    name: "lock",
    usage: "Forbidden, No permission",
  },
  {
    name: "magnify",
    usage: "Search",
  },
  {
    name: "magnify-ai",
    usage: "Search (AI)",
  },
  {
    name: "magnify-close",
    usage: "No search results",
  },
  {
    name: "map-search",
    usage: "Page not found",
  },
  {
    name: "palette-advanced",
    usage: "Theme",
  },
  {
    name: "package-variant-closed",
    usage: "Templates",
  },
  {
    name: "party-popper",
    usage: "Success",
  },
  {
    name: "pencil-ruler",
    usage: "Design, Modeling",
  },
  {
    name: "pencil-ai",
    usage: "Metadata enrichment",
  },
  {
    name: "play-circle-outline",
    usage: "Play",
  },
  {
    name: "puzzle",
    usage: "Extension, Plug-in",
  },
  {
    name: "quill",
    usage: "Content",
  },
  {
    name: "rocket-launch",
    usage: "Launch, Upgrade",
  },
  {
    name: "routes",
    usage: "Navigation",
  },
  {
    name: "shield-lock",
    usage: "Security",
  },
  {
    name: "sign-caution",
    usage: "Under construction",
  },
  {
    name: "slide",
    usage: "Playground",
  },
  {
    name: "star",
    usage: "Achievement, highlight",
  },
  {
    name: "stepper",
    usage: "Steps",
  },
  {
    name: "stop",
    usage: "Unauthorized",
  },
  {
    name: "storefront",
    usage: "Marketplace",
  },
  {
    name: "tag",
    usage: "Tag, Label",
  },
  {
    name: "tag-ai",
    usage: "Tag, Label (AI)",
  },
  {
    name: "test-tube",
    usage: "Experiment",
  },
  {
    name: "toy-brick",
    usage: "Component",
  },
  {
    name: "translate",
    usage: "Translation, Localization",
  },
  {
    name: "user",
    usage: "User profile",
  },
  {
    name: "video",
    usage: "Video",
  },
  {
    name: "wrench-clock",
    usage: "Maintenance",
  },
  {
    name: "xm-cloud",
    usage: "XM Cloud Deploy",
  },
];

export default function IllustrationsPage() {
  return (
    <div className="container p-5 md:p-10  xl:pr-[250px]">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight">Illustrations</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Alert variant="primary">
          <AlertTitle className="text-base font-semibold mb-1">
            Recommended use
          </AlertTitle>
          <AlertDescription>
            Use the color variant when the illustration is the 'centerpiece' of
            the page, e.g. a fullscreen 404 error page. Use the neutral variant
            when the illustration is a supportive element, that shouldn't call
            too much attention to itself, e.g. an empty state on a search page.
          </AlertDescription>
        </Alert>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4 min-w-[120px]">Color SVG</TableHead>
                <TableHead className="px-4 min-w-[120px]">Neutral SVG</TableHead>
                <TableHead className="px-4">Color URL</TableHead>
                <TableHead className="px-4">Neutral URL</TableHead>
                <TableHead className="px-4">Name</TableHead>
                <TableHead className="px-4">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {illustrationsData.map(({ name, usage }, index) => (
                <TableRow key={`${name}-${index}`}>
                  <TableCell className="px-4 min-w-[120px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() =>
                            copyToClipboard(
                              `https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}`
                            )
                          }
                          className="cursor-pointer flex items-center"
                        >
                          <img
                            src={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}`}
                            alt={name}
                            className="max-w-[64px] h-auto object-contain"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Copy URL</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-4 min-w-[120px]">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          onClick={() =>
                            copyToClipboard(
                              `https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}-neutral`
                            )
                          }
                          className="cursor-pointer flex items-center"
                        >
                          <img
                            src={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}-neutral`}
                            alt={`${name} neutral`}
                            className="max-w-[64px] h-auto object-contain"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>Copy URL</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-4">
                    <a
                      href={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 no-underline text-sm transition-colors whitespace-nowrap"
                    >
                      Color URL
                    </a>
                  </TableCell>
                  <TableCell className="px-4">
                    <a
                      href={`https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/spot-${name}-neutral`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 no-underline text-sm transition-colors whitespace-nowrap"
                    >
                      Neutral URL
                    </a>
                  </TableCell>
                  <TableCell className="px-4 text-sm whitespace-nowrap">
                    {name}
                  </TableCell>
                  <TableCell className="px-4 text-sm">{usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
