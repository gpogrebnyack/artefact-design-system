import { typographyStyle, type TypographyProps } from "./typography"

/*
 * Heading — one of the two typographic primitives (with Text), same model as
 * Radix Themes. Text and Heading share the ONE size scale IN FULL — the
 * choice between them is role (title vs body), never size range. Heading
 * differs from Text in exactly three ways, as in Radix: it renders a heading
 * element (h1–h6), its leading is a bit tighter, and its resting weight is
 * heavier (semibold — our heaviest face; Struve ships no bold). Everything
 * else (size / color / align / truncate) is identical to Text; you never set
 * line-height.
 *
 * Tighter leading = a CAP, min(step, 1.25): it tightens the prose-tuned small
 * steps (body/caption) and leaves ones already tighter alone (headline/
 * display). Section titles are deliberately light — pass `weight="regular"`.
 */
export type HeadingProps = TypographyProps

export function Heading({ as: As = "h1", size = "headline", weight = "semibold", className, children, ...rest }: HeadingProps) {
  return (
    <As className={className} style={typographyStyle({ size, weight, leading: "tight", ...rest })}>
      {children}
    </As>
  )
}
