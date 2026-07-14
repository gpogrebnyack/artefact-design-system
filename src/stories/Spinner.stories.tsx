import type { Meta, StoryObj } from '@storybook/react-vite'
import { Spinner } from '@/components/ui/spinner'
import { Flex } from '@/foundation'
import { Button } from '@/components/ui/button'

/*
 * Spinner — a Loader2Icon wrapper (lucide, not Phosphor — the one deliberate
 * exception to the Icon-registry rule, since it's a fixed animated glyph,
 * not a swappable vocabulary entry). Exported with zero story coverage; the
 * in-button loading state below is the real, common use.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Primitives/Spinner',
  component: Spinner,
}
export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = { render: () => <Spinner /> }

export const Sizes: Story = {
  render: () => (
    <Flex align="center" gap="base" wrap={false}>
      <Spinner className="size-3" />
      <Spinner className="size-4" />
      <Spinner className="size-6" />
      <Spinner className="size-8" />
    </Flex>
  ),
}

export const InButton: Story = {
  render: () => (
    <Button disabled>
      <Spinner className="size-4" /> Сохраняем…
    </Button>
  ),
}
