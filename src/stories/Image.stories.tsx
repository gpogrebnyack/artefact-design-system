import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from '@/primitives/Image'
import { color, radius } from '@/foundation'

// Inline SVG data URIs — real, loadable "photos" with no external request.
const PORTRAIT =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">' +
      '<rect width="200" height="200" fill="#c9a26b"/>' +
      '<circle cx="100" cy="80" r="40" fill="#f6ead6"/>' +
      '<circle cx="100" cy="195" r="65" fill="#f6ead6"/>' +
    '</svg>'
  )

const LANDSCAPE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">' +
      '<rect width="320" height="180" fill="#f1ece1"/>' +
      '<rect x="0" y="120" width="320" height="60" fill="#eaf2ea"/>' +
      '<circle cx="260" cy="40" r="24" fill="#fdeee5"/>' +
    '</svg>'
  )

const meta: Meta<typeof Image> = { title: 'Primitives/Image', component: Image }
export default meta
type Story = StoryObj<typeof Image>

// A square profile photo, cropped to fill regardless of source aspect ratio.
export const Portrait: Story = {
  render: () => (
    <Image src={PORTRAIT} alt="Фото сотрудника Татьяны Климовой" width={96} height={96} fit="cover" radius="lg" />
  ),
}

// A wide illustration, contained (not cropped) inside its box — e.g. an
// EmptyState or Hero image slot further up the hierarchy.
export const Contain: Story = {
  render: () => (
    <div style={{ width: 320, height: 180, background: color.muted, borderRadius: radius.lg }}>
      <Image src={LANDSCAPE} alt="Иллюстрация: адрес Большевистская 35" width="100%" height="100%" fit="contain" />
    </div>
  ),
}

/* No RadiusSteps story: `radius` is a pass-through to the Foundation scale
 * (already visible on Portrait) — the scale itself is documented ONCE, in
 * Foundation/Radius. Scale-prop pass-throughs don't get their own stories. */
