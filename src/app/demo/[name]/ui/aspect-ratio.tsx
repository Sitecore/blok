import { AspectRatio } from "@/components/ui/aspect-ratio";

export const aspectRatio = {
  name: "aspect-ratio",
  defaultComponent: (
    <div className="w-lg">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-lg border border-border flex items-center justify-center"
      >
        <p className="text-center text-sm text-muted-foreground">16:9</p>
      </AspectRatio>
    </div>
  ),
  usage: [
    `import { AspectRatio } from "@/components/ui/aspect-ratio"`,
    `<AspectRatio ratio={16 / 9}>\n  <p>16:9</p>\n</AspectRatio>`
  ],
};
