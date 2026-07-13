import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Base',
  component: Card,
}
export default meta
type Story = StoryObj<typeof Card>

// glass island: the 60% fill, no blur, no shadow, no ring (brand-overrides.css)
export const GlassIsland: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Татьяна Климова</CardTitle>
        <CardDescription>Бариста · Большевистская 35</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Остров на полупрозрачном стекле, без тени и без рамки по умолчанию.
      </CardContent>
    </Card>
  ),
}
