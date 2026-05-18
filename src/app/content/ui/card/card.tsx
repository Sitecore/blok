import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardDefaultDemo() {
  return (
    <Card style="flat" elevation="none" padding="lg" className="w-[400px] p-8">
      <CardHeader>
        <CardTitle>Default Card</CardTitle>
        <CardDescription>Style: flat, Elevation: none</CardDescription>
      </CardHeader>
      <CardContent />
      <CardFooter />
    </Card>
  );
}
