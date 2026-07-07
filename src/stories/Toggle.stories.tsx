import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '@/components/ui/toggle'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

const meta: Meta = { title: 'Primitives/Toggle' }
export default meta
type Story = StoryObj

// VoiceCard recipe: a real play/pause toggle (was a dead ▶ span in legacy)
export const PlayPause: Story = {
  render: () => <Toggle aria-label="Проиграть сэмпл">▶</Toggle>,
}

// ControlsRow recipe: segmented period switcher (single-select toggle group)
export const SegmentedPeriod: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="week">
      <ToggleGroupItem value="month">Месяц</ToggleGroupItem>
      <ToggleGroupItem value="week">Неделя</ToggleGroupItem>
      <ToggleGroupItem value="day">День</ToggleGroupItem>
    </ToggleGroup>
  ),
}
