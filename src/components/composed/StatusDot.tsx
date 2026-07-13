import type { ReactNode } from "react"
import { color } from "@/foundation"
import { Text } from "@/primitives/Text"
import type { StatusTone } from "./SemanticTone"

/*
 * StatusDot — a small colored dot + short label ("● Пользуется ежедневно"),
 * komanda.html's app-access line. Hand-built in both consumer sessions
 * (AccessStatus.tsx in each) and again in the Pages/Komanda rebuild before
 * becoming an export. Not a badge: it reads as a quiet state line inside a
 * card, not as a pill.
 */
export type StatusDotProps = {
  tone: StatusTone
  children: ReactNode
}

export function StatusDot({ tone, children }: StatusDotProps) {
  const fg = tone === "muted" ? color.mutedForeground : color[tone]
  return (
    <Text
      as="span"
      size="footnote"
      color={fg}
      style={{ display: "inline-flex", alignItems: "center", gap: 6 }}
    >
      <span style={{ width: 7, height: 7, borderRadius: "50%", backgroundColor: fg, flexShrink: 0 }} />
      {children}
    </Text>
  )
}
