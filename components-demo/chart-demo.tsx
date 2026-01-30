"use client";
import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Bar, BarChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export function ChartDemo() {

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];
    
      const chartConfig = {
        desktop: {
          label: "Desktop",
          color: "var(--chart-1)",
        },
        mobile: {
          label: "Mobile",
          color: "var(--chart-2)",
        },
        visitors: {
          label: "Visitors",
        },
        chrome: {
          label: "Chrome",
          color: "var(--chart-1)",
        },
        safari: {
          label: "Safari",
          color: "var(--chart-2)",
        },
        firefox: {
          label: "Firefox",
          color: "var(--chart-3)",
        },
        edge: {
          label: "Edge",
          color: "var(--chart-4)",
        },
        other: {
          label: "Other",
          color: "var(--chart-5)",
        },
      } satisfies ChartConfig;  

    return (
      <div className="grid gap-4">
        <h2 className="font-semibold text-4xl wrap-break-words">Chart</h2>

        {/* Area Chart */}
        <div id="chart-area">
        <Card style="outline" className="w-4xl">
            <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                    Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                    left: 12,
                    right: 12,
                }}
                aria-label="Area chart showing desktop visitors from January to June 2024"
                >
                <CartesianGrid vertical={false} />
                <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="desktop"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                />
                </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="text-muted-foreground flex items-center gap-2 leading-none">
                            January - June 2024
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
        </div>

        {/* Bar Chart */}
        <div id="chart-bar">
        <Card style="outline" className="w-4xl">
          <CardHeader>
            <CardTitle>Bar Chart - Multiple</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart 
                accessibilityLayer 
                data={chartData}
                aria-label="Bar chart showing desktop and mobile visitors from January to June 2024"
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        </div>

        {/* Mixed-Bar Chart */}
        <div id="chart-mixed-bar">
        <Card style="outline" className="w-4xl">
          <CardHeader>
            <CardTitle>Bar Chart - Mixed</CardTitle>
            <CardDescription>January - June 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 0,
                }}
                aria-label="Vertical bar chart showing browser usage distribution by visitors"
              >
                <YAxis
                  dataKey="browser"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) =>
                    chartConfig[value as keyof typeof chartConfig]?.label
                  }
                />
                <XAxis dataKey="visitors" type="number" hide />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="visitors" layout="vertical" radius={5} />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="flex gap-2 leading-none font-medium">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total visitors for the last 6 months
            </div>
          </CardFooter>
        </Card>
        </div>        
      </div>
  
  )
}    