import type { Meta, StoryObj } from "@storybook/react-vite"
import { MetricCard } from "@/components/composed/MetricCard"
import { Flex } from "@/foundation"

/*
 * MetricCard — KPI-карточка формы Steep: число+дельта слева, спарклайн
 * справа. Против MetricRow: Row — стопка в списках внутри карточек,
 * Card — самостоятельный остров для KPI-полос.
 */
const meta: Meta<typeof MetricCard> = {
  title: "Components/MetricCard",
  component: MetricCard,
}
export default meta
type Story = StoryObj<typeof MetricCard>

/* пара «просело / выросло» — честная семантика дельт: просевшая метрика —
   accent (внимание), НЕ danger; выросшая — green */
export const Pair: Story = {
  render: () => (
    <Flex gap="base" wrap style={{ maxWidth: 640 }}>
      <div style={{ flex: "1 1 260px" }}>
        <MetricCard label="Средний чек" value="314 ₽" delta="−32% к среднему"
          tone="accent" trend="down" spark={[420, 405, 398, 371, 350, 314]} />
      </div>
      <div style={{ flex: "1 1 260px" }}>
        <MetricCard label="Допродажи" value="3 020 ₽" delta="+8% к среднему"
          tone="green" trend="up" spark={[2700, 2750, 2830, 2900, 2960, 3020]} />
      </div>
    </Flex>
  ),
}

/* без спарклайна — просто число с дельтой */
export const NumberOnly: Story = {
  args: {
    label: "Разговоров за неделю",
    value: "1 842",
    delta: "+4% к прошлой неделе",
    tone: "green",
    trend: "up",
  },
}
