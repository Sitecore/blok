import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export const carousel = {
  name: "carousel",
  components: {
    // Default Carousel
    Default: (
      <Carousel className="w-full max-w-sm">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-gray-100 border-gray-300">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold text-gray-700">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
        <CarouselNext className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
      </Carousel>
    ),

    // Start-aligned Carousel
    StartAligned: (
      <Carousel
        className="w-full max-w-sm"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card className="bg-gray-100 border-gray-300">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold text-gray-700">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
        <CarouselNext className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
      </Carousel>
    ),

    // Carousel with negative margin + half-width items
    NegativeMargin: (
      <Carousel className="w-full max-w-sm">
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="pl-1 md:basis-1/2">
              <div className="p-1">
                <Card className="bg-gray-100 border-gray-300">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-2xl font-semibold text-gray-700">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
        <CarouselNext className="bg-gray-200 hover:bg-gray-300 text-gray-700" />
      </Carousel>
    ),
  },
};
