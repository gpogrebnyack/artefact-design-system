import type { ReactNode, CSSProperties } from "react"
import { Icon } from "@/primitives/Icon"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
} from "@/components/ui/dropdown-menu"

/*
 * SplitButton — Components tier (Button ×2 + Separator + DropdownMenu).
 * «Главное действие + меню его вариантов» в НАШЕМ pill-языке.
 *
 * Зачем отдельный компонент, а не голый ButtonGroup: `ButtonGroup` фьюзит
 * сегменты в 14px-ПРЯМОУГОЛЬНИК (его pill-оверрайд намеренно выключен, см.
 * brand-overrides.css и COMPONENTS.md → ButtonGroup) — это язык toggle/фильтров,
 * а не наших pill-кнопок. Собранный из ButtonGroup+DropdownMenu split читался
 * инородно (14px-rect рядом с pill-кнопками, найдено на странице meeting-recap).
 * Здесь форма — цельная pill: внешние углы скруглены, внутренние срезаны.
 *
 * Приём с радиусом: сегменты — обычные `[data-slot=button]`, т.е. под
 * brand-pill правило (`border-radius: 9999px` на все углы). Инлайновый `style`
 * с точечными радиусами перебивает его без правок в brand-overrides (инлайн
 * всегда бьёт внешний CSS — правило из AGENTS.md → CSS-специфичность), и
 * фокус-кольца не режутся (обёртка без `overflow:hidden`).
 *
 * Заливка по умолчанию — `secondary`: два сегмента одного тёплого фона
 * читаются как ОДИН контрол, шов их только делит. `outline` тут даёт тот
 * самый разваливающийся вид — оставлен для гибкости, но не дефолт.
 */

// Левый сегмент: pill слева, срезан справа. paddingRight подтянут (12 vs
// brand-дефолт 16) — иначе текст стоит далеко от шва, зазор читается «пусто».
const RADIUS_LEFT: CSSProperties = { borderRadius: "9999px 0 0 9999px", paddingRight: 12 }
// Триггеру задаём высоту явно: `DropdownMenuTrigger asChild` через Slot
// перезаписывает data-slot кнопки на "dropdown-menu-trigger", поэтому
// brand-правило `[data-slot=button]{min-height:40px}` до него НЕ долетает —
// без этого шеврон 32px против 40px у главного сегмента (40 = высота
// контрола системы, тот же inline-приём, что в Toolbar).
const RADIUS_RIGHT: CSSProperties = { borderRadius: "0 9999px 9999px 0", height: 40 }
// Шов — короткий инсетный по центру, НЕ во всю высоту: полоса в 40px
// читается как жёсткий бордер между двумя кнопками (а не как шов одного
// контрола). 20px по центру — тихий разделитель, как у сплит-кнопок.
const SEAM: CSSProperties = { alignSelf: "center", height: 20 }

export type SplitButtonProps = {
  /** подпись главного действия */
  children: ReactNode
  /** необязательная ведущая иконка главного действия */
  icon?: ReactNode
  /** клик по главному действию */
  onClick?: () => void
  /** содержимое меню — `DropdownMenuItem`/`DropdownMenuRadioGroup` и т.п. */
  menu: ReactNode
  /** доступное имя для триггера меню, напр. «Выбрать формат» */
  menuLabel: string
  /** заливка обоих сегментов; дефолт `secondary` (см. заголовок) */
  variant?: "default" | "secondary" | "outline" | "ghost"
  /** сторона раскрытия меню; дефолт `end` */
  align?: "start" | "end"
  disabled?: boolean
}

export function SplitButton({
  children, icon, onClick, menu, menuLabel,
  variant = "secondary", align = "end", disabled,
}: SplitButtonProps) {
  return (
    <div
      data-slot="split-button"
      role="group"
      style={{ display: "inline-flex", alignItems: "stretch", width: "max-content", flexShrink: 0 }}
    >
      <Button variant={variant} onClick={onClick} disabled={disabled} style={RADIUS_LEFT}>
        {icon}
        {children}
      </Button>
      <Separator orientation="vertical" style={SEAM} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={variant} size="icon" aria-label={menuLabel} disabled={disabled} style={RADIUS_RIGHT}>
            <Icon name="caret-down" size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align}>{menu}</DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
