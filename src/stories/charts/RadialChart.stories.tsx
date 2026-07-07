import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadialChart } from '@/components/composed/charts/RadialChart'
import { color } from '@/foundation'
import { Text } from '@/primitives/Text'

const meta: Meta<typeof RadialChart> = { title: 'Components/Chart/Radial', component: RadialChart }
export default meta
type Story = StoryObj<typeof RadialChart>

export const ScoreRing: Story = {
  args: {
    value: 74,
    color: color.green,
    label: (
      <Text as="span" size="title" weight={600} color={color.green}>
        7,4
      </Text>
    ),
  },
}

export const LowScore: Story = {
  args: {
    value: 50,
    color: color.accent,
    label: (
      <Text as="span" size="title" weight={600} color={color.accent}>
        5,0
      </Text>
    ),
  },
}
