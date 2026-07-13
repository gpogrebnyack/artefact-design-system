import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScorePill } from '@/components/composed/ScorePill'
import { Flex } from '@/foundation'

/*
 * ScorePill — komanda's `.sval`, rebuilt by hand in all three consumer
 * sessions before it became an export. Value arrives formatted (comma
 * decimal) — formatting is the caller's concern.
 */
const meta: Meta<typeof ScorePill> = {
  title: 'Components/ScorePill',
  component: ScorePill,
}
export default meta
type Story = StoryObj<typeof ScorePill>

export const ScoreBands: Story = {
  render: () => (
    <Flex gap="sm" align="center">
      <ScorePill value="7,1" tone="green" />
      <ScorePill value="6,3" tone="green" trend="up" />
      <ScorePill value="5,0" tone="warn" />
      <ScorePill value="5,6" tone="accent" trend="down" />
    </Flex>
  ),
}
