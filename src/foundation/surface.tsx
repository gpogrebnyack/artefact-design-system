import type { ComponentProps, CSSProperties } from "react"
import { Box } from "./layout"
import { color } from "./tokens"

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
    style: { background: color.card, backdropFilter: "blur(10px)" } as CSSProperties,
    description: "60% + blur — карточки-острова",
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
}

export function Surface({ variant = "glass", radius = "xl", style, ...box }: SurfaceProps) {
  const { backdropFilter, ...rest } = VARIANTS[variant].style
  return (
    <Box
      radius={radius}
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
