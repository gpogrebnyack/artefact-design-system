import type { Meta, StoryObj } from '@storybook/react-vite'
import { Toggle } from '@/components/ui/toggle'

/*
 * Toggle — a single two-state button. The single-select segmented row is
 * its own export with its own page (Primitives/ToggleGroup); the app-level
 * toolbar pill is ToolbarToggleGroup (Components/Toolbar).
 */
const meta: Meta<typeof Toggle> = { title: 'Primitives/Toggle', component: Toggle }
export default meta
type Story = StoryObj<typeof Toggle>

// VoiceCard recipe: a real play/pause toggle (was a dead ▶ span in legacy)
export const PlayPause: Story = {
  render: () => <Toggle aria-label="Проиграть сэмпл">▶</Toggle>,
}
