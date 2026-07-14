/*
 * FOUNDATION TOKENS — the bottom of the hierarchy (Foundation → Primitives →
 * Components → Sections). Values are NOT duplicated here: colors/radii live
 * in ONE place (src/index.css :root, the shadcn CSS-variable contract mapped
 * to our brand). This module exposes them as named references so every layer
 * above imports `color.accent`, not the string "var(--accent)" or, worse, a
 * hardcoded hex — that duplication is exactly the bug that slipped into an
 * earlier SidebarNav pass and got caught.
 *
 * Spacing and type ARE real scales (not just CSS var passthroughs) because
 * komanda.html/dashboard.html don't define one centrally — this synthesizes
 * one from the values actually observed across the source pages, so every
 * primitive built on top picks from a shared scale instead of inventing
 * one-off pixel values per component.
 */

/** Color — ONE place, every color, named by role. References to the CSS
 *  custom properties defined in index.css; values live there ONCE, this is
 *  just a typed name for each. (Previously split into `color` (shadcn's
 *  contract slots) and a separate `brand` object (orange/green/warn/plum) —
 *  merged because that split actively hid a bug: shadcn's own `--accent`
 *  slot is its internal hover fill (cream-2, == `muted`), which collided in
 *  name with our real brand orange in the other object. One namespace, no
 *  same-named-different-color trap.) */
export const color = {
  // --- page / surface ---
  background: "var(--background)", // cream
  foreground: "var(--foreground)", // ink
  card: "var(--card)", // 60% glass island
  cardForeground: "var(--card-foreground)",
  popover: "var(--popover)", // paper-warm — stays opaque for readability
  popoverForeground: "var(--popover-foreground)",
  ink3: "var(--brand-ink-3)", // #a3a094 — tertiary ink, one step past mutedForeground. A neutral text tone (no-data states), not a status color — lives here, not with the semantic roles below.

  // --- controls ---
  primary: "var(--primary)", // ink — default filled CTA (dark, not orange)
  primaryForeground: "var(--primary-foreground)",
  secondary: "var(--secondary)", // paper (white) — quiet button, chips
  secondaryForeground: "var(--secondary-foreground)",
  muted: "var(--muted)", // cream-2 — hover fill, tag pills (== shadcn's own --accent slot)
  mutedForeground: "var(--muted-foreground)", // ink-2
  border: "var(--border)", // transparent BY RULE (see DESIGN.md) — do not use for a visible line, use `input`
  input: "var(--input)", // line-2 — the one hairline that's meant to be seen (inputs, dividers)
  ring: "var(--ring)", // == accent — focus ring is brand orange
  destructive: "var(--destructive)", // shadcn's own contract slot — wired to `danger` below (a real red, not accent)

  // --- brand + semantic (komanda's own palette, no shadcn-contract slot) ---
  // Each role: base / foreground / hover / soft / softForeground. foreground
  // is picked by measured WCAG contrast (see index.css), not assumed white;
  // hover is color-mix() off base (recomputes automatically, never drifts);
  // soft is the pale badge fill, softForeground is base-on-soft (the pattern
  // Avatar's ToneGreen/ToneWarn already use).
  accent: "var(--brand-accent)", // #f75506 — THE brand color. One per screen, rare.
  accentForeground: "var(--brand-accent-foreground)",
  accentHover: "var(--brand-accent-hover)",
  accentSoft: "var(--brand-accent-soft)", // #fdeee5
  accentSoftForeground: "var(--brand-accent-soft-foreground)",
  accentSoftStrong: "var(--brand-accent-soft-strong)", // #a83c08 — DATA-grade fg on accentSoft (heatmap fractions); the plain SoftForeground fails contrast at data sizes
  accentGradient: "var(--brand-accent-gradient)", // komanda's ONE gradient — .primary.askbtn on the assistant dock

  green: "var(--brand-green)", // #1f7a54 — score-band "good" (komanda's own band(): score ≥7)
  greenForeground: "var(--brand-green-foreground)",
  greenHover: "var(--brand-green-hover)",
  greenSoft: "var(--brand-green-soft)",
  greenSoftForeground: "var(--brand-green-soft-foreground)",
  greenSoftStrong: "var(--brand-green-soft-strong)", // #0f5e3f — see accentSoftStrong

  warn: "var(--brand-warn)", // #b8862f — score-band "caution" (band(): 5 ≤ score < 7)
  warnForeground: "var(--brand-warn-foreground)",
  warnHover: "var(--brand-warn-hover)",
  warnSoft: "var(--brand-warn-soft)",
  warnSoftForeground: "var(--brand-warn-soft-foreground)",
  warnSoftStrong: "var(--brand-warn-soft-strong)", // #856700 — see accentSoftStrong

  plum: "var(--brand-plum)", // #7a4d7d — role tint: network manager (not a score band)
  plumForeground: "var(--brand-plum-foreground)",
  plumHover: "var(--brand-plum-hover)",
  plumSoft: "var(--brand-plum-soft)",
  plumSoftForeground: "var(--brand-plum-soft-foreground)",

  danger: "var(--brand-danger)", // #b23a2e — real destructive red. NOT accent — neither source page has a red, this is a deliberate addition (see index.css)
  dangerForeground: "var(--brand-danger-foreground)",
  dangerHover: "var(--brand-danger-hover)",
  dangerSoft: "var(--brand-danger-soft)",
  dangerSoftForeground: "var(--brand-danger-soft-foreground)",

  // --- charts ---
  chart1: "var(--chart-1)",
  chart2: "var(--chart-2)",
  chart3: "var(--chart-3)",
  chart4: "var(--chart-4)",
  chart5: "var(--chart-5)",
  chart6: "var(--chart-6)", // #0089ff — dashboard's own --c-blue; a hue that exists nowhere else in the system
  chart7: "var(--chart-7)", // #99d6ff — --c-sky
  chart8: "var(--chart-8)", // #c952de — --c-purple
  chartSurface: "var(--brand-chart-surface)", // #fbfaf7 — quiet backdrop for data-viz surfaces (dashboard-prototype.html only)
  scrim: "var(--brand-scrim)", // rgba(0,0,0,.1) — dark low-opacity backdrop behind a heavily blurred overlay (assistant dock)
  sand: "var(--brand-sand)", // #cbb79c — audio waveform idle bars (dialog-v2.html); playback progress recolors them to accent
  wash: "var(--brand-wash)", // rgba(0,0,0,.03) — LayeredCard's tinted wrapper (dialog-v2's .rec/.up4-card background)
} as const

type ColorKey = keyof typeof color

/** Keys of `color` that have all 4 role siblings (`XForeground`/`XHover`/
 *  `XSoft`/`XSoftForeground`) — computed at the TYPE level too, not just at
 *  runtime, so `color[`${role}Foreground`]` type-checks under `strict`
 *  without a cast. */
type SemanticRoleKey = {
  [K in ColorKey]: `${K}Foreground` extends ColorKey
    ? `${K}Hover` extends ColorKey
      ? `${K}Soft` extends ColorKey
        ? `${K}SoftForeground` extends ColorKey ? K : never
        : never
      : never
    : never
}[ColorKey]

/** Every "full role" name in `color` — derived from the naming convention
 *  itself (a role is any key with matching `Foreground`/`Hover`/`Soft`/
 *  `SoftForeground` siblings), not a second hand-maintained list. Add a new
 *  role above (all 5 suffixed keys) and it appears here — and in
 *  Foundation/Colors' story, which reads THIS — with zero other edits.
 *  This is the fix for the class of bug `scrim` shipped with (built, wired
 *  into a real component, invisible in Storybook because the demo story
 *  hand-listed variants instead of reading the source object). */
export const semanticRoles = (Object.keys(color) as ColorKey[]).filter((key): key is SemanticRoleKey => {
  if (
    key.endsWith("Foreground") || key.endsWith("Hover") ||
    key.endsWith("Soft") || key.endsWith("SoftForeground")
  ) return false
  return (
    `${key}Foreground` in color && `${key}Hover` in color &&
    `${key}Soft` in color && `${key}SoftForeground` in color
  )
})

/** The `chartN` keys in `color`, in order — same reasoning as
 *  `semanticRoles`: derived from the naming pattern, so a 6th chart color
 *  added to `color` above shows up in Foundation/Colors' Charts story with
 *  no edit there. */
export const chartKeys = (Object.keys(color) as (keyof typeof color)[])
  .filter((key) => /^chart\d+$/.test(key))
  .sort((a, b) => Number(a.slice(5)) - Number(b.slice(5)))

/** Radius scale — named steps over the single --radius token (index.css). */
export const radius = {
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  pill: 999,
} as const

/** Spacing scale (px) — synthesized from values actually used across
 *  komanda.html/dashboard.html (6/8/12/16/18/20/24/28...), rounded into a
 *  shared step scale so primitives/components pick from one set. */
export const spacing = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  "4xl": 56,
} as const

export type SpacingKey = keyof typeof spacing

/** Type scale (px + line-height) — the three named tokens komanda.html
 *  declares itself (--text-footnote/caption/body) extended upward with the
 *  heading sizes actually found in its markup (18/20/24), plus one larger
 *  step (`display`) for hero-scale contexts not yet exercised by either
 *  source page. */
export const type = {
  footnote: { size: 12, lineHeight: 1.45 }, // var(--text-footnote)
  caption: { size: 14, lineHeight: 1.45 }, // var(--text-caption)
  body: { size: 16, lineHeight: 1.55 }, // var(--text-body)
  subhead: { size: 18, lineHeight: 1.35 },
  title: { size: 20, lineHeight: 1.3 },
  headline: { size: 24, lineHeight: 1.25 },
  display: { size: 32, lineHeight: 1.15 },
} as const

export type TypeKey = keyof typeof type

/** Font family — self-hosted Struve, see brand-overrides.css for @font-face. */
export const font = {
  sans: "var(--font-sans)",
} as const

/** Motion — extracted from komanda.html, where these exact values recur
 *  across independent animations rather than being one-offs. `spring` is
 *  the brand signature (the assistant dock's morph, the modal pop): a
 *  slight overshoot, not a generic ease. Was previously baked inline
 *  wherever needed — the recurring curve is what makes it a token. */
export const motion = {
  /** hover/press feedback (transform, background) */
  fast: "150ms",
  /** small reveals (opacity, chevron rotation) */
  base: "200ms",
  /** panel/dock morphs — pair with `spring` */
  slow: "340ms",
  /** signature overshoot curve — komanda's cubic-bezier(.34,1.3,.5,1) */
  spring: "cubic-bezier(0.34, 1.3, 0.5, 1)",
  /** plain fallback where overshoot would look wrong (color fades) */
  ease: "ease",
} as const

/** Breakpoints (px) — the two real layout switches in the system. NOT a
 *  full responsive scale on purpose: only breakpoints actually exercised
 *  by shipped CSS belong here. CSS files can't import TS — row.css and
 *  SidebarNav.css hard-code these same numbers; if you change one here,
 *  grep the src CSS files for the old value and update in lockstep. */
export const breakpoint = {
  /** TitledRow collapses title-rail to stacked column below this (row.css) */
  rail: 1120,
  /** SidebarNav collapses to mobile below this (SidebarNav.css) */
  sidebar: 760,
} as const
