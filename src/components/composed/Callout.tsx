import type { ComponentProps, ReactNode } from "react"
import { Surface, Stack, Flex, Text, color } from "@/foundation"
import { Icon } from "@/primitives/Icon"

/*
 * Callout — Components tier. Баннер-сигнал: иконка + заголовок + описание +
 * действие справа, на muted-поверхности. Это тот самый «продуктовый баннер
 * требует-внимания», который DESIGN.md раньше велел собирать рецептом
 * (`Surface muted` + `Button`) — консьюмеры делали его руками в каждом
 * дашборде (komanda «3 новых голоса», cafe-location «требует внимания»).
 *
 * НЕ `Alert` (то — статичная shadcn-заметка без слота действия, см.
 * COMPONENTS.md) и НЕ `AdviceCard` (маргинальный инсайт в рейле). Callout —
 * широкий строчный баннер в потоке контента с действием.
 *
 * `tone` красит только ИКОНКУ (accent=внимание / success=сила / ink=нейтраль)
 * — фон остаётся muted, не заливаем весь баннер цветом (проседание это
 * внимание, а не тревога — см. палитра-правило DESIGN.md).
 */
export type CalloutProps = {
  /** иконка слева (имя из каталога Icon), напр. "warning" */
  icon?: ComponentProps<typeof Icon>["name"]
  /** тон иконки; дефолт accent (баннер обычно про внимание) */
  tone?: "accent" | "success" | "ink"
  title: ReactNode
  /** описание под заголовком */
  children?: ReactNode
  /** действие справа — `SparkLink` / тихая кнопка */
  action?: ReactNode
}

const TONE_COLOR = {
  accent: color.accent,
  success: color.success,
  ink: color.foreground,
} as const

export function Callout({ icon, tone = "accent", title, children, action }: CalloutProps) {
  return (
    <Surface variant="muted" radius="xl" px="lg" py="md">
      <Flex justify="space-between" align="center" gap="base" wrap={false}>
        <Flex gap="sm" align={children != null ? "flex-start" : "center"} wrap={false} style={{ minWidth: 0 }}>
          {icon != null && (
            <span style={{ flexShrink: 0, display: "inline-flex", marginTop: children != null ? 2 : 0 }}>
              <Icon name={icon} size={20} color={TONE_COLOR[tone]} />
            </span>
          )}
          <Stack gap="none" style={{ minWidth: 0 }}>
            <Text as="div" size="body" weight="semibold">{title}</Text>
            {children != null && (
              <Text as="div" size="caption" color={color.mutedForeground}>{children}</Text>
            )}
          </Stack>
        </Flex>
        {action != null && <div style={{ flexShrink: 0 }}>{action}</div>}
      </Flex>
    </Surface>
  )
}
