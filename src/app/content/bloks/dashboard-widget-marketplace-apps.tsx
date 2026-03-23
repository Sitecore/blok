"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";

export default function DashboardWidgetMarketplaceAppsDemo() {
  return (
    <div className="w-[960px] max-w-full">
      <DashboardWidget
        name="Marketplace app"
        icon={
          <div className="h-8 w-8 rounded bg-subtle-bg border border-border" />
        }
        onSettings={() => console.log("Settings clicked")}
        variant="marketplace-apps"
      >
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Widget content area
        </div>
      </DashboardWidget>
    </div>
  );
}
