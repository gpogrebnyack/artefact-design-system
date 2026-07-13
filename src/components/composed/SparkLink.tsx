import type { ReactNode } from "react"
import { Icon } from "@/primitives/Icon"
import "./SparkLink.css"

/*
 * SparkLink — dialog-v2.html's `.ins-link` / `.up4-ask`: the "hand this to
 * the assistant" affordance (✦ spark + label as a quiet inline action).
 * Recurs across the page in both rails and cards ("Сколько
 * недозаработали?", "Потренировать с ассистентом") — it is the ONE
 * standard way a static block escalates into the AssistantDock, so it
 * must look identical everywhere. The spark is always accent; the label
 * is ink, warming to accent on hover.
 */
export type SparkLinkProps = {
  children: ReactNode
  onClick?: () => void
}

export function SparkLink({ children, onClick }: SparkLinkProps) {
  return (
    <button
      type="button"
      className="artefact-spark-link artefact-focus-ring"
      // keep focus where it was: the usual target opens the assistant,
      // which manages its own focus (source: onmousedown preventDefault)
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
    >
      <Icon name="spark" size={16} weight="fill" className="artefact-spark-link-spark" />
      {children}
    </button>
  )
}
