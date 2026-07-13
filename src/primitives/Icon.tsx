import {
  House,
  UsersThree,
  ShoppingCartSimple,
  BookOpen,
  Gear,
  MagnifyingGlass,
  Plus,
  Minus,
  CaretDown,
  CaretRight,
  CaretUp,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Star,
  Warning,
  Check,
  X,
  Bell,
  DotsThree,
  TrendUp,
  TrendDown,
  Sparkle,
  Lock,
  LockOpen,
  Microphone,
  Info,
  Lightbulb,
  ChartLineUp,
  SquaresFour,
  PaperPlaneRight,
  Play,
  Pause,
  DownloadSimple,
  SpeakerHigh,
  TextAlignLeft,
  Flag,
  Crosshair,
  type Icon as PhosphorIcon,
  type IconWeight,
} from "@phosphor-icons/react"

/*
 * Icon — a BASE PRIMITIVE. Icons are Phosphor (@phosphor-icons/react): bundled
 * with the app (tree-shakeable, no CDN / no runtime fetch → survives our
 * self-contained-HTML constraint), and Phosphor is the DECLARED icon set for
 * the system. Higher components never import a glyph directly — they consume
 * <Icon name="…" />, so the icon vocabulary is one governed registry, swappable
 * in one place, and the "which icon means what" mapping lives here, not scattered.
 */

const REGISTRY = {
  // app navigation
  home: House,
  team: UsersThree,
  orders: ShoppingCartSimple,
  knowledge: BookOpen,
  settings: Gear,
  // common actions / affordances
  search: MagnifyingGlass,
  add: Plus,
  remove: Minus,
  close: X,
  check: Check,
  more: DotsThree,
  bell: Bell,
  // carets / arrows
  "caret-down": CaretDown,
  "caret-right": CaretRight,
  "caret-up": CaretUp,
  "arrow-up": ArrowUp,
  "arrow-down": ArrowDown,
  "arrow-right": ArrowRight,
  // status / semantics
  star: Star,
  warning: Warning,
  "trend-up": TrendUp,
  "trend-down": TrendDown,
  spark: Sparkle,
  lock: Lock,
  "lock-open": LockOpen,
  voice: Microphone,
  info: Info,
  lightbulb: Lightbulb,
  "chart-line-up": ChartLineUp,
  dashboard: SquaresFour,
  send: PaperPlaneRight,
  // media / playback (dialog-review pages: player, TimeTag, transcript)
  play: Play,
  pause: Pause,
  download: DownloadSimple,
  volume: SpeakerHigh,
  transcript: TextAlignLeft,
  // priority / assignment
  flag: Flag,
  target: Crosshair,
} as const

export type IconName = keyof typeof REGISTRY

export const ICON_NAMES = Object.keys(REGISTRY) as IconName[]

export type IconProps = {
  name: IconName
  /** px; matches the surrounding text/control size */
  size?: number
  weight?: IconWeight
  color?: string
  className?: string
  /** decorative by default; pass a label to expose it to AT */
  label?: string
}

export function Icon({
  name,
  size = 20,
  weight = "regular",
  color = "currentColor",
  className,
  label,
}: IconProps) {
  const Glyph: PhosphorIcon = REGISTRY[name]
  return (
    <Glyph
      size={size}
      weight={weight}
      color={color}
      className={className}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? "img" : undefined}
    />
  )
}
