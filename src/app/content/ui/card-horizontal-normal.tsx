import { mdiCloudCheckVariantOutline, mdiDotsHorizontal } from "@mdi/js";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";

const VARIANT_DEFAULTS = {
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

type Variant = keyof typeof VARIANT_DEFAULTS;

interface HorizontalNormalCardProps {
  variant?: Variant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalNormalCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalNormalCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
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

export default function CardHorizontalNormalDemo() {
  return (
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
  );
}
