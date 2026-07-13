import type { Meta, StoryObj } from '@storybook/react-vite'
import { SemanticAvatarFallback } from '@/components/composed/SemanticTone'
import { Avatar } from '@/components/ui/avatar'
import { Flex } from '@/foundation'
import { semanticRoles } from '@/foundation'

/*
 * SemanticAvatarFallback — the vivid (base/Foreground) pair of a semantic
 * role on an Avatar, vs StatusBadge's pale Soft pair. See SemanticTone.tsx
 * for why the two pairs must not be swapped. Maps over `semanticRoles` so a
 * new role appears here with zero edit.
 */
const meta: Meta = { title: 'Components/SemanticAvatarFallback' }
export default meta
type Story = StoryObj

export const AllTones: Story = {
  render: () => (
    <Flex gap="sm" align="center">
      {semanticRoles.map((tone) => (
        <Avatar key={tone}>
          <SemanticAvatarFallback tone={tone}>{tone.slice(0, 2).toUpperCase()}</SemanticAvatarFallback>
        </Avatar>
      ))}
    </Flex>
  ),
}
