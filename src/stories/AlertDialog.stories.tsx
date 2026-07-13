import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { color } from '@/foundation'

/*
 * AlertDialog — blocking confirm for destructive actions. Vendored because
 * the system HAD the `danger` role and the rule ("danger is for genuinely
 * destructive/confirm-delete actions") but no component to express it —
 * the rule pointed at a component that didn't exist. The confirm button is
 * the ONE legitimate place for a danger-filled button.
 */
const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog',
  component: AlertDialog,
}
export default meta
type Story = StoryObj<typeof AlertDialog>

export const DestructiveConfirm: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Отозвать доступ</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Отозвать доступ в приложение?</AlertDialogTitle>
          <AlertDialogDescription>
            Сотрудник сразу потеряет вход в приложение. Историю оценок это не удалит.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction style={{ background: color.danger, color: color.dangerForeground }}>
            Отозвать
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
}
