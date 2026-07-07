import type { Meta, StoryObj } from '@storybook/react-vite'
import { Input } from '@/components/ui/input'

const meta: Meta<typeof Input> = {
  title: 'Primitives/Input',
  component: Input,
}
export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: () => <Input placeholder="ФИО сотрудника" className="w-72" />,
}

export const WithValue: Story = {
  render: () => <Input defaultValue="Татьяна Климова" className="w-72" />,
}

export const Disabled: Story = {
  render: () => <Input placeholder="Большевистская 35" disabled className="w-72" />,
}
