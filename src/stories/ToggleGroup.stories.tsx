import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

/*
 * ToggleGroup — the raw shadcn/Radix group (was hiding inside the Toggle
 * page as "SegmentedPeriod", invisible to anyone searching the export
 * name). For the APP-level segmented control in a toolbar row — the pill
 * with roving focus next to selects/search — use ToolbarToggleGroup
 * (Components/Toolbar): that one carries the housing and control-height
 * rules; this is the bare primitive underneath.
 *
 * NOT for navigation, even though it looks the same: a section switcher is
 * NavigationMenu (real links — new-tab, URL/history, the "navigation"
 * landmark). Rule of thumb: changes the DATA on screen → ToggleGroup;
 * changes the SCREEN → NavigationMenu.
 */
const meta: Meta<typeof ToggleGroup> = {
  title: 'Primitives/ToggleGroup',
  component: ToggleGroup,
}
export default meta
type Story = StoryObj<typeof ToggleGroup>

export const PeriodSelect: Story = {
  render: () => (
    <ToggleGroup type="single" defaultValue="week">
      <ToggleGroupItem value="month">Месяц</ToggleGroupItem>
      <ToggleGroupItem value="week">Неделя</ToggleGroupItem>
      <ToggleGroupItem value="day">День</ToggleGroupItem>
    </ToggleGroup>
  ),
}
