import type { Meta, StoryObj } from '@storybook/react-vite'
import { Search } from '@/components/composed/Search'

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
}
export default meta
type Story = StoryObj<typeof Search>

export const Default: Story = {
  args: { placeholder: 'Поиск по имени' },
  render: (args) => <div className="w-72"><Search {...args} /></div>,
}

export const WithValue: Story = {
  args: { placeholder: 'Поиск по имени', value: 'Татьяна' },
  render: (args) => <div className="w-72"><Search {...args} /></div>,
}
