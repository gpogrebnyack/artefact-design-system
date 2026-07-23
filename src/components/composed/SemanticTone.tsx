import type { ComponentProps, ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { color, semanticRoles } from "@/foundation"

/*
 * Components tier — `Badge`/`Avatar` (shadcn/vendored) have no notion of our
 * OWN semantic roles (accent/success/warning/roleManager/danger), even though every one
 * of those roles already ships the full base/foreground/hover/soft/
 * soft-foreground set in tokens.ts specifically for this. Two real consumer
 * sessions independently hand-rolled the same `style={{backgroundColor:
 * color.xSoft, color: color.xSoftForeground}}` inline instead — a real gap,
 * not a one-off. `tone` is typed off `semanticRoles` itself (not a second
 * hand-kept union), so a new role added to `color` in tokens.ts is usable
 * here with zero edit.
 *
 * Both use the pale `Soft`/`SoftForeground` pair — CORRECTED against the
 * real source page: komanda.html's own avatars (`.eava`, manager avatars)
 * paint `background: var(--brand-success-soft)` etc., i.e. the SOFT pair, not the
 * vivid one. The earlier "vivid pair on avatars" doctrine here came from a
 * consumer session's reinvention, not from the source — rebuilding
 * komanda.html verbatim (Pages/Komanda) exposed the mismatch. The vivid
 * base/`Foreground` pair belongs to the score gauge/ring (`RadialChart`
 * via its `color` prop), which stays untouched by this.
 */
export type SemanticTone = (typeof semanticRoles)[number]

/** SemanticTone + "muted" — the neutral case ("Мало смен", a count pill, a
 *  gray avatar of an unnamed person) is not a semantic role in tokens.ts
 *  (muted has no Soft siblings), but it IS the same visual slot. Rebuilding
 *  komanda.html needed this exact neutral pair inline FIVE times before it
 *  became part of the API. */
export type StatusTone = SemanticTone | "muted"

function softPair(tone: StatusTone) {
  return tone === "muted"
    ? { backgroundColor: color.muted, color: color.mutedForeground }
    : { backgroundColor: color[`${tone}Soft`], color: color[`${tone}SoftForeground`] }
}

export function StatusBadge({
  tone,
  children,
  style,
  ...props
}: { tone: StatusTone; children: ReactNode } & Omit<ComponentProps<typeof Badge>, "variant">) {
  return (
    <Badge
      variant="outline"
      style={{
        ...softPair(tone),
        borderColor: "transparent",
        ...style,
      }}
      {...props}
    >
      {children}
    </Badge>
  )
}

/*
 * `SemanticAvatarFallback` — это СЛОТ (Radix `Avatar.Fallback`): он валиден
 * ТОЛЬКО внутри `<Avatar>` и падает («AvatarFallback must be used within
 * Avatar») сам по себе. Бери его напрямую, лишь когда у тебя есть настоящее
 * фото и нужен цветной запасной вариант: `<Avatar><AvatarImage/>
 * <SemanticAvatarFallback/></Avatar>`. Для обычного «цветной кружок с
 * инициалами» — готовый `SemanticAvatar` ниже (сам оборачивает в `Avatar`).
 */
export function SemanticAvatarFallback({
  tone,
  children,
  style,
  ...props
}: { tone: StatusTone; children: ReactNode } & ComponentProps<typeof AvatarFallback>) {
  return (
    <AvatarFallback
      style={{
        ...softPair(tone),
        fontWeight: 600,
        ...style,
      }}
      {...props}
    >
      {children}
    </AvatarFallback>
  )
}

/*
 * `SemanticAvatar` — готовый standalone-аватар: цветной кружок с инициалами
 * (мягкая пара роли), уже обёрнутый в `Avatar`. Это то, что нужно в 90%
 * случаев — состав команды, автор реплики в ленте, «кто на смене». Не путать
 * с `SemanticAvatarFallback` (слот, падает вне `Avatar`). Если есть фото —
 * передай `src`/`alt`, инициалы станут fallback'ом.
 *
 * Пропсы `Avatar` пробрасываются (`className`/`style`/размер), поэтому
 * размерами и рамкой управляешь как у обычного shadcn-`Avatar`.
 */
export function SemanticAvatar({
  tone,
  children,
  src,
  alt,
  ...props
}: {
  tone: StatusTone
  children: ReactNode
  src?: string
  alt?: string
} & Omit<ComponentProps<typeof Avatar>, "children">) {
  return (
    <Avatar {...props}>
      {src != null && <AvatarImage src={src} alt={alt} />}
      <SemanticAvatarFallback tone={tone}>{children}</SemanticAvatarFallback>
    </Avatar>
  )
}
