import { Box, color } from "@/foundation"
import "./TypingIndicator.css"

/*
 * TypingIndicator — Components tier. komanda.html's `.typing` — three
 * pulsing dots, staggered, shown while the assistant "thinks" before a
 * reply lands.
 */
export function TypingIndicator() {
  return (
    <Box
      radius="xl"
      style={{
        display: "inline-flex",
        gap: 4,
        alignSelf: "flex-start",
        background: color.secondary,
        padding: "13px 15px",
        borderBottomLeftRadius: 5,
      }}
    >
      <span className="typing-dot" />
      <span className="typing-dot" style={{ animationDelay: ".2s" }} />
      <span className="typing-dot" style={{ animationDelay: ".4s" }} />
    </Box>
  )
}
