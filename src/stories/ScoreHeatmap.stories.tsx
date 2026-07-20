import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScoreHeatmap } from '@/components/composed/ScoreHeatmap'
import { Surface } from '@/foundation'
import { TimeTag } from '@/components/composed/TimeTag'

/*
 * ScoreHeatmap — dialog-v2's criteria row: soft-tinted fraction cells
 * (SoftStrong foreground — data-grade contrast) + a detail panel that
 * inherits the selected cell's tint. Opens on the WORST cell by default.
 */
const meta: Meta<typeof ScoreHeatmap> = {
  title: 'Components/ScoreHeatmap',
  component: ScoreHeatmap,
}
export default meta
type Story = StoryObj<typeof ScoreHeatmap>

export const Default: Story = {
  render: () => (
    <Surface variant="panel" radius="xl" style={{ padding: '16px 20px', maxWidth: 840 }}>
      <ScoreHeatmap
        total={{ earned: 6, max: 14 }}
        groups={[
          {
            name: 'Приветствие', earned: 0, max: 1,
            subs: [{ name: 'Фирменное приветствие', score: '0/1' }],
            evidence: <>Поздоровался стандартно, проигнорировав фирменное приветствие. <TimeTag time="00:00" onClick={() => {}} /></>,
            quote: 'Доброе утро.',
          },
          { name: 'Выявление потребностей', earned: 0, max: 2, subs: [{ name: 'Открытые вопросы', score: '0/2' }], evidence: 'Не задавал открытых вопросов о предпочтениях гостя.' },
          { name: 'Допродажи', earned: 0, max: 4, subs: [{ name: 'Попытка допродажи', score: '0/1' }, { name: 'Техника допродажи', score: '0/2' }, { name: 'Допродажа объёма', score: '—' }], evidence: 'Не предложил напиток к сэндвичу.' },
          { name: 'Карта лояльности', earned: 2, max: 2, subs: [{ name: 'Вопрос о карте', score: '1/1' }, { name: 'Работа с бонусами', score: '1/1' }], evidence: 'Своевременно уточнил наличие карты.', quote: 'Карту, пожалуйста.' },
          { name: 'Завершение', earned: 1, max: 1, evidence: 'Озвучил итоговую сумму.' },
          { name: 'Коммуникация', earned: 3, max: 4, subs: [{ name: 'Доброжелательность', score: '1/2' }, { name: 'Слова-паразиты', score: '2/2' }], evidence: 'Нейтрально-вежливый тон.' },
        ]}
      />
    </Surface>
  ),
}
