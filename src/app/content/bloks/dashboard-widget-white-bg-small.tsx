"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";
import { useState } from "react";

const filterOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export default function DashboardWidgetWhiteBgSmallDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="w-[960px] max-w-full">
      <DashboardWidget
        name="Notifications"
        description="Unread alerts and updates from your team"
        goToHref="#"
        onGoTo={() => console.log("Go to Notifications")}
        filter={{
          value: filterValue,
          onChange: setFilterValue,
          options: filterOptions,
          placeholder: "Filter",
        }}
        variant="white-bg-small"
      >
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Widget content area
        </div>
      </DashboardWidget>
    </div>
  );
}
