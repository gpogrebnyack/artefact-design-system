import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppShell, TitledRow, Grid, Surface } from '@/foundation'
import { SidebarNav, EXAMPLE_NAV_ITEMS } from '@/sections/SidebarNav'
import { Text } from '@/primitives/Text'

/*
 * Foundation/AppShell — the page-layout invariant every real page lives in.
 * Existed as a real component with no story: an easy way for the exact bug
 * it fixes (a page hand-rolling its own, slightly-wrong shell) to creep back
 * in unnoticed. Resize the canvas — the max-width:1280px column stays
 * centered under the sidebar rail regardless of viewport width.
 */
const meta: Meta<typeof AppShell> = {
  title: 'Foundation/AppShell',
  component: AppShell,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof AppShell>

function DemoPanel({ label }: { label: string }) {
  return (
    <Surface variant="paper" p="lg" style={{ minHeight: 120 }}>
      <Text as="div">{label}</Text>
    </Surface>
  )
}

export const WithSidebarNav: Story = {
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
      <TitledRow title={<Text as="h2" size="title">Команда</Text>}>
        <Grid minColWidth={260} gap="base">
          <DemoPanel label="контент страницы" />
          <DemoPanel label="ограничен max-width: 1280px" />
          <DemoPanel label="центрирован под рейлом" />
        </Grid>
      </TitledRow>
    </AppShell>
  ),
}
