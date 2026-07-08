import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge, SemanticAvatarFallback } from '@/components/composed/SemanticTone'
import { Avatar } from '@/components/ui/avatar'
import { Flex } from '@/foundation'
import { semanticRoles } from '@/foundation'

/*
 * SemanticTone — StatusBadge/SemanticAvatarFallback map our OWN semantic
 * roles onto Badge/Avatar, which have no notion of them out of the box.
 * Both stories map over `semanticRoles` (tokens.ts) instead of hand-listing
 * — a 6th role added there shows up here with zero edit, same reasoning as
 * Foundation/Colors' Charts story.
 */
const meta: Meta = { title: 'Components/SemanticTone' }
export default meta
type Story = StoryObj

const LABELS: Record<string, string> = {
  accent: 'Требует внимания',
  green: 'Растёт',
  warn: 'Низкая оценка',
  plum: 'Управляющий сетью',
  danger: 'Доступ отозван',
}

export const Badges: Story = {
  render: () => (
    <Flex gap="sm" wrap>
      {semanticRoles.map((tone) => (
        <StatusBadge key={tone} tone={tone}>
          {LABELS[tone] ?? tone}
        </StatusBadge>
      ))}
    </Flex>
  ),
}

export const Avatars: Story = {
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
