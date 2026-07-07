import type { ReactNode } from "react"
import { RadialBarChart as RRadialBarChart, RadialBar, PolarAngleAxis } from "recharts"
import { color } from "@/foundation"
import { ChartContainer, type ChartConfig } from "@/components/ui/chart"

/*
 * RadialChart — Components tier, real Recharts (circular gauge, 0–100).
 * This is also the formal home for what was a recurring gap: a per-employee
 * score ring (`ring()` in the original source page's own SVG, `ScoreRing` in
 * this package's earlier Storybook demo, and independently rebuilt from
 * scratch in a downstream consumer session) — never a real export before
 * this, always hand-rolled again wherever it was needed.
 */
export type RadialChartProps = {
  /** 0–100 */
  value: number
  color: string
  /** track color behind the filled arc; defaults to the muted token */
  trackColor?: string
  size?: number
  /** centered content, e.g. the numeric score itself */
  label?: ReactNode
}

export function RadialChart({ value, color: fillColor, trackColor = color.muted, size = 96, label }: RadialChartProps) {
  const config: ChartConfig = {}
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <ChartContainer config={config} style={{ width: size, height: size }}>
        <RRadialBarChart data={[{ value }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar dataKey="value" cornerRadius={999} fill={fillColor} background={{ fill: trackColor }} isAnimationActive={false} />
        </RRadialBarChart>
      </ChartContainer>
      {label && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {label}
        </div>
      )}
    </div>
  )
}
