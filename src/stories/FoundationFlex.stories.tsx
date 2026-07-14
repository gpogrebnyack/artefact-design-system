import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Flex, color } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Layout/Flex — a row of items that may fold to the next line
 * (wrap defaults to true on purpose: a toolbar/tag row survives narrow
 * widths without extra code). For a strict grid of equal cells — Grid.
 */
const meta: Meta<typeof Flex> = {
  title: 'Foundation/Layout/Flex',
  component: Flex,
}
export default meta
type Story = StoryObj<typeof Flex>

export const WrappingRow: Story = {
  render: () => (
    <Flex gap="md" align="center" style={{ maxWidth: 520 }}>
      {['Все', 'Управляющие', 'Линейные', 'Без имени · 3', 'Все адреса', 'Поиск по имени'].map((t) => (
        <Box key={t} px="base" py="sm" radius="pill" style={{ background: color.muted }}>
          <Text as="span" size="caption">{t}</Text>
        </Box>
      ))}
    </Flex>
  ),
}
