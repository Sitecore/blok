"use client";

import { ComponentGrid } from "@/components/docsite/component-grid";
import { getBlocks } from "@/lib/registry";

export default function BlocksPage() {
  const blocks = getBlocks();

  return (
    <div className="container p-5 md:p-10">
      <div className="mb-8">
        <h1 className="font-semibold text-4xl tracking-tight">Bloks</h1>
        <p className="text-muted-foreground max-w-full sm:max-w-md md:max-w-lg lg:max-w-xl my-10">
          Bloks (Blocks), are building blocks of larger UI entities. Copy and
          paste bloks into your apps to build out fuller Sitecore UIs faster.
        </p>
        <ComponentGrid
          components={blocks}
          getHref={(block) => `/registry/${block.name}`}
        />
      </div>
    </div>
  );
}
