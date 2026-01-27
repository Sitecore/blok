"use client";

import FaviconsThumb from "@/components/component-thumbs/favicons";
import IconsThumb from "@/components/component-thumbs/icons";
import IllustrationsThumb from "@/components/component-thumbs/illustrations";
import LogosThumb from "@/components/component-thumbs/logos";
import { ComponentGridCard } from "@/components/docsite/component-grid-card";

const grapicsCategories = [
  {
    name: "favicons",
    title: "Favicons",
    href: "/graphics/favicons",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <FaviconsThumb />
      </div>
    ),
  },
  {
    name: "icons",
    title: "Icons",
    href: "/graphics/icons",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <IconsThumb />
      </div>
    ),
  },
  {
    name: "illustrations",
    title: "Illustrations",
    href: "/graphics/illustrations",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <IllustrationsThumb />
      </div>
    ),
  },
  {
    name: "logos",
    title: "Logos",
    href: "/graphics/logos",
    preview: (
      <div className="w-full h-full flex items-center justify-center p-4">
        <LogosThumb />
      </div>
    ),
  },
];
export default function GraphicsPage() {
  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl">Graphics</h1>
        <p className="text-muted-foreground max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl my-10">
          Graphics contains visual graphics, icons, logos and states to provide
          fun, and richer experiences aligned with Blok styling.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(224px,224px))] gap-y-6 gap-x-6 justify-items-start">
        {grapicsCategories?.map((category) => (
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
