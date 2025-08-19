"use client";

import React, { FC, useState } from "react";
import { ComponentDemo } from "@/components/ui/component-demo";
import { CardExample } from "./card-example";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";

type CardVariant = "elevation" | "style" | "padding";
type CardElevation = "none" | "xs" | "sm" | "base" | "md" | "lg";
type CardStyle = "flat" | "outline" | "filled";
type CardPadding = "sm" | "md" | "lg";

interface CardDemoProps {
  selectedVariant?: {
    title: string;
    description: string;
    type: CardVariant;
    config: {
      showElevationSelector?: boolean;
      showStyleSelector?: boolean;
      showPaddingSelector?: boolean;
    };
  };
  variants?: Array<{
    title: string;
    description: string;
    type: CardVariant;
    config: {
      showElevationSelector?: boolean;
      showStyleSelector?: boolean;
      showPaddingSelector?: boolean;
    };
  }>;
  dynamicProps?: {
    elevations: Array<{ label: string; value: CardElevation }>;
    styles: Array<{ label: string; value: CardStyle }>;
    paddings: Array<{ label: string; value: CardPadding }>;
  };
  isPlayground?: boolean;
}

export const CardDemo: FC<CardDemoProps> = ({ 
  selectedVariant = {
    title: "Elevation Variants",
    description: "Cards with different elevation levels",
    type: "elevation",
    config: {
      showElevationSelector: true,
      showStyleSelector: false,
      showPaddingSelector: false
    }
  },
  variants,
  dynamicProps,
  isPlayground: propIsPlayground = false
}) => {
  // State for dynamic properties
  const [selectedElevation, setSelectedElevation] = useState<CardElevation>("base");
  const [selectedStyle, setSelectedStyle] = useState<CardStyle>("outline");
  const [selectedPadding, setSelectedPadding] = useState<CardPadding>("lg");
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);

  // Update current variant when selectedVariant changes
  React.useEffect(() => {
    setCurrentVariant(selectedVariant);
  }, [selectedVariant]);

  // Check if this is the first section (playground) or examples section
  const isPlayground = propIsPlayground;

  const getVariantConfig = (variant: CardVariant) => {
    const baseConfig = currentVariant.config;
    
    switch (variant) {
      case "elevation":
        return {
          title: "Elevation Variants",
          description: "Cards with different elevation levels",
          showElevationSelector: true,
          showStyleSelector: baseConfig.showStyleSelector || false,
          showPaddingSelector: baseConfig.showPaddingSelector || false
        };
      case "style":
        return {
          title: "Style Variants",
          description: "Cards with different style variants",
          showElevationSelector: baseConfig.showElevationSelector || false,
          showStyleSelector: true,
          showPaddingSelector: baseConfig.showPaddingSelector || false
        };
      case "padding":
        return {
          title: "Padding Variants",
          description: "Cards with different padding levels",
          showElevationSelector: baseConfig.showElevationSelector || false,
          showStyleSelector: baseConfig.showStyleSelector || false,
          showPaddingSelector: true
        };
      default:
        return {
          title: "Elevation Variants",
          description: "Cards with different elevation levels",
          showElevationSelector: true,
          showStyleSelector: false,
          showPaddingSelector: false
        };
    }
  };

  const config = getVariantConfig(currentVariant.type);

  const getFallbackTemplate = (variant: CardVariant) => {
    const elevationText = variant === "elevation" ? ` elevation="${selectedElevation}"` : '';
    const styleText = variant === "style" ? ` style="${selectedStyle}"` : '';
    const paddingText = variant === "padding" ? ` padding="${selectedPadding}"` : '';

    return `import { Button } from "@/registry/new-york/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/registry/new-york/ui/card"

export function CardExample() {
  return (
    <Card${styleText}${elevationText}${paddingText} className="w-[400px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          This card demonstrates the ${variant} variant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card demonstrates the ${variant} variant with custom properties.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline">Action</Button>
      </CardFooter>
    </Card>
  )
}`;
  };

  const getTransformationOptions = (variant: CardVariant) => {
    return undefined;
  };

  const transformationOptions = getTransformationOptions(currentVariant.type);
  const fallbackTemplate = getFallbackTemplate(currentVariant.type);

  return (
    <div className="space-y-6">
      {/* Variant Header */}
      {isPlayground && (
        <div className="space-y-4">
          {/* Variant and customization selectors in a row */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Variant Selector */}
            <Select value={currentVariant.type} onValueChange={(value) => {
              const newVariant = variants?.find(v => v.type === value);
              if (newVariant) {
                setCurrentVariant(newVariant);
              }
            }}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select variant" />
              </SelectTrigger>
              <SelectContent>
                {variants?.map((variant) => (
                  <SelectItem key={variant.type} value={variant.type}>
                    {variant.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {/* Elevation Selector - Show only for Elevation variant in playground */}
            {isPlayground && config.showElevationSelector && dynamicProps?.elevations && (
              <Select value={selectedElevation} onValueChange={(value) => setSelectedElevation(value as CardElevation)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Elevation" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.elevations.map((elevation) => (
                    <SelectItem key={elevation.value} value={elevation.value}>
                      {elevation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Style Selector - Show when variant config says so */}
            {isPlayground && config.showStyleSelector && dynamicProps?.styles && (
              <Select value={selectedStyle} onValueChange={(value) => setSelectedStyle(value as CardStyle)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Padding Selector - Show when variant config says so */}
            {isPlayground && config.showPaddingSelector && dynamicProps?.paddings && (
              <Select value={selectedPadding} onValueChange={(value) => setSelectedPadding(value as CardPadding)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Padding" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.paddings.map((padding) => (
                    <SelectItem key={padding.value} value={padding.value}>
                      {padding.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>
      )}
        
      {/* Show current variant title - Hide "Default" in playground */}
      {(!isPlayground || currentVariant?.title !== "Default") && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">{currentVariant?.title}</h2>
        </div>
      )}

      {/* Show selectors for variants in examples section */}
      {!isPlayground && (
        <div className="space-y-4">
          {/* Elevation Selector - Show only for Elevation variant in examples */}
          {currentVariant.type === "elevation" && dynamicProps?.elevations && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Elevation:</span>
              <Select value={selectedElevation} onValueChange={(value) => setSelectedElevation(value as CardElevation)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Elevation" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.elevations.map((elevation) => (
                    <SelectItem key={elevation.value} value={elevation.value}>
                      {elevation.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Style Selector - Show only for Style variant in examples */}
          {currentVariant.type === "style" && dynamicProps?.styles && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Style:</span>
              <Select value={selectedStyle} onValueChange={(value) => setSelectedStyle(value as CardStyle)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Style" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.styles.map((style) => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Padding Selector - Show only for Padding variant in examples */}
          {currentVariant.type === "padding" && dynamicProps?.paddings && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Padding:</span>
              <Select value={selectedPadding} onValueChange={(value) => setSelectedPadding(value as CardPadding)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Padding" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.paddings.map((padding) => (
                    <SelectItem key={padding.value} value={padding.value}>
                      {padding.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Component Demo */}
      <ComponentDemo
        filePath="app/components/card/card-example.tsx"
        fileName={`card-${currentVariant.type}.tsx`}
        fallbackTemplate={fallbackTemplate}
        fallbackValues={{
          variant: currentVariant.type,
          elevation: selectedElevation,
          style: selectedStyle,
          padding: selectedPadding,
        }}
        transformationOptions={transformationOptions}
      >
        <CardExample
          variant={currentVariant.type}
          elevation={selectedElevation}
          style={selectedStyle}
          padding={selectedPadding}
        />
      </ComponentDemo>
    </div>
  );
};
