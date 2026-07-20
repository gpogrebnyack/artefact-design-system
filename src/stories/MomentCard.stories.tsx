import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { MomentCard, MomentStrip } from '@/components/composed/MomentCard'
import { Surface } from '@/foundation'

/*
 * MomentCard / MomentStrip — dialog-v2's chronology: verdict cards in a
 * horizontally scrolling strip, dashed "recording cut off" terminal card.
 * Click = the playing moment (accent outline — a selection state).
 */
const meta: Meta<typeof MomentCard> = {
  title: 'Components/MomentCard',
  component: MomentCard,
}
export default meta
type Story = StoryObj<typeof MomentCard>

function Demo() {
  const [active, setActive] = useState<number | null>(2)
  const moments = [
    { id: 0, t: '00:00 – 00:01', tone: 'accent' as const, crit: 'Приветствие', desc: 'Поздоровался стандартно, без фирменного «Бодрый день».', quote: 'Доброе утро.' },
    { id: 2, t: '00:05 – 00:08', tone: 'accent' as const, crit: 'Допродажи', desc: 'Уточнил подогрев, но не предложил напиток.', quote: 'Сэндвич подогреть?' },
    { id: 3, t: '00:15 – 00:17', tone: 'success' as const, crit: 'Карта лояльности', desc: 'Своевременно уточнил наличие карты.', quote: 'Карту, пожалуйста.' },
  ]
  return (
    <Surface variant="panel" radius="xl" style={{ overflow: 'hidden', maxWidth: 840 }}>
      <MomentStrip>
        {moments.map((m) => (
          <MomentCard
            key={m.id}
            time={m.t}
            tone={m.tone}
            title={m.crit}
            description={m.desc}
            quote={m.quote}
            highlighted={active === m.id}
            onClick={() => setActive(m.id)}
          />
        ))}
        <MomentCard time="00:22" tone="end" title="Запись обрывается" description="Прощание не попало в запись — оценить его невозможно." />
      </MomentStrip>
    </Surface>
  )
}

export const Strip: Story = {
  render: () => <Demo />,
}
