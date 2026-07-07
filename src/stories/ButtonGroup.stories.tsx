import type { Meta, StoryObj } from '@storybook/react-vite'
import { ButtonGroup, ButtonGroupText, ButtonGroupSeparator } from '@/components/ui/button-group'
import { Button } from '@/components/ui/button'
import { Icon } from '@/primitives/Icon'

/*
 * ButtonGroup — visually fuses adjacent buttons into one segmented control
 * (shared borders, squared-off inner corners). Was exported with zero
 * story/manifest coverage; the toolbar segmented-view pattern below is the
 * real, common use — a plain flex row of buttons doesn't get this fusion.
 */
const meta: Meta<typeof ButtonGroup> = {
  title: 'Primitives/ButtonGroup',
  component: ButtonGroup,
}
export default meta
type Story = StoryObj<typeof ButtonGroup>

export const Segmented: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline">День</Button>
      <Button variant="outline">Неделя</Button>
      <Button variant="outline">Месяц</Button>
    </ButtonGroup>
  ),
}

export const WithIconsAndSeparator: Story = {
  render: () => (
    <ButtonGroup>
      <Button variant="outline" size="icon"><Icon name="caret-down" size={16} /></Button>
      <ButtonGroupSeparator />
      <Button variant="outline" size="icon"><Icon name="caret-up" size={16} /></Button>
    </ButtonGroup>
  ),
}

export const WithLeadingLabel: Story = {
  render: () => (
    <ButtonGroup>
      <ButtonGroupText>Сортировка</ButtonGroupText>
      <Button variant="outline">По оценке</Button>
      <Button variant="outline">По имени</Button>
    </ButtonGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" className="w-40">
      <Button variant="outline">Профиль</Button>
      <Button variant="outline">Диалоги</Button>
      <Button variant="outline">Настройки</Button>
    </ButtonGroup>
  ),
}
