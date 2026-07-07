import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false, // build:css runs separately and writes into the same dist/ — don't let this step wipe it
  external: ["react", "react-dom"],
  loader: { ".css": "empty" }, // styles ship as one compiled dist/style.css (see build:css) — not bundled per-component
})
