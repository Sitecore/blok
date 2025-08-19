import React from "react";
import { ArrowRightIcon } from "lucide-react";
import { Badge } from "@/registry/new-york/ui/badge";

interface BadgeExampleProps {
  variant: "default" | "bold" | "size" | "color" | "link" | "icon";
  size?: "sm" | "md" | "lg";
  colorScheme?: "neutral" | "primary" | "danger" | "success" | "warning" | "yellow" | "teal" | "cyan" | "blue" | "pink";
  showIcon?: boolean;
  showLink?: boolean;
  text?: string;
  className?: string;
}

export function BadgeExample({ 
  variant, 
  size = "md", 
  colorScheme = "neutral", 
  showIcon = false, 
  showLink = false,
  text = "Badge",
  className 
}: BadgeExampleProps) {
  switch (variant) {
    case "default":
      return (
        <Badge 
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          {text}
        </Badge>
      );

    case "bold":
      return (
        <Badge 
          variant="bold"
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          {text}
        </Badge>
      );

    case "size":
      return (
        <Badge 
          size={size}
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          {text}
        </Badge>
      );

    case "color":
      return (
        <Badge 
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          {text}
        </Badge>
      );

    case "link":
      return (
        <Badge 
          asChild
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          <a href="#">
            {text} {showIcon && <ArrowRightIcon />}
          </a>
        </Badge>
      );

    case "icon":
      return (
        <Badge 
          colorScheme={colorScheme === "neutral" ? undefined : colorScheme}
          className={className}
        >
          {text} {showIcon && <ArrowRightIcon />}
        </Badge>
      );

    default:
      return (
        <Badge className={className}>
          {text}
        </Badge>
      );
  }
}
