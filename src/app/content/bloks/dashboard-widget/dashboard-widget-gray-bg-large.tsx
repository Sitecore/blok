"use client";

import {
  DashboardWidget,
  DashboardWidgetAction,
  DashboardWidgetContent,
  DashboardWidgetHeader,
  DashboardWidgetTitle,
} from "@/components/bloks/dashboard-widget";
import { Button } from "@/components/ui/button";

export default function DashboardWidgetGrayBgLargeDemo() {
  return (
    <div className="mx-auto w-full min-w-0 max-w-[960px]">
      <DashboardWidget type="gray-bg-large" className="w-full">
        <DashboardWidgetHeader>
          <DashboardWidgetTitle>Pinned widget</DashboardWidgetTitle>
          <DashboardWidgetAction>
            <Button variant="ghost" size="xs" colorScheme="neutral" asChild>
              <a href="#">Go to Pinned widget</a>
            </Button>
          </DashboardWidgetAction>
        </DashboardWidgetHeader>
        <DashboardWidgetContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Widget content area
          </div>
        </DashboardWidgetContent>
      </DashboardWidget>
    </div>
  );
}
