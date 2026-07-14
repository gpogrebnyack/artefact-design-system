import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Flex, color } from '@/foundation'
import { Text } from '@/primitives/Text'
import { SemanticAvatarFallback } from '@/components/composed/SemanticTone'

const meta: Meta<typeof Avatar> = {
  title: 'Primitives/Avatar',
  component: Avatar,
}
export default meta
type Story = StoryObj<typeof Avatar>

// A real, loadable inline-SVG "photo" (data URI) — no external request.
const PHOTO =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">' +
      '<rect width="80" height="80" fill="#c9a26b"/>' +
      '<circle cx="40" cy="32" r="16" fill="#f6ead6"/>' +
      '<circle cx="40" cy="78" r="26" fill="#f6ead6"/>' +
    '</svg>'
  )

// --- the ACTUAL Avatar behavior (Radix Root/Image/Fallback), which shadcn
//     gives correct out of the box — the exact thing we hand-rebuilt in the
//     vanilla kit yesterday. ---

// Image loads → photo shown, fallback never appears.
export const WithImage: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src={PHOTO} alt="Мария Кузнецова" />
      <AvatarFallback>МК</AvatarFallback>
    </Avatar>
  ),
}

/* Both fallback paths on ONE page — they render identically (МК), and two
 * indistinguishable sidebar entries read as a duplicate (caught in review).
 * They still exercise DIFFERENT machinery: a broken src goes through
 * Radix's load-error handling (the whole point of Avatar — this is the
 * case that catches a broken vendored update), no-image skips loading
 * entirely (the "no photo in data" composition). */
export const Fallbacks: Story = {
  render: () => (
    <Flex gap="lg" align="center">
      <Flex direction="column" gap="xs" align="center">
        <Avatar size="lg">
          <AvatarImage src="https://invalid.example/nope.jpg" alt="" />
          <AvatarFallback>МК</AvatarFallback>
        </Avatar>
        <Text as="span" size="footnote" color={color.mutedForeground}>битый src → фолбэк</Text>
      </Flex>
      <Flex direction="column" gap="xs" align="center">
        <Avatar size="lg"><AvatarFallback>МК</AvatarFallback></Avatar>
        <Text as="span" size="footnote" color={color.mutedForeground}>без фото → сразу фолбэк</Text>
      </Flex>
    </Flex>
  ),
}

// --- tone is data-driven (score band / role), applied to the fallback via our
//     tokens — Radix's spec has no tones, same as our vanilla approach. ---
/* Role tones come from SemanticAvatarFallback (Components tier) — NOT a
 * hand-rolled `style={{background: color.greenSoft, ...}}`: that inline
 * copy-paste is exactly the pattern the component was created to kill,
 * and an earlier version of THIS story was teaching it. Full tone story:
 * Components/SemanticAvatarFallback. */
export const WithSemanticTone: Story = {
  render: () => (
    <Flex gap="sm" align="center">
      <Avatar size="lg"><SemanticAvatarFallback tone="green">ТК</SemanticAvatarFallback></Avatar>
      <Avatar size="lg"><SemanticAvatarFallback tone="warn">АШ</SemanticAvatarFallback></Avatar>
      <Avatar size="lg"><SemanticAvatarFallback tone="muted">А</SemanticAvatarFallback></Avatar>
    </Flex>
  ),
}
