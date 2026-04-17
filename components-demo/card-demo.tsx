import {
  Card,
  CardAction,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import {
  mdiClose,
  mdiCloudCheckVariantOutline,
  mdiDotsHorizontal,
  mdiLightbulbOutline,
  mdiTrendingUp,
  mdiPackageVariant,
  mdiImageOutline,
  mdiTrophy,
} from "@mdi/js";

const CARD_IMAGE = "/card-image.png";

const TAGS = ["Release", ...Array(6).fill("Collection"), "+2"];

const VARIANT_DEFAULTS = {
  image: {
    imageSrc: "/card-image.png",
    objectFit: "cover" as const,
    showCheckbox: true,
    showClose: true,
    showFileType: true,
    fileTypeLabel: "JPG",
  },
  search: {
    imageSrc: "/Card-search.svg",
    objectFit: "cover" as const,
    showCheckbox: false,
    showClose: false,
    showFileType: false,
    fileTypeLabel: "JPG",
  },
  pdf: {
    imageSrc: "/Card-pdf.svg",
    objectFit: "cover" as const,
    showCheckbox: true,
    showClose: false,
    showFileType: true,
    fileTypeLabel: "PDF",
  },
} as const;

export type VerticalCardVariant = keyof typeof VARIANT_DEFAULTS;

export interface VerticalCardProps {
  variant?: VerticalCardVariant;
  imageSrc?: string;
  objectFit?: "cover" | "contain";
  showCheckbox?: boolean;
  showClose?: boolean;
  showFileType?: boolean;
  fileTypeLabel?: string;
  mediaInset?: boolean /** When false, image has no padding and touches the card edges. Default true. */;
  className?: string;
}

export function VerticalCard({
  variant = "image",
  imageSrc,
  objectFit,
  showCheckbox,
  showClose,
  showFileType,
  fileTypeLabel,
  mediaInset = true,
}: VerticalCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = objectFit ?? defaults.objectFit;
  const checkbox = showCheckbox ?? defaults.showCheckbox;
  const close = showClose ?? defaults.showClose;
  const fileType = showFileType ?? defaults.showFileType;
  const fileLabel = fileTypeLabel ?? defaults.fileTypeLabel;
  return (
    <Card
      style="outline"
      elevation="lg"
      padding="lg"
      className={"w-[275px] overflow-hidden rounded-xl p-0 gap-0"}
    >
      <div className={mediaInset ? "px-3 pt-3 pb-0" : ""}>
        <div
          className={
            mediaInset
              ? "relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-muted"
              : "relative aspect-video w-full shrink-0 overflow-hidden bg-muted"
          }
        >
          <img
            src={src}
            alt=""
            className={`size-full object-center ${fit === "cover" ? "object-cover" : "object-contain"}`}
            decoding="async"
            width={275}
            height={155}
          />
          {checkbox && (
            <div className="absolute left-3 top-3">
              <Checkbox
                aria-label="Select"
                className="size-5 border-2 bg-white"
              />
            </div>
          )}
          {close && (
            <button
              type="button"
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Close"
            >
              <Icon path={mdiClose} size={0.9} className="size-4" />
            </button>
          )}
          {fileType && (
            <Badge
              size="lg"
              colorScheme="neutral"
              className="absolute bottom-3 right-3 bg-black/60 text-white"
            >
              {fileLabel}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex flex-col gap-0 px-4 pt-2 pb-3">
        <CardHeader className="gap-1">
          <CardTitle className="text-md font-semibold text-foreground leading-snug line-clamp-2">
            Lorem ipsum dolor sit amet consectetur. Morbi...
          </CardTitle>
          <CardAction className="flex shrink-0 items-center gap-2">
            <span className="text-md text-muted-foreground">en-US</span>
            <span
              className="inline-flex items-center justify-center rounded-md bg-success-bg px-2 py-1"
              aria-hidden
            >
              <Icon
                path={mdiCloudCheckVariantOutline}
                size={1.2}
                className="size-4 "
              />
            </span>
            <button
              type="button"
              className="rounded p-0.5 hover:bg-muted"
              aria-label="More options"
            >
              <Icon
                path={mdiDotsHorizontal}
                size={1.2}
                className="size-4 text-neutral-fg"
              />
            </button>
          </CardAction>
        </CardHeader>
        <CardDescription className="-mt-3 text-xs text-muted-foreground line-clamp-2">
          Explore luxurious escapes worldwide with our elite collection of
          hotels &amp; resorts and...
        </CardDescription>
        <div className="flex flex-wrap gap-1">
          {TAGS.map((tag, i) => (
            <Badge
              key={`${tag}-${i}`}
              size="sm"
              colorScheme="neutral"
              className="font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardFooter className="p-0 text-xs text-muted-foreground">
          By Sitecore
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export function VerticalImageCard({ imageSrc }: { imageSrc?: string }) {
  return <VerticalCard variant="image" imageSrc={imageSrc ?? CARD_IMAGE} />;
}

export function VerticalPlaceholderCard() {
  return <VerticalCard variant="search" />;
}

export function VerticalPdfCard() {
  return <VerticalCard variant="pdf" />;
}

interface VerticalMediumCardProps {
  variant?: VerticalCardVariant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function VerticalMediumCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: VerticalMediumCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = defaults.objectFit;
  return (
    <Card
      style="outline"
      elevation="lg"
      padding="lg"
      className="w-[275px] overflow-hidden rounded-xl p-0 gap-1"
    >
      <div className={mediaInset ? "px-3 pt-3 pb-0" : ""}>
        <div
          className={
            mediaInset
              ? "relative h-[260px] w-full shrink-0 overflow-hidden rounded-xl bg-muted"
              : "relative h-[260px] w-full shrink-0 overflow-hidden bg-muted"
          }
        >
          <img
            src={src}
            alt=""
            className={`size-full object-center ${fit === "cover" ? "object-cover" : "object-contain"}`}
            decoding="async"
            width={275}
            height={155}
          />
          {defaults.showCheckbox && (
            <div className="absolute left-3 top-3">
              <Checkbox
                aria-label="Select"
                className="size-5 border-2 bg-white"
              />
            </div>
          )}
          {defaults.showClose && (
            <button
              type="button"
              className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/70"
              aria-label="Close"
            >
              <Icon path={mdiClose} size={0.9} className="size-4" />
            </button>
          )}
          {defaults.showFileType && (
            <Badge
              size="lg"
              colorScheme="neutral"
              className="absolute bottom-3 right-3 bg-black/60 text-white"
            >
              {defaults.fileTypeLabel}
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="flex flex-col gap-1 px-4 pt-1.5 pb-1.5">
        <CardHeader className="gap-0">
          <CardTitle className="text-md font-semibold text-foreground line-clamp-2">
            Lorem ipsum dolor site amet consectetur. Morbi...
          </CardTitle>
          <CardAction className="flex shrink-0 items-center gap-2">
            <span
              className="inline-flex items-center justify-center rounded-md bg-success-bg px-2 py-1"
              aria-hidden
            >
              <Icon
                path={mdiCloudCheckVariantOutline}
                size={1.2}
                className="size-4"
              />
            </span>
            <button
              type="button"
              className="rounded p-0.5 hover:bg-muted"
              aria-label="More options"
            >
              <Icon
                path={mdiDotsHorizontal}
                size={1.2}
                className="size-4 text-neutral-fg"
              />
            </button>
          </CardAction>
        </CardHeader>
      </CardContent>
    </Card>
  );
}

const VERTICAL_VARIANT_SMALL = {
  image: {
    imageSrc: "/card-image.png",
    objectFit: "cover" as const,
    showCheckbox: false,
    showFileType: false,
    fileTypeLabel: "JPG",
  },
  search: {
    imageSrc: "/Card-search.svg",
    objectFit: "cover" as const,
    showCheckbox: false,
    showFileType: false,
  },
  pdf: {
    imageSrc: "/Card-pdf.svg",
    objectFit: "cover" as const,
    showCheckbox: false,
    showFileType: false,
  },
} as const;

type VerticalSmallCardVariant = keyof typeof VERTICAL_VARIANT_SMALL;

interface VerticalSmallCardProps {
  variant?: VerticalSmallCardVariant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function VerticalSmallCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: VerticalSmallCardProps) {
  const defaults = VERTICAL_VARIANT_SMALL[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = defaults.objectFit;
  return (
    <Card
      style="outline"
      elevation="lg"
      padding="lg"
      className="w-[200px] overflow-hidden rounded-xl p-0 gap-0"
    >
      <div className={mediaInset ? "px-2 pt-2 pb-0" : ""}>
        <div
          className={
            mediaInset
              ? "relative h-[100px] w-full shrink-0 overflow-hidden rounded-lg bg-muted"
              : "relative h-[100px] w-full shrink-0 overflow-hidden bg-muted"
          }
        >
          <img
            src={src}
            alt=""
            className={`size-full object-center ${fit === "cover" ? "object-cover" : "object-contain"}`}
            decoding="async"
            width={200}
            height={140}
          />
          {defaults.showCheckbox && (
            <div className="absolute left-2 top-2">
              <Checkbox
                aria-label="Select"
                className="size-4 border-2 bg-white"
              />
            </div>
          )}
        </div>
      </div>
      <CardContent className="flex flex-row items-center justify-between gap-2 px-3 py-2">
        <span className="truncate text-sm font-semibold text-foreground">
          Lorem ipsum
        </span>
        <button
          type="button"
          className="shrink-0 rounded p-0.5 hover:bg-muted"
          aria-label="More options"
        >
          <Icon
            path={mdiDotsHorizontal}
            size={0.9}
            className="size-4 text-neutral-fg"
          />
        </button>
      </CardContent>
    </Card>
  );
}

const HORIZONTAL_VARIANT_DEFAULTS = {
  image: {
    imageSrc: "",
    objectFit: "cover" as const,
    showCheckbox: true,
    showFileType: true,
    fileTypeLabel: "JPG",
  },
  search: {
    imageSrc: "",
    objectFit: "cover" as const,
    showCheckbox: false,
    showFileType: true,
    fileTypeLabel: "JPG",
  },
  pdf: {
    imageSrc: "",
    objectFit: "cover" as const,
    showCheckbox: false,
    showFileType: true,
    fileTypeLabel: "PDF",
  },
} as const;

type HorizontalCardVariant = keyof typeof HORIZONTAL_VARIANT_DEFAULTS;

interface HorizontalDetailCardProps {
  variant?: HorizontalCardVariant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalDetailCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalDetailCardProps) {
  const defaults = HORIZONTAL_VARIANT_DEFAULTS[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = defaults.objectFit;
  return (
    <Card
      style="outline"
      elevation="lg"
      className="w-full max-w-[462px] overflow-hidden rounded-xl p-0 gap-0"
    >
      <div className="flex min-h-0 w-full flex-row">
        {/* Media (left) */}
        <div
          className={
            mediaInset
              ? "flex shrink-0 items-start p-3 pr-0"
              : "flex shrink-0 self-stretch"
          }
        >
          <div
            className={
              mediaInset
                ? "relative isolate h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md"
                : "relative isolate h-full min-h-[160px] w-[90px] shrink-0 overflow-hidden rounded-none bg-muted"
            }
          >
            <img
              src={src}
              alt=""
              className={`size-full object-center ${fit === "cover" ? "object-cover" : "object-contain"}`}
              decoding="async"
              width={80}
              height={80}
            />
            {defaults.showCheckbox && (
              <div className="absolute left-2 top-2 z-10">
                <Checkbox
                  aria-label="Select"
                  className="size-5 border-2 bg-white"
                />
              </div>
            )}
          </div>
        </div>
        {/* Content (right) */}
        <CardContent className="relative flex min-w-0 flex-1 flex-col gap-0 p-4 pl-3 pr-10">
          <CardHeader>
            <CardTitle className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
              Lorem ipsum dolor sit amet consectetur. Morbi nunc sem...
            </CardTitle>
            <CardAction className="flex shrink-0 items-center gap-1.5 ">
              <span className="text-sm text-muted-foreground">en-US</span>
              <span
                className="inline-flex items-center justify-center rounded-md bg-success-bg px-2.5 py-1"
                aria-hidden
              >
                <Icon
                  path={mdiCloudCheckVariantOutline}
                  size={1.3}
                  className="size-3.5"
                />
              </span>
              <button
                type="button"
                className="rounded p-0.5 hover:bg-muted"
                aria-label="More options"
              >
                <Icon
                  path={mdiDotsHorizontal}
                  size={1.3}
                  className="size-3.5 text-neutral-fg"
                />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 hover:bg-muted"
                aria-label="Close"
              >
                <Icon
                  path={mdiClose}
                  size={1.3}
                  className="size-3.5 text-neutral-fg"
                />
              </button>
            </CardAction>
          </CardHeader>
          {defaults.showFileType && (
            <p className="-mt-1 mb-2 text-sm uppercase leading-none tracking-wide text-muted-foreground">
              {defaults.fileTypeLabel === "JPG"
                ? "JPEG"
                : defaults.fileTypeLabel}
            </p>
          )}
          <CardDescription className=" line-clamp-2 text-sm text-muted-foreground">
            Explore luxurious escapes worldwide with our elite collection of
            hotels &amp; resorts and so many other thi...
          </CardDescription>
          <div className="flex flex-wrap gap-1">
            {TAGS.map((tag, i) => (
              <Badge
                key={`${tag}-${i}`}
                size="sm"
                colorScheme="neutral"
                className="font-normal"
              >
                {tag}
              </Badge>
            ))}
          </div>
          <CardFooter className="mt-auto flex flex-row items-center border-0 p-0 pt-1">
            <span className="text-xs text-muted-foreground">By Sitecore</span>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  );
}

const HORIZONTAL_VARIANT_NORMAL = {
  image: {
    imageSrc: "",
    objectFit: "cover" as const,
  },
  search: {
    imageSrc: "",
    objectFit: "cover" as const,
  },
  pdf: {
    imageSrc: "",
    objectFit: "cover" as const,
  },
} as const;

type HorizontalNormalCardVariant = keyof typeof HORIZONTAL_VARIANT_NORMAL;

interface HorizontalNormalCardProps {
  variant?: HorizontalNormalCardVariant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalNormalCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalNormalCardProps) {
  const defaults = HORIZONTAL_VARIANT_NORMAL[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = defaults.objectFit;
  return (
    <Card
      style="outline"
      elevation="lg"
      className="w-full max-w-[462px] overflow-hidden rounded-xl p-0 gap-0"
    >
      <div
        className={
          mediaInset
            ? "flex min-h-[104px] w-full flex-row items-center"
            : "flex w-full flex-row items-stretch"
        }
      >
        <div
          className={
            mediaInset
              ? "flex shrink-0 items-center p-3 pr-0"
              : "flex shrink-0 self-stretch"
          }
        >
          <div
            className={
              mediaInset
                ? "relative isolate h-[80px] w-[80px] shrink-0 overflow-hidden rounded-md bg-muted"
                : "relative isolate h-[85px] w-[80px] shrink-0 overflow-hidden rounded-none bg-muted"
            }
          >
            <img
              src={src}
              alt=""
              className={`block size-full min-h-full min-w-full origin-center object-center ${fit === "cover" ? "object-cover" : "object-contain"} `}
              decoding="async"
              width={80}
              height={80}
            />
          </div>
        </div>
        <CardContent className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-center p-4 pl-3 pr-10">
          <div className="flex w-full min-w-0 items-center gap-0">
            <CardTitle className="min-w-0 flex-1 line-clamp-2 text-base font-semibold leading-snug text-foreground">
              Lorem ipsum dolor sit amet consectetur. Morbi nunc semper lacus in
              ullam...
            </CardTitle>
            <div className="flex shrink-0 items-center gap-2 translate-x-5">
              <span
                className="inline-flex items-center justify-center rounded-md bg-success-bg px-2.5 py-1"
                aria-hidden
              >
                <Icon
                  path={mdiCloudCheckVariantOutline}
                  size={1.3}
                  className="size-3.5"
                />
              </span>
              <button
                type="button"
                className="rounded p-0.5 hover:bg-muted"
                aria-label="More options"
              >
                <Icon
                  path={mdiDotsHorizontal}
                  size={1.3}
                  className="size-3.5 text-neutral-fg"
                />
              </button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

const HORIZONTAL_VARIANT_SMALL = {
  image: {
    imageSrc: "/card-image.png",
    objectFit: "cover" as const,
  },
  search: {
    imageSrc: "/Card-search-horizontal.svg",
    objectFit: "cover" as const,
  },
  pdf: {
    imageSrc: "/Card-pdf-horizontal.svg",
    objectFit: "cover" as const,
  },
} as const;

type HorizontalSmallCardVariant = keyof typeof HORIZONTAL_VARIANT_SMALL;

interface HorizontalSmallCardProps {
  variant?: HorizontalSmallCardVariant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalSmallCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalSmallCardProps) {
  const defaults = HORIZONTAL_VARIANT_SMALL[variant];
  const src = imageSrc ?? defaults.imageSrc;
  const fit = defaults.objectFit;
  return (
    <Card
      style="outline"
      elevation="lg"
      className="w-fit max-w-full overflow-hidden rounded-xl p-0 gap-0"
    >
      <div
        className={
          mediaInset
            ? "flex min-h-[96px] w-fit max-w-full flex-row items-center p-3"
            : "flex w-fit max-w-full flex-row items-stretch"
        }
      >
        <div
          className={
            mediaInset ? "flex shrink-0" : "flex shrink-0 self-stretch"
          }
        >
          <div
            className={
              mediaInset
                ? "relative isolate h-[72px] w-[72px] shrink-0 overflow-hidden rounded-md bg-muted"
                : "relative isolate h-full min-h-[85px] w-[90px] shrink-0 overflow-hidden rounded-none bg-muted"
            }
          >
            <img
              src={src}
              alt=""
              className={`absolute inset-0 block h-full w-full object-center ${fit === "cover" ? "object-cover" : "object-contain"}`}
              decoding="async"
              width={72}
              height={72}
            />
          </div>
        </div>
        <CardContent
          className={
            mediaInset
              ? "flex shrink-0 items-center p-0 pl-2 pr-5"
              : "flex shrink-0 items-center py-3.5 pl-2 pr-6"
          }
        >
          <CardTitle className="min-w-0 line-clamp-1 text-base font-semibold leading-tight text-foreground">
            Lorem ipsum dolor
          </CardTitle>
        </CardContent>
      </div>
    </Card>
  );
}

function CardMedia({
  className,
  imageSrc,
}: {
  className?: string;
  imageSrc?: string;
}) {
  if (!imageSrc) return null;
  return <img src={imageSrc} alt="" className={className} decoding="async" />;
}

export function CardDemo() {

    const elevationVariants = ["none", "xs", "sm", "base", "md", "lg"];
    const styleVariants = ["flat", "outline", "filled"];
    const paddingVariants = ["sm", "md", "lg"];

  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Card</h2>

    {/* Default Card */}
      <div id="card-default">
        <Card style="flat" elevation="none" padding="lg" className="w-[400px] p-8">
          <CardHeader>
            <CardTitle>Default Card</CardTitle>
            <CardDescription>Style: flat, Elevation: none</CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>

    {/* Elevation Variants */}
      <div id="card-elevation">
        <div className="flex flex-wrap items-center gap-3 p-8">
          {elevationVariants.map((variant) => (
            <Card
              key={variant}
              style="outline"
              elevation={variant as "none" | "xs" | "sm" | "base" | "md" | "lg"}
              padding="lg"
              className="w-[400px]"
            >
              <CardHeader>
                <CardTitle>{variant} Elevation</CardTitle>
                <CardDescription>
                  Style: outline, Elevation: {variant}
                </CardDescription>
              </CardHeader>
              <CardContent />
              <CardFooter />
            </Card>
          ))}
        </div>
      </div>

    {/* Style Variants */}
      <div id="card-style">
        <div className="flex flex-wrap items-center gap-3 p-8">
          {styleVariants.map((variant) => (
            <div
              key={variant}
              className={cn("p-4", variant === "filled" && "bg-body-bg rounded-lg")}
            >
              <Card
                style={variant as "flat" | "outline" | "filled"}
                elevation="base"
                padding="lg"
                className="w-[300px]"
              >
                <CardHeader>
                  <CardTitle>{variant} Style</CardTitle>
                </CardHeader>
              </Card>
            </div>
          ))}
        </div>
      </div>

    {/* Padding Variants */}
      <div id="card-padding">
        <div className="flex flex-wrap items-center gap-3 p-8">
          {paddingVariants.map((variant) => (
            <Card
              key={variant}
              style="outline"
              elevation="md"
              padding={variant as "sm" | "md" | "lg"}
              className="w-[400px]"
            >
              <CardHeader>
                <CardTitle>Padding: {variant}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

    {/* Style Variants */}
      <div id="card-styled">
        <Card
          style="outline"
          elevation="md"
          padding="lg"
          className="w-full max-w-6xl"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Briefs tracker</CardTitle>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-muted-foreground wrap-break-word">
                View all briefs
              </span>
              <Button variant="ghost" size="icon-sm" aria-label="More options">
                …
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-6">
              {/* New Column */}
              <div className="space-y-3 bg-neutral-bg p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground">New</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiLightbulbOutline}
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Expansion Plan for Next Q...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiTrendingUp}
                        className="w-5 h-5 text-blue-600 dark:text-blue-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Engagement Strategy for...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiPackageVariant}
                        className="w-5 h-5 text-muted-foreground"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Comprehensive Social Media Strategy...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiLightbulbOutline}
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Audio Innovation Strategy Framework
                    </span>
                  </div>
                </div>
              </div>
              {/* In Progress Column */}
              <div className="space-y-3 bg-info-bg p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground">
                  In progress
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiTrendingUp}
                        className="w-5 h-5 text-blue-600 dark:text-blue-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Q2 Social Media Growth Strategy
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiLightbulbOutline}
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Creative Social Media Content Strategy
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiImageOutline}
                        className="w-5 h-5 text-pink-600 dark:text-pink-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Engagement and Outreach Plan
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiImageOutline}
                        className="w-5 h-5 text-pink-600 dark:text-pink-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Performance Enhancemen...
                    </span>
                  </div>
                </div>
              </div>
              {/* Approved Column */}
              <div className="space-y-3 bg-success-bg/50 p-4 rounded-lg">
                <h3 className="text-sm font-semibold text-foreground">Approved</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiLightbulbOutline}
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Brand Awareness Initiative
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiLightbulbOutline}
                        className="w-5 h-5 text-yellow-600 dark:text-yellow-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Target Audience Engagement Strategy...
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiTrendingUp}
                        className="w-5 h-5 text-blue-600 dark:text-blue-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Analytics and Insights Plan
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-sm transition-shadow">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon
                        path={mdiTrophy}
                        className="w-5 h-5 text-orange-600 dark:text-orange-500"
                      />
                    </div>
                    <span className="text-sm text-foreground">
                      Social Media Growth and Development...
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div id="card-large-compact">
        <div className="space-y-10 p-8">
          {/* Version large */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Version large
            </h2>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Padding</p>
                <Card
                  style="outline"
                  elevation="none"
                  className="h-[150px] w-[171px] overflow-hidden rounded-xl p-0"
                >
                  <CardContent className="h-full p-0">
                    <div className="h-full w-full p-3">
                      <CardMedia
                        imageSrc={CARD_IMAGE}
                        className="h-full w-full rounded-lg object-cover"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sans padding</p>
                <Card
                  style="flat"
                  elevation="none"
                  className="h-[150px] w-[171px] overflow-hidden rounded-xl p-0"
                >
                  <CardContent className="h-full p-0">
                    <CardMedia
                      imageSrc={CARD_IMAGE}
                      className="size-full object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
          {/* Version compact */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Version compact
            </h2>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Padding</p>
                <Card
                  style="outline"
                  elevation="none"
                  className="w-[400px] overflow-hidden rounded-xl p-0"
                >
                  <CardContent className="flex flex-row gap-0 p-0">
                    <div className="shrink-0 p-3">
                      <CardMedia
                        imageSrc={CARD_IMAGE}
                        className="aspect-square h-24 w-24 rounded-lg object-cover"
                      />
                    </div>
                    <div className="flex flex-1 items-center bg-body-bg p-4 rounded-r-xl" />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sans padding</p>
                <Card
                  style="flat"
                  elevation="none"
                  className="w-[400px] overflow-hidden rounded-xl p-0"
                >
                  <CardContent className="flex flex-row gap-0 p-0">
                    <CardMedia
                      imageSrc={CARD_IMAGE}
                      className="h-24 w-24 shrink-0 rounded-l-xl object-cover"
                    />
                    <div className="flex flex-1 bg-body-bg rounded-r-xl" />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div id="card-vertical-detail">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              With padding between card and image
            </h2>
            <div className="flex flex-wrap items-start gap-6">
              <VerticalImageCard />
              <VerticalPlaceholderCard />
              <VerticalPdfCard />
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              Sans padding (image to edge)
            </h2>
            <div className="flex flex-wrap items-start gap-6">
              <VerticalCard variant="image" mediaInset={false} />
              <VerticalCard variant="search" mediaInset={false} />
              <VerticalCard variant="pdf" mediaInset={false} />
            </div>
          </section>
        </div>
      </div>

      <div id="card-vertical-medium">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              With padding between card and image
            </h2>
            <div className="flex flex-wrap items-start gap-6">
              <VerticalMediumCard variant="image" imageSrc={CARD_IMAGE} />
              <VerticalMediumCard variant="search" />
              <VerticalMediumCard variant="pdf" />
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              Sans padding (image to edge)
            </h2>
            <div className="flex flex-wrap items-start gap-6">
              <VerticalMediumCard variant="image" mediaInset={false} />
              <VerticalMediumCard variant="search" mediaInset={false} />
              <VerticalMediumCard variant="pdf" mediaInset={false} />
            </div>
          </section>
        </div>
      </div>

      <div id="card-vertical-small">
      <div className="flex flex-col gap-10">
      <section>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          With padding between card and image
        </h2>
        <div className="flex flex-wrap items-start gap-6">
          <VerticalSmallCard variant="image" imageSrc={CARD_IMAGE} />
          <VerticalSmallCard variant="search" />
          <VerticalSmallCard variant="pdf" />
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Sans padding (image to edge)
        </h2>
        <div className="flex flex-wrap items-start gap-6">
          <VerticalSmallCard variant="image" mediaInset={false} />
          <VerticalSmallCard variant="search" mediaInset={false} />
          <VerticalSmallCard variant="pdf" mediaInset={false} />
        </div>
      </section>
    </div>
      </div>

      <div id="card-horizontal-detail">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              With padding (thumbnail)
            </h2>
            <div className="flex flex-col gap-4">
              <HorizontalDetailCard variant="image" imageSrc="/card-image.png" />
              <HorizontalDetailCard
                variant="search"
                imageSrc="/Card-search-horizontal.svg"
              />
              <HorizontalDetailCard
                variant="pdf"
                imageSrc="/Card-pdf-horizontal.svg"
              />
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              Sans padding (full-height media)
            </h2>
            <div className="flex flex-col gap-4">
              <HorizontalDetailCard
                variant="image"
                mediaInset={false}
                imageSrc="/card-image.png"
              />
              <HorizontalDetailCard
                variant="search"
                mediaInset={false}
                imageSrc="/Card-search.svg"
              />
              <HorizontalDetailCard
                variant="pdf"
                mediaInset={false}
                imageSrc="/Card-pdf.svg"
              />
            </div>
          </section>
        </div>
      </div>

      <div id="card-horizontal-normal">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              With padding (thumbnail)
            </h2>
            <div className="flex flex-col gap-4">
              <HorizontalNormalCard variant="image" imageSrc="/card-image.png" />
              <HorizontalNormalCard
                variant="search"
                imageSrc="/Card-search-horizontal.svg"
              />
              <HorizontalNormalCard
                variant="pdf"
                imageSrc="/Card-pdf-horizontal.svg"
              />
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              Sans padding
            </h2>
            <div className="flex flex-col gap-4">
              <HorizontalNormalCard
                variant="image"
                mediaInset={false}
                imageSrc="/card-image.png"
              />
              <HorizontalNormalCard
                variant="search"
                mediaInset={false}
                imageSrc="/Card-search-horizontal.svg"
              />
              <HorizontalNormalCard
                variant="pdf"
                mediaInset={false}
                imageSrc="/Card-pdf-horizontal.svg"
              />
            </div>
          </section>
        </div>
      </div>

      <div id="card-horizontal-small">
        <div className="flex flex-col gap-10">
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              With padding (thumbnail)
            </h2>
            <div className="flex flex-wrap gap-4">
              <HorizontalSmallCard variant="image" />
              <HorizontalSmallCard variant="search" />
              <HorizontalSmallCard variant="pdf" />
            </div>
          </section>
          <section>
            <h2 className="mb-4 text-sm font-medium text-muted-foreground">
              Sans padding
            </h2>
            <div className="flex flex-wrap gap-4">
              <HorizontalSmallCard variant="image" mediaInset={false} />
              <HorizontalSmallCard variant="search" mediaInset={false} />
              <HorizontalSmallCard variant="pdf" mediaInset={false} />
            </div>
          </section>
        </div>
      </div>

    </div>
  )
}