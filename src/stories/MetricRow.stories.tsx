import type { Meta, StoryObj } from '@storybook/react-vite'
import { MetricRow } from '@/components/composed/MetricRow'
import { Flex } from '@/foundation'

/*
 * MetricRow — komanda's `.einfo` label/value/delta stack, hand-built in all
 * three consumer sessions. Delta tone follows the DESIGN.md rule: a sagging
 * business metric is `accent` (attention), not `danger`.
 */
const meta: Meta<typeof MetricRow> = {
  title: 'Components/MetricRow',
  component: MetricRow,
}
export default meta
type Story = StoryObj<typeof MetricRow>

export const Pair: Story = {
  render: () => (
    <Flex gap="2xl">
      <MetricRow label="Средний чек" value="401 ₽" delta="+1% к среднему" tone="success" trend="up" />
      <MetricRow label="Допродажи / нед" value="−21 989 ₽ к плану" delta="недобор на допродажах" tone="accent" trend="down" />
    </Flex>
  ),
}

export const DeltaOnly: Story = {
  render: () => (
    <MetricRow label="Средний чек" delta="−2% к среднему" tone="accent" trend="down" />
  ),
}
