import { Line, LineChart as RLineChart } from "recharts"

/*
 * Sparkline — Components tier, real Recharts. Formalizes a pattern that
 * kept getting hand-built from scratch instead of shipped: the original
 * source page's own `sparkScore()` draws this as a raw SVG polyline+circle,
 * and a downstream consumer of this package independently rebuilt the same
 * shape from bare Recharts primitives when nothing in the catalog covered
 * it. Same gap, hit twice — this is the fix.
 *
 * No `ResponsiveContainer` — width/height are always fixed props here. A
 * percentage-sized ResponsiveContainer inside an auto-height CSS Grid/Flex
 * row has no stable size to measure against, which is a real, reproducible
 * Recharts footgun independent of this package (see the "possible Grid bug"
 * finding this shipped as — it wasn't Grid, it was this).
 */
export type SparklineProps = {
  data: number[]
  color: string
  width?: number
  height?: number
  /** dot on the last point only, matching the source's own "value + trend" reading — not one dot per point */
  showEndDot?: boolean
}

export function Sparkline({ data, color, width = 64, height = 24, showEndDot = true }: SparklineProps) {
  const points = data.map((value, index) => ({ index, value }))
  const lastIndex = points.length - 1
  return (
    <RLineChart width={width} height={height} data={points} margin={{ top: 2, right: 2, bottom: 2, left: 2 }} style={{ flexShrink: 0 }}>
      <Line
        dataKey="value"
        type="monotone"
        stroke={color}
        strokeWidth={2}
        isAnimationActive={false}
        dot={
          showEndDot
            ? (props: { index?: number; cx?: number; cy?: number }) =>
                props.index === lastIndex ? (
                  <circle key={props.index} cx={props.cx} cy={props.cy} r={2.5} fill={color} />
                ) : (
                  <g key={props.index} />
                )
            : false
        }
      />
    </RLineChart>
  )
}
