import type { Meta, StoryObj } from '@storybook/react-vite'
import { AccentButton } from '@/components/composed/AccentButton'
import { Icon } from '@/primitives/Icon'

const meta: Meta<typeof AccentButton> = { title: 'Components/AccentButton', component: AccentButton }
export default meta
type Story = StoryObj<typeof AccentButton>

// Единственная оранжевая CTA экрана. Первоклассная замена инлайн-стилю
// color.accent — API как у Button (size/иконки/onClick).
export const Default: Story = {
  render: () => (
    <AccentButton>
      <Icon name="share-network" size={16} weight="fill" /> Поделиться
    </AccentButton>
  ),
}
