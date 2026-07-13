import type { Meta, StoryObj } from '@storybook/react-vite'
import { StatusBadge } from '@/components/composed/SemanticTone'
import { Flex } from '@/foundation'
import { semanticRoles } from '@/foundation'

/*
 * StatusBadge — maps our OWN semantic roles onto Badge, which has no notion
 * of them out of the box. Maps over `semanticRoles` (tokens.ts) instead of
 * hand-listing — a 6th role added there shows up here with zero edit.
 *
 * Was previously hidden under a story titled after its FILE
 * (Components/SemanticTone) — an agent searching the sidebar for
 * "StatusBadge" found nothing. Story titles follow export names now.
 */
const meta: Meta = { title: 'Components/StatusBadge' }
export default meta
type Story = StoryObj

const LABELS: Record<string, string> = {
  accent: 'Требует внимания',
  green: 'Растёт',
  warn: 'Низкая оценка',
  plum: 'Управляющий сетью',
  danger: 'Доступ отозван',
}

export const AllTones: Story = {
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
