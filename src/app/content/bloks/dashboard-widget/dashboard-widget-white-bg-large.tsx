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

import { mockDashboardWidgetFilterOptions } from "./dashboard-widget.mock-data";

export default function DashboardWidgetWhiteBgLargeDemo() {
  const [filterValue, setFilterValue] = useState<string>("");

  return (
    <div className="mx-auto w-full min-w-0 max-w-[960px]">
      <DashboardWidget type="white-bg-large" className="w-full">
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
            options={mockDashboardWidgetFilterOptions}
            placeholder="Filter"
            className="w-fit"
            ariaLabels={{
              popoverTrigger: "Select an option",
              listbox: "List of options",
              clearSelection: "Clear selection",
            }}
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
