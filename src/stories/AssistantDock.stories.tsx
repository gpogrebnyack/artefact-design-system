import type { Meta, StoryObj } from '@storybook/react-vite'
import { AssistantDock } from '@/sections/AssistantDock'
import { color } from '@/foundation'

/*
 * Sections/AssistantDock — komanda.html's floating AI-assistant dock,
 * rebuilt with the real state machine (click the button to open; close and
 * scroll down first to see it collapse to the floating "orb" instead of the
 * idle pill). Chip answers are the source's own verbatim canned copy about
 * real people in komanda.html's dataset (Александра Шипилова, Алина,
 * Кирилл...), not placeholder text.
 */
const meta: Meta<typeof AssistantDock> = {
  title: 'Sections/AssistantDock',
  component: AssistantDock,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ minHeight: '1400px', background: color.background, position: 'relative' }}>
        <div style={{ padding: 24, color: color.mutedForeground, maxWidth: 600 }}>
          Прокрути вниз, нажми на плашку ассистента, закрой — вернётся не пилюля, а плавающий "орб" (если проскроллено &gt; 120px). Это настоящая state-машина, не статичный кадр.
        </div>
        <Story />
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof AssistantDock>

export const Default: Story = {
  args: {
    chips: [
      {
        question: 'Кто требует внимания?',
        answer: (
          <>
            Внимание двум адресам и людям. <strong>Александра Шипилова</strong> (Советская 5) — оценка 5,0 и самый
            большой недобор на допродажах: <strong>59 968 ₽</strong>. <strong>Алина</strong> (Большевистская) тоже
            теряет много — 28 297 ₽ при 244 заказах. И <strong>Яна</strong> почти не выходила (2 заказа за неделю).
            Им — личный разбор и фокус-задача по допродаже.
          </>
        ),
      },
      {
        question: 'Где теряем на допродажах?',
        answer: (
          <>
            Топ недобора на допродажах за неделю: <strong>Александра Шипилова — 59 968 ₽</strong>, Алина — 28 297 ₽,
            Кирилл — 21 989 ₽, Анастасия — 13 627 ₽. Это первоочередные кандидаты на фокус: открой профиль — там
            готовые рекомендации и тренировка.
          </>
        ),
      },
      {
        question: 'Какой адрес сильнее?',
        answer: (
          <>
            Сильнее всех <strong>Большевистская 35</strong>: там и лидер Татьяна Климова (7,1), и самая ровная
            команда. Слабее всего <strong>Советская 5</strong> — низкая оценка и огромный недобор на допродажах. На
            Кирова 113/2 ещё идёт сбор записей, а на Серебренниковской и Советской есть нераспознанные голоса —
            стоит присвоить им имена.
          </>
        ),
      },
    ],
  },
}
