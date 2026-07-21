import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SplitButton } from '@/components/composed/SplitButton'
import {
  DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem,
} from '@/components/ui/dropdown-menu'
import { Icon } from '@/primitives/Icon'
import { Flex } from '@/foundation'

const meta: Meta<typeof SplitButton> = { title: 'Components/SplitButton', component: SplitButton }
export default meta
type Story = StoryObj<typeof SplitButton>

// Оба сценария страницы meeting-recap: главное действие + меню его вариантов.
export const Default: Story = {
  render: () => {
    function Demo() {
      const [format, setFormat] = useState('md')
      return (
        <Flex gap="sm">
          <SplitButton
            icon={<Icon name="copy" size={16} />}
            menuLabel="Выбрать формат"
            onClick={() => {}}
            menu={
              <DropdownMenuRadioGroup value={format} onValueChange={setFormat}>
                <DropdownMenuRadioItem value="md">Markdown</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="txt">Обычный текст</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="html">HTML</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            }
          >
            Копировать рекап
          </SplitButton>

          <SplitButton
            icon={<Icon name="arrows-clockwise" size={16} />}
            menuLabel="Выбрать назначение"
            onClick={() => {}}
            menu={
              <>
                <DropdownMenuItem>Salesforce</DropdownMenuItem>
                <DropdownMenuItem>HubSpot</DropdownMenuItem>
                <DropdownMenuItem>Notion</DropdownMenuItem>
              </>
            }
          >
            Синхронизировать
          </SplitButton>
        </Flex>
      )
    }
    return <Demo />
  },
}

// Гибкость: те же сегменты на outline-заливке (не дефолт — читается более
// разъединённо, см. заголовок компонента).
export const Outline: Story = {
  render: () => (
    <SplitButton
      variant="outline"
      menuLabel="Ещё"
      menu={<><DropdownMenuItem>Пункт 1</DropdownMenuItem><DropdownMenuItem>Пункт 2</DropdownMenuItem></>}
    >
      Экспорт
    </SplitButton>
  ),
}
