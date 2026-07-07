import type { CSSProperties, ReactNode } from "react"
import "./row.css"

/*
 * TitledRow — see row.css for why this exists and why it needs real CSS.
 * `side` is optional — omit it for a title+main-only row (`.srow.no-side`
 * in both source pages).
 */
export type TitledRowProps = {
  title?: ReactNode
  side?: ReactNode
  rail?: number
  gap?: number
  children: ReactNode
}

export function TitledRow({ title, side, rail = 180, gap = 20, children }: TitledRowProps) {
  return (
    <section
      className={`foundation-row${side ? "" : " foundation-row--no-side"}`}
      style={{ "--foundation-row-rail": `${rail}px`, "--foundation-row-gap": `${gap}px` } as CSSProperties}
    >
      {title && <div className="foundation-row-title">{title}</div>}
      <div className="foundation-row-main">{children}</div>
      {side && <div className="foundation-row-side">{side}</div>}
    </section>
  )
}
