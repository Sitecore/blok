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
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/lib/icon";

const CARD_IMAGE = "/card-image.png";

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

type Variant = keyof typeof VARIANT_DEFAULTS;

interface VerticalMediumCardProps {
  variant?: Variant;
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
      </CardContent>
    </Card>
  );
}

export default function CardVerticalMediumDemo() {
  return (
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
  );
}
