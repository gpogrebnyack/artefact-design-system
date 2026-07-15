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
 *  - "fill"    — sign-glyphs (play/pause, ✦, markers on tinted chips) at any
 *    size, and ANY object pictogram below 16px — outline washes out at
 *    small sizes (правило переписано с семантического на РАЗМЕРНОЕ после
 *    двух одинаковых промахов сборки, Mobbin-эксперимент 2026-07-15);
 *  - "regular" — object pictograms ≥16px and SERVICE strokes (carets,
 *    arrows, check/x, dots …) at any size: simple-stroke glyphs don't wash
 *    out, and their fill variants change meaning (solid triangles etc.).
 * The default is SELF-APPLYING: omit `weight` and Icon picks by this rule —
 * see effectiveWeight below. Explicit `weight` always wins.
 * thin/light break down at working sizes on the warm background; bold is
 * emphasis-by-stroke (we emphasize by size/color instead); duotone bakes
 * two tones into the glyph where the system does it with the soft-chip +
 * glyph pair. Needing a third weight = re-generate the catalog deliberately
 * AND update the DESIGN.md rule, not a local cast.
 */
export type IconAllowedWeight = "regular" | "fill"

/** служебная графика из простых штрихов — regular на любом размере */
const SERVICE_PREFIX = /^(caret-|arrow-|arrows-|trend-)/
const SERVICE_EXACT = new Set<PhosphorIconName>([
  "check", "checks", "x", "plus", "minus", "equals",
  "dots-three", "dots-three-vertical", "dots-nine", "list",
])
const isServiceGlyph = (n: PhosphorIconName) => SERVICE_PREFIX.test(n) || SERVICE_EXACT.has(n)

export type IconProps = {
  name: IconName
  /** px; matches the surrounding text/control size */
  size?: number
  /** дефолт — по размерному правилу (см. блок весов выше): пиктограмма
   *  <16px → fill, иначе regular; служебные штрихи — всегда regular.
   *  Явное значение всегда побеждает автоматику. */
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
  weight,
  color = "currentColor",
  className,
  label,
}: IconProps) {
  const glyph = resolve(name)
  const [regular, fill] = ICON_CATALOG[glyph]
  const effectiveWeight =
    weight ?? (size < 16 && !isServiceGlyph(glyph) ? "fill" : "regular")
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
      <path d={effectiveWeight === "fill" ? fill : regular} />
    </svg>
  )
}
