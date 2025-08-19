"use client";

import React, { FC, useState } from "react";
import { ComponentDemo } from "@/components/ui/component-demo";
import { BadgeExample } from "./badge-example";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";

type BadgeVariant = "default" | "bold" | "size" | "color" | "link" | "icon";
type BadgeSize = "sm" | "md" | "lg";
type BadgeColorScheme = "neutral" | "primary" | "danger" | "success" | "warning" | "yellow" | "teal" | "cyan" | "blue" | "pink";

interface BadgeDemoProps {
  selectedVariant?: {
    title: string;
    description: string;
    type: BadgeVariant;
    config: {
      showSizeSelector?: boolean;
      showColorSelector?: boolean;
      showIconSelector?: boolean;
      showLinkSelector?: boolean;
    };
  };
  variants?: Array<{
    title: string;
    description: string;
    type: BadgeVariant;
    config: {
      showSizeSelector?: boolean;
      showColorSelector?: boolean;
      showIconSelector?: boolean;
      showLinkSelector?: boolean;
    };
  }>;
  dynamicProps?: {
    sizes: Array<{ label: string; value: BadgeSize }>;
    colors: Array<{ label: string; value: BadgeColorScheme }>;
  };
  isPlayground?: boolean;
}

export const BadgeDemo: FC<BadgeDemoProps> = ({ 
  selectedVariant = {
    title: "Default",
    description: "Basic badge with default styling",
    type: "default",
    config: {
      showSizeSelector: false,
      showColorSelector: false,
      showIconSelector: false,
      showLinkSelector: false
    }
  },
  variants,
  dynamicProps,
  isPlayground: propIsPlayground = false
}) => {
  // State for dynamic properties
  const [selectedSize, setSelectedSize] = useState<BadgeSize>("md");
  const [selectedColor, setSelectedColor] = useState<BadgeColorScheme>("neutral");
  const [showIcon, setShowIcon] = useState(false);
  const [showLink, setShowLink] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);

  // Update current variant when selectedVariant changes
  React.useEffect(() => {
    setCurrentVariant(selectedVariant);
  }, [selectedVariant]);

  // Check if this is the first section (playground) or examples section
  const isPlayground = propIsPlayground;

  const getVariantConfig = (variant: BadgeVariant) => {
    const baseConfig = currentVariant.config;
    
    switch (variant) {
      case "default":
        return {
          title: "Default Badge",
          description: "Basic badge with default styling",
          showSizeSelector: false,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: false,
          showLinkSelector: false
        };
      case "bold":
        return {
          title: "Bold Badge",
          description: "Badge with bold variant styling",
          showSizeSelector: false,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: false,
          showLinkSelector: false
        };
      case "size":
        return {
          title: "Size Badge",
          description: "Badge with customizable size",
          showSizeSelector: true,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: false,
          showLinkSelector: false
        };
      case "color":
        return {
          title: "Color Badge",
          description: "Badge with customizable colors",
          showSizeSelector: false,
          showColorSelector: true,
          showIconSelector: false,
          showLinkSelector: false
        };
      case "link":
        return {
          title: "Link Badge",
          description: "Badge that acts as a link",
          showSizeSelector: false,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: baseConfig.showIconSelector || false,
          showLinkSelector: true
        };
      case "icon":
        return {
          title: "Icon Badge",
          description: "Badge with optional icon",
          showSizeSelector: false,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: true,
          showLinkSelector: false
        };
      default:
        return {
          title: "Default Badge",
          description: "Basic badge with default styling",
          showSizeSelector: false,
          showColorSelector: baseConfig.showColorSelector || false,
          showIconSelector: false,
          showLinkSelector: false
        };
    }
  };

  const config = getVariantConfig(currentVariant.type);

  const getFallbackTemplate = (variant: BadgeVariant) => {
    const sizeText = variant === "size" ? ` size="${selectedSize}"` : '';
    const colorText = selectedColor !== "neutral" ? ` colorScheme="${selectedColor}"` : '';
    const variantText = variant === "bold" ? ' variant="bold"' : '';
    const asChildText = variant === "link" ? ' asChild' : '';
    const iconText = showIcon ? ' <ArrowRightIcon />' : '';
    const linkText = variant === "link" ? `<a href="#">Badge${iconText}</a>` : "Badge";

    if (variant === "link") {
      return `check`;
    }

    return `import { ArrowRightIcon } from "lucide-react"
import { Badge } from "@/registry/new-york/ui/badge"

export function BadgeExample() {
  return (
    <Badge${variantText}${sizeText}${colorText}>
      Badge${iconText}
    </Badge>
  )
}`;
  };

  const getTransformationOptions = (variant: BadgeVariant) => {
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
            
            {/* Size Selector - Show only for Size variant in playground */}
            {isPlayground && config.showSizeSelector && dynamicProps?.sizes && (
              <Select value={selectedSize} onValueChange={(value) => setSelectedSize(value as BadgeSize)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {/* Color Selector - Show when variant config says so */}
            {isPlayground && config.showColorSelector && dynamicProps?.colors && (
              <Select value={selectedColor} onValueChange={(value) => setSelectedColor(value as BadgeColorScheme)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.colors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}



            {/* Icon Toggle - Show when variant config says so */}
            {isPlayground && config.showIconSelector && (
              <Select value={showIcon ? "true" : "false"} onValueChange={(value) => setShowIcon(value === "true")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No Icon</SelectItem>
                  <SelectItem value="true">With Icon</SelectItem>
                </SelectContent>
              </Select>
            )}

            {/* Link Toggle - Show when variant config says so */}
            {isPlayground && config.showLinkSelector && (
              <Select value={showLink ? "true" : "false"} onValueChange={(value) => setShowLink(value === "true")}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Link" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No Link</SelectItem>
                  <SelectItem value="true">With Link</SelectItem>
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
          {/* Size Selector - Show only for Size variant in examples */}
          {currentVariant.type === "size" && dynamicProps?.sizes && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Size:</span>
              <Select value={selectedSize} onValueChange={(value) => setSelectedSize(value as BadgeSize)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Size" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.sizes.map((size) => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Color Selector - Show only for Color variant in examples */}
          {currentVariant.type === "color" && dynamicProps?.colors && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Color:</span>
              <Select value={selectedColor} onValueChange={(value) => setSelectedColor(value as BadgeColorScheme)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.colors.map((color) => (
                    <SelectItem key={color.value} value={color.value}>
                      {color.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Icon Toggle - Show only for Icon variant in examples */}
          {currentVariant.type === "icon" && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Icon:</span>
              <Select value={showIcon ? "true" : "false"} onValueChange={(value) => setShowIcon(value === "true")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No Icon</SelectItem>
                  <SelectItem value="true">With Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Link Toggle - Show only for Link variant in examples */}
          {currentVariant.type === "link" && (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Link:</span>
              <Select value={showLink ? "true" : "false"} onValueChange={(value) => setShowLink(value === "true")}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Link" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="false">No Link</SelectItem>
                  <SelectItem value="true">With Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      )}

      {/* Component Demo */}
      <ComponentDemo
        filePath="app/components/badge/badge-example.tsx"
        fileName={`badge-${currentVariant.type}.tsx`}
        fallbackTemplate={fallbackTemplate}
        fallbackValues={{
          variant: currentVariant.type,
          size: selectedSize,
          colorScheme: selectedColor,
          text: "Badge",
          showIcon: showIcon.toString(),
          showLink: showLink.toString(),
        }}
        transformationOptions={transformationOptions}
      >
        <BadgeExample
          variant={currentVariant.type}
          size={selectedSize}
          colorScheme={selectedColor}
          showIcon={showIcon}
          showLink={showLink}
          text="Badge"
        />
      </ComponentDemo>
    </div>
  );
};
