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
  components: {
    "Area Chart": <AreaChartComponent />,
    "Bar Chart": <BarChartComponent />,
    "Mixed Bar Chart": <BarMixedChartComponent/>,
    "Line Chart": <LineChartComponent/>,
    "Pie Chart": <PieChartComponent />,
  },
};
