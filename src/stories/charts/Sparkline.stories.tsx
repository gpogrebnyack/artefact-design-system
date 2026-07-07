import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkline } from '@/components/composed/charts/Sparkline'
import { color } from '@/foundation'

const meta: Meta<typeof Sparkline> = { title: 'Components/Chart/Sparkline', component: Sparkline }
export default meta
type Story = StoryObj<typeof Sparkline>

export const Growing: Story = {
  args: { data: [5.9, 6.0, 6.1, 6.2, 6.3], color: color.green },
}

export const Declining: Story = {
  args: { data: [6.0, 5.9, 5.8, 5.7, 5.6], color: color.accent },
}

export const NoEndDot: Story = {
  args: { data: [7.0, 7.0, 7.05, 7.1, 7.1], color: color.green, showEndDot: false },
}
