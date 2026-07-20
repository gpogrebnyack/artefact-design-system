import type { Meta, StoryObj } from '@storybook/react-vite'
import { SummaryNote, SummaryStat } from '@/components/composed/SummaryNote'

/*
 * SummaryNote + SummaryStat — the AI prose summary with inline clickable
 * stats (komanda's .summary/.stat). The most re-hand-built pattern in the
 * project's history: two consumer sessions AND the Pages/Komanda rebuild
 * assembled it from scratch before this export existed.
 */
const meta: Meta<typeof SummaryNote> = {
  title: 'Components/SummaryNote',
  component: SummaryNote,
  parameters: { layout: 'padded' },
}
export default meta
type Story = StoryObj<typeof SummaryNote>

export const ClickableStats: Story = {
  render: () => (
    <SummaryNote label="Сводка команды">
      Сильнее всех команда <SummaryStat tone="success" onClick={() => {}}>Большевистская 35</SummaryStat>,
      у них есть чему поучиться. Самый большой недобор на допродажах на{' '}
      <SummaryStat tone="accent" onClick={() => {}}>Советская 5</SummaryStat>.{' '}
      <SummaryStat tone="muted" onClick={() => {}}>Распознано 3 новых голоса</SummaryStat> — их нужно
      сопоставить с сотрудниками. Доступ в приложение пока выдан 2 из 14 линейных.
    </SummaryNote>
  ),
}

export const StaticStats: Story = {
  render: () => (
    <SummaryNote label="Сводка недели">
      Средний чек вырос до <SummaryStat tone="success">468 ₽</SummaryStat>, недобор на допродажах
      сократился до <SummaryStat tone="accent">−12 400 ₽</SummaryStat>. Без onClick вставка —
      просто подсветка, не кнопка.
    </SummaryNote>
  ),
}
