import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Container, Flex, Stack, color, motion } from '@/foundation'
import { Text } from '@/foundation'
import './FoundationMotion.css'

/*
 * Foundation/Motion — the duration/easing tokens (tokens.ts `motion`) made
 * visible. Every major system documents motion as a foundation page
 * (Polaris, Carbon, Material) — ours had the tokens and the DESIGN.md
 * rules but no gallery: the exact "scrim shipped invisible" failure mode,
 * for a whole token family. Hover a row to see its timing live.
 *
 * The rules (DESIGN.md → Motion): fast = hover/press feedback; base =
 * small reveals (chevron, opacity); slow ALWAYS pairs with `spring` for
 * panel morphs; `ease` where overshoot would look like a mistake
 * (color/opacity).
 */
const meta: Meta = { title: 'Foundation/Motion', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const DURATIONS = [
  { name: 'fast', value: motion.fast, use: 'hover/press-фидбэк' },
  { name: 'base', value: motion.base, use: 'мелкие появления: шеврон, opacity' },
  { name: 'slow', value: motion.slow, use: 'морфы панелей — всегда в паре со spring' },
] as const

const EASINGS = [
  { name: 'spring', value: motion.spring, use: 'фирменный overshoot — морф панели, модалка' },
  { name: 'ease', value: motion.ease, use: 'без overshoot — цвет, fade текста' },
] as const

export const DurationsAndEasings: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="lg">
        <Text as="div" size="caption" color={color.mutedForeground}>
          Наведи на строку — плашка проедет со своей длительностью/кривой.
        </Text>
        <Stack gap="sm">
          {DURATIONS.map((d) => (
            <Flex key={d.name} align="center" gap="md" className="artefact-motion-row">
              <Box
                className="artefact-motion-dot"
                radius="pill"
                style={{ background: color.primary, transitionDuration: d.value, transitionTimingFunction: motion.ease }}
              />
              <Text as="span" size="caption" style={{ width: 120, fontVariantNumeric: 'tabular-nums' }}>
                {d.name} — {d.value}
              </Text>
              <Text as="span" size="caption" color={color.mutedForeground}>{d.use}</Text>
            </Flex>
          ))}
        </Stack>
        <Stack gap="sm">
          {EASINGS.map((e) => (
            <Flex key={e.name} align="center" gap="md" className="artefact-motion-row">
              <Box
                className="artefact-motion-dot"
                radius="pill"
                style={{ background: color.accent, transitionDuration: motion.slow, transitionTimingFunction: e.value }}
              />
              <Text as="span" size="caption" style={{ width: 120 }}>{e.name}</Text>
              <Text as="span" size="caption" color={color.mutedForeground}>{e.use}</Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Container>
  ),
}
