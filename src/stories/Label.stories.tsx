import type { Meta, StoryObj } from '@storybook/react-vite'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Flex } from '@/foundation'

/*
 * Label — the raw shadcn primitive `Components/Field`'s `FormField` wraps
 * internally for Input/Select. Pairing it directly with Checkbox/Switch below
 * is the other real use — a control with no description/error slot, where
 * FormField's full wrapper would be overkill. Focus/disabled state syncs
 * with the control via `group-data-[disabled]` — a plain hand-rolled
 * <label> doesn't get that for free (Checkbox/Switch stories follow this
 * same pattern).
 */
const meta: Meta<typeof Label> = {
  title: 'Primitives/Label',
  component: Label,
}
export default meta
type Story = StoryObj<typeof Label>

export const WithCheckbox: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Checkbox id="notify-voices" />
      <Label htmlFor="notify-voices">Уведомлять о новых голосах</Label>
    </Flex>
  ),
}

export const WithSwitch: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Switch id="auto-assign" />
      <Label htmlFor="auto-assign">Автоматически присваивать имена</Label>
    </Flex>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false} className="group" data-disabled="true">
      <Checkbox id="staff-access" disabled />
      <Label htmlFor="staff-access">Доступ выдан управляющим</Label>
    </Flex>
  ),
}
