import type { Meta, StoryObj } from '@storybook/react-vite'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Text } from '@/foundation'
import { Stack, color } from '@/foundation'

/*
 * Popover — vendored as the floating-content base (command/combobox build
 * on it upstream). For a plain hover hint use Tooltip; Popover is for
 * click-opened interactive content. Note popover surface = paper-warm
 * (opaque), NOT glass — floating content must stay readable over anything.
 */
const meta: Meta<typeof Popover> = {
  title: 'Primitives/Popover',
  component: Popover,
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Что учитывается в оценке?</Button>
      </PopoverTrigger>
      <PopoverContent style={{ width: 280 }}>
        <Stack gap="sm">
          <Text as="div" weight="semibold">Состав оценки</Text>
          <Text as="div" size="caption" color={color.mutedForeground}>
            Тон диалога, скорость обслуживания и работа по скрипту — за последние 4 недели.
          </Text>
        </Stack>
      </PopoverContent>
    </Popover>
  ),
}
