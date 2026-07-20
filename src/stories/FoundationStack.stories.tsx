import type { Meta, StoryObj } from '@storybook/react-vite'
import { Stack, Surface } from '@/foundation'
import { Text } from '@/foundation'

/*
 * Foundation/Layout/Stack — Flex with direction="column" as the default:
 * the vertical column is the single most common layout need, so it gets
 * its own name instead of `direction="column"` everywhere.
 */
const meta: Meta<typeof Stack> = {
  title: 'Foundation/Layout/Stack',
  component: Stack,
}
export default meta
type Story = StoryObj<typeof Stack>

export const Column: Story = {
  render: () => (
    <Stack gap="md" style={{ width: 360 }}>
      {['Сводка команды', 'Лучшие на неделе', 'Требуют внимания'].map((label) => (
        <Surface key={label} variant="paper" p="base" radius="xl">
          <Text as="span" size="caption">{label}</Text>
        </Surface>
      ))}
    </Stack>
  ),
}
