import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar";

interface AvatarExampleProps {
  variant: "default" | "fallback-only" | "size" | "rounded" | "group" | "group-interactive";
  src?: string;
  alt?: string;
  fallback: string;
  className?: string;
}

export function AvatarExample({ variant, src, alt, fallback, className }: AvatarExampleProps) {
  switch (variant) {
    case "default":
      return (
        <Avatar className={className}>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );

    case "fallback-only":
      return (
        <Avatar className={className}>
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );

    case "size":
      return (
        <Avatar className={className}>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );

    case "rounded":
      return (
        <Avatar className={className}>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );

    case "group":
      return (
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      );

    case "group-interactive":
      return (
        <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 hover:space-x-1 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale *:data-[slot=avatar]:transition-all *:data-[slot=avatar]:duration-300 *:data-[slot=avatar]:ease-in-out">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/leerob.png" alt="@leerob" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
            <AvatarFallback>ER</AvatarFallback>
          </Avatar>
        </div>
      );

    default:
      return (
        <Avatar className={className}>
          <AvatarImage src={src} alt={alt} />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
      );
  }
}
