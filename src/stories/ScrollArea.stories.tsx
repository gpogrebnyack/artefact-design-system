import type { Meta, StoryObj } from '@storybook/react-vite'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/ui/item'

/*
 * ScrollArea — styled scroll container. Vendored because a real consumer
 * session hand-rolled `maxHeight + overflowY:auto` for a dialog list — this
 * is the governed version (consistent thin scrollbar, no layout shift).
 */
const meta: Meta<typeof ScrollArea> = {
  title: 'Primitives/ScrollArea',
  component: ScrollArea,
}
export default meta
type Story = StoryObj<typeof ScrollArea>

const DIALOGS = [
  '«Хотите добавить сироп?» — «Нет, спасибо»',
  '«Ваш латте будет готов через пару минут» — «Хорошо»',
  '«Карта или наличные?» — «Картой»',
  '«Большой или маленький?» — «Большой, с собой»',
  '«Спасибо, хорошего дня» — «И вам»',
  '«Что-нибудь к кофе?» — «Круассан, пожалуйста»',
  '«Повторить прошлый заказ?» — «Да»',
]

export const DialogList: Story = {
  render: () => (
    <ScrollArea style={{ height: 220, width: 420 }}>
      <ItemGroup>
        {DIALOGS.map((text, i) => (
          <div key={text}>
            <Item variant="muted" size="sm">
              <ItemContent>
                <ItemTitle>{text}</ItemTitle>
                <ItemDescription>{(i + 1) * 7} мин назад</ItemDescription>
              </ItemContent>
            </Item>
            {i < DIALOGS.length - 1 && <ItemSeparator />}
          </div>
        ))}
      </ItemGroup>
    </ScrollArea>
  ),
}
