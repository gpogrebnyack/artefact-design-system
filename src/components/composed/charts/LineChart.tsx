import { LineChart as RLineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts"
import { color } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"
import type { ChartSeries } from "./BarChart"

/** LineChart — Components tier, real Recharts (multi-series trend line). */
export type LineChartProps = {
  data: Record<string, unknown>[]
  xKey: string
  series: ChartSeries[]
  height?: number
  showLegend?: boolean
}

export function LineChart({ data, xKey, series, height = 260, showLegend = series.length > 1 }: LineChartProps) {
  const config: ChartConfig = Object.fromEntries(series.map((s) => [s.key, { label: s.label, color: s.color }]))
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <RLineChart data={data}>
        <CartesianGrid vertical={false} stroke={color.input} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis tickLine={false} axisLine={false} fontSize={12} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Line key={s.key} dataKey={s.key} type="monotone" stroke={`var(--color-${s.key})`} strokeWidth={2} dot={false} isAnimationActive={false} />
        ))}
      </RLineChart>
    </ChartContainer>
  )
}
