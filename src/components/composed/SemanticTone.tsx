import type { ComponentProps, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { AvatarFallback } from "@/components/ui/avatar"
import { color, semanticRoles } from "@/foundation"

/*
 * Components tier — `Badge`/`Avatar` (shadcn/vendored) have no notion of our
 * OWN semantic roles (accent/green/warn/plum/danger), even though every one
 * of those roles already ships the full base/foreground/hover/soft/
 * soft-foreground set in tokens.ts specifically for this. Two real consumer
 * sessions independently hand-rolled the same `style={{backgroundColor:
 * color.xSoft, color: color.xSoftForeground}}` inline instead — a real gap,
 * not a one-off. `tone` is typed off `semanticRoles` itself (not a second
 * hand-kept union), so a new role added to `color` in tokens.ts is usable
 * here with zero edit.
 *
 * Two DIFFERENT color pairs on purpose, matching how both consumer sessions
 * already used them independently before this existed:
 * - `StatusBadge` — the pale `Soft`/`SoftForeground` pair (a tag/label reads
 *   at rest, not shouting).
 * - `SemanticAvatarFallback` — the vivid base/`Foreground` pair (a small
 *   solid identity mark, same as a score-band ring/gauge).
 * Don't merge these into one pair "for consistency" — the pale pair on an
 * avatar-sized circle reads as disabled/empty, not as a status.
 */
export type SemanticTone = (typeof semanticRoles)[number]

export function StatusBadge({
  tone,
  children,
  style,
  ...props
}: { tone: SemanticTone; children: ReactNode } & Omit<ComponentProps<typeof Badge>, "variant">) {
  return (
    <Badge
      variant="outline"
      style={{
        backgroundColor: color[`${tone}Soft`],
        color: color[`${tone}SoftForeground`],
        borderColor: "transparent",
        ...style,
      }}
      {...props}
    >
      {children}
    </Badge>
  )
}

export function SemanticAvatarFallback({
  tone,
  children,
  style,
  ...props
}: { tone: SemanticTone; children: ReactNode } & ComponentProps<typeof AvatarFallback>) {
  return (
    <AvatarFallback
      style={{
        backgroundColor: color[tone],
        color: color[`${tone}Foreground`],
        fontWeight: 600,
        ...style,
      }}
      {...props}
    >
      {children}
    </AvatarFallback>
  )
}
