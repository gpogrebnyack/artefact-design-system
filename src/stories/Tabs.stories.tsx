import type { Meta, StoryObj } from '@storybook/react-vite'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Periods: Story = {
  render: () => (
    <Tabs defaultValue="week" className="w-80">
      <TabsList>
        <TabsTrigger value="month">Месяц</TabsTrigger>
        <TabsTrigger value="week">Неделя</TabsTrigger>
        <TabsTrigger value="day">День</TabsTrigger>
      </TabsList>
      <TabsContent value="month" className="pt-3 text-sm text-muted-foreground">Оценка за месяц: 7,1</TabsContent>
      <TabsContent value="week" className="pt-3 text-sm text-muted-foreground">Оценка за неделю: 7,4 ↑</TabsContent>
      <TabsContent value="day" className="pt-3 text-sm text-muted-foreground">Оценка за день: 7,6</TabsContent>
    </Tabs>
  ),
}
