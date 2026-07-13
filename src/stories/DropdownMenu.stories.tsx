import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuLabel,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

// A Component — DropdownMenu assembled from trigger + content + items, not atomic.
const meta: Meta<typeof DropdownMenu> = { title: 'Components/DropdownMenu', component: DropdownMenu }
export default meta
type Story = StoryObj<typeof DropdownMenu>

export const RowActions: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Татьяна Климова ⋯</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Действия</DropdownMenuLabel>
        <DropdownMenuItem>Открыть профиль</DropdownMenuItem>
        <DropdownMenuItem>Назначить смену</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">Отозвать доступ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
