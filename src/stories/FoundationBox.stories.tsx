import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Stack, color } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Layout/Box — the base container every layout primitive extends
 * (p/px/py, radius, width/grow from the token scales). Behavior only, no
 * color of its own — surface is added ON TOP (see the second example, and
 * `Surface` for the tokenized way).
 *
 * The folder follows the industry-standard "Layout" category (Polaris's
 * «Layout and structure», MUI/Chakra's «Layout»): one page per component,
 * small focused state examples — not one umbrella gallery.
 */
const meta: Meta<typeof Box> = {
  title: 'Foundation/Layout/Box',
  component: Box,
}
export default meta
type Story = StoryObj<typeof Box>

export const PaddingAndRadius: Story = {
  render: () => (
    <Stack gap="md" style={{ width: 420 }}>
      {/* color.input — the VISIBLE hairline token; color.border is
          transparent by rule and would make this outline invisible
          (the exact bug this demo itself shipped with) */}
      <Box p="base" radius="xl" style={{ outline: `1px dashed ${color.input}` }}>
        <Text as="span" size="caption" color={color.mutedForeground}>
          Box — просто контейнер (поведение, без цвета)
        </Text>
      </Box>
      <Box p="base" radius="xl" style={{ background: color.card }}>
        <Text as="span" size="caption">Box + фон = карточка (токенизированно — через Surface)</Text>
      </Box>
    </Stack>
  ),
}
