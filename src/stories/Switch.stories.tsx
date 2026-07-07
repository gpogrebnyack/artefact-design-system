import type { Meta, StoryObj } from '@storybook/react-vite'
import { Switch } from '@/components/ui/switch'

const meta: Meta<typeof Switch> = {
  title: 'Primitives/Switch',
  component: Switch,
}
export default meta
type Story = StoryObj<typeof Switch>

export const Off: Story = {
  render: () => <label className="flex items-center gap-2 text-sm"><Switch /> Уведомления</label>,
}

export const On: Story = {
  render: () => <label className="flex items-center gap-2 text-sm"><Switch defaultChecked /> Доступ в приложение</label>,
}

export const Small: Story = {
  render: () => <label className="flex items-center gap-2 text-sm"><Switch size="sm" defaultChecked /> Компактный переключатель</label>,
}
