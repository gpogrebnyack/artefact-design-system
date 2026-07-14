#!/usr/bin/env node
/*
 * lint-design-summary — runs `design.md lint` and prints ERRORS in full but
 * folds warnings into one line. Rationale: lint v0.3.0 counts a color as
 * "used" only when the frontmatter `components:` map references it — our
 * components consume tokens from tokens.ts, invisible to it, so ~48
 * "defined but never referenced" warnings are EXPECTED noise (documented in
 * DESIGN.md's frontmatter). A wall of expected warnings in every build
 * buries real errors; this keeps the signal. Exit code passes through.
 */
import { execFileSync } from "node:child_process"

let raw, code = 0
try {
  raw = execFileSync("npx", ["design.md", "lint", "context/DESIGN.md", "--format", "json"], { encoding: "utf8" })
} catch (e) {
  raw = e.stdout ?? ""
  code = e.status ?? 1
}
const report = JSON.parse(raw)
const errors = report.findings.filter((f) => f.severity === "error")
const warnings = report.findings.filter((f) => f.severity === "warning")
for (const e of errors) console.log(`✗ ERROR ${e.path ?? ""}: ${e.message}`)
const unused = warnings.filter((w) => w.message.includes("never referenced")).length
const other = warnings.length - unused
console.log(`design.md lint: ${errors.length} errors, ${warnings.length} warnings (${unused} — известное ограничение линтера «never referenced», см. DESIGN.md frontmatter${other ? `; ${other} прочих:` : ""})`)
for (const w of warnings.filter((w) => !w.message.includes("never referenced"))) {
  console.log(`  ⚠ ${w.path ?? ""}: ${w.message}`)
}
process.exit(code || (errors.length ? 1 : 0))
