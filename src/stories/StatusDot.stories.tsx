import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusDot } from '@/components/composed/StatusDot'
import { Stack } from '@/foundation'

/*
 * StatusDot — quiet state line ("● Пользуется ежедневно"), komanda's
 * app-access status. Hand-built in both consumer sessions and the
 * Pages/Komanda rebuild before becoming an export.
 */
const meta: Meta<typeof StatusDot> = {
  title: 'Components/StatusDot',
  component: StatusDot,
}
export default meta
type Story = StoryObj<typeof StatusDot>

export const States: Story = {
  render: () => (
    <Stack gap="sm">
      <StatusDot tone="green">Пользуется ежедневно</StatusDot>
      <StatusDot tone="accent">Давно не заходил</StatusDot>
      <StatusDot tone="muted">Доступ не выдан</StatusDot>
    </Stack>
  ),
}
