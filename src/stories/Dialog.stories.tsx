import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'

/*
 * Dialog — the NEUTRAL modal (closes on Esc / outside click). A blocking
 * confirm for a destructive action is NOT this component: that's
 * AlertDialog (Components/AlertDialog — no outside-click dismiss, and the
 * one legitimate home of a danger-filled button, per COMPONENTS.md). An
 * earlier story here taught exactly that anti-pattern ("Забрать доступ" as
 * a Dialog) — removed.
 */
const meta: Meta = { title: 'Primitives/Dialog' }
export default meta
type Story = StoryObj

// Plain title / description / actions — no form.
export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="secondary">Как считается оценка?</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Как считается оценка</DialogTitle>
          <DialogDescription>
            Средняя по критериям за выбранный период: приветствие, выявление потребностей,
            допродажи, карта лояльности, завершение и коммуникация.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Понятно</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}

// Dialog carrying a form control (the assign-name modal from komanda.html).
export const WithForm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Указать имя</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Неизвестный сотрудник · Серебренниковская 20</DialogTitle>
          <DialogDescription>Мы распознали новый голос и насчитали 8 сэмплов. Присвойте имя.</DialogDescription>
        </DialogHeader>
        <Input placeholder="ФИО сотрудника" />
        <DialogFooter>
          <Button variant="secondary">Отмена</Button>
          <Button>Присвоить имя</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
