import type { ButtonHTMLAttributes } from "react"
import { Surface, color } from "@/foundation"

/*
 * Chip — Components tier (Surface + Box's now-forwarded onClick). Found
 * missing while rebuilding komanda.html's assistant dock: `.askchip`
 * (suggestion pills — "Кто требует внимания?" etc.) is a clickable pill on
 * the same 60%-glass token as our `glass` Surface variant, just as a real
 * <button>. Only exists now because Box forwards DOM props — see
 * foundation/layout.tsx.
 */
export function Chip({ children, style, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Surface
      as="button"
      type="button"
      variant="glass"
      radius="pill"
      style={{
        border: "none",
        cursor: "pointer",
        fontSize: 16,
        fontWeight: 500,
        color: color.foreground,
        padding: "8px 14px",
        ...style,
      }}
      {...props}
    >
      {children}
    </Surface>
  )
}
