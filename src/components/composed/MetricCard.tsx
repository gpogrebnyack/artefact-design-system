import type { ReactNode } from "react"
import { Flex, Stack, Surface, color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import { Text } from "@/foundation"
import { Sparkline } from "./charts/Sparkline"
import type { SemanticTone } from "./SemanticTone"

/*
 * MetricCard — карточка «метрика с мини-графиком»: подпись → крупное число
 * с дельтой слева, спарклайн справа. Форма — Steep (эталон карточки KPI в
 * Mobbin-эксперименте: number+delta слева, sparkline на всю правую часть,
 * точка на конце). Собиралась руками трижды за один день эксперимента
 * (B1v2, C2, C3) — формализована по правилу трёх дублей.
 *
 * Отличие от MetricRow: Row — компактная стопка для списков внутри
 * карточек; Card — самостоятельный остров с трендом-графиком для
 * KPI-полос. Дельта следует правилу DESIGN.md: просевшая бизнес-метрика —
 * `accent` (внимание), не `danger`; стрелки прямые ↑/↓ (язык метрик),
 * диагональные trend-глифы — язык оценки (ScorePill).
 */
export type MetricCardProps = {
  label: ReactNode
  /** крупное число, уже отформатированное ("314 ₽") */
  value: ReactNode
  /** строка сравнения ("−32% к среднему") */
  delta?: ReactNode
  /** красит дельту и стрелку; обычно green (рост) / accent (просадка) */
  tone?: SemanticTone
  trend?: "up" | "down"
  /** точки мини-графика; без них карточка — просто число с дельтой */
  spark?: number[]
  /** цвет спарклайна; по умолчанию следует tone (green → color.success, иначе color.accent) */
  sparkColor?: string
}

export function MetricCard({ label, value, delta, tone, trend, spark, sparkColor }: MetricCardProps) {
  const deltaColor = tone ? color[tone] : color.mutedForeground
  // Спарклайн, окрашенный по СОСТОЯНИЮ метрики — семантика, не категория:
  // semantic-токены, не chart-палитра (DESIGN.md → Charts). До разделения
  // доменов chart-1/2 буквально равнялись accent/green — пиксели не менялись.
  const lineColor = sparkColor ?? (tone === "success" ? color.success : color.accent)
  return (
    <Surface variant="panel" p="base" radius="xl">
      <Stack gap="sm">
        <Text as="span" size="footnote" color={color.mutedForeground}>
          {label}
        </Text>
        <Flex gap="base" align="center" justify="space-between" wrap={false}>
          <Stack gap="none">
            <Text as="span" size="headline" weight="semibold">
              {value}
            </Text>
            {delta != null && (
              <Text as="span" size="footnote" weight="semibold" color={deltaColor}
                style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                {trend && <Icon name={trend === "up" ? "arrow-up" : "arrow-down"} size={12} />}
                {delta}
              </Text>
            )}
          </Stack>
          {spark && <Sparkline data={spark} color={lineColor} width={120} height={36} showEndDot />}
        </Flex>
      </Stack>
    </Surface>
  )
}
