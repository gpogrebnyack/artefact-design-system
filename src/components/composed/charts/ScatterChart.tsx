import { ScatterChart as RScatterChart, Scatter, XAxis, YAxis, CartesianGrid } from "recharts"
import { color, type as typeScale } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

/*
 * ScatterChart — Components tier, real Recharts (correlation between two
 * numeric values, optionally split into multiple named series). Grid/axis
 * lines use `color.input`, never `color.border` (deliberately transparent —
 * see DESIGN.md).
 */
export type ScatterPoint = { x: number; y: number }
export type ScatterSeries = { key: string; label: string; color: string; data: ScatterPoint[] }

export type ScatterChartProps = {
  series: ScatterSeries[]
  xLabel?: string
  yLabel?: string
  height?: number
  showLegend?: boolean
}

export function ScatterChart({ series, xLabel, yLabel, height = 260, showLegend = series.length > 1 }: ScatterChartProps) {
  const config: ChartConfig = Object.fromEntries(series.map((s) => [s.key, { label: s.label, color: s.color }]))
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <RScatterChart>
        <CartesianGrid stroke={color.input} />
        <XAxis type="number" dataKey="x" name={xLabel} tickLine={false} axisLine={false} fontSize={typeScale.footnote.size} />
        <YAxis type="number" dataKey="y" name={yLabel} tickLine={false} axisLine={false} fontSize={typeScale.footnote.size} width={32} />
        <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: "3 3" }} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => (
          <Scatter key={s.key} name={s.label} data={s.data} fill={`var(--color-${s.key})`} isAnimationActive={false} />
        ))}
      </RScatterChart>
    </ChartContainer>
  )
}
