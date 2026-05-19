import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function AspectRatioDemo() {
  return (
    <div className="w-lg">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-lg border border-border flex items-center justify-center"
      >
        <p className="text-center text-sm text-muted-foreground">16:9</p>
      </AspectRatio>
    </div>
  );
}
