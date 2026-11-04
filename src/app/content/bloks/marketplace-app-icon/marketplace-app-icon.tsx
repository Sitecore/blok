"use client";

import { MarketplaceAppIcon } from "@/components/bloks/marketplace-app-icon";

/** Same static asset pattern used by Card demos (`/card-image.png` in `public/`). */
const DEMO_APP_ICON_SRC = "/card-image.png";

export default function MarketplaceAppIconDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 min-h-[200px] p-8">
      <div className="flex flex-col items-center gap-2">
        <MarketplaceAppIcon
          name="Sitecore Search"
          src={DEMO_APP_ICON_SRC}
          size="lg"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <MarketplaceAppIcon name="Sitecore Search" size="lg" />
      </div>
    </div>
  );
}
