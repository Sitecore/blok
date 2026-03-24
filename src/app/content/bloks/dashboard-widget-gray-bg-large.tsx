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
    <div className="w-[960px] max-w-full">
      <DashboardWidget type="gray-bg-large">
        <DashboardWidgetHeader>
          <DashboardWidgetTitle>Pinned channels</DashboardWidgetTitle>
          <DashboardWidgetAction>
            <Button variant="ghost" size="xs" colorScheme="neutral" asChild>
              <a href="#">Go to Pinned channels</a>
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
