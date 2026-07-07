import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScatterChart } from '@/components/composed/charts/ScatterChart'
import { color } from '@/foundation'

const meta: Meta<typeof ScatterChart> = { title: 'Components/Chart/Scatter', component: ScatterChart }
export default meta
type Story = StoryObj<typeof ScatterChart>

export const Single: Story = {
  args: {
    xLabel: 'Средний чек',
    yLabel: 'Оценка',
    series: [
      {
        key: 'staff',
        label: 'Сотрудники',
        color: color.accent,
        data: [
          { x: 390, y: 6.0 }, { x: 401, y: 6.3 }, { x: 406, y: 6.1 }, { x: 415, y: 5.9 },
          { x: 398, y: 5.6 }, { x: 402, y: 5.5 }, { x: 438, y: 7.1 }, { x: 385, y: 5.0 },
        ],
      },
    ],
  },
}
