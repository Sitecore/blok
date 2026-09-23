"use client";

import { MarketplaceAppIcon } from "@/components/bloks/marketplace-app-icon";

export default function MarketplaceAppIconBrokenSrcDemo() {
  return (
    <div className="flex items-center justify-center gap-6 min-h-[200px] p-8">
      <MarketplaceAppIcon
        name="Custom app"
        src="https://example.invalid/missing-app-icon.png"
        size="lg"
        colorSeed="custom-app-demo"
      />
      <MarketplaceAppIcon
        name="Broken Image App"
        src="/this-path-does-not-exist.png"
        size="lg"
      />
    </div>
  );
}
