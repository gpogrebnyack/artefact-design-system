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

/** Stack — Flex preset for the common vertical layout case.
 *  Defaults to `width:100%`: a vertical column almost always fills its
 *  container's cross-axis, AND — the load-bearing reason — this self-protects
 *  the recurring Chromium "phantom height" bug. A Stack that wraps an auto-fit
 *  Grid (heading + grid of cards) is a column-flex item whose height Chromium
 *  measures BEFORE the cross-stretch; at that moment the inner grid is single-
 *  column and tall, and the stale height never re-resolves → the Stack reserves
 *  ~2× its content (see Grid's note). Pinning width:100% here removes the
 *  pre-stretch ambiguity at the source, so consumers no longer have to remember
 *  to add it to every Grid-wrapping Stack. Override `width` for the rare Stack
 *  that must shrink-wrap (e.g. sitting inline in a Flex row). */
export function Stack({ gap = "base", width = "100%", ...props }: Omit<FlexProps, "direction">) {
  return <Flex direction="column" gap={gap} width={width} {...props} />
}

type GridProps = BoxProps & {
  /** cards reflow: as many minColWidth-wide columns as fit, each stretching */
  minColWidth?: Len
  /** OR a fixed column count */
  columns?: number
  gap?: Len
  align?: CSSProperties["alignItems"]
}

/** Grid — auto-fit reflow (intrinsically responsive, no breakpoints needed).
 *  `align` defaults to "start", not "stretch" — found live: the exact same
 *  entity card (an "unknown employee" placeholder) rendered at three
 *  different heights across three address groups, purely because each
 *  landed next to a different, taller neighbor in its row. `stretch` makes
 *  a card's height depend on whoever else is in its row, not its own
 *  content — wrong default for a roster of independent entities. Pass
 *  `align="stretch"` explicitly for the rarer case of wanting matched-height
 *  rows on purpose (e.g. a fixed set of side-by-side metric tiles). */
export function Grid({
  minColWidth = 280, columns, gap = "base", align = "start", style, children, ...box
}: GridProps) {
  return (
    <Box
      {...box}
      style={{
        display: "grid",
        // Explicit 100% width, NOT auto — the root cause of the long-lived
        // "phantom height" bug family, finally pinned: when a Grid (or a
        // block wrapper holding one) is an item of a COLUMN flex container
        // (Stack/Flex), Chromium resolves the item's hypothetical main size
        // (height) BEFORE stretching its cross size — at that moment the
        // auto-fit grid is measured near max-content width, collapses to
        // one column, and reports a huge height. The stretch happens after,
        // but the stale height is never re-resolved: the container ends up
        // ~750-1000px taller than its deepest descendant, with no CSS rule,
        // margin or transform explaining it (verified live: no reflow nudge
        // fixes it, width:100% instantly does). If you WRAP a Grid in your
        // own plain block div inside a Stack, that wrapper needs width:100%
        // too — see CollapsibleGroup for the shipped example.
        width: "100%",
        gridTemplateColumns: columns
          ? `repeat(${columns}, minmax(0, 1fr))`
          : `repeat(auto-fit, minmax(min(${space(minColWidth)}, 100%), 1fr))`,
        gap: space(gap),
        alignItems: align,
        // `align-content` is a SEPARATE property from `align-items` — it
        // decides what happens to leftover space across the whole set of
        // (auto-sized) row tracks, not within one row. Left unset, it
        // defaults to "normal", which behaves like `stretch` for grid rows.
        // The "leftover space" that stretch was distributing was the
        // phantom height from the stale flex measurement described above
        // (width:100% removes the phantom at the source) — but keep "start"
        // pinned anyway: this container is never given an explicit height
        // by us, so there is never LEGITIMATE leftover space to
        // redistribute, and "start" makes any future phantom show up as an
        // honest empty gap below the rows instead of silently inflating
        // every row (~2.3x, the shape the bug was first reported in).
        // (Historical: was once misattributed to Recharts'
        // ResponsiveContainer; Sparkline never uses it, and this reproduces
        // with zero charts involved.)
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
