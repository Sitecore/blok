import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const elevationVariants = ["none", "xs", "sm", "base", "md", "lg"];

export default function CardElevationDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-8">
      {elevationVariants.map((variant) => (
        <Card
          key={variant}
          style="outline"
          elevation={variant as "none" | "xs" | "sm" | "base" | "md" | "lg"}
          padding="lg"
          className="w-[400px]"
        >
          <CardHeader>
            <CardTitle>{variant} Elevation</CardTitle>
            <CardDescription>
              Style: outline, Elevation: {variant}
            </CardDescription>
          </CardHeader>
          <CardContent />
          <CardFooter />
        </Card>
      ))}
    </div>
  );
}
