import type { Meta, StoryObj } from '@storybook/react-vite'
import { LineChart, Line } from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Text } from '@/primitives/Text'
import { Icon } from '@/primitives/Icon'
import { color } from '@/foundation'

/*
 * Chart (advanced) — a COMPONENT, distinct from the raw chart marks at
 * `Primitives/Chart` (sparkline/radial gauge — see src/stories/Chart.stories
 * .tsx, unchanged). This composes a primitive chart mark + Card + Text into
 * a real "metric card" panel — the kind that goes straight into a Sections/
 * Аналитика dashboard.
 */
const meta: Meta = { title: 'Components/Chart/MetricCard' }
export default meta
type Story = StoryObj

const trend = [{ v: 6.8 }, { v: 7.0 }, { v: 6.9 }, { v: 7.2 }, { v: 7.1 }, { v: 7.4 }]

export const TeamAverageMetricCard: Story = {
  render: () => (
    <Card style={{ width: 280 }}>
      <CardHeader>
        <Text as="div" size="caption" color={color.mutedForeground}>
          Средняя оценка команды
        </Text>
      </CardHeader>
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
          <Text as="span" size="headline" weight={600}>
            7,1
          </Text>
          <Text as="span" size="caption" color={color.green} weight={600}>
            <Icon name="trend-up" size={14} /> +0,3 за неделю
          </Text>
        </div>
        <ChartContainer config={{ v: { label: 'Оценка', color: color.green } }} className="h-12 w-full">
          <LineChart data={trend} margin={{ top: 4, bottom: 4, left: 4, right: 4 }}>
            <Line dataKey="v" type="monotone" stroke="var(--color-v)" strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  ),
}
