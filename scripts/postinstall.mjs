#!/usr/bin/env node
/*
 * Runs when this package is installed as a DEPENDENCY in someone else's
 * project — points their agent at our AGENTS.md so they don't have to
 * remember to do it by hand (see context/AGENTS.md's "Правило: код меняется
 * → документы меняются" — same instinct, one level up: don't rely on
 * someone remembering a manual step that a script can just do).
 *
 * Must NEVER fail the consumer's `npm install` — every real step is inside
 * one try/catch, worst case is a no-op, never a crash.
 */
import { existsSync, appendFileSync, writeFileSync, readFileSync } from "node:fs"
import { dirname, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

try {
  const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..")

  // Only act when nested inside a consumer's node_modules. When this
  // package's own repo runs `npm install` for local development,
  // packageRoot has no node_modules segment in its own path — no-op.
  if (!packageRoot.split(sep).includes("node_modules")) {
    process.exit(0)
  }

  const projectRoot = process.env.INIT_CWD || process.cwd()

  // Sanity check: bail if this doesn't look like a real project root,
  // rather than guessing further and writing to the wrong place.
  if (!existsSync(resolve(projectRoot, "package.json"))) {
    process.exit(0)
  }

  const MARK_START = "<!-- artefact-design-system:agents-pointer:start -->"
  const MARK_END = "<!-- artefact-design-system:agents-pointer:end -->"
  const block =
    `${MARK_START}\n` +
    `## Дизайн-система\n\n` +
    `Проект использует [artefact-design-system](https://www.npmjs.com/package/artefact-design-system). ` +
    `Перед любой задачей на UI — прочитай \`node_modules/artefact-design-system/AGENTS.md\` и следуй ему ` +
    `(там объяснено, когда смотреть в \`DESIGN.md\`, когда в \`COMPONENTS.md\`).\n` +
    `${MARK_END}\n`

  const candidates = [resolve(projectRoot, "CLAUDE.md"), resolve(projectRoot, "AGENTS.md")]
  const target = candidates.find(existsSync) ?? candidates[0]
  const existing = existsSync(target) ? readFileSync(target, "utf8") : ""

  if (existing.includes(MARK_START)) {
    process.exit(0) // already set up on a previous install — don't duplicate
  }

  if (existing.length > 0) {
    appendFileSync(target, `\n${block}`)
  } else {
    writeFileSync(target, block)
  }

  const relative = target.startsWith(projectRoot) ? `.${target.slice(projectRoot.length)}` : target
  console.log(`\n[artefact-design-system] Added a pointer to ${relative} — your agent will read node_modules/artefact-design-system/AGENTS.md before UI work.\n`)
} catch {
  process.exit(0)
}
