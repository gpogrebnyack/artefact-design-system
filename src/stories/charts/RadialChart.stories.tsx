import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadialChart } from '@/components/composed/charts/RadialChart'
import { Flex, color } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * RadialChart — the score ring (the vivid pair is ITS language, see the
 * SemanticTone note). One story: the band colors across the score range —
 * an earlier ScoreRing/LowScore pair differed only by value (datasets,
 * not states); the ScorePill → ScoreBands device applies here too.
 */
const meta: Meta<typeof RadialChart> = { title: 'Components/Chart/Radial', component: RadialChart }
export default meta
type Story = StoryObj<typeof RadialChart>

const BANDS = [
  { value: 74, tone: color.green, label: '7,4' },
  { value: 61, tone: color.warn, label: '6,1' },
  { value: 50, tone: color.accent, label: '5,0' },
] as const

export const Bands: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      {BANDS.map((b) => (
        <RadialChart
          key={b.label}
          value={b.value}
          color={b.tone}
          label={
            <Text as="span" size="title" weight={600} color={b.tone}>
              {b.label}
            </Text>
          }
        />
      ))}
    </Flex>
  ),
}
