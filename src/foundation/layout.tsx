import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react"
import { spacing, radius as radiusScale, type SpacingKey } from "./tokens"

/*
 * FOUNDATION — LAYOUT PRIMITIVES. The bottom of the hierarchy (Foundation →
 * Primitives → Components → Sections). Pure BEHAVIOR containers (no color/
 * surface), responsive BY DESIGN, that every layer above is built on. A Card
 * is not a monolith — it's a Box + surface styling from the Primitives tier.
 * A row of cards is a Grid that reflows itself. No hardcoded pixel layouts,
 * no manual breakpoints for the common cases.
 *
 * Spacing/radius accept either a raw length (number → px, or any CSS length
 * string) OR a named key from the Foundation scale (`tokens.ts` `spacing`/
 * `radius`) — e.g. `p="lg"` resolves to the same 20px every other component
 * on the scale uses, instead of a one-off value invented per call site.
 *
 * Values are inline styles so there's no Tailwind JIT dependency, and
 * responsiveness is intrinsic: Grid uses auto-fit/minmax (reflows by width),
 * Flex wraps. This is the Radix-Themes Box/Flex/Grid/Container model on our
 * stack, now wired to our own scale.
 */

type Len = number | string | SpacingKey

const isSpacingKey = (v: unknown): v is SpacingKey =>
  typeof v === "string" && v in spacing

/** Resolve a length: spacing-scale key → its px number; number → px string;
 *  any other string (e.g. "1rem", "50%") passes through untouched. */
const space = (v?: Len): string | undefined => {
  if (v == null) return undefined
  if (isSpacingKey(v)) return `${spacing[v]}px`
  return typeof v === "number" ? `${v}px` : v
}

type RadiusKey = keyof typeof radiusScale
const isRadiusKey = (v: unknown): v is RadiusKey =>
  typeof v === "string" && v in radiusScale

/** Resolve a radius: radius-scale key → the matching CSS var/number; else a
 *  raw length, same rules as `space`. */
const rad = (v?: Len): string | number | undefined => {
  if (v == null) return undefined
  if (isRadiusKey(v)) return radiusScale[v]
  return typeof v === "number" ? `${v}px` : v
}

// Everything NOT in our own explicit list passes straight through to the
// underlying element (onClick, onMouseEnter, aria-*, type, disabled, ...).
// Box didn't do this originally — it silently dropped any prop it didn't
// know about, which meant Box/Surface could never be made interactive
// (found while building a clickable Chip: FilterSelect's clear button had
// already worked around this by reaching for a raw <button> instead of
// Surface, rather than the gap getting fixed at the root).
type BoxOwnProps = {
  as?: ElementType
  p?: Len; px?: Len; py?: Len
  radius?: Len
  width?: Len; maxWidth?: Len; minWidth?: Len
  grow?: boolean
  className?: string
  style?: CSSProperties
  children?: ReactNode
}
type BoxProps = BoxOwnProps & Omit<HTMLAttributes<HTMLElement>, keyof BoxOwnProps>

/** Box — the base container. The thing a Card (or anything) is built ON. */
export function Box({
  as: As = "div", p, px, py, radius, width, maxWidth, minWidth, grow, className, style, children, ...rest
}: BoxProps) {
  return (
    <As
      {...rest}
      className={className}
      style={{
        padding: space(p),
        paddingInline: space(px),
        paddingBlock: space(py),
        borderRadius: rad(radius),
        width: space(width),
        maxWidth: space(maxWidth),
        minWidth: minWidth != null ? space(minWidth) : 0,
        flexGrow: grow ? 1 : undefined,
        ...style,
      }}
    >
      {children}
    </As>
  )
}

type FlexProps = BoxProps & {
  direction?: "row" | "column"
  gap?: Len
  align?: CSSProperties["alignItems"]
  justify?: CSSProperties["justifyContent"]
  wrap?: boolean
}

/** Flex — a flex container. Wraps by default → naturally responsive. */
export function Flex({
  direction = "row", gap = "md", align, justify, wrap = true, style, children, ...box
}: FlexProps) {
  return (
    <Box
      {...box}
      style={{
        display: "flex",
        flexDirection: direction,
        gap: space(gap),
        alignItems: align,
        justifyContent: justify,
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
    >
      {children}
    </Box>
  )
}

/** Stack — Flex preset for the common vertical layout case. */
export function Stack({ gap = "base", ...props }: Omit<FlexProps, "direction">) {
  return <Flex direction="column" gap={gap} {...props} />
}

type GridProps = BoxProps & {
  /** cards reflow: as many minColWidth-wide columns as fit, each stretching */
  minColWidth?: Len
  /** OR a fixed column count */
  columns?: number
  gap?: Len
  align?: CSSProperties["alignItems"]
}

/** Grid — auto-fit reflow (intrinsically responsive, no breakpoints needed). */
export function Grid({
  minColWidth = 280, columns, gap = "base", align = "stretch", style, children, ...box
}: GridProps) {
  return (
    <Box
      {...box}
      style={{
        display: "grid",
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : `repeat(auto-fit, minmax(min(${space(minColWidth)}, 100%), 1fr))`,
        gap: space(gap),
        alignItems: align,
        // `align-content` is a SEPARATE property from `align-items` — it
        // decides what happens to leftover space across the whole set of
        // (auto-sized) row tracks, not within one row. Left unset, it
        // defaults to "normal", which behaves like `stretch` for grid rows —
        // a real, reproducible bug found live: an `auto`-height Grid's rows
        // got measured ~2.3x too tall on first paint (a browser intrinsic-
        // sizing quirk, still unexplained at the CSS level), and
        // `align-content: normal` then stretched every row to match that
        // inflated size instead of leaving the extra (phantom) space alone.
        // This container is NEVER given an explicit height by us, so there
        // is never legitimate leftover space to redistribute — pin this to
        // "start" unconditionally rather than trust the browser default.
        // (Was misattributed to Recharts' ResponsiveContainer in an earlier
        // note; Sparkline never uses ResponsiveContainer at all, and this
        // reproduces with zero charts involved — see COMPONENTS.md.)
        alignContent: "start",
        ...style,
      }}
    >
      {children}
    </Box>
  )
}

/** Container — max-width centered content column. */
export function Container({ size = 1280, style, children, ...box }: BoxProps & { size?: Len }) {
  return (
    <Box {...box} style={{ width: "100%", maxWidth: space(size), marginInline: "auto", ...style }}>
      {children}
    </Box>
  )
}
