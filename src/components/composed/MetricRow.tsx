import type { ReactNode } from "react"
import { Stack } from "@/foundation"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import { Text } from "@/primitives/Text"
import type { SemanticTone } from "./SemanticTone"

/*
 * MetricRow — the label / value / delta stack from komanda's `.einfo`
 * ("Средний чек / 401 ₽ / ↗ +1% к среднему"). Hand-built in all three
 * consumer sessions (MetricRow / MetricCard / inline in EmployeeCard),
 * each slightly differently. The delta line's tone follows the DESIGN.md
 * rule: a sagging business metric is `accent` (attention), NOT `danger`.
 */
export type MetricRowProps = {
  label: string
  /** the big number, already formatted ("401 ₽") — omit for delta-only rows */
  value?: ReactNode
  /** the comparison line ("+1% к среднему", "−21 989 ₽ к плану") */
  delta?: ReactNode
  /** colors the delta line + its arrow; usually green (up) or accent (down) */
  tone?: SemanticTone
  trend?: "up" | "down"
}

export function MetricRow({ label, value, delta, tone, trend }: MetricRowProps) {
  const deltaColor = tone ? color[tone] : color.mutedForeground
  return (
    <Stack gap="xs">
      <Text as="span" size="footnote" color={color.mutedForeground}>
        {label}
      </Text>
      {value != null && (
        <Text as="span" size="body" weight={600}>
          {value}
        </Text>
      )}
      {delta != null && (
        <Text as="span" size="footnote" weight={600} color={deltaColor} style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
          {/* straight ↑/↓, matching the source's own `.einfo` deltas — the
              diagonal trend-up/trend-down glyphs are the SCORE's language
              (ScorePill), the source deliberately distinguishes the two */}
          {trend && <Icon name={trend === "up" ? "arrow-up" : "arrow-down"} size={12} />}
          {delta}
        </Text>
      )}
    </Stack>
  )
}
