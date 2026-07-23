import type { ReactNode } from "react"
import { Surface, Stack, Flex, Text, color } from "@/foundation"
import { Separator } from "@/components/ui/separator"
import { SemanticAvatar, type SemanticTone, type StatusTone } from "@/components/composed/SemanticTone"

/*
 * EntityCard — Components tier. Карточка сущности (человек/точка/сделка):
 * аватар + имя + подпись + оценка-с-цветом + теги + метрики + футер-действие.
 *
 * Это был самый частый ручной кусок ростер/дашборд-экранов (~60 строк,
 * пересобирался в каждом consumer-тесте) — жил гайдлайном в COMPONENTS.md,
 * теперь компонент. Анатомия — вербатим из `Pages/Komanda`'s EmployeeCard,
 * где она хорошо сложилась.
 *
 * Правила зашиты: оценка в карточке — ЦВЕТНОЙ ТЕКСТ (не `ScorePill` — пилюля
 * это язык списков, DESIGN.md → «Два языка оценки»); аватар — мягкая пара
 * (`SemanticAvatarFallback`); разделитель только МЕЖДУ непустыми блоками
 * (нет метрик → нет его разделителя).
 */
export type EntityCardProps = {
  initials: string
  /** мягкая пара аватара; нейтраль по умолчанию */
  avatarTone?: StatusTone
  name: ReactNode
  /** роль/стаж под именем ("Бариста · 2 года") */
  subtitle?: ReactNode
  /** мини-оценка — цветной текст (title/semibold), НЕ пилюля */
  score?: ReactNode
  /** vivid-тон оценки (`color[tone]`); без него — обычный ink */
  scoreTone?: SemanticTone
  /** ряд тегов — `StatusBadge`'ы (передаёшь готовыми) */
  tags?: ReactNode
  /** метрики — один-два `MetricRow` (обёртка в ряд — тут) */
  metrics?: ReactNode
  /** футер: действие («Профиль →») или статус (`StatusDot`) */
  footer?: ReactNode
  /** кликабельна вся карточка (ховер-подъём) */
  interactive?: boolean
  onClick?: () => void
}

export function EntityCard({
  initials, avatarTone = "muted", name, subtitle, score, scoreTone,
  tags, metrics, footer, interactive, onClick,
}: EntityCardProps) {
  return (
    <Surface variant="panel" p="base" radius="xl" interactive={interactive} onClick={onClick}>
      <Stack gap="md">
        <Flex justify="space-between" align="flex-start" gap="base" wrap={false}>
          <Flex align="center" gap="sm" wrap={false} style={{ minWidth: 0 }}>
            <SemanticAvatar tone={avatarTone}>{initials}</SemanticAvatar>
            <Stack gap="none" style={{ minWidth: 0 }}>
              <Text as="span" size="body" weight="semibold" truncate>{name}</Text>
              {subtitle != null && (
                <Text as="span" size="footnote" color={color.mutedForeground} truncate>{subtitle}</Text>
              )}
            </Stack>
          </Flex>
          {score != null && (
            <Text as="span" size="title" weight="semibold" color={scoreTone ? color[scoreTone] : undefined} style={{ flexShrink: 0 }}>
              {score}
            </Text>
          )}
        </Flex>

        {tags != null && <Flex gap="xs" wrap>{tags}</Flex>}

        {metrics != null && (
          <>
            <Separator />
            <Flex gap="2xl" wrap>{metrics}</Flex>
          </>
        )}

        {footer != null && (
          <>
            <Separator />
            {footer}
          </>
        )}
      </Stack>
    </Surface>
  )
}
