import { Card, CardContent } from "@/components/ui/card";

const CARD_IMAGE = "/card-image.png";

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

export default function CardVersionsDemo() {
  return (
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
  );
}
