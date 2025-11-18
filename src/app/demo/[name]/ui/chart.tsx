import { AreaChartComponent } from "@/app/demo/[name]/ui/area-chart";
import { BarChartComponent } from "@/app/demo/[name]/ui/bar-chart";
import { PieChartComponent } from "@/app/demo/[name]/ui/pie-chart";
import { BarMixedChartComponent } from "@/app/demo/[name]/ui/bar-mixed-chart";
import { LineChartComponent } from "@/app/demo/[name]/ui/line-chart";

export const chart = {
  name: "chart",
  defaultComponent: (
    <AreaChartComponent />
  ),
  usage: [
    `import {\n  Area,\n  AreaChart,\n  CartesianGrid,\n  XAxis,\n} from "recharts"; \nimport {\n  ChartConfig,\n  ChartContainer,\n  ChartTooltip,\n  ChartTooltipContent,\n} from "@/components/ui/chart";`,
    `<AreaChart>\n  <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />\n</AreaChart>`,
  ],
  components: {
    "Area Chart": <AreaChartComponent />,
    "Bar Chart": <BarChartComponent />,
    "Mixed Bar Chart": <BarMixedChartComponent/>,
    "Line Chart": <LineChartComponent/>,
    "Pie Chart": <PieChartComponent />,
  },
};
