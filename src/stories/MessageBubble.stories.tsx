import type { Meta, StoryObj } from '@storybook/react-vite'
import { MessageBubble } from '@/components/composed/MessageBubble'
import { Stack } from '@/foundation'

const meta: Meta<typeof MessageBubble> = { title: 'Components/Chat/MessageBubble', component: MessageBubble }
export default meta
type Story = StoryObj<typeof MessageBubble>

export const UserAndBot: Story = {
  render: () => (
    <Stack gap="sm" style={{ width: 360 }}>
      <MessageBubble from="user">Кто требует внимания?</MessageBubble>
      <MessageBubble from="bot">
        Внимание двум адресам и людям. <strong>Александра Шипилова</strong> (Советская 5) — оценка 5,0 и самый
        большой недобор на допродажах: <strong>59 968 ₽</strong>.
      </MessageBubble>
    </Stack>
  ),
}
