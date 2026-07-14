import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Flex } from '@/foundation'

/*
 * RadioGroup — the title matches the EXPORT (was "Primitives/Radio", the
 * exact friendly-alias drift the naming canon forbids). Rows pair
 * RadioGroupItem with the governed Label primitive (id/htmlFor), not a
 * hand-rolled <label class="text-sm"> — same rule the Label story states.
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'Primitives/RadioGroup',
  component: RadioGroup,
}
export default meta
type Story = StoryObj<typeof RadioGroup>

function Option({ value, children, disabled }: { value: string; children: string; disabled?: boolean }) {
  const id = `rg-${value}`
  return (
    <Flex align="center" gap="sm" wrap={false} className="group" data-disabled={disabled || undefined}>
      <RadioGroupItem value={value} id={id} disabled={disabled} />
      <Label htmlFor={id}>{children}</Label>
    </Flex>
  )
}

export const RoleSelect: Story = {
  render: () => (
    <RadioGroup defaultValue="staff" style={{ width: 256 }}>
      <Option value="staff">Сотрудник</Option>
      <Option value="point">Управляющий точкой</Option>
      <Option value="network">Управляющий сетью</Option>
    </RadioGroup>
  ),
}

export const PeriodSelect: Story = {
  render: () => (
    <RadioGroup defaultValue="week" style={{ width: 192 }}>
      <Option value="month">Месяц</Option>
      <Option value="week">Неделя</Option>
      <Option value="day">День</Option>
    </RadioGroup>
  ),
}

/* Unchecked/checked need no separate stories — a radio is only meaningful
 * inside a group (that's why the export is RadioGroup, not Radio), and any
 * group shows both states at once. Disabled IS a real state to cover:
 * per-item (an unavailable option among active ones) and the whole group. */
export const Disabled: Story = {
  render: () => (
    <Flex gap="2xl" align="flex-start">
      <RadioGroup defaultValue="staff" style={{ width: 256 }}>
        <Option value="staff">Сотрудник</Option>
        <Option value="point">Управляющий точкой</Option>
        <Option value="network" disabled>
          Управляющий сетью — недоступно
        </Option>
      </RadioGroup>
      <RadioGroup defaultValue="week" disabled style={{ width: 192 }}>
        <Option value="month">Месяц</Option>
        <Option value="week">Неделя</Option>
        <Option value="day">День</Option>
      </RadioGroup>
    </Flex>
  ),
}
