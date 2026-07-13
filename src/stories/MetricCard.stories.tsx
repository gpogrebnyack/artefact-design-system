import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Text } from '@/primitives/Text'
import { Icon } from '@/primitives/Icon'
import { color } from '@/foundation'
import { Sparkline } from '@/components/composed/charts/Sparkline'

/*
 * MetricCard — a demo composition, NOT a real exported component. Filed
 * under Components/Card/* (the Card family folder) on purpose: what makes
 * this a "metric card" is the Card shell + label/value/trend layout — the
 * embedded Sparkline is one ingredient, not the thing being categorized.
 * Filing it next to LineChart/BarChart implied it was a chart TYPE, which
 * misled a real reader (see context/COMPONENTS.md's note on this).
 *
 * Copy this composition by hand if you need it — Card + Text + Icon +
 * Sparkline are all real exports; only this specific assembly is demo-only.
 */
const meta: Meta = { title: 'Components/Card/Metric' }
export default meta
type Story = StoryObj

const trend = [6.8, 7.0, 6.9, 7.2, 7.1, 7.4]

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
        <Sparkline data={trend} color={color.green} width={248} height={48} />
      </CardContent>
    </Card>
  ),
}
