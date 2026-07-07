import type { Meta, StoryObj } from '@storybook/react-vite'
import { ComposedChart } from '@/components/composed/charts/ComposedChart'
import { color } from '@/foundation'

const meta: Meta<typeof ComposedChart> = { title: 'Components/Chart/Composed', component: ComposedChart }
export default meta
type Story = StoryObj<typeof ComposedChart>

const DATA = [
  { day: '2 июня', volume: 42, avg: 6.2 },
  { day: '4 июня', volume: 48, avg: 6.4 },
  { day: '6 июня', volume: 45, avg: 6.1 },
  { day: '8 июня', volume: 52, avg: 6.6 },
  { day: '10 июня', volume: 44, avg: 6.3 },
  { day: '12 июня', volume: 49, avg: 6.7 },
]

export const SharedAxis: Story = {
  args: {
    data: DATA,
    xKey: 'day',
    series: [
      { key: 'volume', label: 'Заказы', color: color.chart4, type: 'bar' },
      { key: 'avg', label: 'Средняя оценка', color: color.accent, type: 'line' },
    ],
  },
}

// `volume` (0–60) and `avg` (0–10) on one shared axis would flatten `avg`
// into a near-straight line — `axis: "right"` gives it its own scale.
export const DualAxis: Story = {
  args: {
    data: DATA,
    xKey: 'day',
    series: [
      { key: 'volume', label: 'Заказы', color: color.chart4, type: 'bar' },
      { key: 'avg', label: 'Средняя оценка', color: color.accent, type: 'line', axis: 'right' },
    ],
  },
}
