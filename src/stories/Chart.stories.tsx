import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineChart, Line, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { color } from '@/foundation'

/*
 * Data-viz — the boundary Radix/shadcn-core don't cover, but shadcn's `chart`
 * addon (Recharts) does. This closes the score-viz recipes:
 *   - Sparkline  → LineChart (was score-spark)
 *   - Score ring → RadialBarChart gauge (was score-ring donut)
 * Stopmenu's segmented bar would be a stacked BarChart the same way.
 */
const meta: Meta = { title: 'Primitives/Chart' }
export default meta
type Story = StoryObj

const trend = [{ v: 6.8 }, { v: 7.0 }, { v: 6.9 }, { v: 7.2 }, { v: 7.1 }, { v: 7.4 }]

export const Sparkline: Story = {
  render: () => (
    <ChartContainer config={{ v: { label: 'Оценка', color: color.green } }} className="h-14 w-44">
      <LineChart data={trend} margin={{ top: 4, bottom: 4, left: 4, right: 4 }}>
        <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} isAnimationActive={false} />
      </LineChart>
    </ChartContainer>
  ),
}

// score 7,4 → 74% gauge fill (the donut score-ring, as a radial progress)
export const ScoreRing: Story = {
  render: () => (
    <div className="relative aspect-square w-40">
      <ChartContainer config={{}} className="w-40 aspect-square">
        <RadialBarChart data={[{ value: 74 }]} innerRadius="72%" outerRadius="100%" startAngle={90} endAngle={-270}>
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} axisLine={false} />
          <RadialBar dataKey="value" cornerRadius={20} fill={color.green} background isAnimationActive={false} />
        </RadialBarChart>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold" style={{ color: color.green }}>7,4</div>
    </div>
  ),
}
