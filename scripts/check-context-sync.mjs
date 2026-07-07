#!/usr/bin/env node
/*
 * check-context-sync — catches drift between the actual code and the
 * context/ docs (DESIGN.md, COMPONENTS.md). Written for this repo, not a
 * fork of anything: `design.md lint` only checks DESIGN.md's internal
 * consistency (refs within its own frontmatter), it has no idea what's in
 * src/. This script closes that other half — "does the doc still match the
 * code" — the same failure mode as the self-generating-stories bug, one
 * level up (docs instead of Storybook).
 *
 * Exit 0 = no drift. Exit 1 = something in code isn't reflected in the docs
 * (or vice versa) and needs a human/agent decision, not an auto-fix — this
 * script only detects, it never edits the docs itself.
 */
import { execFileSync } from "node:child_process"
import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const ROOT = new URL("..", import.meta.url).pathname

// Tokens intentionally NOT mirrored 1:1 into DESIGN.md's `colors` map — kept
// here, with a reason, instead of silently swallowed by the diff below.
const KNOWN_COLOR_EXCEPTIONS = new Set([
  // gradients aren't valid CSS colors — `design.md lint` errors on them if
  // they sit in `colors`; this one lives under `components.assistant-dock-btn`
  // instead. Same underlying token as `color.accentGradient` in tokens.ts.
  "accent-gradient",
])

function camelToKebab(key) {
  return key
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/([a-zA-Z])(\d)/g, "$1-$2")
    .toLowerCase()
}

function extractObjectKeys(source, exportedName) {
  const start = source.indexOf(`export const ${exportedName} = {`)
  if (start === -1) throw new Error(`could not find "export const ${exportedName} = {" in tokens.ts`)
  const end = source.indexOf("\n} as const", start)
  const block = source.slice(start, end)
  return [...block.matchAll(/^\s{2}"?(\w+)"?:/gm)].map((m) => m[1])
}

function diffSets(a, b) {
  return { onlyInA: [...a].filter((x) => !b.has(x)), onlyInB: [...b].filter((x) => !a.has(x)) }
}

// --- 1. token parity: tokens.ts vs context/DESIGN.md ---

const tokensSrc = readFileSync(join(ROOT, "src/foundation/tokens.ts"), "utf8")
const codeColors = new Set(extractObjectKeys(tokensSrc, "color").map(camelToKebab))
const codeSpacing = new Set(extractObjectKeys(tokensSrc, "spacing"))
const codeRadius = new Set(extractObjectKeys(tokensSrc, "radius").map((k) => k.replace(/"/g, "")))
const codeType = new Set(extractObjectKeys(tokensSrc, "type"))

const dtcgRaw = execFileSync("npx", ["design.md", "export", "context/DESIGN.md", "--format", "dtcg"], {
  cwd: ROOT,
  encoding: "utf8",
})
const dtcg = JSON.parse(dtcgRaw)
const designColors = new Set(Object.keys(dtcg.color ?? {}).filter((k) => !k.startsWith("$")))
const designSpacing = new Set(Object.keys(dtcg.spacing ?? {}).filter((k) => !k.startsWith("$")))
const designRadius = new Set(Object.keys(dtcg.rounded ?? {}).filter((k) => !k.startsWith("$")))
const designType = new Set(Object.keys(dtcg.typography ?? {}))

let drift = false

function reportTokenDiff(label, codeSet, designSet, exceptions = new Set()) {
  const { onlyInA: onlyInCode, onlyInB: onlyInDesign } = diffSets(codeSet, designSet)
  const realOnlyInCode = onlyInCode.filter((k) => !exceptions.has(k))
  if (realOnlyInCode.length) {
    drift = true
    console.log(`✗ ${label}: в коде (tokens.ts), нет в context/DESIGN.md — ${realOnlyInCode.join(", ")}`)
  }
  if (onlyInDesign.length) {
    drift = true
    console.log(`✗ ${label}: в context/DESIGN.md, нет в коде (tokens.ts) — ${onlyInDesign.join(", ")} (устарело?)`)
  }
}

reportTokenDiff("colors", codeColors, designColors, KNOWN_COLOR_EXCEPTIONS)
reportTokenDiff("spacing", codeSpacing, designSpacing)
reportTokenDiff("radius/rounded", codeRadius, designRadius)
reportTokenDiff("typography", codeType, designType)

// --- 2. component coverage: our own tiers vs context/COMPONENTS.md ---
// Scoped to code we fully own (Foundation, custom Primitives, composed
// Components, Sections) — NOT shadcn-vendored components/ui/*, which change
// rarely and deliberately (via `npx shadcn add`, checked by eye when added).

function findExportedComponents(dir) {
  const names = []
  for (const entry of readdirSync(dir, { withFileTypes: true, recursive: true })) {
    if (!entry.isFile() || !entry.name.endsWith(".tsx") || entry.name.endsWith(".stories.tsx")) continue
    const filePath = join(entry.parentPath ?? entry.path ?? dir, entry.name)
    const text = readFileSync(filePath, "utf8")
    for (const m of text.matchAll(/export function ([A-Z]\w+)/g)) names.push(m[1])
  }
  return names
}

const ownedDirs = ["src/foundation", "src/primitives", "src/components/composed", "src/sections"]
const codeComponents = ownedDirs.flatMap((d) => findExportedComponents(join(ROOT, d)))

const componentsMd = readFileSync(join(ROOT, "context/COMPONENTS.md"), "utf8")
const undocumented = codeComponents.filter((name) => !componentsMd.includes(`\`${name}\``))

if (undocumented.length) {
  drift = true
  console.log(`✗ Компоненты есть в коде, но не упомянуты в context/COMPONENTS.md: ${undocumented.join(", ")}`)
}

if (!drift) {
  console.log("✓ context/DESIGN.md и context/COMPONENTS.md не расходятся с кодом.")
}

process.exit(drift ? 1 : 0)
