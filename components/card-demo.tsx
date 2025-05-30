import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export function CardDemo() {
  return (
    <div className="flex flex-col gap-8">
      {/* Elevation Variants Row */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Elevation Variants</h2>
        <div className="flex gap-4 items-start">
          {(
            [
              "none",
              "xs",
              "sm",
              "base",
              "md",
              "lg",
            ] as const
          ).map((elevation) => (
            <Card
              key={elevation}
              style="outline"
              elevation={elevation}
              padding="lg"
              className="w-[400px]"
            >
              <CardHeader>
                <CardTitle>{elevation} Elevation</CardTitle>
                <CardDescription>
                  Style: outline, Elevation: {elevation}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This card demonstrates the {elevation} elevation variant with outline style.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Action</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Style Variants Row */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Style Variants</h2>
        <div className="flex gap-4 items-start">
          {["flat", "outline", "filled"].map((style) => (
            <Card
              key={style}
              style={style as "flat" | "outline" | "filled"}
              elevation="base"
              padding="lg"
              className="w-[400px]"
            >
              <CardHeader>
                <CardTitle>{style} Style</CardTitle>
                <CardDescription>
                  Style: {style}, Elevation: base
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This card demonstrates the {style} style variant with base elevation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Action</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Padding Variants Row */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Padding Variants</h2>
        <div className="flex gap-4 items-start">
          {(["sm", "md", "lg"] as const).map((padding) => (
            <Card
              key={padding}
              style="outline"
              elevation="md"
              padding={padding}
              className="w-[400px]"
            >
              <CardHeader>
                <CardTitle>Padding: {padding}</CardTitle>
                <CardDescription>
                  Style: outline, Elevation: md, Padding: {padding}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  This card demonstrates the {padding} padding variant with outline style and md elevation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Action</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}