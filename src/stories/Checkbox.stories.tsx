import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  render: () => <label className="flex items-center gap-2 text-sm"><Checkbox /> Согласен на обработку данных</label>,
}

export const Checked: Story = {
  render: () => <label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Уведомлять о новых голосах</label>,
}

export const Disabled: Story = {
  render: () => <label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox disabled /> Доступ выдан управляющим</label>,
}
