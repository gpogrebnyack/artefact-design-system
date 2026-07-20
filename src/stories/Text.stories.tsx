import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text } from '@/primitives/Text'
import { Stack, color } from '@/foundation'

const meta: Meta<typeof Text> = { title: 'Primitives/Text', component: Text }
export default meta
type Story = StoryObj<typeof Text>

// The full type scale, each step rendering through the same primitive.
export const TypeScale: Story = {
  render: () => (
    <Stack gap="sm">
      <Text as="div" size="display" weight={600}>Артефакт</Text>
      <Text as="div" size="headline" weight={600}>Команда</Text>
      <Text as="div" size="title">Татьяна Климова</Text>
      <Text as="div" size="subhead">Большевистская 35</Text>
      <Text as="div" size="body">Бариста · работает с марта 2024</Text>
      <Text as="div" size="caption" color={color.mutedForeground}>Бодрый день · 5 адресов · 16 человек</Text>
      <Text as="div" size="footnote" color={color.mutedForeground}>неделя 17–23 июня</Text>
    </Stack>
  ),
}

// Semantic color usage — muted for secondary text, brand for status.
export const Colors: Story = {
  render: () => (
    <Stack gap="xs">
      <Text as="div" size="body">Оценка растёт стабильно</Text>
      <Text as="div" size="body" color={color.mutedForeground}>Большевистская 35 · Сотрудник</Text>
      <Text as="div" size="caption" weight={600} color={color.success}>Высокая оценка</Text>
      <Text as="div" size="caption" weight={600} color={color.warning}>Мало смен на этой неделе</Text>
      <Text as="div" size="caption" weight={600} color={color.accent}>Требует внимания</Text>
    </Stack>
  ),
}

// Truncation — a long address in a fixed-width row.
export const Truncate: Story = {
  render: () => (
    <div style={{ width: 180 }}>
      <Text truncate size="body">Серебренниковская набережная, дом 20, офис 4</Text>
    </div>
  ),
}
