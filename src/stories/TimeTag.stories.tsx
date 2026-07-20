import type { Meta, StoryObj } from '@storybook/react-vite'
import { TimeTag } from '@/components/composed/TimeTag'
import { Flex } from '@/foundation'
import { Text } from '@/foundation'

/*
 * TimeTag — dialog-v2's `.timetag`/`.tl-time`: the "jump the player to this
 * moment" pill. The page's most repeated pattern (five hand-rolled call
 * sites in the source). Muted = in-text link; green/accent = the moment's
 * verdict (chronology cards); no onClick = plain marker, no play triangle.
 */
const meta: Meta<typeof TimeTag> = {
  title: 'Components/TimeTag',
  component: TimeTag,
}
export default meta
type Story = StoryObj<typeof TimeTag>

export const Tones: Story = {
  render: () => (
    <Flex gap="sm" align="center">
      <TimeTag time="00:15" onClick={() => {}} />
      <TimeTag time="00:15 – 00:17" tone="success" onClick={() => {}} />
      <TimeTag time="00:00 – 00:01" tone="accent" onClick={() => {}} />
      <TimeTag time="00:22" />
    </Flex>
  ),
}

export const InSentence: Story = {
  render: () => (
    <Text as="p" size="body" style={{ maxWidth: 480, lineHeight: 1.6 }}>
      Своевременно уточнил наличие карты лояльности. <TimeTag time="00:15" onClick={() => {}} />
    </Text>
  ),
}
