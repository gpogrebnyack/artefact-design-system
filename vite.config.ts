import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// Dev-only — powers `npm run storybook`. Not part of the published package
// (that ships as dist/*.js + dist/style.css via tsup + the Tailwind CLI, see
// package.json's build script). This is purely how Storybook resolves `@/`
// and compiles Tailwind live while developing the design system itself.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
