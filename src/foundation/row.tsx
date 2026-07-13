import type { CSSProperties, ReactNode } from "react"
import "./row.css"

/*
 * TitledRow — see row.css for why this exists and why it needs real CSS.
 *
 * The side rail is RESERVED even when `side` is empty: komanda.html keeps
 * an empty `.srow-side` div in every row, so the main column has the SAME
 * width on every row of the page. The old behavior here (omitting `side`
 * silently collapsed the rail and widened main) made two sections of one
 * page render at different widths — a real bug caught by rebuilding the
 * source page verbatim (Pages/Komanda). Collapsing the rail is dashboard's
 * explicit `.srow.no-side` — an opt-in via `fullWidth`, not a side effect
 * of having nothing to put in the rail.
 */
export type TitledRowProps = {
  title?: ReactNode
  side?: ReactNode
  /** collapse the right rail and let main take its space (`.srow.no-side`) —
   *  an explicit page-level decision, NOT implied by an empty `side` */
  fullWidth?: boolean
  rail?: number
  gap?: number
  children: ReactNode
}

export function TitledRow({ title, side, fullWidth = false, rail = 180, gap = 20, children }: TitledRowProps) {
  return (
    <section
      className={`foundation-row${fullWidth ? " foundation-row--no-side" : ""}`}
      style={{ "--foundation-row-rail": `${rail}px`, "--foundation-row-gap": `${gap}px` } as CSSProperties}
    >
      {title && <div className="foundation-row-title">{title}</div>}
      <div className="foundation-row-main">{children}</div>
      {side && <div className="foundation-row-side">{side}</div>}
    </section>
  )
}
