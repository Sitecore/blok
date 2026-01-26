import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardListDemo() {
  return (
    <div className="flex w-md flex-wrap items-start gap-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <Card key={index} className="w-full @md:w-auto @md:min-w-sm">
          <CardHeader>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="aspect-square w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
