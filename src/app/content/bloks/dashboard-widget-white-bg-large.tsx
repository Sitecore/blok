"use client";

import {
  DashboardWidget,
  DashboardWidgetAction,
  DashboardWidgetContent,
  DashboardWidgetDescription,
  DashboardWidgetHeader,
  DashboardWidgetTitle,
  DashboardWidgetToolbar,
} from "@/components/bloks/dashboard-widget";
import { Button } from "@/components/ui/button";
import { FilterSingleSelect } from "@/components/ui/filter";
import { useState } from "react";

const filterOptions = [
  { value: "all", label: "All projects" },
  { value: "active", label: "Active" },
  { value: "archived", label: "Archived" },
];

export default function DashboardWidgetWhiteBgLargeDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="w-[960px] max-w-full">
      <DashboardWidget type="white-bg-large">
        <DashboardWidgetHeader>
          <DashboardWidgetTitle>Projects</DashboardWidgetTitle>
          <DashboardWidgetDescription>
            Overview of your recent projects and their status
          </DashboardWidgetDescription>
          <DashboardWidgetAction>
            <Button variant="ghost" size="xs" colorScheme="neutral" asChild>
              <a href="#">Go to Projects</a>
            </Button>
          </DashboardWidgetAction>
        </DashboardWidgetHeader>
        <DashboardWidgetToolbar>
          <FilterSingleSelect
            value={filterValue}
            onChange={setFilterValue}
            options={filterOptions}
            placeholder="Filter"
            className="w-fit"
          />
        </DashboardWidgetToolbar>
        <DashboardWidgetContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Widget content area
          </div>
        </DashboardWidgetContent>
      </DashboardWidget>
    </div>
  );
}
