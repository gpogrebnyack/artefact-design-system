import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Flex, Container, Stack, color, spacing } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Spacing — the named steps Box/Flex/Grid/Stack resolve p/gap
 * keys against (e.g. `gap="lg"` → 20px), so nothing above invents a one-off
 * pixel value per call site.
 */
const meta: Meta = { title: 'Foundation/Spacing', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

export const SpacingScale: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="sm">
        {Object.entries(spacing).map(([name, px]) => (
          <Flex key={name} align="center" gap="md">
            <Box style={{ width: px, height: 16, background: color.primary }} />
            <Text as="span" size="caption" color={color.mutedForeground}>{name} — {px}px</Text>
          </Flex>
        ))}
      </Stack>
    </Container>
  ),
}
