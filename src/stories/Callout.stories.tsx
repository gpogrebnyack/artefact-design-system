import type { Meta, StoryObj } from '@storybook/react-vite'
import { Callout } from '@/components/composed/Callout'
import { SparkLink } from '@/components/composed/SparkLink'
import { Stack } from '@/foundation'

const meta: Meta<typeof Callout> = { title: 'Components/Callout', component: Callout }
export default meta
type Story = StoryObj<typeof Callout>

// Сигнал «требует внимания» + вариант «сила» — на одной muted-поверхности, цветом красится только иконка.
export const Signals: Story = {
  render: () => (
    <Stack gap="sm" style={{ maxWidth: 760 }}>
      <Callout
        icon="warning" tone="accent"
        title="Разбор с низкой оценкой сегодня"
        action={<SparkLink>Открыть разбор</SparkLink>}
      >
        Александра Шипилова · 5,2 — приветствие пропущено, но допродажа удалась.
      </Callout>
      <Callout
        icon="trophy" tone="success"
        title="Допродажи выше сети вторую неделю"
        action={<SparkLink>Разобрать</SparkLink>}
      >
        +5 п.п. к среднему — сильная сторона точки.
      </Callout>
      <Callout icon="users" tone="ink" title="Запись видна команде" />
    </Stack>
  ),
}
