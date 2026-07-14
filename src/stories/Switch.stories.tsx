import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Flex } from '@/foundation'

/*
 * Rows pair the control with the governed Label primitive (id/htmlFor) —
 * same rule as Checkbox; see Primitives/Label.
 */
const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
}
export default meta
type Story = StoryObj<typeof Switch>

export const Off: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Switch id="sw-notify" />
      <Label htmlFor="sw-notify">Уведомления</Label>
    </Flex>
  ),
}

export const On: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Switch id="sw-access" defaultChecked />
      <Label htmlFor="sw-access">Доступ в приложение</Label>
    </Flex>
  ),
}

export const Small: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Switch id="sw-compact" size="sm" defaultChecked />
      <Label htmlFor="sw-compact">Компактный переключатель</Label>
    </Flex>
  ),
}
