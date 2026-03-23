"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";
import { useState } from "react";

const filterOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export default function DashboardWidgetTwoColumnDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="min-h-[400px] w-[960px] max-w-full rounded-lg">
      <div className="flex flex-wrap gap-6">
        {/* Row 1 */}
        <div className="flex flex-wrap gap-6 w-full">
          <DashboardWidget
            name="Pinned channels"
            goToHref="#"
            onGoTo={() => console.log("Go to Pinned channels")}
            variant="white-bg-large"
            className="flex-1"
          >
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Pinned channels content
            </div>
          </DashboardWidget>
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
            <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
              Notifications content
            </div>
          </DashboardWidget>
        </div>
        {/* Row 2 */}
        <div className="flex flex-wrap gap-6 w-full">
          <DashboardWidget
            name="Recent activity"
            goToHref="#"
            onGoTo={() => console.log("Go to Recent activity")}
            variant="white-bg-large"
            className="flex-1"
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
    </div>
  );
}
