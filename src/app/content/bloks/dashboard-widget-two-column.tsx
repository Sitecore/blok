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
import { ChevronRight } from "lucide-react";
import { useState } from "react";

const filterOptions = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

export default function DashboardWidgetTwoColumnDemo() {
  const [notificationsFilter, setNotificationsFilter] = useState<string>("");
  const [analyticsFilter, setAnalyticsFilter] = useState<string>("");

  return (
    <div className="min-h-[400px] w-[960px] max-w-full rounded-lg">
      <div className="flex flex-wrap gap-6">
        {/* Row 1 */}
        <div className="flex flex-wrap gap-6 w-full">
          <DashboardWidget type="white-bg-large" className="flex-1">
            <DashboardWidgetHeader>
              <DashboardWidgetTitle>Pinned channels</DashboardWidgetTitle>
              <DashboardWidgetAction>
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="primary"
                  className="text-sm font-medium -m-1 p-1"
                  asChild
                >
                  <a href="#">
                    Go to Pinned channels
                    <ChevronRight className="ml-0.5 h-4 w-4" />
                  </a>
                </Button>
              </DashboardWidgetAction>
            </DashboardWidgetHeader>
            <DashboardWidgetContent>
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                Pinned channels content
              </div>
            </DashboardWidgetContent>
          </DashboardWidget>
          <DashboardWidget type="white-bg-small">
            <DashboardWidgetHeader>
              <DashboardWidgetTitle>Notifications</DashboardWidgetTitle>
              <DashboardWidgetDescription>
                Unread alerts and updates from your team
              </DashboardWidgetDescription>
              <DashboardWidgetAction>
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="primary"
                  className="text-sm font-medium -m-1 p-1"
                  asChild
                >
                  <a href="#">
                    Go to Notifications
                    <ChevronRight className="ml-0.5 h-4 w-4" />
                  </a>
                </Button>
              </DashboardWidgetAction>
            </DashboardWidgetHeader>
            <DashboardWidgetToolbar>
              <FilterSingleSelect
                value={notificationsFilter}
                onChange={setNotificationsFilter}
                options={filterOptions}
                placeholder="Filter"
                className="w-fit"
              />
            </DashboardWidgetToolbar>
            <DashboardWidgetContent>
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                Notifications content
              </div>
            </DashboardWidgetContent>
          </DashboardWidget>
        </div>
        {/* Row 2 */}
        <div className="flex flex-wrap gap-6 w-full">
          <DashboardWidget type="white-bg-large" className="flex-1">
            <DashboardWidgetHeader>
              <DashboardWidgetTitle>Recent activity</DashboardWidgetTitle>
              <DashboardWidgetAction>
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="primary"
                  className="text-sm font-medium -m-1 p-1"
                  asChild
                >
                  <a href="#">
                    Go to Recent activity
                    <ChevronRight className="ml-0.5 h-4 w-4" />
                  </a>
                </Button>
              </DashboardWidgetAction>
            </DashboardWidgetHeader>
            <DashboardWidgetContent>
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                Recent activity content
              </div>
            </DashboardWidgetContent>
          </DashboardWidget>
          <DashboardWidget type="white-bg-small">
            <DashboardWidgetHeader>
              <DashboardWidgetTitle>Analytics</DashboardWidgetTitle>
              <DashboardWidgetDescription>
                Performance metrics overview
              </DashboardWidgetDescription>
              <DashboardWidgetAction>
                <Button
                  variant="link"
                  size="sm"
                  colorScheme="primary"
                  className="text-sm font-medium -m-1 p-1"
                  asChild
                >
                  <a href="#">
                    Go to Analytics
                    <ChevronRight className="ml-0.5 h-4 w-4" />
                  </a>
                </Button>
              </DashboardWidgetAction>
            </DashboardWidgetHeader>
            <DashboardWidgetToolbar>
              <FilterSingleSelect
                value={analyticsFilter}
                onChange={setAnalyticsFilter}
                options={filterOptions}
                placeholder="Filter"
                className="w-fit"
              />
            </DashboardWidgetToolbar>
            <DashboardWidgetContent>
              <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
                Analytics content
              </div>
            </DashboardWidgetContent>
          </DashboardWidget>
        </div>
      </div>
    </div>
  );
}
