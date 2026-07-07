import { PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

/** DonutChart — Components tier, real Recharts (categorical breakdown). */
export type DonutSlice = { key: string; label: string; value: number; color: string }

export type DonutChartProps = {
  data: DonutSlice[]
  height?: number
  showLegend?: boolean
}

export function DonutChart({ data, height = 260, showLegend = true }: DonutChartProps) {
  const config: ChartConfig = Object.fromEntries(data.map((d) => [d.key, { label: d.label, color: d.color }]))
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <PieChart>
        <ChartTooltip content={<ChartTooltipContent nameKey="key" />} />
        {showLegend && <ChartLegend content={<ChartLegendContent nameKey="key" />} />}
        <Pie data={data} dataKey="value" nameKey="key" innerRadius="60%" outerRadius="90%" strokeWidth={2} isAnimationActive={false}>
          {data.map((d) => <Cell key={d.key} fill={`var(--color-${d.key})`} />)}
        </Pie>
      </PieChart>
    </ChartContainer>
  )
}
