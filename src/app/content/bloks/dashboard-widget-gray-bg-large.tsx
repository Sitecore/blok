"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";

export default function DashboardWidgetGrayBgLargeDemo() {
  return (
    <div className="w-[960px] max-w-full">
      <DashboardWidget
        name="Pinned channels"
        goToHref="#"
        onGoTo={() => console.log("Go to Pinned channels")}
        variant="gray-bg-large"
      >
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Widget content area
        </div>
      </DashboardWidget>
    </div>
  );
}
