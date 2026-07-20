import type { ReactNode } from "react"
import { Icon } from "@/primitives/Icon"
import "./TimeTag.css"

/*
 * TimeTag — dialog-v2.html's `.timetag` / `.tl-time`: an inline pill that
 * names a MOMENT of the recording (play triangle + tabular-nums time) and,
 * when clickable, seeks the player there. The single most repeated pattern
 * of the dialog-review page — the source hand-renders it in FIVE places
 * (summary strengths, criteria detail, recommendation quotes, upsell
 * quotes, chronology cards) with two skins that share one anatomy:
 *
 *  - `muted` (default) — the in-text jump link (`.timetag`, gray wash);
 *  - `green` / `accent` — the chronology-card variant (`.tl-time`), where
 *    the pill also carries the moment's verdict.
 *
 * Time comes formatted ("11:26" or a "00:15 – 00:17" range) — formatting
 * is the caller's concern, same rule as ScorePill. A tag with no `onClick`
 * renders as a plain span with no play affordance (the source's dashed
 * end-card time has no triangle: nothing to play).
 */
export type TimeTagTone = "muted" | "success" | "accent"

export type TimeTagProps = {
  time: ReactNode
  tone?: TimeTagTone
  onClick?: () => void
}

export function TimeTag({ time, tone = "muted", onClick }: TimeTagProps) {
  const className = `artefact-timetag artefact-timetag--${tone}`
  if (!onClick) {
    return (
      <span className={className}>
        <span className="artefact-timetag-time">{time}</span>
      </span>
    )
  }
  return (
    <button
      type="button"
      className={`${className} artefact-timetag--clickable artefact-focus-ring artefact-pressable`}
      onClick={(e) => {
        // the tag usually sits INSIDE another clickable (a moment card, a
        // criteria row) — jumping the player must not also trigger that
        e.stopPropagation()
        onClick()
      }}
    >
      <Icon name="play" size={10} weight="fill" />
      <span className="artefact-timetag-time">{time}</span>
    </button>
  )
}
