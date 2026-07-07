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
