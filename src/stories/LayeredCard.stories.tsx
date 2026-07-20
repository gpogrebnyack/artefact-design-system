import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayeredCard } from '@/components/composed/LayeredCard'
import { Stack, color } from '@/foundation'
import { Text } from '@/foundation'
import { Heading } from '@/foundation'
import { TimeTag } from '@/components/composed/TimeTag'

/*
 * LayeredCard — dialog-v2's `.rec`/`.up4-card` shared anatomy: the FACT on
 * an opaque paper layer, the ADVICE below it on the tinted wrapper that
 * peeks around the paper. The page's grammar for "observation → what to do
 * about it" (recommendations AND upsell cards).
 */
const meta: Meta<typeof LayeredCard> = {
  title: 'Components/Card/Layered',
  component: LayeredCard,
}
export default meta
type Story = StoryObj<typeof LayeredCard>

// the component's point: fact on paper + advice on the wash footer
export const WithFooter: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <LayeredCard
        footer={
          <Stack gap="xs">
            <Text as="span" size="footnote" weight="semibold" color={color.textTertiary} style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Как лучше
            </Text>
            <Text as="div" size="body" style={{ lineHeight: 1.5 }}>
              Если гость заказывает только еду, предложите напиток: «Вместо обычного чая возьмите наш
              сезонный чай со льдом „Таёжь“. Попробуете?».
            </Text>
          </Stack>
        }
      >
        <Stack gap="sm">
          <Heading as="div" size="body">
            Гость заказал только сэндвич, но сотрудник не предложил дополнить заказ напитком
          </Heading>
          <Text as="div" size="body" color={color.mutedForeground}>
            «Сэндвич подогреть?» <TimeTag time="00:05" onClick={() => {}} />
          </Text>
        </Stack>
      </LayeredCard>
    </div>
  ),
}

// no footer: just the fact on paper inside the tinted frame
export const WithoutFooter: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <LayeredCard>
        <Text as="div" size="body">Факт на бумаге в тонированной рамке — совет не требуется.</Text>
      </LayeredCard>
    </div>
  ),
}
