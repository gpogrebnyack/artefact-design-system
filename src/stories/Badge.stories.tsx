import type { Meta, StoryObj } from '@storybook/react-vite'
import { Badge } from '@/components/ui/badge'

const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
}
export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { children: 'Все адреса' } }
export const Secondary: Story = { args: { variant: 'secondary', children: 'Сотрудник' } }
export const Outline: Story = { args: { variant: 'outline', children: '7,1' } }
export const Strong: Story = { args: { variant: 'destructive', children: 'Требует внимания' } }
