import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,
  DialogTitle, DialogTrigger,
} from '@/components/ui/dialog'

const meta: Meta = { title: 'Primitives/Dialog' }
export default meta
type Story = StoryObj

export const NameEmployeeDialog: Story = {
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

export const RemoveAccessConfirm: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button variant="destructive">Забрать доступ</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Забрать доступ у Кирилла?</DialogTitle>
          <DialogDescription>
            Сотрудник потеряет доступ в приложение на Большевистской 35. Действие можно отменить позже.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary">Отмена</Button>
          <Button variant="destructive">Забрать доступ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
