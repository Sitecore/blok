"use client";

import MarketplaceAppIconDemo from "@/app/content/bloks/marketplace-app-icon/marketplace-app-icon";
import MarketplaceAppIconFallbackDemo from "@/app/content/bloks/marketplace-app-icon/marketplace-app-icon-fallback";
import MarketplaceAppIconSizesDemo from "@/app/content/bloks/marketplace-app-icon/marketplace-app-icon-sizes";

export function MarketplaceAppIconSectionDemo() {
  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-4xl wrap-break-words">
        Marketplace App Icon
      </h2>

      <div id="marketplace-app-icon">
        <MarketplaceAppIconDemo />
      </div>

      <div id="marketplace-app-icon-sizes">
        <MarketplaceAppIconSizesDemo />
      </div>

      <div id="marketplace-app-icon-fallback">
        <MarketplaceAppIconFallbackDemo />
      </div>
    </div>
  );
}
