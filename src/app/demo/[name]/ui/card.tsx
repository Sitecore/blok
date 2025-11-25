import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefsTrackerCard } from "./briefs-tracker-card";

export const card = {
  name: "card",
  defaultComponent: (
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
  usage: [
    `import {\n  Card,\n  CardContent,\n  CardDescription,\n  CardFooter,\n  CardHeader,\n  CardTitle,\n} from "@/components/ui/card"`,
    `<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n    <CardDescription>Card Description</CardDescription>\n  </CardHeader>\n  <CardContent>\n    <p>Card Content</p>\n  </CardContent>\n  <CardFooter>\n    <p>Card Footer</p>\n  </CardFooter>\n</Card>`
  ],
  components: {
    // Elevation Variants
    "Elevation None": (
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
    "Elevation Xs": (
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
    "Elevation Sm": (
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
    "Elevation Base": (
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
    "Elevation Md": (
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
    "Elevation Lg": (
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
    "Style Flat": (
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
    "Style Outline": (
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
    "Style Filled": (
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
    "Padding Sm": (
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
    "Padding Md": (
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
    "Padding Lg": (
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
    "Styled Card": <BriefsTrackerCard />
  },
};
