import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, Surface } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Layout/Container — a centered content column of a given
 * max-width. The page-level 1280px column is AppShell's job — Container is
 * for narrower centered columns INSIDE a page (a settings form, an empty
 * state), not a hand-rolled replacement for the shell.
 */
const meta: Meta<typeof Container> = {
  title: 'Foundation/Layout/Container',
  component: Container,
  parameters: { layout: 'fullscreen' },
}
export default meta
type Story = StoryObj<typeof Container>

export const CenteredColumn: Story = {
  render: () => (
    <Container size={480} p="xl">
      <Surface variant="paper" p="lg" radius="xl">
        <Text as="div" size="caption">
          Колонка max-width: 480, отцентрована независимо от ширины вьюпорта.
        </Text>
      </Surface>
    </Container>
  ),
}
