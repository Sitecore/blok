"use client";

import * as React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ComponentGridCardProps {
  name: string;
  title: string;
  href?: string;
  preview?: React.ReactNode;
  className?: string;
}

export function PlaceholderImage() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        width="59"
        height="59"
        viewBox="0 0 59 59"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 h-14"
      >
        <path
          d="M46.7083 46.7083H12.2917V12.2917H46.7083V46.7083ZM46.7083 7.375H12.2917C10.9877 7.375 9.73711 7.893 8.81506 8.81506C7.893 9.73711 7.375 10.9877 7.375 12.2917V46.7083C7.375 48.0123 7.893 49.2629 8.81506 50.1849C9.73711 51.107 10.9877 51.625 12.2917 51.625H46.7083C48.0123 51.625 49.2629 51.107 50.1849 50.1849C51.107 49.2629 51.625 48.0123 51.625 46.7083V12.2917C51.625 10.9877 51.107 9.73711 50.1849 8.81506C49.2629 7.893 48.0123 7.375 46.7083 7.375ZM34.3183 30.2129L27.5579 38.9154L22.7396 33.1138L15.9792 41.7917H43.0208L34.3183 30.2129Z"
          fill="#6E3FFF"
        />
      </svg>
    </div>
  );
}

export function ComponentGridCard({
  name,
  title,
  href,
  preview,
  className,
}: ComponentGridCardProps) {
  const content = (
    <Card
      className={cn(
        "group relative overflow-hidden p-0 h-full w-56 flex flex-col cursor-pointer transition-all shadow-xs hover:shadow-md gap-0",
        className
      )}
      style="filled"
    >
      <CardContent className="flex-1 p-0 min-h-0 bg-primary-background flex items-center justify-center">
        <div className="w-full h-35 aspect-square">
          {preview || <PlaceholderImage />}
        </div>
      </CardContent>
      <CardFooter className="bg-white dark:bg-body-bg border-0 px-4 py-3">
        <span className="text-md font-medium text-foreground">{title}</span>
      </CardFooter>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
