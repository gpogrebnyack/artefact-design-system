import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card/Base',
  component: Card,
}
export default meta
type Story = StoryObj<typeof Card>

// The island look = the 60% fill letting the warm page through — no blur,
// no shadow, no ring (brand-overrides.css). "Glass" survives only as the
// Surface variant name for this fill.
export const Default: Story = {
  render: () => (
    <Card className="w-[320px]">
      <CardHeader>
        <CardTitle>Татьяна Климова</CardTitle>
        <CardDescription>Бариста · Большевистская 35</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        60%-заливка — тёплый фон просвечивает; без тени, рамки и блюра.
      </CardContent>
    </Card>
  ),
}
