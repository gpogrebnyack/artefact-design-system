import type { Meta, StoryObj } from '@storybook/react-vite'
import { ChartCard } from '@/components/composed/ChartCard'
import { LineChart } from '@/components/composed/charts/LineChart'
import { BarChart } from '@/components/composed/charts/BarChart'
import { color } from '@/foundation'

/*
 * ChartCard — the most repeated composition of dashboard-prototype.html
 * (11 instances of .media-chart-card). Card family member: the shell is
 * the point, any Components/Chart/* goes inside as children.
 */
const meta: Meta<typeof ChartCard> = {
  title: 'Components/Card/Chart',
  component: ChartCard,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof ChartCard>

const WEEKS = [
  { week: 'Пн', value: 88, plan: 92 },
  { week: 'Вт', value: 92, plan: 92 },
  { week: 'Ср', value: 85, plan: 92 },
  { week: 'Чт', value: 79, plan: 92 },
  { week: 'Пт', value: 101, plan: 92 },
  { week: 'Сб', value: 112, plan: 92 },
  { week: 'Вс', value: 97, plan: 92 },
]

export const WithLineChart: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <ChartCard title="Упущенная прибыль и конверсии" sub="Последние 7 дней" aside="неделя 17–23 июня">
        <LineChart
          data={WEEKS}
          xKey="week"
          series={[
            { key: 'value', label: 'Факт', color: color.chart1 },
            { key: 'plan', label: 'План', color: color.chart4 },
          ]}
          height={220}
        />
      </ChartCard>
    </div>
  ),
}

export const WithBarChart: Story = {
  render: () => (
    <div style={{ width: 640 }}>
      <ChartCard title="Заказы по дням">
        <BarChart
          data={WEEKS}
          xKey="week"
          series={[{ key: 'value', label: 'Заказы', color: color.chart6 }]}
          height={200}
          showLegend={false}
        />
      </ChartCard>
    </div>
  ),
}
