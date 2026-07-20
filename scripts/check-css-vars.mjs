#!/usr/bin/env node
/*
 * check-css-vars — catches DEAD CSS custom-property references: a
 * `var(--x)` (with no fallback) whose `--x` is never declared anywhere in
 * the CSS graph. This is a silent-failure class the other guards miss:
 *   - CSS variables don't error on an undefined reference — the property
 *     just falls back to `initial` (for `background`, transparent). No build
 *     error, no runtime throw.
 *   - tsc doesn't see CSS; the Tailwind build doesn't validate var() targets;
 *     `lint:design` only checks DESIGN.md's own frontmatter; `check-context-
 *     sync` compares tokens.ts↔DESIGN.md NAMES, never the hand-authored CSS
 *     in sections/components.
 * Exactly how `--brand-green-bg`/`--brand-accent-bg` (renamed to `-soft`
 * long ago, never updated in SidebarNav.css) rendered transparent avatars
 * and badges through several passes, invisible to every check.
 *
 * Two rules learned from prototyping against the real tree:
 *   1. STRIP comments first — Toolbar.css quotes the source page's own CSS
 *      inside /* … *\/, which would otherwise flag --cream / --ink.
 *   2. A `var(--x, fallback)` WITH a fallback is safe — that's the
 *      runtime-injected pattern (row.tsx sets --foundation-row-* inline and
 *      reads them with a default). Only fallback-less var(--x) must resolve.
 *
 * DEFINITIONS are gathered from .css only (that's where custom properties are
 * declared: --brand-*, --cream-*, shadcn contract slots, @theme vars).
 * USAGES are scanned from .css AND .ts/.tsx — because the alias layer
 * (tokens.ts) references every --brand-* as a `"var(--…)"` STRING, and inline
 * styles use var() too. Scanning CSS only would miss exactly that: a
 * `--brand-warning` typo'd in index.css but referenced from tokens.ts renders
 * empty, invisible to a CSS-only pass (this gap shipped once — a double-sed
 * left --brand-warninging in index.css while tokens.ts still read
 * --brand-warning; every check passed, the swatch was blank).
 * Genuinely external, runtime-injected vars (Tailwind --tw-*, Radix
 * --radix-*) are allow-listed by prefix.
 */
import { readFileSync, readdirSync } from "node:fs"
import { join, relative } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname
const SRC = join(ROOT, "src")

// runtime-injected, not statically declared in CSS:
//   tw-*    — Tailwind utilities
//   radix-* — Radix primitives
//   color-* — shadcn <ChartStyle> emits --color-<configKey> from the chart
//             config at render time (also Tailwind's @theme --color-* tokens)
const EXTERNAL = /^(tw|radix|color)-/

function filesByExt(dir, exts) {
  const out = []
  for (const e of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (e.isFile() && exts.some((x) => e.name.endsWith(x))) out.push(join(e.parentPath ?? e.path ?? dir, e.name))
  }
  return out
}

// strip /* block */ and // line comments so commented-out var() don't false-positive
const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1")

const cssFiles = filesByExt(SRC, [".css"])
const usageFiles = filesByExt(SRC, [".css", ".ts", ".tsx"])

const defined = new Set()
// CSS property declarations: `--x: …`
for (const f of cssFiles) {
  const css = stripComments(readFileSync(f, "utf8"))
  for (const m of css.matchAll(/--([\w-]+)\s*:/g)) defined.add(m[1])
}
// inline-style declarations in .ts/.tsx: `"--x":` / `'--x':` (a component that
// sets a var on the same element it reads it from — e.g. ToggleGroup's --gap)
for (const f of usageFiles) {
  if (f.endsWith(".css")) continue
  const src = stripComments(readFileSync(f, "utf8"))
  for (const m of src.matchAll(/["']--([\w-]+)["']\s*:/g)) defined.add(m[1])
}

const orphans = []
for (const f of usageFiles) {
  const src = stripComments(readFileSync(f, "utf8"))
  // var(--name)  or  var(--name , fallback) — capture the name and the char
  // that ends the name (`)` = no fallback, `,` = has fallback → safe).
  // A dynamic `var(--${x}-1)` never matches (\w+ can't start with $).
  for (const m of src.matchAll(/var\(\s*--([\w-]+)\s*([),])/g)) {
    const [, name, next] = m
    if (next === ",") continue // has a fallback
    if (defined.has(name) || EXTERNAL.test(name)) continue
    orphans.push({ name, file: relative(ROOT, f) })
  }
}

if (orphans.length) {
  console.log(`✗ мёртвые CSS-переменные (var(--x) без объявления и без фолбэка):`)
  for (const o of orphans) console.log(`  --${o.name}  ← ${o.file}`)
  console.log(`\nОбъяви переменную (index.css/scales.css), исправь опечатку, или дай var() фолбэк.`)
  process.exit(1)
}
console.log("✓ все var(--…) в src ссылаются на объявленные переменные (или имеют фолбэк).")
