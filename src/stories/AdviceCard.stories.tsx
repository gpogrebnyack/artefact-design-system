import type { Meta, StoryObj } from '@storybook/react-vite'
import { AdviceCard } from '@/components/composed/AdviceCard'

/*
 * Two variants by design: with a number and without. Without = the value
 * block is absent entirely (an earlier story faked it with value="—"
 * because the prop used to be required). `tone` is an independent axis —
 * accent stays the rare genuine-highlight case.
 */
const meta: Meta<typeof AdviceCard> = { title: 'Components/Card/Advice', component: AdviceCard }
export default meta
type Story = StoryObj<typeof AdviceCard>

export const WithValue: Story = {
  args: {
    icon: 'lightbulb',
    value: '60–90',
    text: '«Не предложено» каждый день — столько гостей уходит, не услышав ни одного дополнения',
    note: 'Самый быстрый рычаг роста — одна фраза в конце заказа',
  },
}

export const WithoutValue: Story = {
  args: {
    icon: 'chart-line-up',
    tone: 'accent',
    text: 'Рекорд upsell за период',
    note: 'Сначала закрывайте визит, потом наращивайте допродажи',
  },
}
