import type { ReactNode } from "react"
import { Stack, color } from "@/foundation"
import { Icon, type IconName } from "@/primitives/Icon"
import { Text } from "@/foundation"

/*
 * AdviceCard — Components tier (Icon + Text + Foundation Stack). Found
 * missing while assembling dashboard-prototype.html: `.pot-card` (icon +
 * a big highlighted value + supporting text + a secondary note) doesn't
 * map onto Alert (that's a flat notice, no value slot) or EmptyState
 * (no icon-as-identity + value emphasis). Lives in a side-rail (see
 * Foundation's TitledRow `side` slot), so it's capped at ~168px, matching
 * the source rail's usable width.
 */
export type AdviceCardProps = {
  icon: IconName
  /** ink (default, most advice) or accent (rare — the source reserves this for a genuine highlight, e.g. a new record) */
  tone?: "ink" | "accent"
  /** optional — an advice without a number renders NO value block at all
   *  (never a "—" placeholder; the dash was a story hack around this prop
   *  being required, caught in review) */
  value?: ReactNode
  text: ReactNode
  note?: ReactNode
}

export function AdviceCard({ icon, tone = "ink", value, text, note }: AdviceCardProps) {
  const iconColor = tone === "accent" ? color.accent : color.foreground
  return (
    <Stack gap="xs" style={{ maxWidth: 168 }}>
      <Icon name={icon} size={40} color={iconColor} />
      {/* big number: regular weight + tight line-height, per DESIGN.md's
          own rule for large numbers — reuses the `display` type step. */}
      {value != null && <Text as="span" size="display" weight="regular">{value}</Text>}
      <Text as="span" size="caption" style={{ opacity: 0.72 }}>{text}</Text>
      {note && (
        <Text as="span" size="footnote" style={{ opacity: 0.68, marginTop: 2 }}>{note}</Text>
      )}
    </Stack>
  )
}
