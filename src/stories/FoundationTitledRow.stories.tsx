import type { Meta, StoryObj } from '@storybook/react-vite'
import { TitledRow, Surface, Stack } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/TitledRow — the primary page-composition primitive both real source
 * pages (komanda.html, dashboard-prototype.html) use for nearly every
 * section: sticky title-rail | main content | optional sticky side-rail.
 * Found missing while assembling dashboard-prototype.html from the existing
 * component set — resize the canvas below 1120px to see it collapse to a
 * plain stacked column (title/side lose stickiness there).
 */
const meta: Meta = { title: 'Foundation/TitledRow', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

function DemoPanel({ label }: { label: string }) {
  return (
    <Surface variant="paper" p="lg" style={{ minHeight: 120 }}>
      <Text as="div">{label}</Text>
    </Surface>
  )
}

export const WithSide: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <TitledRow
        title={<Text as="h2" size="title">Потенциал роста прибыли</Text>}
        side={<Surface variant="glass" p="base"><Text size="caption">Совет-панель сюда</Text></Surface>}
      >
        <DemoPanel label="main content" />
      </TitledRow>
    </div>
  ),
}

export const NoSide: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Stack gap="lg">
        <TitledRow title={<Text as="h2" size="title">Операции</Text>}>
          <DemoPanel label="main content, no side rail" />
        </TitledRow>
        <TitledRow>
          <DemoPanel label="no title either — komanda's dash-head pattern" />
        </TitledRow>
      </Stack>
    </div>
  ),
}
