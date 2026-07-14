import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppShell, TitledRow, Grid, Stack, Surface, color } from '@/foundation'
import { SidebarNav, EXAMPLE_NAV_ITEMS } from '@/sections/SidebarNav'
import { SparkLink } from '@/components/composed/SparkLink'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Layout/AppShell — the page-layout invariant every real page
 * lives in (sidebar + centered max-width:1280 column). The story is the
 * folder's RECIPE (Storybook's own convention: overview → states →
 * recipes): all three layout altitudes nested the way a real page nests
 * them — AppShell (макро) → TitledRow rows (мезо) → Grid/Stack (микро).
 * Resize the canvas: the column stays centered, rows keep one main width.
 */
const meta: Meta<typeof AppShell> = {
  title: 'Foundation/Layout/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof AppShell>

function DemoPanel({ label }: { label: string }) {
  return (
    <Surface variant="paper" p="lg" style={{ minHeight: 96 }}>
      <Text as="div" size="caption">{label}</Text>
    </Surface>
  )
}

export const PageAnatomy: Story = {
  render: () => (
    <AppShell
      sidebar={
        <SidebarNav
          active="team"
          items={EXAMPLE_NAV_ITEMS}
          avatarInitials="У"
          avatarTitle="Управляющий"
          clientLabel="Пример клиента"
        />
      }
    >
      <Stack gap="lg">
        <TitledRow title={<Text as="h2" size="headline" weight={400}>Секция с сеткой</Text>}>
          <Grid minColWidth={240} gap="base">
            <DemoPanel label="AppShell — каркас" />
            <DemoPanel label="TitledRow — строка-секция" />
            <DemoPanel label="Grid — раскладка внутри" />
          </Grid>
        </TitledRow>
        <TitledRow
          title={<Text as="h2" size="headline" weight={400}>Секция с рейлом</Text>}
          side={
            <Stack gap="xs">
              <Text as="div" size="body" weight={600}>Инсайт</Text>
              <Text as="div" size="caption" color={color.mutedForeground}>
                заметка на полях — правый рейл
              </Text>
              <SparkLink onClick={() => {}}>Спросить ассистента</SparkLink>
            </Stack>
          }
        >
          <DemoPanel label="main — та же ширина, что у секции выше" />
        </TitledRow>
        <TitledRow>
          <DemoPanel label="titleless-строка — рейлы всё равно зарезервированы" />
        </TitledRow>
      </Stack>
    </AppShell>
  ),
}
