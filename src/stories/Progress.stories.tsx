import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/ui/progress'
import { Flex, Stack, color } from '@/foundation'
import { Text } from '@/foundation'

/*
 * Progress — DETERMINATE linear progress, and only that:
 * - unknown-duration loading is NOT this component — that's Spinner (an
 *   action in flight) or Skeleton (content being fetched). This vendored
 *   generation renders value=null as an empty bar, no animation — and no
 *   product surface needs an indeterminate bar anyway;
 * - the circular score ring is RadialChart, a segmented/stacked bar is
 *   DistributionChart — the data-viz boundary, not progress.
 *
 * One story: `value` is the component's only axis, shown across its range
 * with the edges (an earlier Linear/Low pair differed only by value —
 * datasets, not states).
 *
 * ⚠️ Known vendored bug (upstream shadcn's own, verified in their registry):
 * `value` feeds only the indicator's transform and is never passed to
 * ProgressPrimitive.Root — so EVERY bar reports itself to screen readers as
 * indeterminate (no aria-valuenow). Visual is correct. Not patched locally:
 * vendored sources are never edited (see COMPONENTS.md known gaps).
 */
const meta: Meta<typeof Progress> = { title: 'Primitives/Progress', component: Progress }
export default meta
type Story = StoryObj<typeof Progress>

export const Values: Story = {
  render: () => (
    <Stack gap="md" style={{ width: 288 }}>
      {([
        [0, '0 — ещё не началось'],
        [18, '18'],
        [64, '64'],
        [100, '100 — завершено'],
      ] as const).map(([value, label]) => (
        <Flex key={value} align="center" gap="md" wrap={false}>
          <Progress value={value} />
          <Text as="span" size="footnote" color={color.mutedForeground} style={{ flex: 'none', width: 120 }}>
            {label}
          </Text>
        </Flex>
      ))}
    </Stack>
  ),
}
