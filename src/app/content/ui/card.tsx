import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
  
export default function CardDefaultDemo() {
    return (
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
    );
}