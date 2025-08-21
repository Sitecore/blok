import React from "react";
import { Card, CardContent, CardHeader } from "@/registry/new-york/ui/card";
import { Skeleton } from "@/registry/new-york/ui/skeleton";

type SkeletonVariant = "avatar" | "text" | "card" | "mixed";

interface SkeletonExampleProps {
  variant: SkeletonVariant;
}

export const SkeletonExample: React.FC<SkeletonExampleProps> = ({ variant }) => {
  if (variant === "text") {
    return (
      <div className="flex w-full flex-wrap items-start gap-4">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (variant === "card") {
    return (
      <div className="flex w-full flex-wrap items-start gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
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

  if (variant === "mixed") {
    return (
      <div className="flex w-full flex-wrap items-start gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="grid gap-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
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
    );
  }

  // Default avatar variant
  return (
    <div className="flex w-full flex-wrap items-start gap-4">
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 shrink-0 rounded-full" />
        <div className="grid gap-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
    </div>
  );
};
