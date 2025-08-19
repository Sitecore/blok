"use client";

import React, { FC, useState } from "react";
import { ComponentDemo } from "@/components/ui/component-demo";
import { AvatarExample } from "./avatar-example";
import { makeTransformationOptionsSerializable } from "@/lib/utils/code-transformer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select";

type AvatarVariant = "default" | "fallback-only" | "size" | "rounded" | "group" | "group-interactive";

interface AvatarDemoProps {
  selectedVariant?: {
    title: string;
    description: string;
    type: AvatarVariant;
    config: {
      src?: string;
      alt?: string;
      fallback: string;
      className: string;
      showSizeSelector?: boolean;
      showRoundingSelector?: boolean;
    };
  };
  avatarText?: string;
  avatarDescription?: string;
  primaryVariant?: string;
  showIcon?: boolean;
  variants?: Array<{
    title: string;
    description: string;
    type: AvatarVariant;
    config: {
      src?: string;
      alt?: string;
      fallback: string;
      className: string;
      showSizeSelector?: boolean;
      showRoundingSelector?: boolean;
    };
  }>;
  dynamicProps?: {
    sizes: Array<{ label: string; value: string; className: string }>;
    rounding: Array<{ label: string; value: string; className: string }>;
  };
  isPlayground?: boolean;
}

export const AvatarDemo: FC<AvatarDemoProps> = ({ 
  selectedVariant = {
    title: "Default",
    description: "Basic avatar with image and fallback",
    type: "default",
    config: {
      src: "https://github.com/shadcn.png",
      alt: "@shadcn",
      fallback: "CN",
      className: "",
      showSizeSelector: false,
      showRoundingSelector: false
    }
  },
  variants,
  dynamicProps,
  isPlayground: propIsPlayground = false
}) => {
  // State for dynamic properties
  const [selectedSize, setSelectedSize] = useState(selectedVariant.config.className || "size-10");
  const [selectedRounding, setSelectedRounding] = useState("none"); // Default rounding
  const [currentVariant, setCurrentVariant] = useState(selectedVariant);

  // Update current variant when selectedVariant changes
  React.useEffect(() => {
    setCurrentVariant(selectedVariant);
    
  }, [selectedVariant]);

  // Check if this is the first section (playground) or examples section
  const isPlayground = propIsPlayground;

  const getVariantConfig = (variant: AvatarVariant) => {
    const baseConfig = currentVariant.config;
    
    switch (variant) {
      case "default":
        return {
          title: "Default Avatar",
          description: "Basic avatar with image and fallback",
          src: baseConfig.src,
          alt: baseConfig.alt,
          fallback: baseConfig.fallback,
          className: selectedSize,
          showSizeSelector: baseConfig.showSizeSelector || false,
          showRoundingSelector: baseConfig.showRoundingSelector || false
        };
      case "fallback-only":
        return {
          title: "Fallback Only",
          description: "Avatar without image, showing only fallback text",
          src: undefined,
          alt: undefined,
          fallback: "CN", // Fixed fallback text for fallback-only
          className: "size-10", // Fixed size for fallback-only
          showSizeSelector: false,
          showRoundingSelector: false
        };
      case "size":
        return {
          title: "Size Avatar",
          description: "Avatar with custom size",
          src: baseConfig.src,
          alt: baseConfig.alt,
          fallback: baseConfig.fallback,
          className: selectedSize,
          showSizeSelector: baseConfig.showSizeSelector || false,
          showRoundingSelector: baseConfig.showRoundingSelector || false
        };
      case "rounded":
        return {
          title: "Rounded Avatar",
          description: "Avatar with rounded corners",
          src: baseConfig.src,
          alt: baseConfig.alt,
          fallback: baseConfig.fallback,
          className: selectedRounding === "none" ? selectedSize : `${selectedSize} ${selectedRounding}`,
          showSizeSelector: baseConfig.showSizeSelector || false,
          showRoundingSelector: baseConfig.showRoundingSelector || false
        };
      case "group":
        return {
          title: "Avatar Group",
          description: "Multiple avatars in a group with ring styling",
          src: undefined,
          alt: undefined,
          fallback: "Group",
          className: "",
          showSizeSelector: false,
          showRoundingSelector: false
        };
      case "group-interactive":
        return {
          title: "Interactive Avatar Group",
          description: "Interactive avatar group with hover effects and transitions",
          src: undefined,
          alt: undefined,
          fallback: "Interactive Group",
          className: "",
          showSizeSelector: false,
          showRoundingSelector: false
        };
      default:
        return {
          title: "Default Avatar",
          description: "Basic avatar with image and fallback",
          src: baseConfig.src,
          alt: baseConfig.alt,
          fallback: baseConfig.fallback,
          className: selectedSize,
          showSizeSelector: baseConfig.showSizeSelector || false,
          showRoundingSelector: baseConfig.showRoundingSelector || false
        };
    }
  };

  const config = getVariantConfig(currentVariant.type);

  const getFallbackTemplate = (variant: AvatarVariant) => {
    if (variant === "group") {
      return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

export function AvatarExample() {
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
  )
}`;
    }

    if (variant === "group-interactive") {
      return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

export function AvatarExample() {
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
  )
}`;
    }

    if (variant === "fallback-only") {
      return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

export function AvatarExample() {
  return (
    <Avatar className="size-10">
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}`;
    }

    // For individual avatar variants (default, size, rounded)
    return `import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/new-york/ui/avatar"

export function AvatarExample() {
  return (
    <Avatar${config.className ? ` className="${config.className}"` : ''}>
      ${config.src ? `<AvatarImage src="${config.src}" alt="${config.alt}" />` : ''}
      <AvatarFallback>${config.fallback}</AvatarFallback>
    </Avatar>
  )
}`;
  };

  const getTransformationOptions = (variant: AvatarVariant) => {
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
            {isPlayground && currentVariant.type === "size" && dynamicProps?.sizes && (
              <Select value={selectedSize} onValueChange={setSelectedSize}>
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

            {/* Rounding Selector - Show only for Rounded variant in playground */}
            {isPlayground && currentVariant.type === "rounded" && dynamicProps?.rounding && (
              <Select value={selectedRounding} onValueChange={setSelectedRounding}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rounding" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.rounding.map((round) => (
                    <SelectItem key={round.value} value={round.value}>
                      {round.label}
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

      {/* Show selectors for Size and Rounded variants in examples section */}
      {!isPlayground && (
        <div className="space-y-4">
          {/* Size Selector - Show only for Size variant in examples */}
          {currentVariant.type === "size" && dynamicProps?.sizes && (
            <div className="flex items-center gap-4">
              <Select value={selectedSize} onValueChange={setSelectedSize}>
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

          {/* Rounding Selector - Show only for Rounded variant in examples */}
          {currentVariant.type === "rounded" && dynamicProps?.rounding && (
            <div className="flex items-center gap-4">
              <Select value={selectedRounding} onValueChange={setSelectedRounding}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Rounding" />
                </SelectTrigger>
                <SelectContent>
                  {dynamicProps.rounding.map((round) => (
                    <SelectItem key={round.value} value={round.value}>
                      {round.label}
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
        filePath="app/components/avatar/avatar-example.tsx"
        fileName={`avatar-${currentVariant.type}.tsx`}
        fallbackTemplate={fallbackTemplate}
        fallbackValues={{
          variant: currentVariant.type,
          src: config.src || '',
          alt: config.alt || '',
          className: config.className,
        }}
        transformationOptions={transformationOptions}
      >
        <AvatarExample
          variant={currentVariant.type}
          src={config.src}
          alt={config.alt}
          fallback="CN"
          className={config.className}
        />
      </ComponentDemo>
    </div>
  );
};
