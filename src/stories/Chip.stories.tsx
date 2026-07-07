import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chip } from '@/components/composed/Chip'
import { Flex } from '@/foundation'

const meta: Meta<typeof Chip> = { title: 'Components/Chip', component: Chip }
export default meta
type Story = StoryObj<typeof Chip>

// komanda.html's assistant-dock suggestion chips, verbatim
export const SuggestionRow: Story = {
  render: () => (
    <Flex gap="sm">
      <Chip>Кто требует внимания?</Chip>
      <Chip>Где теряем на допродажах?</Chip>
      <Chip>Какой адрес сильнее?</Chip>
    </Flex>
  ),
}
