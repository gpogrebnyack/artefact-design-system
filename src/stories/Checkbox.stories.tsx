import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Flex } from '@/foundation'

/*
 * Rows pair the control with the governed Label primitive (id/htmlFor) —
 * not a hand-rolled <label class="text-sm">: Label syncs focus/disabled
 * state with the control (see Primitives/Label), a plain label doesn't.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Primitives/Checkbox',
  component: Checkbox,
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Unchecked: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Checkbox id="cb-consent" />
      <Label htmlFor="cb-consent">Согласен на обработку данных</Label>
    </Flex>
  ),
}

export const Checked: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false}>
      <Checkbox id="cb-voices" defaultChecked />
      <Label htmlFor="cb-voices">Уведомлять о новых голосах</Label>
    </Flex>
  ),
}

export const Disabled: Story = {
  render: () => (
    <Flex align="center" gap="sm" wrap={false} className="group" data-disabled="true">
      <Checkbox id="cb-access" disabled />
      <Label htmlFor="cb-access">Доступ выдан управляющим</Label>
    </Flex>
  ),
}
