import {
  DashboardWidget,
  DashboardWidgetAction,
  DashboardWidgetContent,
  DashboardWidgetDescription,
  DashboardWidgetHeader,
  DashboardWidgetTitle,
} from "@/components/bloks/dashboard-widget";
import { Button } from "@/components/ui/button";

export default function DashboardWidgetDemo() {
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
        <DashboardWidgetContent>
          <div className="flex items-center justify-center h-32 text-muted-foreground text-sm">
            Widget content area
          </div>
        </DashboardWidgetContent>
      </DashboardWidget>
    </div>
  );
}
