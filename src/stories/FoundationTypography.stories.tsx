import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, Stack, type as typeScale } from '@/foundation'

/*
 * Foundation/Typography — the named type steps every Text primitive picks
 * from (footnote/caption/body/subhead/title/headline/display).
 */
const meta: Meta = { title: 'Foundation/Typography', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

export const TypeScale: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="sm">
        {Object.entries(typeScale).map(([name, t]) => (
          <div key={name} style={{ fontSize: t.size, lineHeight: t.lineHeight }}>
            {name} — {t.size}px / {t.lineHeight}
          </div>
        ))}
      </Stack>
    </Container>
  ),
}

/* The system's whole weight/style vocabulary — deliberately tiny: Struve
 * self-hosts upright 400/500/600 (500 landed later from the designer's
 * .otf — before that every fontWeight:500 silently fell back to 400). No
 * italic exists (faked slant was swept out — DESIGN.md → Typography);
 * Light/Bold from the delivery are deliberately NOT wired. Mirrors the
 * two-weight icon rule (Primitives/Icon → Weights). */
export const Weights: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="sm">
        <div style={{ fontSize: 16, fontWeight: 400 }}>400 — весь обычный текст</div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>500 — UI-хром: кнопки, чипы, подписи контролов</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>600 — акцент: имена, заголовки блоков, значения</div>
        <div style={{ fontSize: 16 }}>Курсива нет: цитата — «ёлочки» и подложка, не наклон.</div>
      </Stack>
    </Container>
  ),
}
