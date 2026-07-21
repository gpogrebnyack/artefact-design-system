import type { ComponentProps } from "react"
import { Button } from "@/components/ui/button"
import { color } from "@/foundation"

/*
 * AccentButton — Components tier. Редкая оранжевая CTA (одна на экран,
 * DESIGN.md → «одна accent-кнопка»).
 *
 * Зачем отдельный компонент: наш `--primary` осознанно ТЁМНЫЙ (дефолтная
 * залитая кнопка — ink, не оранж), поэтому бренд-акцента среди вариантов
 * `Button` нет, а `button.tsx` вендорный — его не форкаем. Раньше акцентную
 * CTA приходилось каждый раз собирать инлайн-стилем (color.accent + ручной
 * ховер) — недискаверабельно, каждый консьюмер переизобретал (найдено на
 * consumer-тестах). Тут канон зашит один раз: заливка `color.accent`, ховер
 * `color.accentHover` (читается, не пересчитывается — не может разъехаться).
 *
 * Всё остальное — как у `Button` (size/asChild/onClick/иконки-дети).
 */
export function AccentButton({
  style, onMouseEnter, onMouseLeave, ...props
}: ComponentProps<typeof Button>) {
  return (
    <Button
      {...props}
      style={{ background: color.accent, color: color.accentForeground, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = color.accentHover
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = color.accent
        onMouseLeave?.(e)
      }}
    />
  )
}
