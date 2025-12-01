import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BriefsTrackerCard } from "./briefs-tracker-card";
import { cn } from "@/lib/utils";

const elevationVariants = ["none", "xs", "sm", "base", "md", "lg"];
const styleVariants = ["flat", "outline", "filled"];
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
      <div className="grid grid-cols-3 gap-4 p-8">
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
      <div className="flex flex-wrap items-center gap-3 p-8">
        {styleVariants.map((variant) => (
          <div key={variant} className={cn("p-4", variant === "filled" && "bg-body-bg rounded-lg" )}>
            <Card style={variant as "flat" | "outline" | "filled"} elevation="base" padding="lg" className="w-[300px]">
              <CardHeader>
                <CardTitle>{variant} Style</CardTitle>
              </CardHeader>
            </Card>
          </div>
        ))}
      </div>
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
