export const dashboardWidget = {
  name: "dashboard-widget",
  preview: {
    defaultComponent: "dashboard-widget",
  },
  usage: {
    usage: [
      `import { DashboardWidget } from "@/components/bloks/dashboard-widget";`,
      `<DashboardWidget name="Widget name" goToHref="/path" />`,
    ],
  },
  components: {
    "Gray bg large": { component: "dashboard-widget-gray-bg-large" },
    "White bg small": { component: "dashboard-widget-white-bg-small" },
    "Marketplace apps": { component: "dashboard-widget-marketplace-apps" },
    "Two-column layout": { component: "dashboard-widget-two-column" },
  },
};
