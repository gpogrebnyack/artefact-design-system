import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checklist } from '@/components/composed/Checklist'
import { Surface } from '@/foundation'

/*
 * Checklist — dialog-v2's `.checklist`: the read-only met / not-met verdict
 * grid of a dialog review. Not a to-do list (no interaction, no progress).
 */
const meta: Meta<typeof Checklist> = {
  title: 'Components/Checklist',
  component: Checklist,
}
export default meta
type Story = StoryObj<typeof Checklist>

const ITEMS = [
  { done: false, label: 'Назвал конкретную позицию' },
  { done: false, label: 'Проговорил состав заказа' },
  { done: true, label: 'Озвучил сумму' },
  { done: false, label: 'Тёплое прощание' },
  { done: false, label: 'Фирменное приветствие «Бодрый день»' },
  { done: true, label: 'Спросил о карте лояльности' },
]

export const TwoColumns: Story = {
  render: () => (
    <Surface variant="panel" radius="xl" style={{ padding: '16px 20px 20px', maxWidth: 720 }}>
      <Checklist items={ITEMS} />
    </Surface>
  ),
}

export const OneColumn: Story = {
  render: () => (
    <Surface variant="panel" radius="xl" style={{ padding: '16px 20px 20px', maxWidth: 360 }}>
      <Checklist items={ITEMS.slice(0, 4)} columns={1} />
    </Surface>
  ),
}
