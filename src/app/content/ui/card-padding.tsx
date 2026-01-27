import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const paddingVariants = ["sm", "md", "lg"];

export default function CardPaddingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3 p-8">
      {paddingVariants.map((variant) => (
        <Card
          key={variant}
          style="outline"
          elevation="md"
          padding={variant as "sm" | "md" | "lg"}
          className="w-[400px]"
        >
          <CardHeader>
            <CardTitle>Padding: {variant}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}
