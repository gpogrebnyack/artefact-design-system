import type { ReactNode } from "react"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import type { SemanticTone } from "./SemanticTone"

/*
 * ScorePill — komanda.html's `.sval`: the score value in a soft-toned pill,
 * with an optional trend arrow. Rebuilt by hand in ALL THREE independent
 * consumer sessions (ScoreWithTrend / ScoreSection / ScoreDisplay) before
 * this existed — the strongest "formalize it" signal any pattern has had.
 * Geometry verbatim from source: 32px pill, gap 5, padding 0 8px, bold.
 *
 * Value comes formatted ("6,3" — comma, one decimal): formatting is the
 * caller's locale concern, not this component's.
 */
export type ScorePillProps = {
  value: ReactNode
  /** semantic role — usually the score band: green (good) / warn / accent */
  tone: SemanticTone
  trend?: "up" | "down"
}

export function ScorePill({ value, tone, trend }: ScorePillProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        height: 32,
        minWidth: 32,
        borderRadius: 999,
        padding: "0 10px",
        fontSize: 16,
        fontWeight: 600,
        backgroundColor: color[`${tone}Soft`],
        color: color[`${tone}SoftForeground`],
      }}
    >
      {trend && <Icon name={trend === "up" ? "trend-up" : "trend-down"} size={13} />}
      {value}
    </span>
  )
}
