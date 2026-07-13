import type { Meta, StoryObj } from '@storybook/react-vite'
import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent } from '@/components/ui/card'
import { Flex, Stack } from '@/foundation'

/*
 * Skeleton — loading placeholder. Vendored because the system had ZERO
 * loading-state coverage: any page hitting a real API would hand-roll a
 * pulsing div. Shape the skeleton like the content it replaces (avatar
 * circle + two text lines for an entity card), not as one big grey block.
 */
const meta: Meta<typeof Skeleton> = {
  title: 'Primitives/Skeleton',
  component: Skeleton,
}
export default meta
type Story = StoryObj<typeof Skeleton>

export const TextLines: Story = {
  render: () => (
    <Stack gap="sm" style={{ width: 260 }}>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </Stack>
  ),
}

export const EntityCardLoading: Story = {
  render: () => (
    <Card style={{ width: 320 }}>
      <CardContent>
        <Flex align="center" gap="sm">
          <Skeleton className="size-8 rounded-full" />
          <Stack gap="xs" grow>
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-1/3" />
          </Stack>
        </Flex>
      </CardContent>
    </Card>
  ),
}
