import type { ReactNode } from "react"
import { color } from "@/foundation"
import { Text } from "@/foundation"

/*
 * StepFunnel — dialog-v2.html's `.up4-funnel`: a compact stage indicator
 * (Повод → Назвал → Аргумент → Призыв) showing how far an attempt got
 * before it broke. Completed stages are green bars; the stage where it
 * broke carries the verdict tone; everything after stays neutral. The
 * source renders this grammar twice (the up4 cards and the legacy stepper
 * view) — the bar variant is the canonical one.
 *
 * The component owns the completed/broke/rest derivation (that's visual
 * grammar); WHICH verdict tone the broken stage gets ("только упомянул" =
 * warn vs "упущено" = accent) is the caller's semantics.
 */
export type StepFunnelProps = {
  steps: ReadonlyArray<ReactNode>
  /** stages actually completed, 0..steps.length; steps.length = sold */
  reached: number
  /** tone of the stage where the attempt broke (ignored when all reached) */
  tone?: "accent" | "warning"
}

export function StepFunnel({ steps, reached, tone = "accent" }: StepFunnelProps) {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {steps.map((label, i) => {
        const state = i < reached ? "ok" : i === reached ? tone : "none"
        const bar =
          state === "ok" ? color.success : state === "none" ? color.muted : color[state]
        const text =
          state === "ok"
            ? color.success
            : state === "none"
              ? color.mutedForeground
              : color[`${state}SoftForeground`]
        return (
          <div
            key={i}
            style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}
          >
            <span style={{ width: "100%", height: 6, borderRadius: 3, background: bar }} />
            <Text as="span" size="footnote" weight="medium" color={text}>
              {label}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
