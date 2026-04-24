import {
  mdiClose,
  mdiCloudCheckVariantOutline,
  mdiDotsHorizontal,
} from "@mdi/js";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/lib/icon";

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
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="absolute right-3 top-3 size-8 rounded-full border-0 bg-black/60 p-0 text-white shadow-none transition-none hover:!bg-black/60 hover:!text-white active:!bg-black/60"
              aria-label="Close"
            >
              <Icon path={mdiClose} size={0.6} className="size-4" />
            </Button>
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
            <Button
              type="button"
              variant="ghost"
              className="h-auto! min-h-0! w-auto! min-w-0! max-w-min! gap-0! rounded! p-0 shadow-none hover:bg-muted"
              size="icon-xs"
              aria-label="More options"
            >
              <Icon
                path={mdiDotsHorizontal}
                size={0.9}
                className="size-3.5 text-neutral-fg"
              />
            </Button>
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

export default function CardVerticalDemo() {
  return (
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
  );
}
