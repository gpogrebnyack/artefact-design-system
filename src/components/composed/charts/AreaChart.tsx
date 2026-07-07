import { AreaChart as RAreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { color } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { ChartSeries } from "./BarChart"

/** AreaChart — Components tier, real Recharts (stacked area — cumulative trends). */
export type AreaChartProps = {
  data: Record<string, unknown>[]
  xKey: string
  series: ChartSeries[]
  height?: number
  showLegend?: boolean
  stacked?: boolean
}

export function AreaChart({ data, xKey, series, height = 260, showLegend = series.length > 1, stacked = true }: AreaChartProps) {
  const config: ChartConfig = Object.fromEntries(series.map((s) => [s.key, { label: s.label, color: s.color }]))
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <RAreaChart data={data}>
        <CartesianGrid vertical={false} stroke={color.input} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Area
            key={s.key}
            dataKey={s.key}
            type="monotone"
            stackId={stacked ? "a" : undefined}
            stroke={`var(--color-${s.key})`}
            fill={`var(--color-${s.key})`}
            fillOpacity={0.2}
            strokeWidth={2}
            isAnimationActive={false}
          />
        ))}
      </RAreaChart>
    </ChartContainer>
  )
}
