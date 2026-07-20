import { useState, type ReactNode } from "react"
import { color, radius } from "@/foundation"
import { Text } from "@/primitives/Text"
import "./ScoreHeatmap.css"

/*
 * ScoreHeatmap — dialog-v2.html's `.hmt` criteria row: one soft-tinted cell
 * per criteria group (earned/max fraction), a non-clickable "Итог" cell,
 * and a detail panel for the selected cell (sub-criteria grid, evidence,
 * quote). This IS the assessment view of a dialog review — the page's
 * center of gravity, not page furniture.
 *
 * Tint grammar: ratio ≥ 0.7 green, ≥ 0.4 warn, else accent — the soft
 * BACKGROUND with the `SoftStrong` foreground (not `SoftForeground`):
 * cells show 16px primary data, and the ordinary soft pair fails contrast
 * there — the source's own midFg() darkens every band for this. The detail
 * panel inherits the selected cell's tint so the connection reads without
 * a pointer line. Initial selection defaults to the WORST cell (the
 * source's own behavior: open on the thing that needs attention).
 *
 * `evidence` is a ReactNode so callers can embed a TimeTag jump into the
 * sentence, exactly like the source does.
 */
export type ScoreHeatmapSub = {
  name: ReactNode
  /** formatted sub-score: "1/1", "0/2", or "—" (not assessable) */
  score: string
}

export type ScoreHeatmapGroup = {
  name: ReactNode
  earned: number
  max: number
  subs?: ScoreHeatmapSub[]
  evidence?: ReactNode
  quote?: ReactNode
}

export type ScoreHeatmapProps = {
  groups: ScoreHeatmapGroup[]
  /** the summary cell — rendered last, tinted but not clickable */
  total?: { earned: number; max: number }
  /** index into `groups`; defaults to the worst ratio */
  defaultSelected?: number
  /** ratio → status word; defaults to the source's Эталон/Норма/Частично/Провал */
  statusLabel?: (ratio: number) => ReactNode
}

function bandTone(ratio: number): "success" | "warning" | "accent" {
  return ratio >= 0.7 ? "success" : ratio >= 0.4 ? "warning" : "accent"
}

function defaultStatusLabel(ratio: number): string {
  return ratio >= 1 ? "Эталон" : ratio >= 0.7 ? "Норма" : ratio >= 0.4 ? "Частично" : "Провал"
}

function subScoreColor(score: string): string {
  if (score === "—") return color.mutedForeground
  const [e, m] = score.split("/").map(Number)
  const r = m ? e / m : 0
  // source subColor(): full = vivid green, zero = vivid accent, partial =
  // the darkened in-between (its #c2540c ≈ our accentSoftStrong)
  return r >= 1 ? color.success : r > 0 ? color.accentSoftStrong : color.accentSoftForeground
}

function Fraction({ earned, max }: { earned: number; max: number }) {
  return (
    <span className="artefact-heatmap-fraction">
      {earned}
      <span className="artefact-heatmap-fraction-max">/{max}</span>
    </span>
  )
}

export function ScoreHeatmap({
  groups,
  total,
  defaultSelected,
  statusLabel = defaultStatusLabel,
}: ScoreHeatmapProps) {
  const worst = groups.reduce(
    (best, g, i) => {
      const r = g.max ? g.earned / g.max : 0
      return r < best.r ? { i, r } : best
    },
    { i: 0, r: Infinity },
  ).i
  const [selected, setSelected] = useState(defaultSelected ?? worst)
  const sel = groups[selected]
  const selRatio = sel && sel.max ? sel.earned / sel.max : 0
  const selTone = bandTone(selRatio)

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <table className="artefact-heatmap-table">
          <thead>
            <tr>
              {groups.map((g, i) => (
                <th key={i}>{g.name}</th>
              ))}
              {total && <th className="artefact-heatmap-total-h">Итог</th>}
            </tr>
          </thead>
          <tbody>
            <tr>
              {groups.map((g, i) => {
                const ratio = g.max ? g.earned / g.max : 0
                const tone = bandTone(ratio)
                return (
                  <td
                    key={i}
                    className={`artefact-heatmap-cell artefact-heatmap-cell--clickable${i === selected ? " artefact-heatmap-cell--selected" : ""}`}
                    style={{
                      background: color[`${tone}Soft`],
                      color: color[`${tone}SoftStrong`],
                    }}
                    onClick={() => setSelected(i)}
                  >
                    <Fraction earned={g.earned} max={g.max} />
                  </td>
                )
              })}
              {total &&
                (() => {
                  const ratio = total.max ? total.earned / total.max : 0
                  const tone = bandTone(ratio)
                  return (
                    <td
                      className="artefact-heatmap-cell"
                      style={{
                        background: color[`${tone}Soft`],
                        color: color[`${tone}SoftStrong`],
                      }}
                    >
                      <Fraction earned={total.earned} max={total.max} />
                    </td>
                  )
                })()}
            </tr>
          </tbody>
        </table>
      </div>

      {sel && (
        <div
          className="artefact-heatmap-detail"
          style={{ background: color[`${selTone}Soft`], borderRadius: 12 }}
        >
          <Text as="div" size="body" weight={600} style={{ marginBottom: 8 }}>
            {sel.name} · {sel.earned}/{sel.max} · {statusLabel(selRatio)}
          </Text>
          {sel.subs && sel.subs.length > 0 && (
            <div className="artefact-heatmap-subs">
              {sel.subs.map((s, i) => (
                <div key={i} className="artefact-heatmap-sub">
                  <span
                    className="artefact-heatmap-sub-score"
                    style={{ color: subScoreColor(s.score) }}
                  >
                    {s.score}
                  </span>
                  <Text as="span" size="caption">
                    {s.name}
                  </Text>
                </div>
              ))}
            </div>
          )}
          {sel.evidence && (
            <Text as="div" size="caption" color={color.mutedForeground} style={{ lineHeight: 1.5 }}>
              {sel.evidence}
            </Text>
          )}
          {sel.quote && (
            <div
              style={{
                marginTop: 8,
                padding: "8px 12px",
                background: color.secondary,
                borderRadius: radius.sm,
              }}
            >
              {/* quote = «» + its own paper block, NOT italic — the system
                  has no italic face (Struve ships 400/600 upright only;
                  browser-faked slant looked cheap and was removed on review) */}
              <Text as="span" size="caption">
                «{sel.quote}»
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
