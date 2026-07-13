import type { ComponentProps, CSSProperties } from "react"
import { Box } from "./layout"
import { color } from "./tokens"
import "./surface.css"
import "./interactive.css"

/*
 * Surface — still Foundation, one step above the bare Box. Box is pure
 * behavior (no color); Surface adds exactly one thing — a background — from
 * a fixed set of token variants, and nothing else (no content, no specific
 * identity). That's the test for staying in Foundation rather than becoming
 * a Primitive: nothing "uses" Surface as an ingredient the way a Card uses
 * Text or Icon — Surface IS the thing a Card's shell is built directly from
 * ("Box + surface styling" — see Foundation/Layout's BoxIsTheBase story).
 *
 * `description` here isn't decorative — Foundation/Surface's demo story
 * reads this object directly (`Object.entries(VARIANTS)`) instead of
 * hand-listing each variant. Add a variant here and it appears in Storybook
 * with no story-file edit — the same self-generating pattern already used
 * by the Spacing/Typography/Radius/Icon galleries. A variant that's
 * declared here but never wired into a story is exactly the bug that
 * shipped with `scrim` (built, used in AssistantDock, invisible in
 * Storybook until someone happened to notice and ask "where is it?").
 */

const VARIANTS = {
  glass: {
    // NO backdrop blur — audited against all three source pages: they never
    // blur cards, only OVERLAYS (assistant panel/field, mobile header).
    // "Glass" on a card is purely the 60% white fill letting the warm page
    // gradient through; blur here was our invention with zero visible
    // effect (cards sit on a near-flat gradient, nothing scrolls behind
    // them) at a real compositing cost per card. Blur lives in `scrim`.
    style: { background: color.card } as CSSProperties,
    description: "60% белого — карточки-острова (без блюра)",
  },
  paper: {
    style: { background: color.secondary } as CSSProperties,
    description: "непрозрачный белый — чипы, попапы",
  },
  muted: {
    style: { background: color.muted } as CSSProperties,
    description: "hover / выбранное состояние",
  },
  plain: {
    style: { background: "transparent" } as CSSProperties,
    description: "без фона — только контур",
  },
  scrim: {
    style: { background: color.scrim, backdropFilter: "blur(40px) saturate(1.4)" } as CSSProperties,
    description: "тёмная подложка + сильный блюр — фон позади оверлей-панели",
  },
} satisfies Record<string, { style: CSSProperties; description: string }>

export type SurfaceVariant = keyof typeof VARIANTS

/** The variant registry itself — Foundation/Surface's story iterates this
 *  directly instead of hand-listing each variant (see file header). */
export const SURFACE_VARIANTS = VARIANTS

export type SurfaceProps = ComponentProps<typeof Box> & {
  variant?: SurfaceVariant
  /** the surface is CLICKABLE — hover lift + accent border + cursor, the
   *  source's own `.ecard:hover` (surface.css). Rule from DESIGN.md:
   *  «выглядит кликабельным → обязано реагировать» — a Surface with onClick
   *  and no `interactive` gives no hover feedback, which reads as broken. */
  interactive?: boolean
}

export function Surface({ variant = "glass", radius = "xl", interactive = false, className, style, ...box }: SurfaceProps) {
  const { backdropFilter, ...rest } = VARIANTS[variant].style
  return (
    <Box
      radius={radius}
      className={
        interactive
          ? `foundation-surface--interactive artefact-focus-ring${className ? ` ${className}` : ""}`
          : className
      }
      style={{
        ...rest,
        WebkitBackdropFilter: backdropFilter,
        backdropFilter,
        ...style,
      }}
      {...box}
    />
  )
}
