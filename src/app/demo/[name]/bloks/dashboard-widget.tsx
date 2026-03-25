export const dashboardWidget = {
  name: "dashboard-widget",
  preview: {
    defaultComponent: "dashboard-widget",
  },
  usage: {
    usage: [
      `import {
  DashboardWidget,
  DashboardWidgetHeader,
  DashboardWidgetTitle,
  DashboardWidgetDescription,
  DashboardWidgetAction,
  DashboardWidgetToolbar,
  DashboardWidgetContent,
} from "@/components/bloks/dashboard-widget";`,
      `<DashboardWidget>
  <DashboardWidgetHeader>
    <DashboardWidgetTitle>Widget name</DashboardWidgetTitle>
    <DashboardWidgetDescription>Optional description</DashboardWidgetDescription>
    <DashboardWidgetAction>
      <Button variant="ghost" size="xs" colorScheme="neutral" asChild>
        <a href="/path">Go to Widget name</a>
      </Button>
    </DashboardWidgetAction>
  </DashboardWidgetHeader>
  <DashboardWidgetToolbar>
    {/* Optional: filters, actions, or any custom toolbar content */}
  </DashboardWidgetToolbar>
  <DashboardWidgetContent>
    {/* Your widget content */}
  </DashboardWidgetContent>
</DashboardWidget>`,
    ],
  },
  components: {
    "White widget": { component: "dashboard-widget-white-bg-large" },
    "Gray widget": { component: "dashboard-widget-gray-bg-large" },
  },
};
