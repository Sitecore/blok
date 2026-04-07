import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Icon } from "@/lib/icon";
import { mdiDotsHorizontal } from "@mdi/js";

const CARD_IMAGE = "/card-image.png";

const VARIANT_DEFAULTS = {
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

type Variant = keyof typeof VARIANT_DEFAULTS;

interface VerticalSmallCardProps {
  variant?: Variant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function VerticalSmallCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: VerticalSmallCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
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

export default function CardVerticalSmallDemo() {
  return (
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
  );
}
