import type { CSSProperties, ElementType, ReactNode } from "react"
import { type as typeScale, type TypeKey, color, fontWeight, type FontWeightName } from "./tokens"

/*
 * Shared typography ENGINE behind the two public primitives, Text and
 * Heading. It's a plain style function, not a component — the only
 * components are Text and Heading, coequal siblings that both render their
 * own element and share this one resolver. Everything that could drift
 * between them lives here once: the size scale (size/lineHeight/
 * letterSpacing), font family, named-weight resolution, default ink color,
 * the margin reset, truncation.
 *
 * `leading` is internal: Text is always prose, Heading always tight. It is
 * never a public prop — a per-call leading knob is exactly the decision we
 * keep off authors (pick Text vs Heading, done).
 */

/** headings are never looser than this — a CAP via Math.min, so steps
 *  already tighter (headline 1.25, display 1.15) keep their value and only
 *  the prose-tuned small steps (body 1.55, caption 1.45) tighten. */
const HEADING_LEADING_CAP = 1.25

export type TypographyProps = {
  /** which element this renders as — independent of visual size */
  as?: ElementType
  /** Foundation type-scale step */
  size?: TypeKey
  /** named Struve weight (`regular`/`medium`/`semibold`); raw CSS value also works */
  weight?: FontWeightName | CSSProperties["fontWeight"]
  /** a resolved token value, e.g. `color.mutedForeground` or `color.accent` */
  color?: string
  align?: CSSProperties["textAlign"]
  /** clip to one line with an ellipsis instead of wrapping */
  truncate?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

type StyleInput = Omit<TypographyProps, "as" | "className" | "children"> & { leading?: "prose" | "tight" }

export function typographyStyle({
  size = "body",
  weight,
  color: textColor = color.foreground,
  align,
  truncate,
  leading = "prose",
  style,
}: StyleInput): CSSProperties {
  const step = typeScale[size]
  const lineHeight =
    leading === "tight" ? Math.min(Number(step.lineHeight), HEADING_LEADING_CAP) : step.lineHeight
  // named weight → numeric token; a raw CSS value passes through unchanged
  const resolvedWeight =
    typeof weight === "string" && weight in fontWeight ? fontWeight[weight as FontWeightName] : weight
  return {
    /* браузерные маргины h1–h6/p сброшены: забытый сброс давал рваный ритм.
       Вернуть отступ можно через style. */
    margin: 0,
    fontFamily: step.fontFamily,
    fontSize: step.size,
    lineHeight,
    letterSpacing: step.letterSpacing,
    fontWeight: resolvedWeight,
    color: textColor,
    textAlign: align,
    ...(truncate ? { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } : null),
    ...style,
  }
}
