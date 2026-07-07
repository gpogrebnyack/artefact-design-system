import type { ReactNode } from "react"
import { Box, color } from "@/foundation"

/*
 * MessageBubble — Components tier (Foundation Box + tokens). Found missing
 * while rebuilding komanda.html's assistant dock: `.bubble.user`/`.bubble.bot`
 * — a chat bubble with one "notched" corner (5px radius) pointing toward
 * its sender's side. User = dark ink fill; bot = plain paper.
 */
export function MessageBubble({ from, children }: { from: "user" | "bot"; children: ReactNode }) {
  const isUser = from === "user"
  return (
    <Box
      p="base"
      radius="xl"
      style={{
        maxWidth: "90%",
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser ? color.foreground : color.secondary,
        color: isUser ? color.background : color.foreground,
        fontSize: 16,
        lineHeight: 1.55,
        borderBottomRightRadius: isUser ? 5 : undefined,
        borderBottomLeftRadius: isUser ? undefined : 5,
      }}
    >
      {children}
    </Box>
  )
}
