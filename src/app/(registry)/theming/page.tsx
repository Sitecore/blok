"use client";

import BorderRadiusThumb from "@/components/component-thumbs/border-radius";
import BreakpointsThumb from "@/components/component-thumbs/breakpoints";
import ColorssThumb from "@/components/component-thumbs/colors";
import SemanticTokensThumb from "@/components/component-thumbs/semantic-tokens";
import ShadowsThumb from "@/components/component-thumbs/shadows";
import SizesThumb from "@/components/component-thumbs/sizes";
import SpacingThumb from "@/components/component-thumbs/spacing";
import TypographyThumb from "@/components/component-thumbs/typography";
import { ComponentGridCard } from "@/components/docsite/component-grid-card";

const themingCategories = [
  {
    name: "border-radius",
    title: "Border radius",
    href: "/theming/border-radius",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BorderRadiusThumb />
      </div>
    ),
  },
  {
    name: "breakpoints",
    title: "Breakpoints",
    href: "/theming/breakpoints",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <BreakpointsThumb />
      </div>
    ),
  },
  {
    name: "colors",
    title: "Colors",
    href: "/theming/colors",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <ColorssThumb />
      </div>
    ),
  },
  {
    name: "semantic-tokens",
    title: "Semantic tokens",
    href: "/theming/semantic-tokens",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <SemanticTokensThumb />
      </div>
    ),
  },
  {
    name: "shadows",
    title: "Shadows",
    href: "/theming/shadows",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <ShadowsThumb />
      </div>
    ),
  },
  {
    name: "sizes",
    title: "Sizes",
    href: "/theming/sizes",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <SizesThumb />
      </div>
    ),
  },
  {
    name: "spacing",
    title: "Spacing",
    href: "/theming/spacing",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <SpacingThumb />
      </div>
    ),
  },
  {
    name: "typography",
    title: "Typography",
    href: "/theming/typography",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <TypographyThumb />
      </div>
    ),
  },
];

export default function ThemingPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl">Theming</h1>
        <p className="text-muted-foreground max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl my-10">
          Theming contains basic tokens and variables to be used when creating
          UIs or components using Blok, to achieve a Blok style.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(224px,224px))] gap-y-6 gap-x-6 justify-items-start">
        {themingCategories?.map((category) => (
          <ComponentGridCard
            key={category?.name}
            title={category?.title}
            href={category?.href}
            preview={category?.preview}
          />
        ))}
      </div>
    </div>
  );
}
