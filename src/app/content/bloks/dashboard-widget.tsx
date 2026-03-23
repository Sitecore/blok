"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";
import { useState } from "react";

const filterOptions = [
  { value: "all", label: "All projects" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

export default function DashboardWidgetDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="w-[960px] max-w-full">
      <DashboardWidget
        name="Projects"
        description="Overview of your recent projects and their status"
        goToHref="#"
        onGoTo={() => console.log("Go to Projects")}
        filter={{
          value: filterValue,
          onChange: setFilterValue,
          options: filterOptions,
          placeholder: "Filter",
        }}
        variant="white-bg-large"
      >
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Widget content area
        </div>
      </DashboardWidget>
    </div>
  );
}
