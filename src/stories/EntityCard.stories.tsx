import type { Meta, StoryObj } from '@storybook/react-vite'
import { EntityCard } from '@/components/composed/EntityCard'
import { MetricRow } from '@/components/composed/MetricRow'
import { StatusBadge } from '@/components/composed/SemanticTone'
import { StatusDot } from '@/components/composed/StatusDot'
import { Button } from '@/components/ui/button'
import { Grid } from '@/foundation'

const meta: Meta<typeof EntityCard> = { title: 'Components/EntityCard', component: EntityCard }
export default meta
type Story = StoryObj<typeof EntityCard>

// Ростер точки: лидер, редкое сочетание (низкая оценка / сильная допродажа), нейтраль.
export const Roster: Story = {
  render: () => (
    <Grid minColWidth={280} gap="base" style={{ maxWidth: 880 }}>
      <EntityCard
        initials="МК" avatarTone="success" name="Марина Котова" subtitle="Бариста · 2 года"
        score="8,6" scoreTone="success"
        tags={<StatusBadge tone="success">Тянет вверх</StatusBadge>}
        metrics={<MetricRow label="Допродажи / нед" value="26 %" delta="+13 п.п. к сети" tone="success" trend="up" />}
        footer={<Button variant="link" size="sm" style={{ alignSelf: 'flex-start' }}>Профиль →</Button>}
        interactive
      />
      <EntityCard
        initials="АШ" avatarTone="muted" name="Александра Шипилова" subtitle="Бариста · 8 мес"
        score="5,2" scoreTone="accent"
        tags={<StatusBadge tone="accent">Низкая оценка</StatusBadge>}
        metrics={<MetricRow label="Допродажи / нед" value="24 %" delta="+11 п.п. к сети" tone="success" trend="up" />}
        footer={<Button variant="link" size="sm" style={{ alignSelf: 'flex-start' }}>Профиль →</Button>}
        interactive
      />
      <EntityCard
        initials="ЕЛ" avatarTone="muted" name="Егор Лапин" subtitle="Кассир · 5 мес"
        score="6,4"
        tags={<StatusBadge tone="muted">В норме</StatusBadge>}
        footer={<StatusDot tone="success">Пользуется ежедневно</StatusDot>}
        interactive
      />
    </Grid>
  ),
}
