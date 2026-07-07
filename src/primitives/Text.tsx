import type { CSSProperties, ElementType, ReactNode } from "react"
import { type as typeScale, type TypeKey, color } from "@/foundation"

/*
 * Text — a BASE PRIMITIVE. Every typographic string in a higher-tier
 * component should render through this, not a raw <span className="text-sm">
 * — that way there's exactly one place that knows what "caption" or
 * "headline" means in px/line-height (Foundation's `type` scale), and one
 * place that resolves a semantic color name to the real CSS variable
 * (Foundation's `color`/`brand`), instead of both drifting per call site.
 */

export type TextProps = {
  /** which element this renders as — independent of visual size */
  as?: ElementType
  /** Foundation type-scale step */
  size?: TypeKey
  weight?: CSSProperties["fontWeight"]
  /** a resolved token value, e.g. `color.mutedForeground` or `color.accent` */
  color?: string
  align?: CSSProperties["textAlign"]
  /** clip to one line with an ellipsis instead of wrapping */
  truncate?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export function Text({
  as: As = "span",
  size = "body",
  weight,
  color: textColor = color.foreground,
  align,
  truncate,
  className,
  style,
  children,
}: TextProps) {
  const step = typeScale[size]
  return (
    <As
      className={className}
      style={{
        fontSize: step.size,
        lineHeight: step.lineHeight,
        fontWeight: weight,
        color: textColor,
        textAlign: align,
        ...(truncate
          ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }
          : null),
        ...style,
      }}
    >
      {children}
    </As>
  )
}
