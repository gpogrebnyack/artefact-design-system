#!/usr/bin/env node
/*
 * gen-colors — regenerates src/foundation/scales.css: the 12-step primitive
 * color scales (Radix Colors methodology) that the semantic tokens in
 * src/index.css :root alias into. Run `node scripts/gen-colors.mjs` whenever
 * a seed changes — never edit scales.css by hand.
 *
 * Model (see context/DESIGN.md → Colors):
 *   - Each hue is a 12-step scale built in OKLCH: hue constant (= the
 *     seed's), lightness walks a fixed curve, chroma ramps toward the seed.
 *     Step 9 IS the seed, verbatim — the scale grows around the brand color,
 *     the brand color is never resampled.
 *   - Steps have fixed roles (Radix grammar): 1-2 app/subtle bg · 3-5
 *     component bg (soft) · 6-8 borders · 9-10 solid + hover · 11 text on
 *     soft · 12 high-contrast text.
 *   - Every solid step also gets an alpha twin (aN): the same visual color
 *     expressed as minimal-alpha rgba over white, so tints compose correctly
 *     on ANY light surface (this is what retires the old "tint-on-tint is
 *     invisible on cream" layering rule).
 *   - `cream` (the warm neutral) is NOT resampled from one seed: its steps are
 *     anchored to the system's existing neutrals (background/muted/input/
 *     ink-3/ink-2/ink) so the shipped look doesn't shift; only the steps that
 *     never existed (4,5,7,8,10) are interpolated between anchors.
 *
 * Chart palette is NOT derived from these scales (data-viz is its own
 * domain — see DESIGN.md → Charts): the categorical 6 below were built
 * separately in OKLCH on one weight band and validated for CVD
 * distinguishability + normal-vision separation; treat them as opaque
 * constants, don't "fix" them by eye.
 */

// ---------- OKLCH <-> sRGB ----------
const clamp01 = (x) => Math.min(1, Math.max(0, x))
const srgbToLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)
const linToSrgb = (c) => (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055)

function rgbToOklab(r, g, b) {
  const [R, G, B] = [r, g, b].map(srgbToLin)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

function oklabToRgb(L, a, b) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ].map(linToSrgb)
}

const inGamut = (rgb) => rgb.every((c) => c >= -0.0005 && c <= 1.0005)

/** OKLCH → hex with chroma gamut-clipping (reduce C until displayable). */
function oklchToHex(L, C, H) {
  let c = C
  let rgb
  for (let i = 0; i < 240; i++) {
    const a = c * Math.cos((H * Math.PI) / 180)
    const b = c * Math.sin((H * Math.PI) / 180)
    rgb = oklabToRgb(L, a, b)
    if (inGamut(rgb)) break
    c -= C / 240
    if (c < 0) { c = 0; break }
  }
  return "#" + rgb.map(clamp01).map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join("")
}

const hexToRgb255 = (hex) => {
  const h = hex.replace("#", "")
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}

function hexToOklch(hex) {
  const [r, g, b] = hexToRgb255(hex).map((v) => v / 255)
  const [L, a, bb] = rgbToOklab(r, g, b)
  const C = Math.hypot(a, bb)
  let H = (Math.atan2(bb, a) * 180) / Math.PI
  if (H < 0) H += 360
  return { L, C, H }
}

/** Minimal-alpha rgba over WHITE that composites to exactly `hex`
 *  (the Radix alpha-scale derivation). */
function hexToAlphaOverWhite(hex) {
  const T = hexToRgb255(hex)
  const a = Math.max(...T.map((t) => (255 - t) / 255))
  if (a <= 0) return "rgba(255, 255, 255, 0)"
  const C = T.map((t) => Math.round(255 - (255 - t) / a))
  return `rgba(${C[0]}, ${C[1]}, ${C[2]}, ${+a.toFixed(3)})`
}

// ---------- scale construction ----------
/* Lightness curve for steps 1..8 and chroma as a fraction of the seed's —
 * the trajectory that reproduces Radix-like spacing (perceptually even
 * tints, borders that step visibly). Steps 9..12 derive from the seed. */
const L_CURVE = [0.995, 0.983, 0.964, 0.943, 0.918, 0.883, 0.828, 0.753]
const C_FRACTION = [0.04, 0.1, 0.2, 0.34, 0.47, 0.55, 0.64, 0.79]

function chromaticScale(seedHex) {
  const seed = hexToOklch(seedHex)
  const steps = []
  for (let i = 0; i < 8; i++) steps.push(oklchToHex(L_CURVE[i], seed.C * C_FRACTION[i], seed.H))
  steps.push(seedHex) // 9 — the seed, verbatim
  steps.push(oklchToHex(seed.L - 0.04, seed.C, seed.H)) // 10 — solid hover
  // 11 — text-grade on soft: bright seeds drop to L .54 (measured: .555 left
  // ochre at 4.31:1 on its own step 3, just under AA 4.5), already-dark seeds
  // just step down (their base is text-grade on the tint to begin with).
  const l11 = seed.L > 0.6 ? 0.54 : seed.L - 0.06
  steps.push(oklchToHex(l11, seed.C * 0.7, seed.H))
  steps.push(oklchToHex(0.33, seed.C * 0.34, seed.H)) // 12 — high-contrast text
  return steps
}

/** cream (the warm neutral — named after the repo's own --cream vocabulary;
 *  NOT "sand", which is already a token: the waveform's idle-bar #cbb79c):
 *  anchored to the existing neutrals, missing steps interpolated in Oklab
 *  (Lab, not LCH — near-gray hue angles are unstable). */
function creamScale() {
  const anchors = {
    1: "#fffdf8", // popover paper-warm
    2: "#f9f6f0", // page background
    3: "#f1ece1", // muted / cream-2
    6: "#e4e2da", // input hairline
    9: "#a3a094", // ink-3
    11: "#6c6a63", // ink-2 / muted-foreground
    12: "#2c2c2a", // ink / foreground
  }
  const lab = {}
  for (const [step, hex] of Object.entries(anchors)) {
    const [r, g, b] = hexToRgb255(hex).map((v) => v / 255)
    lab[step] = rgbToOklab(r, g, b)
  }
  const keys = Object.keys(anchors).map(Number).sort((a, b) => a - b)
  const steps = []
  for (let n = 1; n <= 12; n++) {
    if (anchors[n]) { steps.push(anchors[n]); continue }
    const lo = Math.max(...keys.filter((k) => k < n))
    const hi = Math.min(...keys.filter((k) => k > n))
    const t = (n - lo) / (hi - lo)
    const mixed = lab[lo].map((v, i) => v + (lab[hi][i] - v) * t)
    const rgb = oklabToRgb(...mixed)
    steps.push("#" + rgb.map(clamp01).map((x) => Math.round(x * 255).toString(16).padStart(2, "0")).join(""))
  }
  return steps
}

// ---------- the system's seeds (step 9 of each scale) ----------
const HUES = {
  orange: "#f75506", // brand accent
  jade: "#1f7a54", //   semantic green
  ochre: "#b8862f", //  semantic warn
  plum: "#7a4d7d", //   semantic plum (role tint)
  brick: "#b23a2e", //  semantic danger
}

/* Categorical chart palette — validated constants (see header). Order is
 * fixed: series 1 always takes chart-1, never re-sorted by rank. */
const CHART = ["#c66243", "#bea333", "#158353", "#2badc1", "#5055ab", "#c162a4"]

/* white/black overlay alpha ladders — VERBATIM @radix-ui/colors v3
 * (black-alpha.css / white-alpha.css), not computed: these are pure-white/
 * pure-black veils for overlays (scrims, washes, tint-over-image), the
 * Radix answer to "white and black don't belong in a hue scale".
 * Anchors that motivated adopting them: the old scrim rgba(0,0,0,.1) is
 * exactly black-a2; the old glass card rgba(255,255,255,.6) was white-a8. */
const OVERLAY_ALPHAS = [0.05, 0.1, 0.15, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95]

// ---------- emit ----------
import { writeFileSync } from "node:fs"
import { join } from "node:path"

const out = []
out.push("/* GENERATED by scripts/gen-colors.mjs — do not edit by hand; change a seed")
out.push(" * there and re-run. Primitive 12-step scales (Radix Colors grammar: 1-2 bg ·")
out.push(" * 3-5 component bg · 6-8 borders · 9 solid = the seed · 10 hover · 11 text")
out.push(" * on soft · 12 high-contrast text) + alpha twins + the chart palette. */")
out.push(":root {")

const emitScale = (name, steps, withAlpha = true) => {
  out.push(`    /* ${name} */`)
  steps.forEach((hex, i) => out.push(`    --${name}-${i + 1}: ${hex};`))
  if (withAlpha) steps.forEach((hex, i) => out.push(`    --${name}-a${i + 1}: ${hexToAlphaOverWhite(hex)};`))
}

emitScale("cream", creamScale())
for (const [name, seed] of Object.entries(HUES)) emitScale(name, chromaticScale(seed))

out.push("    /* white / black overlay alphas — verbatim Radix ladder */")
OVERLAY_ALPHAS.forEach((a, i) => out.push(`    --white-a${i + 1}: rgba(255, 255, 255, ${a});`))
OVERLAY_ALPHAS.forEach((a, i) => out.push(`    --black-a${i + 1}: rgba(0, 0, 0, ${a});`))

out.push("    /* charts — categorical, CVD-validated, fixed order (own domain, not scale-derived) */")
CHART.forEach((hex, i) => out.push(`    --chart-${i + 1}: ${hex};`))
out.push("}")
out.push("")

const target = join(new URL("..", import.meta.url).pathname, "src/foundation/scales.css")
writeFileSync(target, out.join("\n"))
console.log(`✓ wrote ${target} (${out.length} lines)`)
