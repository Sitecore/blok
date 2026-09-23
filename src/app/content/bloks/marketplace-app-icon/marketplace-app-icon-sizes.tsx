"use client";

import { MarketplaceAppIcon } from "@/components/bloks/marketplace-app-icon";

const sizes = ["xs", "sm", "md", "lg", "xlg"] as const;

export default function MarketplaceAppIconSizesDemo() {
  return (
    <div className="flex flex-wrap items-end justify-center gap-6 min-h-[200px] p-8">
      {sizes.map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <MarketplaceAppIcon name="Custom app" size={size} />
          <span className="text-sm text-subtle-text">{size}</span>
        </div>
      ))}
    </div>
  );
}
