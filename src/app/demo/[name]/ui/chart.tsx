export const chart = {
  name: "chart",
  preview: {
    defaultComponent: "area-chart",
  },
  usage: {
    usage: [
      `import { AreaChart } from "@/components/ui/chart"`,
      `<AreaChart />`,
    ],
  },
  components: {
    "Area Chart": { component: "area-chart" },
    "Bar Chart": { component: "bar-chart" },
    "Mixed Bar Chart": { component: "mixed-bar-chart" },
    "Line Chart": { component: "line-chart" },
    "Pie Chart": { component: "pie-chart" },
  },
};
