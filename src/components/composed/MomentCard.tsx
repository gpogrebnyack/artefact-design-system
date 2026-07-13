import { forwardRef, type ReactNode } from "react"
import { color } from "@/foundation"
import { Text } from "@/primitives/Text"
import { TimeTag } from "./TimeTag"
import "./MomentCard.css"

/*
 * MomentCard / MomentStrip — dialog-v2.html's `.tl-card` / `.tl-row`: the
 * chronology of a recorded dialog as a horizontally scrolling strip of
 * verdict cards (time range → criterion → what happened → quote), ending
 * in a dashed "recording cut off" card. Cards talk to the WaveformPlayer:
 * hover brightens the matching wave band, click seeks there, and the
 * currently playing moment gets the accent outline (`highlighted` — a
 * SELECTION state, allowed to use accent; hover is only the -2px lift).
 *
 * The quote is pinned to the card's bottom edge (margin-top:auto), so
 * quotes align across a row of different-height cards — the source's own
 * `.tl-q` device.
 */
export type MomentCardProps = {
  /** formatted time range ("00:05 – 00:08") */
  time: ReactNode
  /** verdict: green (done right) / accent (missed); `end` = the dashed terminal card */
  tone: "green" | "accent" | "end"
  title: ReactNode
  description?: ReactNode
  quote?: ReactNode
  /** the moment currently active in the player */
  highlighted?: boolean
  onClick?: () => void
  /** hover in/out — wire to WaveformPlayer's highlightMark */
  onHoverChange?: (hovered: boolean) => void
}

export const MomentCard = forwardRef<HTMLDivElement, MomentCardProps>(function MomentCard({
  time,
  tone,
  title,
  description,
  quote,
  highlighted = false,
  onClick,
  onHoverChange,
}: MomentCardProps, ref) {
  const isEnd = tone === "end"
  return (
    <div
      ref={ref}
      className={`artefact-moment-card${isEnd ? " artefact-moment-card--end" : ""}${highlighted ? " artefact-moment-card--hl" : ""}${onClick ? " artefact-focus-ring" : ""}`}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick() } } : undefined}
      onMouseEnter={onHoverChange ? () => onHoverChange(true) : undefined}
      onMouseLeave={onHoverChange ? () => onHoverChange(false) : undefined}
    >
      <span style={{ alignSelf: "flex-start", marginBottom: 12 }}>
        <TimeTag time={time} tone={isEnd ? "muted" : tone} />
      </span>
      <Text
        as="div"
        size="body"
        weight={600}
        color={isEnd ? color.mutedForeground : undefined}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7, lineHeight: 1.25 }}
      >
        {!isEnd && (
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              flex: "none",
              background: color[tone],
            }}
          />
        )}
        {title}
      </Text>
      {description && (
        <Text as="div" size="footnote" color={color.mutedForeground} style={{ lineHeight: 1.5, marginBottom: 10 }}>
          {description}
        </Text>
      )}
      {quote && (
        <Text
          as="div"
          size="footnote"
          style={{ fontStyle: "italic", lineHeight: 1.45, marginTop: "auto", paddingTop: 4 }}
        >
          «{quote}»
        </Text>
      )}
    </div>
  )
})

/** Horizontal scroll housing for MomentCards: snap points, hidden
 *  scrollbar, edge padding so the first/last card don't kiss the panel. */
export function MomentStrip({ children }: { children: ReactNode }) {
  return <div className="artefact-moment-strip">{children}</div>
}
