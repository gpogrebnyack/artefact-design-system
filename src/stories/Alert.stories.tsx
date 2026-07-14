import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'

/*
 * Alert — a STATIC notice (title + text), one axis: variant.
 * What it is NOT (both were taught here before, caught in review):
 * - the product banner with an action button («Распознано N голосов» +
 *   «Разметить») — that's the Surface variant="muted" + Button recipe
 *   (see Pages/Komanda and the Surface row in COMPONENTS.md); an Alert
 *   with a button inside is a second, competing recipe for the same thing;
 * - an attention-grade metric notice — «требует внимания» is the ACCENT
 *   language (DESIGN.md: просевшая метрика — accent, не danger).
 *   variant="destructive" is for hard errors and destructive outcomes only.
 */
const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert }
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Запись обрабатывается</AlertTitle>
      <AlertDescription>
        Оценка диалога появится в течение часа после смены.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTitle>Не удалось получить записи</AlertTitle>
      <AlertDescription>
        Точка «Советская 5» не выходит на связь с 9:00 — проверьте питание регистратора.
      </AlertDescription>
    </Alert>
  ),
}
