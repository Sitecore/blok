"use client";

import {
  MARKETPLACE_APP_ICON_FALLBACK_COLORS,
  MarketplaceAppIcon,
} from "@/components/bloks/marketplace-app-icon";

const demoApps = [
  { name: "Insights", fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[0] },
  { name: "Journey", fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[1] },
  { name: "Knowledge", fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[2] },
  {
    name: "Marketplace",
    fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[3],
  },
  {
    name: "Notifications",
    fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[4],
  },
  { name: "Library", fallbackColor: MARKETPLACE_APP_ICON_FALLBACK_COLORS[5] },
] as const;

export default function MarketplaceAppIconFallbackDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 min-h-[200px] p-8">
      {demoApps.map((app) => (
        <MarketplaceAppIcon
          key={app.name}
          name={app.name}
          size="xlg"
          fallbackColor={app.fallbackColor}
        />
      ))}
    </div>
  );
}
