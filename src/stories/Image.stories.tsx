import type { Meta, StoryObj } from '@storybook/react-vite'
import { Image } from '@/primitives/Image'
import { Flex, color, radius } from '@/foundation'
import { Text } from '@/primitives/Text'

// Inline SVG data URI — a real, loadable «illustration» with no external request.
const LANDSCAPE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="180" viewBox="0 0 320 180">' +
      '<rect width="320" height="180" fill="#f1ece1"/>' +
      '<rect x="0" y="120" width="320" height="60" fill="#eaf2ea"/>' +
      '<circle cx="260" cy="40" r="24" fill="#fdeee5"/>' +
    '</svg>'
  )

/*
 * The page has ONE story because the primitive has ONE axis of its own:
 * `fit`. Everything else passes through — radius to the Foundation scale
 * (documented in Foundation/Radius), loading to the native attribute
 * (lazy by default), alt is enforced by the required prop type. A missing-
 * image fallback is deliberately NOT here: the person-photo case belongs
 * to Avatar's fallback machinery, and no source page needs one for
 * illustrations — «не строим наперёд».
 */
const meta: Meta<typeof Image> = { title: 'Primitives/Image', component: Image }
export default meta
type Story = StoryObj<typeof Image>

// Same image, same box — fit is the only thing changing.
export const Fit: Story = {
  render: () => (
    <Flex gap="lg" align="flex-start">
      {(['cover', 'contain'] as const).map((fit) => (
        <Flex key={fit} direction="column" gap="xs" align="center">
          <div style={{ width: 180, height: 180, background: color.muted, borderRadius: radius.lg, overflow: 'hidden' }}>
            <Image src={LANDSCAPE} alt="" width="100%" height="100%" fit={fit} />
          </div>
          <Text as="span" size="footnote" color={color.mutedForeground}>
            {fit === 'cover' ? 'cover — кроп до заполнения' : 'contain — вписывается целиком'}
          </Text>
        </Flex>
      ))}
    </Flex>
  ),
}
