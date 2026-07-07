import type { Meta, StoryObj } from '@storybook/react-vite'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { color } from '@/foundation'

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

// Broken src → Image errors, Fallback initials stay (the whole point of Avatar).
export const BrokenImageFallsBack: Story = {
  render: () => (
    <Avatar size="lg">
      <AvatarImage src="https://invalid.example/nope.jpg" alt="" />
      <AvatarFallback>МК</AvatarFallback>
    </Avatar>
  ),
}

// No image → pure fallback initials.
export const FallbackOnly: Story = {
  render: () => (
    <Avatar size="lg"><AvatarFallback>МК</AvatarFallback></Avatar>
  ),
}

// --- tone is data-driven (score band / role), applied to the fallback via our
//     tokens — Radix's spec has no tones, same as our vanilla approach. ---
export const ToneGreen: Story = {
  render: () => (
    <Avatar size="lg"><AvatarFallback className="font-semibold" style={{ background: color.greenSoft, color: color.green }}>ТК</AvatarFallback></Avatar>
  ),
}
export const ToneWarn: Story = {
  render: () => (
    <Avatar size="lg"><AvatarFallback className="font-semibold" style={{ background: color.warnSoft, color: color.warn }}>АШ</AvatarFallback></Avatar>
  ),
}
export const ToneMuted: Story = {
  render: () => (
    <Avatar size="lg"><AvatarFallback className="font-semibold" style={{ background: color.muted, color: color.ink3 }}>А</AvatarFallback></Avatar>
  ),
}
