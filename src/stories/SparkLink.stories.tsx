import type { Meta, StoryObj } from '@storybook/react-vite'
import { SparkLink } from '@/components/composed/SparkLink'
import { Stack } from '@/foundation'

/*
 * SparkLink — the ONE standard "hand this to the assistant" affordance
 * (✦ + label). Wire onClick to AssistantDock's `ask` ref handle.
 */
const meta: Meta<typeof SparkLink> = {
  title: 'Components/SparkLink',
  component: SparkLink,
}
export default meta
type Story = StoryObj<typeof SparkLink>

export const Examples: Story = {
  render: () => (
    <Stack gap="md">
      <SparkLink onClick={() => {}}>Сколько недозаработали?</SparkLink>
      <SparkLink onClick={() => {}}>Потренировать с ассистентом</SparkLink>
    </Stack>
  ),
}
