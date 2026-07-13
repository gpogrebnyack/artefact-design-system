import type { Meta, StoryObj } from '@storybook/react-vite'
import { PageHeader } from '@/sections/PageHeader'
import { Button } from '@/components/ui/button'

/*
 * PageHeader — komanda's .tophead / dashboard's .pagehead, rebuilt by hand
 * in all three cold-start sessions before becoming a Section. Title lives
 * in the TitledRow rail, exactly like both source pages.
 */
const meta: Meta<typeof PageHeader> = {
  title: 'Sections/PageHeader',
  component: PageHeader,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof PageHeader>

export const WithAction: Story = {
  render: () => (
    <PageHeader
      title="Команда"
      meta="Бодрый день · 5 адресов · 16 человек · неделя 17–23 июня"
      action={<Button>+ Создать профиль</Button>}
    />
  ),
}

export const MetaOnly: Story = {
  render: () => <PageHeader title="Дашборд" meta="2 – 20 июня 2026 · Вся сеть" />,
}
