import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/Radio',
  component: RadioGroup,
}
export default meta
type Story = StoryObj<typeof RadioGroup>

export const RoleSelect: Story = {
  render: () => (
    <RadioGroup defaultValue="staff" className="w-64">
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="staff" /> Сотрудник</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="point" /> Управляющий точкой</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="network" /> Управляющий сетью</label>
    </RadioGroup>
  ),
}

export const PeriodSelect: Story = {
  render: () => (
    <RadioGroup defaultValue="week" className="w-48">
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="month" /> Месяц</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="week" /> Неделя</label>
      <label className="flex items-center gap-2 text-sm"><RadioGroupItem value="day" /> День</label>
    </RadioGroup>
  ),
}
