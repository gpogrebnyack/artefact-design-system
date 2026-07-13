import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdviceCard } from '@/components/composed/AdviceCard'

const meta: Meta<typeof AdviceCard> = { title: 'Components/Card/Advice', component: AdviceCard }
export default meta
type Story = StoryObj<typeof AdviceCard>

// dashboard-prototype.html's upsell-insight — the common case, ink icon
export const UpsellPotential: Story = {
  args: {
    icon: 'lightbulb',
    value: '60–90',
    text: '«Не предложено» каждый день — столько гостей уходит, не услышав ни одного дополнения',
    note: 'Самый быстрый рычаг роста — одна фраза в конце заказа',
  },
}

// dashboard-prototype.html's conv-insight — the rare accent-tone variant
export const ConversionRecord: Story = {
  args: {
    icon: 'chart-line-up',
    tone: 'accent',
    value: '—',
    text: 'Рекорд upsell за период',
    note: 'Сначала закрывайте визит, потом наращивайте допродажи',
  },
}
