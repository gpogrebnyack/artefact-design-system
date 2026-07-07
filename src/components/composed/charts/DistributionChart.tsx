import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from "recharts"
import { color } from "@/foundation"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"

/*
 * DistributionChart — Components tier, real Recharts (replaces the
 * hand-rolled div/Flex "SegmentedBar", which looked cheap next to actual
 * charts — see Pages/Дашборд's "Таблицы и голос клиента" for the real
 * usage; no dedicated Section wraps this, Sections stays lean/SidebarNav-
 * only by standing rule). One horizontal stacked bar per category: each
 * named segment proportional, the remainder (if segments don't sum to the
 * category's own 100%) rendered as a muted "rest" filler — matching the
 * source's own behavior (some rows fill the full track, some don't,
 * depending on real data).
 */
export type DistributionSegment = { label: string; count: string; widthPct: number }
export type DistributionGroup = { name: string; total: string; segments: DistributionSegment[] }

const SEGMENT_COLORS = [color.accent, color.chart2, color.chart3, color.chart4, color.chart5]
const MAX_SEGMENTS = 5

export function DistributionChart({ groups, rowHeight = 40 }: { groups: DistributionGroup[]; rowHeight?: number }) {
  const config: ChartConfig = {}
  for (let i = 0; i < MAX_SEGMENTS; i++) {
    config[`seg${i}`] = { label: `Позиция ${i + 1}`, color: SEGMENT_COLORS[i] }
  }
  config.rest = { label: "Остальное", color: color.muted }

  const data = groups.map((g) => {
    const row: Record<string, unknown> = { name: g.name, total: g.total }
    let sum = 0
    g.segments.slice(0, MAX_SEGMENTS).forEach((seg, i) => {
      row[`seg${i}`] = seg.widthPct
      row[`seg${i}_label`] = `${seg.label} — ${seg.count}`
      sum += seg.widthPct
    })
    row.rest = Math.max(0, 100 - sum)
    return row
  })

  return (
    <ChartContainer config={config} style={{ height: groups.length * rowHeight + 24 }} className="w-full">
      <BarChart data={data} layout="vertical" margin={{ left: 0, right: 12, top: 4, bottom: 4 }}>
        <CartesianGrid horizontal={false} stroke={color.input} />
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={130} fontSize={12} />
        <ChartTooltip
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(_value, name, item) => {
                if (name === "rest") return null
                const label = (item?.payload as Record<string, string>)?.[`${name}_label`]
                return label ?? null
              }}
            />
          }
        />
        {Array.from({ length: MAX_SEGMENTS }, (_, i) => (
          <Bar key={i} dataKey={`seg${i}`} stackId="dist" fill={`var(--color-seg${i})`} isAnimationActive={false} />
        ))}
        <Bar dataKey="rest" stackId="dist" fill="var(--color-rest)" isAnimationActive={false} />
      </BarChart>
    </ChartContainer>
  )
}
