import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'

const meta: Meta<typeof Separator> = { title: 'Primitives/Divider', component: Separator }
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <div className="w-72">
      <div className="text-sm font-semibold">Татьяна Климова</div>
      <div className="text-sm text-muted-foreground">Сотрудник · Большевистская 35</div>
      <Separator className="my-3" />
      <div className="text-sm text-muted-foreground">Средняя оценка за неделю: 7,1</div>
    </div>
  ),
}

export const Vertical: Story = {
  render: () => (
    <div className="flex h-8 items-center gap-3 text-sm text-muted-foreground">
      <span>5 адресов</span>
      <Separator orientation="vertical" />
      <span>16 человек</span>
      <Separator orientation="vertical" />
      <span>неделя 17–23 июня</span>
    </div>
  ),
}
