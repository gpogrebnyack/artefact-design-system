import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'

/*
 * Label — the raw shadcn primitive `Components/Field`'s `FormField` wraps
 * internally for Input/Select. Pairing it directly with Checkbox/Switch below
 * is the other real use — a control with no description/error slot, where
 * FormField's full wrapper would be overkill. (Existing Checkbox/Switch
 * stories hand-roll a plain `<label>` instead of this — this is the
 * governed version: focus/disabled state sync with the control via
 * `group-data-[disabled]`, a plain <label> doesn't get that for free.)
 */
const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
}
export default meta
type Story = StoryObj<typeof Label>

export const WithCheckbox: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="notify-voices" />
      <Label htmlFor="notify-voices">Уведомлять о новых голосах</Label>
    </div>
  ),
}

export const WithSwitch: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch id="auto-assign" />
      <Label htmlFor="auto-assign">Автоматически присваивать имена</Label>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="group flex items-center gap-2" data-disabled="true">
      <Checkbox id="staff-access" disabled />
      <Label htmlFor="staff-access">Доступ выдан управляющим</Label>
    </div>
  ),
}
