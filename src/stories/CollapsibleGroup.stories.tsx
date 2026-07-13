import type { Meta, StoryObj } from '@storybook/react-vite'
import { CollapsibleGroup } from '@/components/composed/CollapsibleGroup'
import { StatusBadge } from '@/components/composed/SemanticTone'
import { Grid, Surface } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * CollapsibleGroup — komanda's .addr-group formalized: group header
 * (title + count + extra badge + rotating chevron) over collapsible body.
 * Two consumer sessions had re-implemented this state by hand.
 */
const meta: Meta<typeof CollapsibleGroup> = {
  title: 'Components/CollapsibleGroup',
  component: CollapsibleGroup,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof CollapsibleGroup>

function DemoCard({ label }: { label: string }) {
  return (
    <Surface variant="paper" p="base" radius="xl">
      <Text>{label}</Text>
    </Surface>
  )
}

export const AddressGroup: Story = {
  render: () => (
    <CollapsibleGroup
      title="Советская 5"
      count="2 человека"
      extra={<StatusBadge tone="accent">1 неизвестный</StatusBadge>}
    >
      <Grid minColWidth={280} gap="base">
        <DemoCard label="Александра Шипилова" />
        <DemoCard label="Неизвестный сотрудник" />
      </Grid>
    </CollapsibleGroup>
  ),
}

export const StartsCollapsed: Story = {
  render: () => (
    <CollapsibleGroup title="Кирова 113/2" count="0 человек" defaultOpen={false}>
      <DemoCard label="Точка в обработке" />
    </CollapsibleGroup>
  ),
}
