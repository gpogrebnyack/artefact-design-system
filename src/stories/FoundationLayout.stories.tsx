import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Flex, Grid, Container, Stack, color } from '@/foundation'

/*
 * Foundation/Layout — Box/Flex/Grid/Stack/Container. Behavior-only containers
 * (no color/surface) that every layer above is built on. Resize the canvas:
 * Grid reflows itself (auto-fit), no hardcoded breakpoints, no ragged holes.
 */
const meta: Meta = { title: 'Foundation/Layout', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

// A "card" is NOT a monolith — it's a Box + surface styling. This is the point:
// the card LIVES ON a Box container primitive.
function DemoCard({ title, body }: { title: string; body: string }) {
  return (
    <Box p="lg" radius="xl" style={{ background: color.card, WebkitBackdropFilter: 'blur(10px)', backdropFilter: 'blur(10px)' }}>
      <div className="text-base font-semibold">{title}</div>
      <div className="mt-1 text-sm text-muted-foreground">{body}</div>
    </Box>
  )
}

const ITEMS = [
  { title: 'Большевистская 35', body: '7 сотрудников · средняя 6,1' },
  { title: 'Серебренниковская 20', body: '1 новый голос' },
  { title: 'Советская 5', body: '1 сотрудник · 1 новый голос' },
  { title: 'Димитрова 2', body: 'управляющий + 1 сотрудник' },
  { title: 'Кирова 113/2', body: 'нет данных' },
]

// Grid reflows by available width — resize to see 1→2→3 columns, equal height.
export const CardsReflow: Story = {
  render: () => (
    <Container size={1100} p="xl">
      <Grid minColWidth={260} gap="base">
        {ITEMS.map((it) => <DemoCard key={it.title} {...it} />)}
      </Grid>
    </Container>
  ),
}

// Flex wraps naturally — a toolbar/tag row that folds on narrow widths.
export const FlexWrap: Story = {
  render: () => (
    <Container size={1100} p="xl">
      <Flex gap="md" align="center">
        {['Все', 'Управляющие', 'Линейные', 'Без имени · 3', 'Все адреса', 'Поиск по имени'].map((t) => (
          <Box key={t} px="base" py="sm" radius="pill" style={{ background: color.muted }}>
            <span className="text-sm">{t}</span>
          </Box>
        ))}
      </Flex>
    </Container>
  ),
}

// The base Box: pure container, no color of its own — surface is added on top.
export const BoxIsTheBase: Story = {
  render: () => (
    <Container size={480} p="xl">
      <Stack gap="md">
        <Box p="base" radius="xl" style={{ outline: `1px dashed ${color.border}` }}>
          <span className="text-sm text-muted-foreground">Box — просто контейнер (поведение, без цвета)</span>
        </Box>
        <Box p="base" radius="xl" style={{ background: color.card }}>
          <span className="text-sm">Box + surface = карточка</span>
        </Box>
      </Stack>
    </Container>
  ),
}
