import type { Meta, StoryObj } from '@storybook/react-vite'
import { FormField } from '@/components/composed/Field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// A Components-tier composite: label + control + description/error, built on
// the Field primitives (shadcn) wrapped around the Input/Select primitives.
const meta: Meta = { title: 'Components/FormField' }
export default meta
type Story = StoryObj

export const WithInput: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="ФИО сотрудника" htmlFor="staff-name" description="Как в документах — это увидит команда">
        <Input id="staff-name" placeholder="Татьяна Климова" />
      </FormField>
    </div>
  ),
}

export const WithSelect: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="Адрес" htmlFor="staff-address">
        <Select>
          <SelectTrigger id="staff-address" className="w-full"><SelectValue placeholder="Выберите адрес" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="bolshevistskaya">Большевистская 35</SelectItem>
            <SelectItem value="sovetskaya">Советская 5</SelectItem>
            <SelectItem value="dimitrova">Димитрова 2</SelectItem>
          </SelectContent>
        </Select>
      </FormField>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-80">
      <FormField label="ФИО сотрудника" htmlFor="staff-name-invalid" error="Укажите имя и фамилию">
        <Input id="staff-name-invalid" aria-invalid placeholder="Татьяна Климова" />
      </FormField>
    </div>
  ),
}
