import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineChart } from '@/components/composed/charts/LineChart'
import { color } from '@/foundation'

const meta: Meta<typeof LineChart> = { title: 'Components/Chart/Line', component: LineChart }
export default meta
type Story = StoryObj<typeof LineChart>

// dashboard-prototype.html's own "service"/"script" time series
const DATA = [
  { day: '2 июня', service: 1.3, script: 6.4 },
  { day: '4 июня', service: 1.4, script: 6.6 },
  { day: '6 июня', service: 1.5, script: 6.8 },
  { day: '8 июня', service: 1.6, script: 6.7 },
  { day: '10 июня', service: 1.5, script: 6.5 },
  { day: '12 июня', service: 1.4, script: 6.3 },
]

export const Single: Story = {
  args: { data: DATA, xKey: 'day', series: [{ key: 'script', label: 'Скрипт продаж', color: color.accent }] },
}

export const MultiSeries: Story = {
  args: {
    data: DATA, xKey: 'day',
    series: [
      { key: 'service', label: 'Сервис (мин)', color: color.chart1 },
      { key: 'script', label: 'Скрипт (баллы)', color: color.chart2 },
    ],
  },
}
