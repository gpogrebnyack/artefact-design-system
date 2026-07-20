import type { ReactNode } from "react"
import { Flex, Stack, Surface, color } from "@/foundation"
import { Icon, type IconName } from "@/primitives/Icon"
import { Text } from "@/primitives/Text"
import type { StatusTone } from "./SemanticTone"
import "./SummaryNote.css"

/*
 * SummaryNote + SummaryStat — komanda.html's `.summary`/`.stat`: an
 * AI-written prose summary with inline clickable highlighted stats. The
 * single most re-hand-built pattern in the project's history: two
 * independent consumer sessions (SummaryNote.tsx + ClickablePhrase.tsx)
 * AND the Pages/Komanda rebuild all assembled it from scratch — three
 * strikes, formalized.
 *
 * SummaryStat is a real <button> when onClick is passed (the source's
 * stats filter the roster) and a plain span when it isn't — the "looks
 * clickable → must react" rule from DESIGN.md, enforced structurally.
 */
export type SummaryNoteProps = {
  /** eyebrow label ("Сводка команды") */
  label: ReactNode
  icon?: IconName
  /** prose with inline `SummaryStat`s */
  children: ReactNode
}

export function SummaryNote({ label, icon = "spark", children }: SummaryNoteProps) {
  return (
    <Surface variant="panel" p="lg" radius="xl">
      <Stack gap="sm">
        <Flex align="center" gap="xs">
          <Icon name={icon} size={13} color={color.accent} />
          <Text
            as="span"
            size="footnote"
            weight={600}
            color={color.accent}
            style={{ textTransform: "uppercase", letterSpacing: "0.05em" }}
          >
            {label}
          </Text>
        </Flex>
        {/* div, не p: children бывают блочными (многоабзацный вердикт в
            Mobbin-эксперименте ломал валидность HTML внутри <p>) */}
        <Text as="div" size="body" style={{ lineHeight: 1.7 }}>
          {children}
        </Text>
      </Stack>
    </Surface>
  )
}

export type SummaryStatProps = {
  /** highlight tone; "muted" for neutral facts */
  tone: StatusTone
  onClick?: () => void
  children: ReactNode
}

export function SummaryStat({ tone, onClick, children }: SummaryStatProps) {
  const pair =
    tone === "muted"
      ? { backgroundColor: color.muted, color: color.foreground }
      : { backgroundColor: color[`${tone}Soft`], color: color[`${tone}SoftForeground`] }
  const shared = {
    ...pair,
    borderRadius: 6,
    padding: "0 4px",
    fontWeight: 600,
    font: "inherit",
    lineHeight: "inherit",
  } as const
  if (onClick) {
    return (
      <button type="button" className="artefact-summary-stat artefact-focus-ring artefact-pressable" onClick={onClick} style={{ ...shared, border: "none", cursor: "pointer" }}>
        {children}
      </button>
    )
  }
  return <span style={shared}>{children}</span>
}
