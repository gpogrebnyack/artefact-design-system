import { typographyStyle, type TypographyProps } from "./typography"

/*
 * Text — a BASE PRIMITIVE and one of the two typographic baskets (the other
 * is Heading). Text is for body, prose, labels, and values (even big/bold
 * ones — a score or a price is data, not a title). Every non-title string
 * renders through Text, never a raw `<span className="text-sm">` — one place
 * knows what "caption" means in px.
 *
 * Text and Heading are COEQUAL — both render their own element and share the
 * private `typographyStyle` resolver; neither wraps the other. Text simply
 * commits to prose leading.
 */
export type TextProps = TypographyProps

export function Text({ as: As = "span", className, children, ...rest }: TextProps) {
  return (
    <As className={className} style={typographyStyle(rest)}>
      {children}
    </As>
  )
}
