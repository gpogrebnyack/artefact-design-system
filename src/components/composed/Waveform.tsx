import { color } from "@/foundation"

/*
 * Waveform — the static voice-sample bars next to a dialog row. Same story
 * as Sparkline one release earlier: two consumer sessions independently
 * hand-rolled identical bar rows (width 3, radius 2, `color.input`) because
 * the catalog had nothing for "this row is an audio recording".
 * Plain divs, no chart machinery — it's an icon-grade visual, not data-viz
 * (values are decorative amplitude, nobody reads numbers off it).
 */
export type WaveformProps = {
  /** bar heights in px (decorative; clamp yours to ~4..16) */
  values: number[]
  /** bar color — defaults to the neutral hairline token */
  color?: string
  height?: number
}

export function Waveform({ values, color: barColor = color.input, height = 24 }: WaveformProps) {
  return (
    <span
      aria-hidden="true"
      style={{ display: "inline-flex", alignItems: "center", gap: 3, height, flexShrink: 0 }}
    >
      {values.map((v, i) => (
        <span
          key={i}
          style={{
            width: 3,
            height: Math.max(4, Math.min(v, height)),
            borderRadius: 2,
            backgroundColor: barColor,
          }}
        />
      ))}
    </span>
  )
}
