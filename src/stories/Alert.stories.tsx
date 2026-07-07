import type { Meta, StoryObj } from '@storybook/react-vite'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

// shadcn's Alert = the Callout/Banner equivalent (icon + title + text notice).
const meta: Meta<typeof Alert> = { title: 'Components/Alert', component: Alert }
export default meta
type Story = StoryObj<typeof Alert>

// Banner recipe: "Распознано N новых голосов" + action
export const RecognizedVoices: Story = {
  render: () => (
    <Alert className="max-w-md">
      <AlertTitle>Распознано 3 новых голоса</AlertTitle>
      <AlertDescription>
        На Серебренниковской и Советской — присвойте имена, чтобы начать считать работу.
        <div className="mt-2"><Button size="sm">Разметить голоса</Button></div>
      </AlertDescription>
    </Alert>
  ),
}

export const Attention: Story = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertTitle>Требуют внимания</AlertTitle>
      <AlertDescription>2 сотрудника с оценкой ниже 5,0 за неделю.</AlertDescription>
    </Alert>
  ),
}
