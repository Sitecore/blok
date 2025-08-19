import React from "react";
import { Button } from "@/registry/new-york/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card";

type CardVariant = "elevation" | "style" | "padding";
type CardElevation = "none" | "xs" | "sm" | "base" | "md" | "lg";
type CardStyle = "flat" | "outline" | "filled";
type CardPadding = "sm" | "md" | "lg";

interface CardExampleProps {
  variant: CardVariant;
  elevation?: CardElevation;
  style?: CardStyle;
  padding?: CardPadding;
}

export const CardExample: React.FC<CardExampleProps> = ({
  variant,
  elevation = "base",
  style = "outline",
  padding = "lg"
}) => {
  // Show a single card with the selected properties
  return (
    <Card
      style={style}
      elevation={elevation}
      padding={padding}
      className="w-[400px]"
    >
      <CardHeader>
        <CardTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)} Variant</CardTitle>
        <CardDescription>
          Style: {style}, Elevation: {elevation}, Padding: {padding}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates the {variant} variant with the selected properties.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  );
};
