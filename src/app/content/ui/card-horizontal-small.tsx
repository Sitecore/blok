import { Card, CardContent, CardTitle } from "@/components/ui/card";

const VARIANT_DEFAULTS = {
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

type Variant = keyof typeof VARIANT_DEFAULTS;

interface HorizontalSmallCardProps {
  variant?: Variant;
  imageSrc?: string;
  mediaInset?: boolean;
}

function HorizontalSmallCard({
  variant = "image",
  imageSrc,
  mediaInset = true,
}: HorizontalSmallCardProps) {
  const defaults = VARIANT_DEFAULTS[variant];
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

export default function CardHorizontalSmallDemo() {
  return (
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
  );
}
