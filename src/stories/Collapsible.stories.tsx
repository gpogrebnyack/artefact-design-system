import type { Meta, StoryObj } from '@storybook/react-vite'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/primitives/Text'
import { Flex, Stack, Surface, color } from '@/foundation'

/*
 * Collapsible — vendored as the base for collapsible group headers
 * (komanda's own .addr-group behavior: two independent consumer sessions
 * re-implemented the same collapsed-state React logic by hand before this
 * existed). See CollapsibleGroup (Components) for the assembled pattern.
 */
const meta: Meta<typeof Collapsible> = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
}
export default meta
type Story = StoryObj<typeof Collapsible>

export const AddressGroup: Story = {
  render: () => (
    <Collapsible defaultOpen style={{ width: 420 }}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          style={{ all: 'unset', cursor: 'pointer', display: 'block', width: '100%' }}
        >
          <Flex align="center" gap="sm">
            <Icon name="caret-down" size={16} color={color.mutedForeground} />
            <Text as="span" size="subhead" weight={600}>Большевистская 35</Text>
            <Text as="span" size="footnote" color={color.mutedForeground}>7 человек</Text>
          </Flex>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <Stack gap="sm" style={{ paddingTop: 12 }}>
          <Surface variant="paper" p="base" radius="xl"><Text>карточка сотрудника</Text></Surface>
          <Surface variant="paper" p="base" radius="xl"><Text>карточка сотрудника</Text></Surface>
        </Stack>
      </CollapsibleContent>
    </Collapsible>
  ),
}
