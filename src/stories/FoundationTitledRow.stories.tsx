import type { Meta, StoryObj } from '@storybook/react-vite'
import { TitledRow, Surface, Stack, color } from '@/foundation'
import { SparkLink } from '@/components/composed/SparkLink'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Layout/TitledRow — the section row both source pages build
 * everything from: sticky title-rail | main | optional sticky side-rail,
 * collapsing to a stacked column below 1120px. Stories follow the
 * feature-states convention: side in use → rail reservation → fullWidth.
 */
const meta: Meta<typeof TitledRow> = {
  title: 'Foundation/Layout/TitledRow',
  component: TitledRow,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof TitledRow>

function DemoPanel({ label }: { label: string }) {
  return (
    <Surface variant="paper" p="lg" style={{ minHeight: 120 }}>
      <Text as="div" size="caption">{label}</Text>
    </Surface>
  )
}

function Frame({ children }: { children: React.ReactNode }) {
  return <div style={{ padding: 24, maxWidth: 1100, margin: '0 auto' }}>{children}</div>
}

/* The right rail in use — the dialog-review page's canonical filling: one
 * compact insight (title / value / note / SparkLink), never a card grid —
 * the rail is 180px, a margin note, not a second content column. */
export const WithSide: Story = {
  render: () => (
    <Frame>
      <TitledRow
        title={<Text as="h2" size="headline" weight={400}>Вердикт</Text>}
        side={
          <Stack gap="xs">
            <Text as="div" size="body" weight={600}>Потенциал заказа</Text>
            <Text as="div" size="display" weight={600} color={color.accent} style={{ lineHeight: 1.05 }}>
              ≈ 200 ₽
            </Text>
            <Text as="div" size="caption" color={color.mutedForeground}>
              упущено на этом заказе
            </Text>
            <SparkLink onClick={() => {}}>Сколько недозаработали?</SparkLink>
          </Stack>
        }
      >
        <DemoPanel label="main content" />
      </TitledRow>
    </Frame>
  ),
}

/* The side rail stays RESERVED when `side` is empty: one main width on
 * every row of the page (komanda keeps empty .srow-side divs for this). */
export const EmptySideStillReserved: Story = {
  render: () => (
    <Frame>
      <Stack gap="lg">
        <TitledRow title={<Text as="h2" size="headline" weight={400}>Операции</Text>}>
          <DemoPanel label="main — той же ширины, что у строк с side" />
        </TitledRow>
        <TitledRow>
          <DemoPanel label="без заголовка — komanda's titleless row, ширина та же" />
        </TitledRow>
      </Stack>
    </Frame>
  ),
}

/* fullWidth is the EXPLICIT opt-out (dashboard's .srow.no-side) — never a
 * side effect of having nothing to put in the rail. */
export const FullWidth: Story = {
  render: () => (
    <Frame>
      <Stack gap="lg">
        <TitledRow title={<Text as="h2" size="headline" weight={400}>Обычная строка</Text>}>
          <DemoPanel label="main обычной ширины" />
        </TitledRow>
        <TitledRow fullWidth title={<Text as="h2" size="headline" weight={400}>На всю ширину</Text>}>
          <DemoPanel label="fullWidth — явное решение, main забирает место рейла" />
        </TitledRow>
      </Stack>
    </Frame>
  ),
}
