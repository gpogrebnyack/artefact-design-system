import { ICON_CATALOG, type PhosphorIconName } from "./icon-catalog.generated"

/*
 * Icon — a BASE PRIMITIVE. Icons are Phosphor, and the ENTIRE catalog
 * (1512 glyphs) is compiled into the package in exactly two weights
 * (regular + fill) — see icon-catalog.generated.ts / generate-icon-catalog.mjs.
 *
 * История решения (Mobbin-эксперимент, 2026-07-15): раньше здесь жил
 * governed-реестр из ~40 имён, задуманный как ПРИМЕРЫ, — но тип
 * `IconName = keyof REGISTRY` и текст COMPONENTS.md закрывали его
 * фактически: агенты читали «нет в реестре — иконки нет» и, например,
 * вращали caret-right трансформом вместо caret-left. Решение владельца:
 * забрать весь каталог, чтобы вопрос «есть ли иконка» исчез как класс.
 *
 * Два словаря имён:
 *  - PhosphorIconName — полный каталог, kebab-case («calendar»,
 *    «caret-left», …), источник истины — сам Phosphor;
 *  - SEMANTIC_ALIASES — НАШИ смысловые роли («dashboard» → squares-four,
 *    «spark» → sparkle): для повторяющихся ролей бери алиас, чтобы «какая
 *    иконка что значит» решалось в одном месте. Алиасы — про смысл,
 *    не про полноту.
 */

/** семантические роли системы → глифы Phosphor. Роль повторяется по
 *  продукту → добавь алиас сюда; разовый глиф — бери прямым именем. */
const SEMANTIC_ALIASES = {
  // app navigation
  home: "house",
  team: "users-three",
  orders: "shopping-cart-simple",
  knowledge: "book-open",
  settings: "gear",
  dashboard: "squares-four",
  // common actions / affordances
  search: "magnifying-glass",
  add: "plus",
  remove: "minus",
  close: "x",
  more: "dots-three",
  send: "paper-plane-right",
  // status / semantics
  spark: "sparkle",
  voice: "microphone",
  target: "crosshair",
  // media / playback
  download: "download-simple",
  volume: "speaker-high",
  transcript: "text-align-left",
} as const satisfies Record<string, PhosphorIconName>

export type IconName = PhosphorIconName | keyof typeof SEMANTIC_ALIASES

/** имена семантических алиасов — их показывает Storybook-галерея */
export const ICON_NAMES = Object.keys(SEMANTIC_ALIASES) as IconName[]

/** полный каталог Phosphor (kebab-case), для поиска/галерей */
export const PHOSPHOR_ICON_NAMES = Object.keys(ICON_CATALOG) as PhosphorIconName[]

/*
 * The system uses EXACTLY TWO of Phosphor's six weights — enforced at the
 * type level AND in the data (only these two are compiled in):
 *  - "regular" (default) — all outline UI iconography;
 *  - "fill"    — glyphs acting as a SIGN, not an outline icon: media
 *    play/pause (outline vanishes at 10–26px), identity markers on tinted
 *    chips (priority flag), the ✦ spark of SparkLink.
 * thin/light break down at working sizes on the warm background; bold is
 * emphasis-by-stroke (we emphasize by size/color instead); duotone bakes
 * two tones into the glyph where the system does it with the soft-chip +
 * glyph pair. Needing a third weight = re-generate the catalog deliberately
 * AND update the DESIGN.md rule, not a local cast.
 */
export type IconAllowedWeight = "regular" | "fill"

export type IconProps = {
  name: IconName
  /** px; matches the surrounding text/control size */
  size?: number
  weight?: IconAllowedWeight
  color?: string
  className?: string
  /** decorative by default; pass a label to expose it to AT */
  label?: string
}

const resolve = (name: IconName): PhosphorIconName =>
  name in SEMANTIC_ALIASES ? SEMANTIC_ALIASES[name as keyof typeof SEMANTIC_ALIASES] : (name as PhosphorIconName)

export function Icon({
  name,
  size = 20,
  weight = "regular",
  color = "currentColor",
  className,
  label,
}: IconProps) {
  const [regular, fill] = ICON_CATALOG[resolve(name)]
  return (
    <svg
      viewBox="0 0 256 256"
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    >
      <path d={weight === "fill" ? fill : regular} />
    </svg>
  )
}
