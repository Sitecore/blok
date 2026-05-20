"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { FileUIPart, SourceDocumentUIPart } from "ai";
import {
  FileTextIcon,
  GlobeIcon,
  ImageIcon,
  Music2Icon,
  PaperclipIcon,
  VideoIcon,
  XIcon,
} from "lucide-react";
import {
  Children,
  type ComponentProps,
  type HTMLAttributes,
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from "react";

// ============================================================================
// Types
// ============================================================================

export type AttachmentData =
  | (FileUIPart & { id: string })
  | (SourceDocumentUIPart & { id: string });

export type AttachmentMediaCategory =
  | "image"
  | "video"
  | "audio"
  | "document"
  | "source"
  | "unknown";

export type AttachmentDocKind = "pdf" | "word" | "other";

export type AttachmentVariant = "grid" | "inline" | "list";

const mediaCategoryIcons: Record<AttachmentMediaCategory, typeof ImageIcon> = {
  audio: Music2Icon,
  document: FileTextIcon,
  image: ImageIcon,
  source: GlobeIcon,
  unknown: PaperclipIcon,
  video: VideoIcon,
};

/** Default visible attachment chips before overflowing into a `+N` chip. */
export const ATTACHMENTS_MAX_VISIBLE_DEFAULT = 3;

/** Fixed width of an inline (non-image) attachment chip in pixels. */
export const ATTACHMENT_INLINE_CHIP_WIDTH_PX = 160;

// ============================================================================
// Utility Functions
// ============================================================================

export const getMediaCategory = (
  data: AttachmentData,
): AttachmentMediaCategory => {
  if (data.type === "source-document") {
    return "source";
  }

  const mediaType = data.mediaType ?? "";

  if (mediaType.startsWith("image/")) {
    return "image";
  }
  if (mediaType.startsWith("video/")) {
    return "video";
  }
  if (mediaType.startsWith("audio/")) {
    return "audio";
  }
  if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
    return "document";
  }

  return "unknown";
};

export const getAttachmentLabel = (data: AttachmentData): string => {
  if (data.type === "source-document") {
    return data.title || data.filename || "Source";
  }

  const category = getMediaCategory(data);
  return data.filename || (category === "image" ? "Image" : "Attachment");
};

export const getAttachmentDocKind = (
  data: AttachmentData,
): AttachmentDocKind => {
  const filename = (
    data.type === "source-document"
      ? (data.filename ?? data.title ?? "")
      : (data.filename ?? "")
  ).toLowerCase();
  const mediaType = (data.mediaType ?? "").toLowerCase();

  if (mediaType === "application/pdf" || filename.endsWith(".pdf")) {
    return "pdf";
  }
  if (
    mediaType === "application/msword" ||
    mediaType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    filename.endsWith(".doc") ||
    filename.endsWith(".docx")
  ) {
    return "word";
  }
  return "other";
};

export const getAttachmentSecondaryLabel = (
  data: AttachmentData,
): string | null => {
  if (data.type === "source-document") {
    return data.mediaType || "Source";
  }

  const docKind = getAttachmentDocKind(data);
  if (docKind === "pdf") return "PDF";
  if (docKind === "word") return "Word document";

  if (data.mediaType) {
    const subtype = data.mediaType.split("/")[1];
    if (subtype) return subtype.toUpperCase();
  }
  return null;
};

// ============================================================================
// Doc Tile Components (leading icons inside chips)
// ============================================================================

type DocTileSize = "sm" | "md";

const docTileSizeClass: Record<DocTileSize, string> = {
  sm: "size-8 text-[9px]",
  md: "size-10 text-[10px]",
};

function PdfDocTile({ size = "sm" }: { size?: DocTileSize }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded bg-red-600 font-bold uppercase leading-none tracking-tight text-white",
        docTileSizeClass[size],
      )}
    >
      PDF
    </span>
  );
}

function WordDocTile({ size = "sm" }: { size?: DocTileSize }) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded bg-blue-600 font-bold leading-none text-white",
        size === "md" ? "size-10 text-base" : "size-8 text-sm",
      )}
    >
      W
    </span>
  );
}

function GenericDocTile({
  icon: Icon,
  size = "sm",
}: {
  icon: typeof ImageIcon;
  size?: DocTileSize;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex shrink-0 items-center justify-center rounded border bg-muted",
        size === "md" ? "size-10" : "size-8",
      )}
    >
      <Icon
        className={cn(
          "text-muted-foreground",
          size === "md" ? "size-5" : "size-4",
        )}
      />
    </span>
  );
}

function AttachmentDocLeadingTile({
  data,
  mediaCategory,
  size = "sm",
}: {
  data: AttachmentData;
  mediaCategory: AttachmentMediaCategory;
  size?: DocTileSize;
}) {
  if (data.type !== "source-document") {
    const kind = getAttachmentDocKind(data);
    if (kind === "pdf") return <PdfDocTile size={size} />;
    if (kind === "word") return <WordDocTile size={size} />;
  }
  const Icon = mediaCategoryIcons[mediaCategory];
  return <GenericDocTile icon={Icon} size={size} />;
}

// ============================================================================
// Contexts
// ============================================================================

interface AttachmentsContextValue {
  variant: AttachmentVariant;
}

const AttachmentsContext = createContext<AttachmentsContextValue | null>(null);

interface AttachmentContextValue {
  data: AttachmentData;
  mediaCategory: AttachmentMediaCategory;
  isInlineImage: boolean;
  onRemove?: () => void;
  variant: AttachmentVariant;
}

const AttachmentContext = createContext<AttachmentContextValue | null>(null);

// ============================================================================
// Hooks
// ============================================================================

export const useAttachmentsContext = () =>
  useContext(AttachmentsContext) ?? { variant: "grid" as const };

export const useAttachmentContext = () => {
  const ctx = useContext(AttachmentContext);
  if (!ctx) {
    throw new Error("Attachment components must be used within <Attachment>");
  }
  return ctx;
};

// ============================================================================
// Attachments - Container (with overflow popover)
// ============================================================================

export type AttachmentsProps = HTMLAttributes<HTMLDivElement> & {
  variant?: AttachmentVariant;
  /**
   * Maximum number of attachment chips visible before collapsing the rest into
   * a `+N` overflow chip. Click the chip to view all attachments in a popover.
   * Pass `Number.POSITIVE_INFINITY` (or a value larger than the attachment
   * count) to disable overflow.
   */
  maxVisible?: number;
};

export const Attachments = ({
  variant = "grid",
  maxVisible = ATTACHMENTS_MAX_VISIBLE_DEFAULT,
  className,
  children,
  ...props
}: AttachmentsProps) => {
  const allChildren = useMemo(() => Children.toArray(children), [children]);
  const total = allChildren.length;
  const limit = Number.isFinite(maxVisible) ? maxVisible : total;
  const visibleCount = Math.max(0, Math.min(total, limit));
  const overflowCount = Math.max(0, total - visibleCount);
  const visibleChildren =
    overflowCount > 0 ? allChildren.slice(0, visibleCount) : allChildren;

  const visibleContextValue = useMemo<AttachmentsContextValue>(
    () => ({ variant }),
    [variant],
  );
  const overflowContextValue = useMemo<AttachmentsContextValue>(
    () => ({ variant: "list" }),
    [],
  );

  return (
    <AttachmentsContext.Provider value={visibleContextValue}>
      <div
        className={cn(
          "flex items-start",
          variant === "list" ? "flex-col gap-1" : "flex-wrap gap-1.5",
          variant === "grid" && "ml-auto w-fit",
          className,
        )}
        data-slot="attachments"
        {...props}
      >
        {visibleChildren}
        {overflowCount > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <button
                aria-label={`Show ${overflowCount} more ${
                  overflowCount === 1 ? "attachment" : "attachments"
                }`}
                className="shrink-0 cursor-pointer"
                type="button"
              >
                <Badge
                  className={cn(
                    "shrink-0 justify-center overflow-visible!",
                    variant === "inline" &&
                      "min-h-13 min-w-12 rounded-md text-sm",
                    variant === "grid" &&
                      "size-24 rounded-lg text-base font-semibold",
                    variant === "list" && "min-h-9 min-w-12",
                  )}
                  colorScheme="neutral"
                  size="lg"
                >
                  +{overflowCount}
                </Badge>
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="max-h-72 w-72 overflow-y-auto p-2"
              side="top"
            >
              <p className="px-1 pb-2 text-xs font-medium text-muted-foreground">
                All attachments ({total})
              </p>
              <AttachmentsContext.Provider value={overflowContextValue}>
                <div className="flex flex-col gap-0.5">{allChildren}</div>
              </AttachmentsContext.Provider>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </AttachmentsContext.Provider>
  );
};

// ============================================================================
// Attachment - Item (file-type-aware chip)
// ============================================================================

export type AttachmentProps = HTMLAttributes<HTMLDivElement> & {
  data: AttachmentData;
  onRemove?: () => void;
};

export const Attachment = ({
  data,
  onRemove,
  className,
  children,
  style,
  ...props
}: AttachmentProps) => {
  const { variant } = useAttachmentsContext();
  const mediaCategory = getMediaCategory(data);
  const isInlineImage =
    variant === "inline" &&
    mediaCategory === "image" &&
    data.type === "file" &&
    Boolean(data.url);
  const isInlineDoc = variant === "inline" && !isInlineImage;

  const contextValue = useMemo<AttachmentContextValue>(
    () => ({ data, isInlineImage, mediaCategory, onRemove, variant }),
    [data, isInlineImage, mediaCategory, onRemove, variant],
  );

  return (
    <AttachmentContext.Provider value={contextValue}>
      <div
        className={cn(
          "group relative",
          variant === "grid" && "size-24 overflow-hidden rounded-lg",
          isInlineImage && "size-13 shrink-0 overflow-visible",
          isInlineDoc && [
            "flex min-h-13 shrink-0 items-center gap-2 overflow-visible",
            "rounded-md bg-neutral-bg px-2 py-1.5 text-neutral-fg",
          ],
          variant === "list" && [
            "flex w-full items-center gap-2 rounded-md p-1.5 text-xs",
            "hover:bg-muted/50",
          ],
          className,
        )}
        data-slot="attachment"
        {...props}
        style={
          isInlineDoc
            ? { width: ATTACHMENT_INLINE_CHIP_WIDTH_PX, ...style }
            : style
        }
      >
        {children}
      </div>
    </AttachmentContext.Provider>
  );
};

// ============================================================================
// AttachmentPreview - Media preview / leading tile
// ============================================================================

export type AttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
  fallbackIcon?: ReactNode;
};

export const AttachmentPreview = ({
  fallbackIcon,
  className,
  ...props
}: AttachmentPreviewProps) => {
  const { data, isInlineImage, mediaCategory, variant } =
    useAttachmentContext();

  if (variant === "inline") {
    if (isInlineImage && data.type === "file" && data.url) {
      return (
        <div
          className={cn(
            "size-full overflow-hidden rounded-lg border bg-muted",
            className,
          )}
          data-slot="attachment-preview"
          {...props}
        >
          <img
            alt={data.filename || "Image"}
            className="size-full object-cover"
            src={data.url}
          />
        </div>
      );
    }

    return (
      <div
        className={cn("flex shrink-0 items-center justify-center", className)}
        data-slot="attachment-preview"
        {...props}
      >
        {fallbackIcon ?? (
          <AttachmentDocLeadingTile
            data={data}
            mediaCategory={mediaCategory}
            size="sm"
          />
        )}
      </div>
    );
  }

  if (variant === "list") {
    if (mediaCategory === "image" && data.type === "file" && data.url) {
      return (
        <div
          className={cn(
            "size-9 shrink-0 overflow-hidden rounded border bg-muted",
            className,
          )}
          data-slot="attachment-preview"
          {...props}
        >
          <img
            alt={data.filename || "Image"}
            className="size-full object-cover"
            src={data.url}
          />
        </div>
      );
    }

    return (
      <div
        className={cn("flex shrink-0 items-center justify-center", className)}
        data-slot="attachment-preview"
        {...props}
      >
        {fallbackIcon ?? (
          <AttachmentDocLeadingTile
            data={data}
            mediaCategory={mediaCategory}
            size="sm"
          />
        )}
      </div>
    );
  }

  // grid variant
  const renderGridContent = () => {
    if (mediaCategory === "image" && data.type === "file" && data.url) {
      return (
        <img
          alt={data.filename || "Image"}
          className="size-full object-cover"
          height={96}
          src={data.url}
          width={96}
        />
      );
    }

    if (mediaCategory === "video" && data.type === "file" && data.url) {
      return <video className="size-full object-cover" muted src={data.url} />;
    }

    const Icon = mediaCategoryIcons[mediaCategory];
    return fallbackIcon ?? <Icon className="size-6 text-muted-foreground" />;
  };

  return (
    <div
      className={cn(
        "flex size-full shrink-0 items-center justify-center overflow-hidden bg-muted",
        className,
      )}
      data-slot="attachment-preview"
      {...props}
    >
      {renderGridContent()}
    </div>
  );
};

// ============================================================================
// AttachmentInfo - Name and secondary label
// ============================================================================

export type AttachmentInfoProps = HTMLAttributes<HTMLDivElement> & {
  /**
   * When true, shows the raw `mediaType` instead of the friendlier secondary
   * label (e.g. "PDF", "Word document").
   */
  showMediaType?: boolean;
};

export const AttachmentInfo = ({
  showMediaType = false,
  className,
  ...props
}: AttachmentInfoProps) => {
  const { data, isInlineImage, variant } = useAttachmentContext();
  const label = getAttachmentLabel(data);
  const secondary = showMediaType
    ? (data.mediaType ?? null)
    : getAttachmentSecondaryLabel(data);

  if (variant === "grid") {
    return null;
  }

  if (variant === "inline" && isInlineImage) {
    return null;
  }

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col justify-center gap-0.5 pr-5 leading-tight",
          className,
        )}
        data-slot="attachment-info"
        {...props}
      >
        <span className="block truncate text-xs font-medium">{label}</span>
        {secondary ? (
          <span className="block truncate text-[10px] text-muted-foreground">
            {secondary}
          </span>
        ) : null}
      </div>
    );
  }

  // list variant
  return (
    <div
      className={cn("min-w-0 flex-1 leading-tight", className)}
      data-slot="attachment-info"
      {...props}
    >
      <span className="block truncate text-xs font-medium">{label}</span>
      {secondary ? (
        <span className="block truncate text-[10px] text-muted-foreground">
          {secondary}
        </span>
      ) : null}
    </div>
  );
};

// ============================================================================
// AttachmentRemove - Remove button
// ============================================================================

export type AttachmentRemoveProps = ComponentProps<typeof Button> & {
  label?: string;
};

export const AttachmentRemove = ({
  label = "Remove",
  className,
  children,
  ...props
}: AttachmentRemoveProps) => {
  const { onRemove, variant } = useAttachmentContext();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onRemove?.();
    },
    [onRemove],
  );

  if (!onRemove) {
    return null;
  }

  return (
    <Button
      aria-label={label}
      className={cn(
        variant === "grid" && [
          "absolute top-2 right-2 size-6 min-w-0 rounded-full p-0",
          "bg-background/80 backdrop-blur-sm",
          "opacity-0 transition-opacity group-hover:opacity-100",
          "hover:bg-background",
          "[&>svg]:size-3!",
        ],
        variant === "inline" && [
          "absolute -top-1.5 -right-1.5 z-10 size-5 min-w-0 rounded-full p-0",
          "border bg-background text-foreground shadow-sm",
          "hover:bg-accent",
          "[&>svg]:size-3!",
        ],
        variant === "list" && [
          "size-6 min-w-0 shrink-0 rounded-md p-0 text-muted-foreground",
          "hover:bg-muted hover:text-foreground",
          "[&>svg]:size-3!",
        ],
        className,
      )}
      onClick={handleClick}
      type="button"
      variant="ghost"
      {...props}
    >
      {children ?? <XIcon />}
      <span className="sr-only">{label}</span>
    </Button>
  );
};

// ============================================================================
// AttachmentHoverCard - Hover preview
// ============================================================================

export type AttachmentHoverCardProps = ComponentProps<typeof HoverCard>;

export const AttachmentHoverCard = ({
  openDelay = 0,
  closeDelay = 0,
  ...props
}: AttachmentHoverCardProps) => (
  <HoverCard closeDelay={closeDelay} openDelay={openDelay} {...props} />
);

export type AttachmentHoverCardTriggerProps = ComponentProps<
  typeof HoverCardTrigger
>;

export const AttachmentHoverCardTrigger = (
  props: AttachmentHoverCardTriggerProps,
) => <HoverCardTrigger {...props} />;

export type AttachmentHoverCardContentProps = ComponentProps<
  typeof HoverCardContent
>;

export const AttachmentHoverCardContent = ({
  align = "start",
  className,
  ...props
}: AttachmentHoverCardContentProps) => (
  <HoverCardContent
    align={align}
    className={cn("w-auto p-2", className)}
    {...props}
  />
);

// ============================================================================
// AttachmentEmpty - Empty state
// ============================================================================

export type AttachmentEmptyProps = HTMLAttributes<HTMLDivElement>;

export const AttachmentEmpty = ({
  className,
  children,
  ...props
}: AttachmentEmptyProps) => (
  <div
    className={cn(
      "flex items-center justify-center p-4 text-muted-foreground text-sm",
      className,
    )}
    {...props}
  >
    {children ?? "No attachments"}
  </div>
);
