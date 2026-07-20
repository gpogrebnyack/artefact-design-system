import type { Meta, StoryObj } from '@storybook/react-vite'
import { AreaChart } from '@/components/composed/charts/AreaChart'
import { color } from '@/foundation'

const meta: Meta<typeof AreaChart> = { title: 'Components/Chart/Area', component: AreaChart }
export default meta
type Story = StoryObj<typeof AreaChart>

// dashboard-prototype.html's upsell breakdown (offered/refused/skipped) — a stacked area over time
const DATA = [
  { day: '2 июня', offered: 132, refused: 88, skipped: 72 },
  { day: '4 июня', offered: 148, refused: 102, skipped: 85 },
  { day: '6 июня', offered: 142, refused: 95, skipped: 78 },
  { day: '8 июня', offered: 155, refused: 108, skipped: 92 },
  { day: '10 июня', offered: 138, refused: 92, skipped: 68 },
  { day: '12 июня', offered: 148, refused: 100, skipped: 80 },
]

export const Stacked: Story = {
  args: {
    data: DATA, xKey: 'day',
    series: [
      { key: 'offered', label: 'Предложено', color: color.accent },
      { key: 'refused', label: 'Отказ', color: color.danger },
      { key: 'skipped', label: 'Не предложено', color: color.warning },
    ],
  },
}
