import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Flex, Container, color, radius } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Radius — the named corner-radius steps, over the single
 * --radius token declared in index.css.
 */
const meta: Meta = { title: 'Foundation/Radius', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

export const RadiusScale: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Flex gap="md">
        {(Object.keys(radius) as (keyof typeof radius)[]).map((name) => (
          <Flex key={name} direction="column" align="center" gap="xs">
            {/* color.input — the visible hairline; color.border is transparent
                by rule and left this outline invisible (same demo bug the
                Box story shipped with) */}
            <Box width={64} radius={name} style={{ height: 64, background: color.card, outline: `1px solid ${color.input}` }} />
            <Text as="span" size="footnote" color={color.mutedForeground}>{name}</Text>
          </Flex>
        ))}
      </Flex>
    </Container>
  ),
}
