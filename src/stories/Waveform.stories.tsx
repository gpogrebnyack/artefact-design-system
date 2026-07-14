import type { Meta, StoryObj } from '@storybook/react-vite'
import { Waveform } from '@/components/composed/Waveform'
import { Button } from '@/components/ui/button'
import { Flex, color } from '@/foundation'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/primitives/Text'

/*
 * Waveform — static voice-sample bars. Same formalization story as
 * Sparkline: two consumer sessions hand-rolled identical bar rows before
 * this existed. Decorative (aria-hidden) — pair it with a real duration
 * label and play control, as in the dialog-row demo below.
 */
const meta: Meta<typeof Waveform> = {
  title: 'Components/Waveform',
  component: Waveform,
}
export default meta
type Story = StoryObj<typeof Waveform>

export const Default: Story = {
  args: { values: [4, 8, 14, 10, 6, 12, 16, 9, 5, 11, 7, 13] },
}

export const InRow: Story = {
  render: () => (
    <Flex align="center" gap="base" style={{ width: 420 }}>
      <Button variant="ghost" size="icon-sm" aria-label="Слушать">
        <Icon name="caret-right" label="Слушать" />
      </Button>
      <Waveform values={[6, 10, 8, 14, 12, 5, 9, 7, 11, 6]} />
      <Text size="footnote" color={color.mutedForeground} style={{ width: 38, flexShrink: 0 }}>
        0:22
      </Text>
      <Text size="caption" style={{ flex: 1 }}>
        «Хотите добавить сироп?» — «Нет, спасибо»
      </Text>
    </Flex>
  ),
}
