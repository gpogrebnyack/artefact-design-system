import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sparkline } from '@/components/composed/charts/Sparkline'
import { Flex, color } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Sparkline — direction is DATA, not a state (an earlier Growing/Declining
 * pair differed only by dataset): Default shows both side by side. The one
 * real prop state is showEndDot.
 */
const meta: Meta<typeof Sparkline> = { title: 'Components/Chart/Sparkline', component: Sparkline }
export default meta
type Story = StoryObj<typeof Sparkline>

export const Default: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Flex direction="column" gap="xs" align="center">
        <Sparkline data={[5.9, 6.0, 6.1, 6.2, 6.3]} color={color.green} />
        <Text as="span" size="footnote" color={color.mutedForeground}>рост</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <Sparkline data={[6.0, 5.9, 5.8, 5.7, 5.6]} color={color.accent} />
        <Text as="span" size="footnote" color={color.mutedForeground}>падение</Text>
      </Flex>
    </Flex>
  ),
}

export const NoEndDot: Story = {
  args: { data: [7.0, 7.0, 7.05, 7.1, 7.1], color: color.green, showEndDot: false },
}
