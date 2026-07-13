import type { Meta, StoryObj } from '@storybook/react-vite'
import { StepFunnel } from '@/components/composed/StepFunnel'
import { Stack } from '@/foundation'
import { Text } from '@/primitives/Text'

/*
 * StepFunnel — dialog-v2's `.up4-funnel`: how far an upsell attempt got
 * (Повод → Назвал → Аргумент → Призыв). Completed = green, the breaking
 * stage carries the verdict tone (accent «упущено» / warn «не довёл»).
 */
const meta: Meta<typeof StepFunnel> = {
  title: 'Components/StepFunnel',
  component: StepFunnel,
}
export default meta
type Story = StoryObj<typeof StepFunnel>

const STEPS = ['Повод', 'Назвал', 'Аргумент', 'Призыв']

export const States: Story = {
  render: () => (
    <Stack gap="lg" style={{ maxWidth: 420 }}>
      <Stack gap="xs">
        <Text as="span" size="footnote">Упущено (сорвалось на «Назвал»)</Text>
        <StepFunnel steps={STEPS} reached={1} tone="accent" />
      </Stack>
      <Stack gap="xs">
        <Text as="span" size="footnote">Только упомянул</Text>
        <StepFunnel steps={STEPS} reached={2} tone="warn" />
      </Stack>
      <Stack gap="xs">
        <Text as="span" size="footnote">Доведено до продажи</Text>
        <StepFunnel steps={STEPS} reached={4} />
      </Stack>
    </Stack>
  ),
}
