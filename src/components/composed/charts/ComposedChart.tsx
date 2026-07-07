import { ComposedChart as RComposedChart, Bar, Line, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { color } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent, type ChartConfig } from "@/components/ui/chart"

/*
 * ComposedChart — Components tier, real Recharts (mixes bar/line/area series
 * on one shared or dual axis — e.g. order volume as bars with a trend line
 * over it). Grid/axis lines use `color.input`, never `color.border`.
 *
 * `axis: "right"` matters more often than it looks: two series on very
 * different scales (order counts 0–60 vs. an average score 0–10) squash the
 * smaller one flat on a single shared axis — found while building the demo
 * for this exact component. Default is "left" (shared axis, same as before)
 * so nothing changes unless a series opts into its own scale.
 */
export type ComposedSeries = {
  key: string
  label: string
  color: string
  type: "bar" | "line" | "area"
  axis?: "left" | "right"
}

export type ComposedChartProps = {
  data: Record<string, unknown>[]
  xKey: string
  series: ComposedSeries[]
  height?: number
  showLegend?: boolean
}

export function ComposedChart({ data, xKey, series, height = 260, showLegend = series.length > 1 }: ComposedChartProps) {
  const config: ChartConfig = Object.fromEntries(series.map((s) => [s.key, { label: s.label, color: s.color }]))
  const hasRightAxis = series.some((s) => s.axis === "right")
  return (
    <ChartContainer config={config} style={{ height }} className="w-full">
      <RComposedChart data={data}>
        <CartesianGrid vertical={false} stroke={color.input} />
        <XAxis dataKey={xKey} tickLine={false} axisLine={false} fontSize={12} />
        <YAxis yAxisId="left" tickLine={false} axisLine={false} fontSize={12} width={32} />
        {hasRightAxis && <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} fontSize={12} width={32} />}
        <ChartTooltip content={<ChartTooltipContent />} />
        {showLegend && <ChartLegend content={<ChartLegendContent />} />}
        {series.map((s) => {
          const paint = `var(--color-${s.key})`
          const yAxisId = s.axis === "right" ? "right" : "left"
          if (s.type === "bar") {
            return <Bar key={s.key} yAxisId={yAxisId} dataKey={s.key} fill={paint} radius={4} isAnimationActive={false} />
          }
          if (s.type === "area") {
            return (
              <Area
                key={s.key}
                yAxisId={yAxisId}
                dataKey={s.key}
                type="monotone"
                stroke={paint}
                fill={paint}
                fillOpacity={0.2}
                strokeWidth={2}
                isAnimationActive={false}
              />
            )
          }
          return (
            <Line key={s.key} yAxisId={yAxisId} dataKey={s.key} type="monotone" stroke={paint} strokeWidth={2} dot={false} isAnimationActive={false} />
          )
        })}
      </RComposedChart>
    </ChartContainer>
  )
}
