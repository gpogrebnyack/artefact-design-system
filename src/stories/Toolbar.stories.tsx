import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Toolbar, ToolbarGroup, ToolbarToggleGroup, ToolbarToggleItem, ToolbarSeparator, ToolbarButton,
} from '@/components/composed/Toolbar'
import { Button } from '@/components/ui/button'
import { Icon } from '@/primitives/Icon'

/*
 * Toolbar — a COMPONENT (built from Primitives + Foundation): Radix's real
 * toolbar behavior (roving focus across the toggle group and buttons) with
 * our token-driven visual shell. See `src/components/composed/Toolbar.tsx`.
 */
const meta: Meta = { title: 'Components/Toolbar' }
export default meta
type Story = StoryObj

export const PeriodAndActions: Story = {
  render: () => {
    const [period, setPeriod] = useState('week')
    return (
      <div style={{ width: 480 }}>
        <Toolbar>
          <ToolbarGroup>
            <ToolbarToggleGroup value={period} onValueChange={setPeriod}>
              <ToolbarToggleItem value="month">Месяц</ToolbarToggleItem>
              <ToolbarToggleItem value="week">Неделя</ToolbarToggleItem>
              <ToolbarToggleItem value="day">День</ToolbarToggleItem>
            </ToolbarToggleGroup>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarButton>
            <Button variant="ghost" size="sm">
              <Icon name="arrow-down" size={16} /> Скачать отчёт
            </Button>
          </ToolbarButton>
        </Toolbar>
      </div>
    )
  },
}
