import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { FilterSelect } from '@/components/composed/FilterSelect'
import { Flex } from '@/foundation'

const meta: Meta<typeof FilterSelect> = { title: 'Components/FilterSelect', component: FilterSelect }
export default meta
type Story = StoryObj<typeof FilterSelect>

const BARISTA_OPTIONS = [
  { value: 't', label: 'Татьяна' },
  { value: 'n', label: 'Николай' },
]
const LOC_OPTIONS = [
  { value: 'b35', label: 'Большевистская 35' },
  { value: 'ser', label: 'Серебренниковская' },
]

// dashboard-prototype.html's table-toolbar filter row — two clearable pills.
export const Toolbar: Story = {
  render: () => {
    function Demo() {
      const [barista, setBarista] = useState<string | undefined>()
      const [loc, setLoc] = useState<string | undefined>('b35')
      return (
        <Flex gap="sm">
          <FilterSelect label="Бариста" placeholder="Все баристы" value={barista} onValueChange={setBarista} onClear={() => setBarista(undefined)} options={BARISTA_OPTIONS} />
          <FilterSelect label="Локация" placeholder="Все локации" value={loc} onValueChange={setLoc} onClear={() => setLoc(undefined)} options={LOC_OPTIONS} />
        </Flex>
      )
    }
    return <Demo />
  },
}

export const Empty: Story = {
  args: { label: 'Бариста', placeholder: 'Все баристы', options: BARISTA_OPTIONS },
}

export const WithValue: Story = {
  args: { label: 'Локация', placeholder: 'Все локации', value: 'b35', options: LOC_OPTIONS },
}
