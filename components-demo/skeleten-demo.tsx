import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function SkeletonDemo() {
  return (
    <div>
      <h2 className="font-semibold text-4xl wrap-break-words">Skeleton</h2>
      <div id="skeleton-default">
        <div className="flex w-full max-w-full gap-4">
          <div className="flex items-center gap-4 bg-body-bg p-4">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="grid gap-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
          </div>
        </div>
      </div>
      <div id="skeleton-card-list">  
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
        </div>
    </div>
  );
}