import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  Item,
  ItemGroup,
  ItemSeparator,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from '@/components/ui/item'
import { Button } from '@/components/ui/button'
import { Icon } from '@/primitives/Icon'

/*
 * Item — a governed row primitive: icon/media + title + description +
 * trailing actions, with ItemGroup/ItemSeparator for a list of them. Exported
 * with zero story/manifest coverage; a real list like this (voice dialogs,
 * notifications, activity feed) is exactly what it's for — don't hand-roll
 * a flex row + manual divider for this shape, this already IS that.
 *
 * `variant="outline"` renders with NO visible border here on purpose — shadcn's
 * `border-border` maps to our `color.border`, which this system keeps fully
 * transparent by design (see COMPONENTS.md's chart-axis note for the same
 * token). Use `variant="muted"` for a row that needs visible separation.
 */
const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
}
export default meta
type Story = StoryObj<typeof Item>

const DIALOGS = [
  { text: '«Хотите добавить сироп?» — «Нет, спасибо»', time: '2 мин' },
  { text: '«Будет готово через 3 минуты» — «Хорошо, подожду»', time: '18 мин' },
  { text: '«Карта или наличные?» — «Карта»', time: '41 мин' },
]

export const DialogList: Story = {
  render: () => (
    <ItemGroup className="w-96">
      {DIALOGS.map((d, i) => (
        <div key={d.text}>
          <Item variant="muted">
            <ItemMedia variant="icon"><Icon name="voice" size={16} /></ItemMedia>
            <ItemContent>
              <ItemTitle>{d.text}</ItemTitle>
              <ItemDescription>{d.time} назад</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" size="icon"><Icon name="caret-right" size={16} /></Button>
            </ItemActions>
          </Item>
          {i < DIALOGS.length - 1 && <ItemSeparator />}
        </div>
      ))}
    </ItemGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <ItemGroup className="w-80">
      <Item size="default"><ItemContent><ItemTitle>Default</ItemTitle></ItemContent></Item>
      <Item size="sm"><ItemContent><ItemTitle>Small</ItemTitle></ItemContent></Item>
      <Item size="xs"><ItemContent><ItemTitle>Extra small</ItemTitle></ItemContent></Item>
    </ItemGroup>
  ),
}
