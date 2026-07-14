import type { ReactNode } from "react"
import { Toolbar as RadixToolbar } from "radix-ui"
import { Flex } from "@/foundation"
import { color, radius, spacing, type as typeScale } from "@/foundation"
import "./Toolbar.css"

/*
 * Toolbar — a COMPONENT (built from Primitives + Foundation). Radix has no
 * shadcn wrapper for this one (shadcn's registry doesn't ship a toolbar), so
 * this composes directly from `radix-ui`'s `Toolbar` export
 * (@radix-ui/react-toolbar) for the real behavior — roving tabindex focus
 * across buttons/toggles/links, orientation, RTL — and layers Foundation's
 * Flex + token scale on top for the visual shell, the same rule as every
 * other tier: behavior from Radix, values from Foundation, never hardcoded.
 */

export function Toolbar({
  children,
  orientation = "horizontal",
  bare = false,
}: {
  children: ReactNode
  orientation?: "horizontal" | "vertical"
  /** Skip the muted-pill chrome — just the Radix roving-focus root + layout.
   *  Use this when the toolbar holds exactly ONE already-styled group (e.g.
   *  a lone ToolbarToggleGroup, which paints its own pill background) —
   *  the default chrome is for combining multiple groups/separators/actions
   *  under one shared housing (see the PeriodAndActions story). Without
   *  `bare`, a single already-backgrounded group nests inside this one's
   *  own background/radius, producing a visible pill-in-a-pill seam. */
  bare?: boolean
}) {
  if (bare) {
    return (
      <RadixToolbar.Root asChild orientation={orientation}>
        <Flex align="center" gap="md">
          {children}
        </Flex>
      </RadixToolbar.Root>
    )
  }
  return (
    <RadixToolbar.Root asChild orientation={orientation}>
      <Flex
        align="center"
        justify="between"
        gap="md"
        p="sm"
        radius="lg"
        style={{ background: color.muted }}
      >
        {children}
      </Flex>
    </RadixToolbar.Root>
  )
}

/** ToolbarGroup — a cluster of related controls (e.g. the period toggle). */
export function ToolbarGroup({ children }: { children: ReactNode }) {
  return (
    <Flex align="center" gap="xs">
      {children}
    </Flex>
  )
}

/** ToolbarToggleGroup — single-select segmented control (roving focus, real
 *  radiogroup semantics) — e.g. Месяц / Неделя / День. */
export function ToolbarToggleGroup({
  value,
  onValueChange,
  children,
}: {
  value: string
  onValueChange?: (v: string) => void
  children: ReactNode
}) {
  return (
    <RadixToolbar.ToggleGroup
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange?.(v)}
      asChild
    >
      {/* minHeight 40 = --layout-control-height: the pill sits in toolbars
          NEXT to inputs/selects pinned to 40px — the source's own
          .period-seg{height:var(--control-h)}. Was 37px (content-derived)
          and read as misaligned in the control row. */}
      <Flex
        gap="xs"
        align="center"
        style={{ background: color.background, borderRadius: radius.pill, padding: spacing.xs, minHeight: 40 }}
      >
        {children}
      </Flex>
    </RadixToolbar.ToggleGroup>
  )
}

export function ToolbarToggleItem({
  value,
  children,
}: {
  value: string
  children: ReactNode
}) {
  return (
    <RadixToolbar.ToggleItem
      value={value}
      className="toolbar-toggle-item"
      style={{
        // background/color are NOT set here — inline style always wins over
        // an external CSS rule regardless of specificity, which would make
        // Toolbar.css's `[data-state="on"]` selector permanently dead (this
        // is exactly the bug that shipped: the active tab never highlighted
        // even though Radix's data-state was switching correctly). Both
        // states live in Toolbar.css instead.
        border: "none",
        borderRadius: radius.pill,
        padding: `${spacing.xs}px ${spacing.md}px`,
        fontSize: typeScale.caption.size,
        cursor: "pointer",
      }}
    >
      {children}
    </RadixToolbar.ToggleItem>
  )
}

/** ToolbarSeparator — vertical divider between groups. Uses `color.input`
 *  (komanda's own --line-2 "visible hairline" token), NOT `color.border` —
 *  `--border` is deliberately transparent project-wide, which would make
 *  this invisible (see the `[data-slot="separator"]` note in
 *  brand-overrides.css; this one needs its own fix since it's built on raw
 *  Radix, not shadcn's Separator, so that CSS override doesn't reach it). */
export function ToolbarSeparator() {
  return (
    <RadixToolbar.Separator style={{ width: 1, height: 24, background: color.input }} />
  )
}

/** ToolbarButton — wraps our Button primitive so it participates in the
 *  toolbar's roving-focus group instead of being a separate tab stop. */
export function ToolbarButton({ children }: { children: ReactNode }) {
  return <RadixToolbar.Button asChild>{children}</RadixToolbar.Button>
}
