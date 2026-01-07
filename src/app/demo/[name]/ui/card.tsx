import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefsTrackerCard } from "@/app/demo/[name]/ui/briefs-tracker-card";
import CardStyleDemo from "@/app/demo/[name]/ui/card-style";

const elevationVariants = ["none", "xs", "sm", "base", "md", "lg"];
const paddingVariants = ["sm", "md", "lg"];

export const card = {
  name: "card",
  defaultComponent: (
    <Card style="flat" elevation="none" padding="lg" className="w-[400px] p-8">
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
    "Elevation": (
      <div className="flex flex-wrap items-center gap-3 p-8">
        {elevationVariants.map((variant) => (
          <Card key={variant} style="outline" elevation={variant as "none" | "xs" | "sm" | "base" | "md" | "lg"} padding="lg" className="w-[400px]">
            <CardHeader>
              <CardTitle>{variant} Elevation</CardTitle>
              <CardDescription>Style: outline, Elevation: {variant}</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter>
            </CardFooter>
          </Card>
        ))}
      </div>
    ),

    // Style Variants
    "Style": (
      <CardStyleDemo />
    ),

    // Padding Variants
    "Padding": (
      <div className="flex flex-wrap items-center gap-3 p-8">
        {paddingVariants.map((variant) => (
          <Card key={variant} style="outline" elevation="md" padding={variant as "sm" | "md" | "lg"} className="w-[400px]">
            <CardHeader>
              <CardTitle>Padding: {variant}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    ),
    
    "Styled Card": <BriefsTrackerCard />
  },
};
