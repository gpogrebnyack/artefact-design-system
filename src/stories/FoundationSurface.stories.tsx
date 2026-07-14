import type { CSSProperties } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Surface, Flex, Stack, color, SURFACE_VARIANTS, type SurfaceVariant } from '@/foundation'
import { Text } from '@/primitives/Text'

const meta: Meta<typeof Surface> = { title: 'Foundation/Surface', component: Surface }
export default meta
type Story = StoryObj<typeof Surface>

// A couple of variants need a small demo-only assist to stay legible:
// `plain` has no background of its own (color.border is transparent by
// design rule — see the Divider bug — so a demo that wants a visible edge
// reaches for color.input instead); `scrim` is dark, so it needs light text
// and a busy backdrop to show the blur at all. Everything else needs none
// of this — it's just here so those two don't render illegibly, not a
// second source of truth for which variants exist.
const DEMO_OVERRIDES: Partial<Record<SurfaceVariant, { wrapperStyle?: CSSProperties; textColor?: string }>> = {
  plain: { wrapperStyle: { outline: `1px dashed ${color.input}` } },
  scrim: {
    wrapperStyle: { backgroundImage: 'linear-gradient(135deg, #FFB88C, #F75506 50%, #FF5E62)' },
    textColor: color.secondary,
  },
}

// Every variant Surface actually has — this list comes straight from
// `SURFACE_VARIANTS` in foundation/surface.tsx, not hand-typed here. Add a
// variant there (with its `description`) and it shows up here with zero
// edits to this file — the same self-generating pattern as
// Foundation/Spacing, Foundation/Typography, Foundation/Radius, and
// Primitives/Icon's gallery. This is exactly the fix for `scrim` shipping
// invisible in Storybook until someone had to ask where it went.
export const Variants: Story = {
  render: () => (
    <Flex gap="lg" wrap>
      {Object.entries(SURFACE_VARIANTS).map(([name, { description }]) => {
        const variant = name as SurfaceVariant
        const override = DEMO_OVERRIDES[variant]
        return (
          <Surface key={variant} variant={variant} p="lg" width={220} style={override?.wrapperStyle}>
            <Text as="div" size="body" weight={600} color={override?.textColor}>{variant}</Text>
            <Text as="div" size="caption" color={override?.textColor ?? color.mutedForeground} style={{ opacity: override?.textColor ? 0.8 : undefined }}>
              {description}
            </Text>
          </Surface>
        )
      })}
    </Flex>
  ),
}

/* No RadiusOverride story: `radius` passes straight through to Box — the
 * scale is documented once, in Foundation/Radius. */

// This IS how a Card (Components tier) is meant to be built: Surface + Text.
export const AsACardBase: Story = {
  render: () => (
    <Surface variant="glass" p="lg" width={280}>
      <Stack gap="xs">
        <Text as="div" size="subhead" weight={600}>Татьяна Климова</Text>
        <Text as="div" size="caption" color={color.mutedForeground}>Бариста · Большевистская 35</Text>
      </Stack>
    </Surface>
  ),
}
