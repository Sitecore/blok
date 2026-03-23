"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";
import { useState } from "react";

const filterOptions = [
  { value: "filter1", label: "filter1" },
  { value: "filter2", label: "filter2" },
  { value: "filter3", label: "filter3" },
];

export default function DashboardWidgetTwoColumnDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="min-h-[400px] w-[960px] max-w-full rounded-lg">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        {/* Row 1 */}
        <DashboardWidget
          name="Pinned channels"
          goToHref="#"
          onGoTo={() => console.log("Go to Pinned channels")}
          variant="white-bg-large"
        >
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Pinned channels content
          </div>
        </DashboardWidget>
        <DashboardWidget
          name="The name"
          description="Small explanation on something or other"
          goToHref="#"
          onGoTo={() => console.log("Go to The name")}
          filter={{
            value: filterValue,
            onChange: setFilterValue,
            options: filterOptions,
            placeholder: "Filter",
          }}
          variant="white-bg-small"
        >
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Widget content area
          </div>
        </DashboardWidget>
        {/* Row 2 */}
        <DashboardWidget
          name="Recent activity"
          goToHref="#"
          onGoTo={() => console.log("Go to Recent activity")}
          variant="white-bg-large"
        >
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Recent activity content
          </div>
        </DashboardWidget>
        <DashboardWidget
          name="Analytics"
          description="Performance metrics overview"
          goToHref="#"
          onGoTo={() => console.log("Go to Analytics")}
          filter={{
            value: filterValue,
            onChange: setFilterValue,
            options: filterOptions,
            placeholder: "Filter",
          }}
          variant="white-bg-small"
        >
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Analytics content
          </div>
        </DashboardWidget>
      </div>
    </div>
  );
}
