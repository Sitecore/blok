export const carousel = {
  name: "carousel",
  preview: {
    defaultComponent: "carousel",
  },
  usage: {
    usage: [
      `import {\n  Carousel,\n  CarouselContent,\n  CarouselItem,\n  CarouselNext,\n  CarouselPrevious,\n} from "@/components/ui/carousel"`,
      `<Carousel>\n <CarouselContent>\n  <CarouselItem>...</CarouselItem>\n  <CarouselItem>...</CarouselItem>\n  <CarouselItem>...</CarouselItem>\n </CarouselContent>\n <CarouselPrevious />\n <CarouselNext />\n</Carousel>`,
    ],
  },
  components: {
    "Start Aligned": { component: "carousel-start-aligned" },
    "Negative Margin": { component: "carousel-negative-margin" },
  },
};
