"use client";

import { DashboardWidget } from "@/components/bloks/dashboard-widget";
import { useState } from "react";

const filterOptions = [
  { value: "filter1", label: "filter1" },
  { value: "filter2", label: "filter2" },
  { value: "filter3", label: "filter3" },
];

export default function DashboardWidgetDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="w-[960px] max-w-full">
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
        variant="white-bg-large"
      >
        <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
          Widget content area
        </div>
      </DashboardWidget>
    </div>
  );
}
