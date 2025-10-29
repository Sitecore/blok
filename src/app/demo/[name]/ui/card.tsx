import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const card = {
  name: "card",
  components: {
    Default: (
      <Card style="flat" elevation="none" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>Style: flat, Elevation: none</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    // Elevation Variants
    ElevationNone: (
      <Card style="outline" elevation="none" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>none Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: none</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    ElevationXs: (
      <Card style="outline" elevation="xs" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>xs Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: xs</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    ElevationSm: (
      <Card style="outline" elevation="sm" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>sm Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: sm</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    ElevationBase: (
      <Card style="outline" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>base Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    ElevationMd: (
      <Card style="outline" elevation="md" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>md Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: md</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    ElevationLg: (
      <Card style="outline" elevation="lg" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>lg Elevation</CardTitle>
          <CardDescription>Style: outline, Elevation: lg</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),

    // Style Variants
    StyleFlat: (
      <Card style="flat" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>flat Style</CardTitle>
          <CardDescription>Style: flat, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    StyleOutline: (
      <Card style="outline" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>outline Style</CardTitle>
          <CardDescription>Style: outline, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    StyleFilled: (
      <Card style="filled" elevation="base" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>filled Style</CardTitle>
          <CardDescription>Style: filled, Elevation: base</CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),

    // Padding Variants
    PaddingSm: (
      <Card style="outline" elevation="md" padding="sm" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: sm</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: sm
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    PaddingMd: (
      <Card style="outline" elevation="md" padding="md" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: md</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: md
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
    PaddingLg: (
      <Card style="outline" elevation="md" padding="lg" className="w-[400px]">
        <CardHeader>
          <CardTitle>Padding: lg</CardTitle>
          <CardDescription>
            Style: outline, Elevation: md, Padding: lg
          </CardDescription>
        </CardHeader>
        <CardContent>
        </CardContent>
        <CardFooter>
        </CardFooter>
      </Card>
    ),
  },
};
