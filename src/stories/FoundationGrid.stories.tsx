import type { Meta, StoryObj } from '@storybook/react-vite'
import { Grid, Surface, color } from '@/foundation'
import { Text } from '@/foundation'

/*
 * Foundation/Layout/Grid — the card grid that decides its own column count
 * (auto-fit over minColWidth; no hand-kept breakpoints). Resize the canvas:
 * 1→2→3 columns, no ragged holes. Carries width:100% itself — the fix for
 * Chromium's phantom-height bug (see the Grid entry in layout.tsx).
 */
const meta: Meta<typeof Grid> = {
  title: 'Foundation/Layout/Grid',
  component: Grid,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Grid>

const ITEMS = [
  { title: 'Большевистская 35', body: '7 сотрудников · средняя 6,1' },
  { title: 'Серебренниковская 20', body: '1 новый голос' },
  { title: 'Советская 5', body: '1 сотрудник · 1 новый голос' },
  { title: 'Димитрова 2', body: 'управляющий + 1 сотрудник' },
  { title: 'Кирова 113/2', body: 'нет данных' },
]

export const AutoFitReflow: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Grid minColWidth={260} gap="base">
        {ITEMS.map((it) => (
          <Surface key={it.title} variant="panel" p="lg" radius="xl">
            <Text as="div" size="body" weight="semibold">{it.title}</Text>
            <Text as="div" size="caption" color={color.mutedForeground} style={{ marginTop: 4 }}>
              {it.body}
            </Text>
          </Surface>
        ))}
      </Grid>
    </div>
  ),
}
