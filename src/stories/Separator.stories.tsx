import type { Meta, StoryObj } from '@storybook/react-vite'
import { Separator } from '@/components/ui/separator'
import { Box, Flex, color } from '@/foundation'
import { Text } from '@/primitives/Text'

const meta: Meta<typeof Separator> = { title: 'Primitives/Separator', component: Separator }
export default meta
type Story = StoryObj<typeof Separator>

export const Horizontal: Story = {
  render: () => (
    <Box width={288}>
      <Text as="div" size="caption" weight={600}>Татьяна Климова</Text>
      <Text as="div" size="caption" color={color.mutedForeground}>Сотрудник · Большевистская 35</Text>
      <Separator style={{ marginBlock: 12 }} />
      <Text as="div" size="caption" color={color.mutedForeground}>Средняя оценка за неделю: 7,1</Text>
    </Box>
  ),
}

export const Vertical: Story = {
  render: () => (
    <Flex align="center" gap="md" wrap={false} style={{ height: 32 }}>
      <Text as="span" size="caption" color={color.mutedForeground}>5 адресов</Text>
      <Separator orientation="vertical" />
      <Text as="span" size="caption" color={color.mutedForeground}>16 человек</Text>
      <Separator orientation="vertical" />
      <Text as="span" size="caption" color={color.mutedForeground}>неделя 17–23 июня</Text>
    </Flex>
  ),
}
