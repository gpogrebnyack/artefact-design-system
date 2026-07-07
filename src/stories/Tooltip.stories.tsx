import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

const meta: Meta = { title: 'Primitives/Tooltip' }
export default meta
type Story = StoryObj

export const TooltipOnHover: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="outline">Наведи</Button></TooltipTrigger>
      <TooltipContent>Оценка растёт: +0,3 за неделю</TooltipContent>
    </Tooltip>
  ),
}

export const OnIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild><Button variant="ghost" size="icon">?</Button></TooltipTrigger>
      <TooltipContent side="right">Настройки уведомлений</TooltipContent>
    </Tooltip>
  ),
}
