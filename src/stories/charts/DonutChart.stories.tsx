import type { Meta, StoryObj } from '@storybook/react-vite'
import { DonutChart } from '@/components/composed/charts/DonutChart'
import { color } from '@/foundation'

const meta: Meta<typeof DonutChart> = { title: 'Components/Chart/Donut', component: DonutChart }
export default meta
type Story = StoryObj<typeof DonutChart>

export const Default: Story = {
  args: {
    data: [
      { key: 'granted', label: 'Доступ выдан', value: 62, color: color.success },
      { key: 'pending', label: 'Запрошен', value: 18, color: color.warning },
      { key: 'none', label: 'Без доступа', value: 20, color: color.muted },
    ],
  },
}
