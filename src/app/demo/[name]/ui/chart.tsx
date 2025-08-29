import { AreaChartComponent } from "@/app/demo/[name]/ui/area-chart";
import { BarChartComponent } from "@/app/demo/[name]/ui/bar-chart";
import { PieChartComponent } from "@/app/demo/[name]/ui/pie-chart";
import { BarMixedChartComponent } from "@/app/demo/[name]/ui/bar-mixed-chart";
import { LineChartComponent } from "@/app/demo/[name]/ui/line-chart";

export const chart = {
  name: "chart",
  components: {
    AreaChart: <AreaChartComponent />,
    BarChart: <BarChartComponent />,
    MixedBarChart: <BarMixedChartComponent/>,
    LineChart: <LineChartComponent/>,
    PieChart: <PieChartComponent />,
  },
};
