import type { Meta, StoryObj } from '@storybook/react-vite'
import { BarChart } from '@/components/composed/charts/BarChart'
import { color } from '@/foundation'

const meta: Meta<typeof BarChart> = { title: 'Components/Chart/Bar', component: BarChart }
export default meta
type Story = StoryObj<typeof BarChart>

const DATA = [
  { day: '2 июня', visits: 42, upsell: 12 },
  { day: '4 июня', visits: 48, upsell: 15 },
  { day: '6 июня', visits: 45, upsell: 14 },
  { day: '8 июня', visits: 52, upsell: 18 },
  { day: '10 июня', visits: 44, upsell: 13 },
  { day: '12 июня', visits: 49, upsell: 16 },
]

export const Single: Story = {
  args: { data: DATA, xKey: 'day', series: [{ key: 'visits', label: 'Визиты', color: color.accent }] },
}

export const Grouped: Story = {
  args: {
    data: DATA, xKey: 'day',
    series: [
      { key: 'visits', label: 'Визиты', color: color.chart1 },
      { key: 'upsell', label: 'Допродажи', color: color.chart2 },
    ],
  },
}
