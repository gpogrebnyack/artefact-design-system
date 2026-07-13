import type { ReactNode } from "react"
import { color, radius } from "@/foundation"

/*
 * LayeredCard — dialog-v2.html's `.rec` / `.up4-card`: two visually distinct
 * layers in one card. The FACT sits on a paper-white inner card; the ADVICE
 * (coaching text, ready-made script) sits below it on the tinted wrapper
 * that peeks around the paper as an 8px frame. Both the recommendations
 * grid and the upsell cards use this exact anatomy — it is the page's
 * visual grammar for "observation → what to do about it", not a one-off.
 *
 * Geometry verbatim from source: wrapper rgba(0,0,0,.03) radius 22 pad 8,
 * inner paper radius 14 pad 20, footer pad 13/20. Column-flex with the
 * footer growing, so cards in one Grid row stretch to equal height and the
 * footer's last line sits at a common baseline (source: .up4-advice flex:1).
 */
export type LayeredCardProps = {
  /** the paper layer — the observed fact */
  children: ReactNode
  /** the wash layer below — advice, script, actions */
  footer?: ReactNode
}

export function LayeredCard({ children, footer }: LayeredCardProps) {
  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.03)",
        borderRadius: radius.xl,
        overflow: "hidden",
        padding: 8,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          // secondary = --paper (solid white): the fact layer is OPAQUE
          // paper, not the 60% glass of `card` — the wash must not bleed
          // through the layer that carries the evidence text
          background: color.secondary,
          borderRadius: radius.lg,
          padding: 20,
        }}
      >
        {children}
      </div>
      {footer && (
        <div
          style={{
            padding: "13px 20px 18px",
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          {footer}
        </div>
      )}
    </div>
  )
}
