import type { Meta, StoryObj } from '@storybook/react-vite'
import { Box, Container, Flex, Stack, color, breakpoint } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * Foundation/Breakpoints — the TWO breakpoints of the system (tokens.ts
 * `breakpoint`), deliberately not a full sm/md/lg/xl scale: grids size
 * themselves via Grid's auto-fit, media queries exist only where layout
 * STRUCTURE changes. Documented as a foundation page per the standard
 * (Carbon's 2x Grid, Polaris's layout docs); was a token family with no
 * Storybook presence at all.
 */
const meta: Meta = { title: 'Foundation/Breakpoints', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const POINTS = [
  {
    name: 'rail',
    px: breakpoint.rail,
    what: 'ниже — TitledRow складывает боковые рейлы в колонку (row.css); заголовки/side теряют sticky',
  },
  {
    name: 'sidebar',
    px: breakpoint.sidebar,
    what: 'ниже — SidebarNav переходит в мобильный вид (SidebarNav.css)',
  },
] as const

const MAX = 1280

export const TwoBreakpoints: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="lg">
        <Text as="div" size="caption" color={color.mutedForeground}>
          Полной responsive-шкалы нет намеренно: ширину сеток решает Grid (auto-fit),
          брейкпоинт появляется только там, где меняется СТРУКТУРА лейаута.
          Нужен третий — сначала проверь, не решается ли это minColWidth (DESIGN.md → Layout).
        </Text>
        <Stack gap="md">
          {POINTS.map((p) => (
            <Stack key={p.name} gap="xs">
              <Flex align="center" gap="md">
                <Text as="span" size="body" weight={600} style={{ width: 88 }}>{p.name}</Text>
                <Text as="span" size="caption" style={{ fontVariantNumeric: 'tabular-nums' }}>{p.px}px</Text>
              </Flex>
              {/* the bar is the 0..1280 page width; the fill shows where the
                  breakpoint sits on it */}
              <Box radius="pill" style={{ height: 10, background: color.muted, position: 'relative', overflow: 'hidden' }}>
                <Box
                  radius="pill"
                  style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: `${(p.px / MAX) * 100}%`, background: color.sand }}
                />
              </Box>
              <Text as="span" size="footnote" color={color.mutedForeground}>{p.what}</Text>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Container>
  ),
}
