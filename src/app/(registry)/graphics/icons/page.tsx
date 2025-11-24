"use client";

import { RightSidebar } from "@/components/layout/right-sidebar";
import { getRightSidebarMetadata } from "@/lib/right-sidebar-metadata";
import { Icon } from "@/lib/icon";
import { copyToClipboard } from "@/components/docsite/code-block";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import * as mdiIcons from "@mdi/js";
import * as logoIcons from "./logo-icons";
import { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const iconsData = [
  { mdi: "account-circle-outline", usage: "Profile", icon: "", code: "" },
  { mdi: "account-group-outline", usage: "Group", icon: "", code: "" },
  {
    mdi: "account-multiple-outline",
    usage: "Team, Group",
    icon: "",
    code: "",
  },
  { mdi: "account-outline", usage: "User, Person", icon: "", code: "" },
  {
    mdi: "account-plus-outline",
    usage: "Add user, Invite user",
    icon: "",
    code: "",
  },
  {
    mdi: "account-supervisor-circle-outline",
    usage: "Audience, Personalization",
    icon: "",
    code: "",
  },
  { mdi: "alarm", usage: "Reminder", icon: "", code: "" },
  {
    mdi: "alert-circle-outline",
    usage: "Danger, Error",
    icon: "",
    code: "",
  },
  { mdi: "alert-outline", usage: "Warning", icon: "", code: "" },
  {
    mdi: "application-outline",
    usage: "Site, Website, Web page, Section",
    icon: "",
  },
  { mdi: "archive-outline", usage: "Archive", icon: "", code: "" },
  { mdi: "arrow-all", usage: "Move (on canvas)", icon: "", code: "" },
  { mdi: "arrow-bottom-left", usage: "Bottom-left", icon: "", code: "" },
  { mdi: "arrow-bottom-right", usage: "Bottom-right", icon: "", code: "" },
  {
    mdi: "arrow-collapse",
    usage: "Collapse, Exit full screen",
    icon: "",
    code: "",
  },
  { mdi: "arrow-down", usage: "Down", icon: "", code: "" },
  { mdi: "arrow-expand", usage: "Expand, Full screen", icon: "", code: "" },
  { mdi: "arrow-expand-all", usage: "Dimensions", icon: "", code: "" },
  {
    mdi: "arrow-expand-horizontal",
    usage: "Space (horizontal)",
    icon: "",
    code: "",
  },
  {
    mdi: "arrow-expand-vertical",
    usage: "Space (vertical)",
    icon: "",
    code: "",
  },
  { mdi: "arrow-left", usage: "Back", icon: "", code: "" },
  { mdi: "arrow-right", usage: "Forward", icon: "", code: "" },
  { mdi: "arrow-top-left", usage: "Top-left", icon: "", code: "" },
  { mdi: "arrow-top-right", usage: "Top-right", icon: "", code: "" },
  { mdi: "arrow-up", usage: "Up", icon: "", code: "" },
  {
    mdi: "arrow-up-left",
    usage: "Select parent container",
    icon: "",
    code: "",
  },
  {
    mdi: "autorenew",
    usage: "Repeat, In progress, Busy",
    icon: "",
    code: "",
  },
  {
    mdi: "badge-account-horizontal-outline",
    usage: "Guest",
    icon: "",
    code: "",
  },
  { mdi: "barcode-scan", usage: "Barcode, Product", icon: "", code: "" },
  {
    mdi: "bell-off-outline",
    usage: "Notifications off",
    icon: "",
    code: "",
  },
  {
    mdi: "bell-outline",
    usage: "Notifications, Activity",
    icon: "",
    code: "",
  },
  {
    mdi: "book-open-page-variant-outline",
    usage: "Documentation",
    icon: "",
    code: "",
  },
  { mdi: "briefcase-outline", usage: "Job title", icon: "", code: "" },
  {
    mdi: "bullhorn-variant-outline",
    usage: "Campaign, Feedback, Changelog, What's new",
    icon: "",
    code: "",
  },
  { mdi: "button-pointer", usage: "Button", icon: "", code: "" },
  {
    mdi: "calendar-clock-outline",
    usage: "Date and time",
    icon: "",
    code: "",
  },
  { mdi: "calendar-outline", usage: "Date, Event", icon: "", code: "" },
  {
    mdi: "cancel",
    usage: "Reject, Decline, Block, Forbidden",
    icon: "",
    code: "",
  },
  { mdi: "card-text-outline", usage: "Card", icon: "", code: "" },
  {
    mdi: "cellphone-link",
    usage: "Breakpoints, Devices, Responsive",
    icon: "",
    code: "",
  },
  { mdi: "cellphone", usage: "Mobile view", icon: "", code: "" },
  { mdi: "check", usage: "Approve, Complete", icon: "", code: "" },
  {
    mdi: "check-circle-outline",
    usage: "Success, Done, Complete",
    icon: "",
    code: "",
  },
  {
    mdi: "chevron-down",
    usage: "Dropdown menu, Expand",
    icon: "",
    code: "",
  },
  { mdi: "chevron-left", usage: "Previous", icon: "", code: "" },
  {
    mdi: "chevron-right",
    usage: "Next, breadcrumb separator",
    icon: "",
    code: "",
  },
  { mdi: "chevron-up", usage: "Collapse", icon: "", code: "" },
  {
    mdi: "circle-half-full",
    usage: "Dark mode / Light mode",
    icon: "",
    code: "",
  },
  { mdi: "clipboard-check-outline", usage: "Task", icon: "", code: "" },
  { mdi: "clipboard-file-outline", usage: "Paste", icon: "", code: "" },
  {
    mdi: "clock-outline",
    usage: "Schedule, Time, Job",
    icon: "",
    code: "",
  },
  { mdi: "close", usage: "Close, Clear, Cancel", icon: "", code: "" },
  {
    mdi: "cloud-key-outline",
    usage: "Single sign-on (SSO)",
    icon: "",
    code: "",
  },
  { mdi: "cloud-off-outline", usage: "Unpublish", icon: "", code: "" },
  { mdi: "cloud-upload-outline", usage: "Publish", icon: "", code: "" },
  {
    mdi: "code-block-tags",
    usage: "Code block",
    icon: "",
    code: "",
  },
  { mdi: "code-json", usage: "JSON code", icon: "", code: "" },
  { mdi: "code-tags", usage: "Code, HTML", icon: "", code: "" },
  {
    mdi: "cog-outline",
    usage: "Settings, Configuration",
    icon: "",
    code: "",
  },
  {
    mdi: "comment-alert-outline",
    usage: "Support ticket",
    icon: "",
    code: "",
  },
  { mdi: "comment-edit-outline", usage: "Blog", icon: "", code: "" },
  {
    mdi: "comment-text-outline",
    usage: "Comment, Annotation",
    icon: "",
    code: "",
  },
  { mdi: "compare-horizontal", usage: "Compare", icon: "", code: "" },
  { mdi: "connection", usage: "Connection", icon: "", code: "" },
  {
    mdi: "content-copy",
    usage: "Copy, Duplicate, Copy to clipboard",
    icon: "",
  },
  { mdi: "content-cut", usage: "Cut (to clipboard)", icon: "", code: "" },
  { mdi: "content-duplicate", usage: "Template", icon: "", code: "" },
  { mdi: "crown-outline", usage: "Default, Master", icon: "", code: "" },
  {
    mdi: "database-outline",
    usage: "Database, Data source",
    icon: "",
    code: "",
  },
  { mdi: "domain", usage: "Company, Organization", icon: "", code: "" },
  { mdi: "dots-grid", usage: "Switcher", icon: "", code: "" },
  {
    mdi: "dots-horizontal",
    usage: "More options, Actions",
    icon: "",
    code: "",
  },
  { mdi: "drag-vertical", usage: "Drag, Reorder", icon: "", code: "" },
  { mdi: "drawing", usage: "Graphic", icon: "", code: "" },
  { mdi: "email-outline", usage: "Email, Invitation", icon: "", code: "" },
  { mdi: "eye-outline", usage: "View, Preview", icon: "", code: "" },
  { mdi: "feather", usage: "Content", icon: "", code: "" },
  { mdi: "file-document-outline", usage: "Document", icon: "", code: "" },
  { mdi: "file-outline", usage: "Page, File", icon: "", code: "" },
  { mdi: "file-tree", usage: "Site manager", icon: "", code: "" },
  { mdi: "filter-variant", usage: "Filter", icon: "", code: "" },
  { mdi: "finance", usage: "Usage", icon: "", code: "" },
  { mdi: "flask-outline", usage: "Experiment, Recipe", icon: "", code: "" },
  { mdi: "folder-move-outline", usage: "Move", icon: "", code: "" },
  { mdi: "folder-outline", usage: "Folder, Project", icon: "", code: "" },
  { mdi: "form-textbox", usage: "Rename", icon: "", code: "" },
  { mdi: "format-bold", usage: "Bold", icon: "", code: "" },
  {
    mdi: "format-color-fill",
    usage: "Color, Fill, Background settings",
    icon: "",
    code: "",
  },
  { mdi: "format-float-left", usage: "Rich text", icon: "", code: "" },
  { mdi: "format-font", usage: "Font, Typeface", icon: "", code: "" },
  { mdi: "format-italic", usage: "Italic", icon: "", code: "" },
  {
    mdi: "format-letter-case",
    usage: "Typography, Text formatting",
    icon: "",
  },
  {
    mdi: "format-letter-spacing",
    usage: "Letter spacing",
    icon: "",
    code: "",
  },
  { mdi: "format-line-spacing", usage: "Line height", icon: "", code: "" },
  {
    mdi: "format-list-bulleted",
    usage: "Bulleted list",
    icon: "",
    code: "",
  },
  { mdi: "format-list-bulleted-square", usage: "List", icon: "", code: "" },
  {
    mdi: "format-list-numbered",
    usage: "Numbered list",
    icon: "",
    code: "",
  },
  { mdi: "format-list-checks", usage: "Option list", icon: "", code: "" },
  {
    mdi: "format-paragraph-spacing",
    usage: "Paragraph spacing",
    icon: "",
    code: "",
  },
  { mdi: "format-quote-close", usage: "Quote", icon: "", code: "" },
  { mdi: "format-size", usage: "Text size", icon: "", code: "" },
  {
    mdi: "format-strikethrough-variant",
    usage: "Strikethrough",
    icon: "",
    code: "",
  },
  {
    mdi: "format-textbox",
    usage: "Text block, Text box",
    icon: "",
    code: "",
  },
  { mdi: "format-title", usage: "Title", icon: "", code: "" },
  { mdi: "format-underline", usage: "Underline", icon: "", code: "" },
  {
    mdi: "forum-outline",
    usage: "Forum, Social media",
    icon: "",
    code: "",
  },
  { mdi: "gradient-vertical", usage: "Gradient", icon: "", code: "" },
  {
    mdi: "handshake-outline",
    usage: "Terms & conditions",
    icon: "",
    code: "",
  },
  { mdi: "heart-outline", usage: "Save to list", icon: "", code: "" },
  {
    mdi: "heart-pulse",
    usage: "System health, System status",
    icon: "",
    code: "",
  },
  { mdi: "help-circle-outline", usage: "Help", icon: "", code: "" },
  { mdi: "history", usage: "History, Recent", icon: "", code: "" },
  { mdi: "home-variant-outline", usage: "Home", icon: "", code: "" },
  { mdi: "human", usage: "Accessibility", icon: "", code: "" },
  {
    mdi: "image-multiple-outline",
    usage: "Album cover",
    icon: "",
    code: "",
  },
  { mdi: "image-outline", usage: "Image, Media", icon: "", code: "" },
  { mdi: "incognito", usage: "Impersonate", icon: "", code: "" },
  {
    mdi: "information-outline",
    usage: "Information, More info, Icon",
    icon: "",
    code: "",
  },
  {
    mdi: "key",
    usage: "Key, Client (XM Cloud Deploy)",
    icon: "",
  },
  { mdi: "layers-outline", usage: "Layers", icon: "", code: "" },
  { mdi: "lifebuoy", usage: "Support", icon: "", code: "" },
  { mdi: "link-variant", usage: "Link, URL", icon: "", code: "" },
  { mdi: "list-box-outline", usage: "Form", icon: "", code: "" },
  { mdi: "lock-open-variant-outline", usage: "Unlock", icon: "", code: "" },
  {
    mdi: "lock-outline",
    usage: "Lock, System property",
    icon: "",
    code: "",
  },
  { mdi: "login", usage: "Log in", icon: "", code: "" },
  { mdi: "logout", usage: "Log out", icon: "", code: "" },
  { mdi: "magnify", usage: "Search", icon: "", code: "" },
  { mdi: "map-marker-outline", usage: "Location", icon: "", code: "" },
  { mdi: "minus", usage: "Remove, Horizontal line", icon: "", code: "" },
  {
    mdi: "minus-circle-outline",
    usage: "Remove, Unlink",
    icon: "",
    code: "",
  },
  { mdi: "monitor", usage: "Desktop view", icon: "", code: "" },
  { mdi: "movie-outline", usage: "Movie", icon: "", code: "" },
  { mdi: "music-box-outline", usage: "Audio file", icon: "", code: "" },
  {
    mdi: "newspaper-variant-outline",
    usage: "Article, Newspaper",
    icon: "",
    code: "",
  },
  { mdi: "numeric", usage: "Number, Integer", icon: "", code: "" },
  {
    mdi: "open-in-new",
    usage: "Open in new tab, Open, Launch",
    icon: "",
    code: "",
  },
  { mdi: "page-first", usage: "First", icon: "", code: "" },
  { mdi: "page-last", usage: "Last", icon: "", code: "" },
  { mdi: "palette-outline", usage: "Theme", icon: "", code: "" },
  {
    mdi: "palette-swatch-outline",
    usage: "Color profile",
    icon: "",
    code: "",
  },
  { mdi: "paperclip", usage: "Attachment", icon: "", code: "" },
  { mdi: "pause", usage: "Pause", icon: "", code: "" },
  { mdi: "pencil-outline", usage: "Edit", icon: "", code: "" },
  {
    mdi: "pencil-ruler-outline",
    usage: "Content type",
    icon: "",
    code: "",
  },
  { mdi: "phone-outline", usage: "Phone", icon: "", code: "" },
  { mdi: "play-box-outline", usage: "Video file", icon: "", code: "" },
  { mdi: "play-outline", usage: "Start", icon: "", code: "" },
  { mdi: "plus", usage: "Add, New", icon: "", code: "" },
  { mdi: "puzzle-outline", usage: "Plug-in", icon: "", code: "" },
  { mdi: "redo", usage: "Redo", icon: "", code: "" },
  { mdi: "refresh", usage: "Refresh, Reload, Retry", icon: "", code: "" },
  { mdi: "reply-outline", usage: "Reply", icon: "", code: "" },
  { mdi: "restart", usage: "Restart, Reset", icon: "", code: "" },
  { mdi: "restore", usage: "Restore, Revert", icon: "", code: "" },
  {
    mdi: "rocket-launch-outline",
    usage: "Deploy, Deployment",
    icon: "",
    code: "",
  },
  {
    mdi: "school-outline",
    usage: "Education, Training",
    icon: "",
    code: "",
  },
  { mdi: "selection", usage: "Selection", icon: "", code: "" },
  { mdi: "send", usage: "Send", icon: "", code: "" },
  { mdi: "share-outline", usage: "Share", icon: "", code: "" },
  {
    mdi: "share-variant-outline",
    usage: "Social share",
    icon: "",
    code: "",
  },
  {
    mdi: "shield-key-outline",
    usage: "API key, Token",
    icon: "",
  },
  {
    mdi: "shield-lock-outline",
    usage: "Security, Multi-factor authentication (MFA)",
  },
  {
    mdi: "shopping-outline",
    usage: "Commerce, Shopping",
    icon: "",
    code: "",
  },
  {
    mdi: "sitemap-outline",
    usage: "Taxonomy",
    icon: "",
    code: "",
  },
  { mdi: "square", usage: "Solid color", icon: "", code: "" },
  { mdi: "square-edit-outline", usage: "Draft", icon: "", code: "" },
  {
    mdi: "square-off-outline",
    usage: "No colour, No border settings",
    icon: "",
  },
  { mdi: "stamper", usage: "Watermark", icon: "", code: "" },
  {
    mdi: "star",
    usage: "Favorite (active), Star (active)",
    icon: "",
    code: "",
  },
  {
    mdi: "star-four-points",
    usage: "Artifcial Intelligence, Generative AI",
    icon: "",
    code: "",
  },
  { mdi: "star-outline", usage: "Favorite, Star", icon: "", code: "" },
  {
    mdi: "swap-horizontal",
    usage: "Swap (horizontal)",
    icon: "",
    code: "",
  },
  {
    mdi: "swap-vertical",
    usage: "Sorting, Swap (vertical)",
    icon: "",
    code: "",
  },
  { mdi: "sync", usage: "Sync", icon: "", code: "" },
  { mdi: "tab", usage: "Tab, Tabs", icon: "", code: "" },
  { mdi: "table", usage: "Table", icon: "", code: "" },
  {
    mdi: "table-column-plus-after",
    usage: "Insert column right",
    icon: "",
    code: "",
  },
  {
    mdi: "table-column-plus-before",
    usage: "Insert column left",
    icon: "",
    code: "",
  },
  {
    mdi: "table-column-remove",
    usage: "Delete column",
    icon: "",
    code: "",
  },
  {
    mdi: "table-row-plus-after",
    usage: "Insert row below",
    icon: "",
    code: "",
  },
  {
    mdi: "table-row-plus-before",
    usage: "Insert row above",
    icon: "",
    code: "",
  },
  { mdi: "table-row-remove", usage: "Delete row", icon: "", code: "" },
  { mdi: "tablet", usage: "Tablet view", icon: "", code: "" },
  { mdi: "tag-outline", usage: "Tag, Label", icon: "", code: "" },
  { mdi: "text", usage: "Text, String", icon: "", code: "" },
  { mdi: "text-long", usage: "Text (long)", icon: "", code: "" },
  { mdi: "text-short", usage: "Text (short)", icon: "", code: "" },
  { mdi: "thumbs-up-down-outline", usage: "Review", icon: "", code: "" },
  { mdi: "timer-outline", usage: "Timer", icon: "", code: "" },
  {
    mdi: "toggle-switch-outline",
    usage: "Boolean, Toggle, Switch",
    icon: "",
  },
  {
    mdi: "toolbox-outline",
    usage: "Toolkit, Starter kit",
    icon: "",
    code: "",
  },
  { mdi: "toy-brick-outline", usage: "Component", icon: "", code: "" },
  { mdi: "translate", usage: "Translate, Translation", icon: "", code: "" },
  { mdi: "trash-can-outline", usage: "Delete", icon: "", code: "" },
  { mdi: "tray-arrow-down", usage: "Download", icon: "", code: "" },
  { mdi: "tray-arrow-up", usage: "Upload", icon: "", code: "" },
  {
    mdi: "tune-variant",
    usage: "Tune, Adjust, Customize",
    icon: "",
    code: "",
  },
  { mdi: "undo", usage: "Undo", icon: "", code: "" },
  { mdi: "unfold-less-horizontal", usage: "Show less", icon: "", code: "" },
  { mdi: "unfold-less-vertical", usage: "Show less", icon: "", code: "" },
  { mdi: "unfold-more-horizontal", usage: "Show more", icon: "", code: "" },
  { mdi: "unfold-more-vertical", usage: "Show more", icon: "", code: "" },
  { mdi: "update", usage: "Update, Rework", icon: "", code: "" },
  { mdi: "vector-link", usage: "Referenced content", icon: "", code: "" },
  { mdi: "vector-curve", usage: "Vector", icon: "", code: "" },
  { mdi: "view-carousel-outline", usage: "Carousel", icon: "", code: "" },
  { mdi: "view-column-outline", usage: "Columns", icon: "", code: "" },
  { mdi: "view-list-outline", usage: "List view", icon: "", code: "" },
  { mdi: "view-module-outline", usage: "Grid view", icon: "", code: "" },
  { mdi: "web", usage: "Language, Locale, Localization", icon: "", code: "" },
  {
    mdi: "zip-box-outline",
    usage: "ZIP file, compressed archive",
    icon: "",
    code: "",
  },
  { mdi: "webhook", usage: "Webhook", icon: "", code: "" },
];

const iconLogos = [
  { icon: "iconCdp", product: "CDP", path: logoIcons.iconCdp },
  { icon: "iconConnect", product: "Connect", path: logoIcons.iconConnect },
  {
    icon: "iconContentHub",
    product: "Content Hub",
    path: logoIcons.iconContentHub,
  },
  {
    icon: "iconContentHubOne",
    product: "Content Hub ONE",
    path: logoIcons.iconContentHubOne,
  },
  { icon: "iconDiscover", product: "Discover", path: logoIcons.iconDiscover },
  {
    icon: "iconOrdercloud",
    product: "OrderCloud",
    path: logoIcons.iconOrdercloud,
  },
  {
    icon: "iconPersonalize",
    product: "Personalize",
    path: logoIcons.iconPersonalize,
  },
  { icon: "iconSearch", product: "Search", path: logoIcons.iconSearch },
  { icon: "iconXmCloud", product: "XM Cloud", path: logoIcons.iconXmCloud },
  { icon: "iconSitecore", product: "Sitecore", path: logoIcons.iconSitecore },
  {
    icon: "iconSitecoreAI",
    product: "SitecoreAI",
    path: logoIcons.iconSitecoreAI,
  },
];

iconsData.forEach((data) => {
  const { mdi } = data;
  // account-circle-outline => [account, circle, outline]
  let allWords = mdi.split("-");
  // capitalize all words => [Account, Circle, Outline]
  allWords = allWords.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  // join all words and prefix with 'mdi'=> [mdiAccountCircleOutline]
  const code = "mdi" + allWords.join("");
  data.icon = code;
  data.code = code;
  // lazy load all icon imports
  data.icon = mdiIcons?.[code as keyof typeof mdiIcons] as string;
});

export default function IconsPage() {
  return (
    <div className="container p-5 md:p-10  xl:pr-[250px]">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight">Icons</h1>
      </div>

      <div className="flex flex-col gap-6 mb-12">
        <Alert variant="primary">
          <AlertDescription className="flex flex-row">
            To learn how to implement these icons, see{" "}
            <a
              href="/components/icon"
              className="text-primary hover:text-primary/80 no-underline whitespace-nowrap"
            >
              Icon component
            </a>
          </AlertDescription>
        </Alert>

        <h2 className="text-2xl font-semibold">General icons</h2>

        <p className="text-muted-foreground max-w-[65ch]">
          All the icons are from the{" "}
          <a
            href="https://pictogrammers.com/library/mdi/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 no-underline"
          >
            Material Design Icons
          </a>{" "}
          library.
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Example import:</p>
          <code className="block p-3 bg-muted rounded-md text-sm">
            {`import { mdiAccountCircleOutline } from '@mdi/js'`}
          </code>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-28 px-4">Icon</TableHead>
                <TableHead className="px-4">MDI link</TableHead>
                <TableHead className="px-4">MDI code</TableHead>
                <TableHead className="px-4">Usage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iconsData.map(({ mdi, usage, icon, code }) => (
                <TableRow key={mdi}>
                  <TableCell className="w-28 px-4">
                    <Suspense fallback={<Spinner size="sm" />}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => copyToClipboard(code || "")}
                            className="cursor-pointer inline-flex items-center justify-center w-8 h-8 hover:bg-muted rounded transition-colors"
                          >
                            <Icon
                              path={icon as string}
                              size={0.85}
                              className="text-foreground"
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Copy MDI code</TooltipContent>
                      </Tooltip>
                    </Suspense>
                  </TableCell>
                  <TableCell className="px-4">
                    <a
                      href={`https://pictogrammers.com/library/mdi/icon/${mdi}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 no-underline text-sm transition-colors"
                    >
                      {mdi}
                    </a>
                  </TableCell>
                  <TableCell className="px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <code
                          onClick={() => copyToClipboard(code || "")}
                          className="cursor-pointer bg-muted px-2 py-1 rounded text-sm hover:bg-muted/80 transition-colors inline-block"
                        >
                          {code}
                        </code>
                      </TooltipTrigger>
                      <TooltipContent>Copy to clipboard</TooltipContent>
                    </Tooltip>
                  </TableCell>
                  <TableCell className="px-4 text-sm">{usage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <h2 className="text-2xl font-semibold">Logo icons</h2>

        <p className="text-muted-foreground max-w-[65ch]">
          Used when a logo needs to be rendered as a single path inside an{" "}
          <a
            href="/components/icon"
            className="text-primary hover:text-primary/80 no-underline"
          >
            Icon
          </a>
          . For the regular full-color logo images, see{" "}
          <a
            href="/foundations/logos"
            className="text-primary hover:text-primary/80 no-underline"
          >
            Logos
          </a>
          .
        </p>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Example import:</p>
          <code className="block p-3 bg-muted rounded-md text-sm">
            {`import { iconXmCloud } from '@sitecore/blok-theme'`}
          </code>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-50 px-4">Icon</TableHead>
                <TableHead className="w-100 px-4">Product</TableHead>
                <TableHead className=" px-4">Icon code</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {iconLogos.map(({ icon, product, path }) => (
                <TableRow key={icon}>
                  <TableCell className="w-36 px-4">
                    <Suspense fallback={<Spinner size="sm" />}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => copyToClipboard(icon)}
                            className="cursor-pointer inline-flex items-center justify-center w-8 h-8 hover:bg-muted rounded transition-colors"
                          >
                            <Icon
                              path={path}
                              size={0.85}
                              className="text-foreground"
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>Copy icon code</TooltipContent>
                      </Tooltip>
                    </Suspense>
                  </TableCell>
                  <TableCell className="px-4 text-sm">{product}</TableCell>
                  <TableCell className="px-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <code
                          onClick={() => copyToClipboard(icon)}
                          className="cursor-pointer bg-muted px-2 py-1 rounded text-sm hover:bg-muted/80 transition-colors inline-block"
                        >
                          {icon}
                        </code>
                      </TooltipTrigger>
                      <TooltipContent>Copy to clipboard</TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
