import type { Meta, StoryObj } from '@storybook/react-vite'
import { toast } from 'sonner'
import { Toaster } from '@/components/ui/sonner'
import { Button } from '@/components/ui/button'

// A Components-tier composite: shadcn's toast system (sonner), themed via our
// tokens (see components/ui/sonner.tsx — --normal-bg/--normal-text/--border-radius
// already resolve against index.css's --popover/--popover-foreground/--radius).
const meta: Meta = { title: 'Components/Toaster' }
export default meta
type Story = StoryObj

export const VoiceTagged: Story = {
  render: () => (
    <>
      <Toaster position="top-center" />
      <Button onClick={() => toast.success('Голос размечен', { description: 'Кирилл · Большевистская 35' })}>
        Разметить голос
      </Button>
    </>
  ),
}

export const ProfileCreated: Story = {
  render: () => (
    <>
      <Toaster position="top-center" />
      <Button onClick={() => toast('Профиль создан', { description: 'Новый сотрудник добавлен в «Советская 5»' })}>
        Создать профиль
      </Button>
    </>
  ),
}

export const AccessRevoked: Story = {
  render: () => (
    <>
      <Toaster position="top-center" />
      <Button
        variant="outline"
        onClick={() => toast.error('Доступ отозван', { description: 'Николай больше не может открыть приложение' })}
      >
        Отозвать доступ
      </Button>
    </>
  ),
}
