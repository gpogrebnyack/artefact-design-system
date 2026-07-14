import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from '@/components/ui/empty'
import { Button } from '@/components/ui/button'
import { Icon } from '@/primitives/Icon'

// A Components-tier composite: Empty + our Icon primitive + Button primitive.
const meta: Meta<typeof Empty> = {
  title: 'Components/Empty',
  component: Empty,
}
export default meta
type Story = StoryObj<typeof Empty>

export const Default: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name="warning" />
        </EmptyMedia>
        <EmptyTitle>Нет данных за этот период</EmptyTitle>
        <EmptyDescription>
          Попробуйте выбрать другую неделю — за «17–23 июня» пока нет ни одной оценки.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Empty className="w-96">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Icon name="team" />
        </EmptyMedia>
        <EmptyTitle>Пока никого не назначили на этот адрес</EmptyTitle>
        <EmptyDescription>
          На «Серебренниковская 20» распознано 3 новых голоса — присвойте им имена, чтобы начать
          считать их работу.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">Разметить голоса</Button>
      </EmptyContent>
    </Empty>
  ),
}
