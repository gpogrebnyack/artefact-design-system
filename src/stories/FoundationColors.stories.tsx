import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Flex, Container, Stack, color, semanticRoles, chartKeys } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Colors — every color, one place, named by role. No more
 * split between "shadcn contract" and "brand" — that split hid a real bug
 * (two different colors both called `accent` in different objects). See
 * `color` in tokens.ts for the full role breakdown.
 */
const meta: Meta = { title: 'Foundation/Colors', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

function Swatch({ name, value, fg = color.secondary }: { name: string; value: string; fg?: string }) {
  return (
    <Flex direction="column" gap="xs" align="center">
      <Box width={72} style={{ height: 48, background: value, color: fg }} radius="lg" />
      <Text as="span" size="footnote" color={color.mutedForeground}>{name}</Text>
    </Flex>
  )
}

export const PageAndSurface: Story = {
  render: () => (
    <Container size={900} p="xl">
      <Flex gap="md">
        <Swatch name="background" value={color.background} fg={color.foreground} />
        <Swatch name="card" value={color.card} fg={color.foreground} />
        <Swatch name="popover" value={color.popover} fg={color.foreground} />
        <Swatch name="primary" value={color.primary} />
        <Swatch name="secondary" value={color.secondary} fg={color.foreground} />
        <Swatch name="muted" value={color.muted} fg={color.foreground} />
        {/* ink3 lives here, not with the semantic roles below — it's a
            neutral text tone (no-data states), not a status color. */}
        <Swatch name="ink3" value={color.ink3} fg={color.secondary} />
        {/* input — the ONE visible hairline (border is transparent by rule);
            separators, chart grids and demo outlines all reach for this */}
        <Swatch name="input" value={color.input} fg={color.foreground} />
      </Flex>
    </Container>
  ),
}

// Every semantic role gets the same 4-part structure — base / hover / soft /
// soft-on-soft — so nothing is a one-off. `foreground` is baked into base's
// text color (picked by measured WCAG contrast, see index.css); `hover` is
// color-mix() off base, so it can never drift out of sync; `soft` is the
// pale badge fill, paired with the base color as its own text (the pattern
// Avatar's ToneGreen/ToneWarn already use).
function RoleRow({
  name, base, foreground, hover, soft, softForeground, softStrong,
}: { name: string; base: string; foreground: string; hover: string; soft: string; softForeground: string; softStrong?: string }) {
  return (
    <Flex direction="column" gap="xs">
      <Text as="span" size="footnote" weight={600} color={color.mutedForeground} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{name}</Text>
      <Flex gap="sm">
        <Flex direction="column" gap="xs" align="center">
          <Box width={84} style={{ height: 44, background: base, color: foreground, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
            <Text as="span" size="footnote" weight={600}>Aa</Text>
          </Box>
          <Text as="span" size="footnote" color={color.mutedForeground}>base</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Box width={84} style={{ height: 44, background: hover, color: foreground, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
            <Text as="span" size="footnote" weight={600}>Aa</Text>
          </Box>
          <Text as="span" size="footnote" color={color.mutedForeground}>hover</Text>
        </Flex>
        <Flex direction="column" gap="xs" align="center">
          <Box width={84} style={{ height: 44, background: soft, color: softForeground, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
            <Text as="span" size="footnote" weight={600}>Aa</Text>
          </Box>
          <Text as="span" size="footnote" color={color.mutedForeground}>soft</Text>
        </Flex>
        {/* soft-strong exists only where data sits on the tint (accent/
            green/warn — ScoreHeatmap's cells); 16px digits to show WHY:
            the plain soft-foreground fails contrast at data sizes */}
        {softStrong && (
          <Flex direction="column" gap="xs" align="center">
            <Box width={84} style={{ height: 44, background: soft, color: softStrong, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
              <span style={{ fontSize: 16, fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}>0/4</span>
            </Box>
            <Text as="span" size="footnote" color={color.mutedForeground}>soft-strong</Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

// Артефакт's own palette — accent orange (the ONE brand color, rare/one-per-
// screen), the score-band semantics from komanda's own band() function
// (green = score ≥7, warn = 5–7), one role tint (plum = network manager, not
// a score band), and danger — a real red, deliberately added since neither
// source page has one (see index.css). `color.destructive` (shadcn's own
// contract slot, used by Button/Badge/Alert's destructive variants) is
// wired to this same `danger` value — no separate swatch needed, it's not
// a distinct color, just shadcn's name for it.
// The rows below come from `semanticRoles` (tokens.ts) — derived from the
// color object's own naming convention, not hand-listed. Add a 6th role
// (all 5 suffixed keys) and a row appears here with zero edits to this file.
export const BrandAndSemantic: Story = {
  render: () => (
    <Container size={900} p="xl">
      <Stack gap="lg">
        {semanticRoles.map((role) => (
          <RoleRow
            key={role}
            name={role}
            base={color[role]}
            foreground={color[`${role}Foreground`]}
            hover={color[`${role}Hover`]}
            soft={color[`${role}Soft`]}
            softForeground={color[`${role}SoftForeground`]}
            softStrong={(color as Record<string, string>)[`${role}SoftStrong`]}
          />
        ))}

        {/* not a role (no hover/soft — see the earlier "destructive/ink3"
            question) — komanda's ONE gradient (.primary.askbtn on the
            assistant dock) and the scrim backdrop behind its overlay panel
            (full demo: Foundation/Surface's `scrim` variant story). */}
        <Flex direction="column" gap="xs">
          <Text as="span" size="footnote" weight={600} color={color.mutedForeground} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>gradient &amp; scrim</Text>
          <Flex gap="sm">
            <Flex direction="column" gap="xs" align="center">
              <Box width={84} style={{ height: 44, backgroundImage: color.accentGradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
                <Text as="span" size="footnote" weight={600} color={color.secondary}>Aa</Text>
              </Box>
              <Text as="span" size="footnote" color={color.mutedForeground}>accentGradient</Text>
            </Flex>
            <Flex direction="column" gap="xs" align="center">
              <Box
                width={84}
                style={{
                  height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundImage: `linear-gradient(135deg, ${color.accent}, ${color.plum})`,
                }}
                radius="lg"
              >
                <Box style={{ background: color.scrim, backdropFilter: 'blur(4px)', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
                  <Text as="span" size="footnote" weight={600} color={color.secondary}>Aa</Text>
                </Box>
              </Box>
              <Text as="span" size="footnote" color={color.mutedForeground}>scrim (on a busy bg)</Text>
            </Flex>
            <Flex direction="column" gap="xs" align="center">
              {/* wash is a 3% darkening — show it ON the page bg, framed by
                  the paper card it wraps in LayeredCard */}
              <Box width={84} style={{ height: 44, background: color.wash, display: 'flex', alignItems: 'center', justifyContent: 'center' }} radius="lg">
                <Box style={{ background: color.secondary, padding: '4px 10px' }} radius="md">
                  <Text as="span" size="footnote" weight={600}>Aa</Text>
                </Box>
              </Box>
              <Text as="span" size="footnote" color={color.mutedForeground}>wash (LayeredCard)</Text>
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </Container>
  ),
}

// From `chartKeys` (tokens.ts) — a 6th chart color added to `color` shows up
// here automatically. (Auditing this against the fix for `scrim`/`danger`
// also caught a real mistake in the old hand-written version: chart5 used
// to override to a dark foreground — measured contrast is actually 5.41:1
// for white vs. 2.58:1 for ink, so the override was making legibility
// *worse*, not better. Dropped.)
export const Charts: Story = {
  render: () => (
    <Container size={900} p="xl">
      <Stack gap="lg">
        <Flex gap="md">
          {chartKeys.map((key) => <Swatch key={key} name={key} value={color[key]} />)}
        </Flex>
        {/* data-viz companions outside the chartN pattern: the quiet chart
            backdrop and the waveform's idle-bar sand (played bars recolor
            to accent — see WaveformPlayer) */}
        <Flex gap="md">
          <Swatch name="chartSurface" value={color.chartSurface} fg={color.foreground} />
          <Swatch name="sand" value={color.sand} fg={color.foreground} />
        </Flex>
      </Stack>
    </Container>
  ),
}
