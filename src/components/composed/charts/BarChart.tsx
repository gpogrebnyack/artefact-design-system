import { BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { color, type as typeScale } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

/*
 * BarChart — Components tier, real Recharts (grouped or single-series
 * vertical bars). Grid/axis lines use `color.input` (the real hairline
 * token), never `color.border` (deliberately transparent — see DESIGN.md).
 */
export type ChartSeries = { key: string; label: string; color: string }

export type BarChartProps = {
  data: Record<string, unknown>[]
  xKey: string
  series: ChartSeries[]
  height?: number
  showLegend?: boolean
}

export function BarChart({ data, xKey, series, height = 260, showLegend = series.length > 1 }: BarChartProps) {
  const config: ChartConfig = Object.fromEntries(series.map((s) => [s.key, { label: s.label, color: s.color }]))
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <RBarChart data={data}>
        <CartesianGrid vertical={false} stroke={color.input} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={typeScale.footnote.size} />
        <YAxis tickLine={false} axisLine={false} fontSize={typeScale.footnote.size} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Bar key={s.key} dataKey={s.key} fill={`var(--color-${s.key})`} radius={4} isAnimationActive={false} />
        ))}
      </RBarChart>
    </ChartContainer>
  )
}
