import { AspectRatio } from "@/components/ui/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <div className="grid w-full max-w-xl gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">Aspect Ratio</h2>
      <div className="w-lg">
      <AspectRatio
        ratio={16 / 9}
        className="bg-muted rounded-lg border border-border flex items-center justify-center"
      >
        <p className="text-center text-sm text-muted-foreground">16:9</p>
      </AspectRatio>
    </div>
    </div>
  )
}
