import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const meta: Meta<typeof Select> = {
  title: 'Primitives/Select',
  component: Select,
}
export default meta
type Story = StoryObj<typeof Select>

/* The two stories are STATES, not datasets (the old AddressSelect/
 * RoleSelect names hid it): empty trigger showing the placeholder vs a
 * preselected value — same naming as Input's Default/WithValue. */
export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[200px]"><SelectValue placeholder="Адрес" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="a">Большевистская 35</SelectItem>
        <SelectItem value="b">Советская 5</SelectItem>
        <SelectItem value="c">Серебренниковская 20</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithValue: Story = {
  render: () => (
    <Select defaultValue="staff">
      <SelectTrigger className="w-[220px]"><SelectValue placeholder="Роль" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="staff">Сотрудник</SelectItem>
        <SelectItem value="point">Управляющий точкой</SelectItem>
        <SelectItem value="network">Управляющий сетью</SelectItem>
      </SelectContent>
    </Select>
  ),
}
