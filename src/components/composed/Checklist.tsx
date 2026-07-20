import type { ReactNode } from "react"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import { Text } from "@/foundation"

/*
 * Checklist — dialog-v2.html's `.checklist`/`.cl-row`: the binary
 * met / not-met verdict list of a dialog review (named the position?
 * warm goodbye? branded greeting?). Soft-pair icon chips (green ✓ /
 * accent ✕) + plain body text, flowing into 1 or 2 columns.
 *
 * NOT a to-do list (no interaction, no progress) and NOT StatusBadge
 * (the icon chip is square, the label is body text outside the chip) —
 * it's a read-only verdict grid.
 */
export type ChecklistItem = { done: boolean; label: ReactNode }

export type ChecklistProps = {
  items: ChecklistItem[]
  columns?: 1 | 2
}

export function Checklist({ items, columns = 2 }: ChecklistProps) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: columns === 2 ? "1fr 1fr" : "1fr",
        gap: "2px 28px",
      }}
    >
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "9px 0" }}>
          <span
            style={{
              width: 24,
              height: 24,
              borderRadius: 7,
              flex: "none",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              background: item.done ? color.successSoft : color.accentSoft,
              color: item.done ? color.successSoftForeground : color.accentSoftForeground,
            }}
          >
            <Icon name={item.done ? "check" : "close"} size={15} />
          </span>
          <Text as="span" size="body" style={{ lineHeight: 1.35 }}>
            {item.label}
          </Text>
        </div>
      ))}
    </div>
  )
}
