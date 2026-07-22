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
 * display). All heading levels are semibold — hierarchy is built by SIZE
 * (h1 24 / h2 20 / h3 18), not by weight; a child heading is never lighter
 * than its parent. (Use `weight="regular"` only for a deliberate one-off.)
 */
export type HeadingProps = TypographyProps

export function Heading({ as: As = "h1", size = "headline", weight = "semibold", className, children, ...rest }: HeadingProps) {
  return (
    <As className={className} style={typographyStyle({ size, weight, leading: "tight", ...rest })}>
      {children}
    </As>
  )
}

/*
 * Semantic title presets — bake the heading ladder (DESIGN.md → Typography) so
 * the LEVEL→size is never hand-picked (a raw `<Heading size="?">` is where the
 * size drifts). Ladder: page h1 → headline (24), section h2 → title (20), both
 * semibold; hierarchy is SIZE, not weight. `size`/`as`/`weight` still override
 * if a spot truly needs it (Radix decoupling holds).
 *
 * No `CardTitle` here on purpose — shadcn's Card already exports that name; a
 * card/subsection heading is `<Heading as="h3" size="subhead">` (h3 rung of the
 * same ladder).
 */
export function PageTitle({ as = "h1", size = "headline", ...rest }: HeadingProps) {
  // weight не форсим → semibold (дефолт Heading): страничный h1 — якорь, тяжелее секций
  return <Heading as={as} size={size} {...rest} />
}
export function SectionTitle({ as = "h2", size = "title", ...rest }: HeadingProps) {
  // weight не форсим → semibold (дефолт Heading): заголовки все semibold,
  // иерархия строится РАЗМЕРОМ (h1 24 / h2 20 / h3 18), не весом
  return <Heading as={as} size={size} {...rest} />
}
