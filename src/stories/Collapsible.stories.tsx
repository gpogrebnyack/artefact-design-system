import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/foundation'
import { Flex, Stack, Surface, color, motion } from '@/foundation'

/*
 * Collapsible — vendored as the base for collapsible group headers
 * (komanda's own .addr-group behavior). This demo shows the RAW primitive
 * wired by hand; the packaged pattern with all the kit rules built in is
 * `CollapsibleGroup` (Components) — reach for that one on real pages.
 *
 * The demo itself follows the kit rules it once violated (caught in
 * review): chevron on the RIGHT edge and rotating, real focus ring, no
 * inline `all: unset` (which out-cascades the focus-ring class — the
 * documented a11y bug).
 */
const meta: Meta<typeof Collapsible> = {
  title: 'Primitives/Collapsible',
  component: Collapsible,
}
export default meta
type Story = StoryObj<typeof Collapsible>

function AddressGroupDemo() {
  const [open, setOpen] = useState(true)
  return (
    <Collapsible open={open} onOpenChange={setOpen} style={{ width: 420 }}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          className="artefact-focus-ring"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            margin: 0,
            font: 'inherit',
            color: 'inherit',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'block',
            width: '100%',
            borderRadius: 8,
          }}
        >
          <Flex align="center" gap="sm" wrap={false}>
            <Text as="span" size="subhead" weight="semibold">Большевистская 35</Text>
            <Text as="span" size="footnote" color={color.mutedForeground}>7 человек</Text>
            <span
              style={{
                display: 'inline-flex',
                marginLeft: 'auto',
                transition: `transform ${motion.base} ${motion.ease}`,
                transform: open ? 'none' : 'rotate(-90deg)',
              }}
            >
              <Icon name="caret-down" size={16} color={color.mutedForeground} />
            </span>
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
  )
}

export const Default: Story = {
  render: () => <AddressGroupDemo />,
}
