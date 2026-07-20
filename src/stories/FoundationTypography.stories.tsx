import type { Meta, StoryObj } from '@storybook/react-vite'
import { Container, Stack, Flex, type as typeScale, fontWeight, color, Text as T, Heading as H } from '@/foundation'

/*
 * Foundation/Typography — the whole typography reference in one place, four
 * stories: Weights · Text (size ramp) · Heading (size ramp) · Colors.
 * (Text and Heading are the two primitives; their API is documented in
 * COMPONENTS.md — these stories are the visual reference, not per-component
 * autodocs.)
 */
const meta: Meta = { title: 'Foundation/Typography', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const SIZES = Object.keys(typeScale) as (keyof typeof typeScale)[]

// 1) Weights — the three Struve faces as named tokens; applied via weight="…".
export const Weights: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="sm">
        {(Object.keys(fontWeight) as (keyof typeof fontWeight)[]).map((w) => (
          <T key={w} as="div" size="body" weight={w}>
            {w} ({fontWeight[w]}) — {w === 'regular' ? 'обычный текст' : w === 'medium' ? 'UI-хром: кнопки, чипы, подписи' : 'акцент: имена, заголовки, значения'}
          </T>
        ))}
        <T as="div" size="body" color={color.mutedForeground}>Курсива нет: цитата — «ёлочки» и подложка, не наклон.</T>
      </Stack>
    </Container>
  ),
}

// 2) Text — the size ramp on Text (prose leading). Meta = size · lh · ls per step.
export const Text: Story = {
  render: () => (
    <Container size={820} p="xl">
      <Stack gap="lg">
        {SIZES.map((s) => (
          <Flex key={s} align="baseline" gap="lg" wrap={false}>
            <T as="div" size={s} style={{ flex: 1 }}>{s} — съешь ещё этих булочек</T>
            <T as="span" size="footnote" color={color.mutedForeground} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
              {typeScale[s].size}px · lh {typeScale[s].lineHeight} · ls {typeScale[s].letterSpacing}
            </T>
          </Flex>
        ))}
      </Stack>
    </Container>
  ),
}

// 3) Heading — the SAME size ramp, same layout as Text, so you can compare
// side by side: identical sizes, but tighter leading (metadata shows the
// Heading line-height). H1–H6 via `as`, size via `size` — both full scale.
export const Heading: Story = {
  render: () => (
    <Container size={820} p="xl">
      <Stack gap="lg">
        {SIZES.map((s) => (
          <Flex key={s} align="baseline" gap="lg" wrap={false}>
            <H as="div" size={s} style={{ flex: 1 }}>{s} — Команда</H>
            <T as="span" size="footnote" color={color.mutedForeground} style={{ fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
              {typeScale[s].size}px · lh {Math.min(Number(typeScale[s].lineHeight), 1.25)} · ls {typeScale[s].letterSpacing}
            </T>
          </Flex>
        ))}
      </Stack>
    </Container>
  ),
}

// 4) Colors — type in the semantic color roles. The roles themselves live in
// Foundation/Colors; this just shows them applied to text.
export const Colors: Story = {
  render: () => (
    <Container size={700} p="xl">
      <Stack gap="xs">
        <T as="div" size="body">Основной текст — foreground</T>
        <T as="div" size="body" color={color.mutedForeground}>Вторичный — mutedForeground</T>
        <T as="div" size="body" color={color.textTertiary}>Третичный — textTertiary</T>
        <T as="div" size="caption" weight="semibold" color={color.success}>Высокая оценка — success</T>
        <T as="div" size="caption" weight="semibold" color={color.warning}>Мало смен — warning</T>
        <T as="div" size="caption" weight="semibold" color={color.accent}>Требует внимания — accent</T>
        <T as="div" size="caption" weight="semibold" color={color.danger}>Ошибка — danger</T>
      </Stack>
    </Container>
  ),
}
