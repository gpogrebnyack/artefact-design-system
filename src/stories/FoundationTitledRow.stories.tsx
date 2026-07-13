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

// The side rail stays RESERVED when `side` is empty (same main width on
// every row of a page — komanda keeps empty .srow-side divs for exactly
// this). `fullWidth` is the explicit opt-out (dashboard's .srow.no-side).
export const EmptySideStillReserved: Story = {
  render: () => (
    <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>
      <Stack gap="lg">
        <TitledRow title={<Text as="h2" size="title">Операции</Text>}>
          <DemoPanel label="main — той же ширины, что у строк с side" />
        </TitledRow>
        <TitledRow>
          <DemoPanel label="без заголовка — komanda's titleless row, ширина та же" />
        </TitledRow>
        <TitledRow fullWidth title={<Text as="h2" size="title">На всю ширину</Text>}>
          <DemoPanel label="fullWidth — явное решение, main забирает место рейла" />
        </TitledRow>
      </Stack>
    </div>
  ),
}
