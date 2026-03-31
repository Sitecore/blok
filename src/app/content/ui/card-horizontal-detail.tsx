import {
  mdiClose,
  mdiCloudCheckVariantOutline,
  mdiDotsHorizontal,
} from "@mdi/js";

import { Badge } from "@/components/ui/badge";
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

const TAGS = ["Release", ...Array(6).fill("Collection"), "+2"];

const VARIANT_DEFAULTS = {
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

type Variant = keyof typeof VARIANT_DEFAULTS;

interface HorizontalDetailCardProps {
  variant?: Variant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalDetailCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalDetailCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
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

export default function CardHorizontalDetailDemo() {
  return (
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
            imageSrc="/card-search.svg"
          />
          <HorizontalDetailCard
            variant="pdf"
            mediaInset={false}
            imageSrc="/card-pdf.svg"
          />
        </div>
      </section>
    </div>
  );
}
