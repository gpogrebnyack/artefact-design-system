import type { Meta, StoryObj } from '@storybook/react-vite'
import { DistributionChart } from '@/components/composed/charts/DistributionChart'

const meta: Meta<typeof DistributionChart> = { title: 'Components/Chart/Distribution', component: DistributionChart }
export default meta
type Story = StoryObj<typeof DistributionChart>

// dashboard-prototype.html's stopmenu data — same content the old
// hand-rolled SegmentedBar used, now a real Recharts stacked bar.
export const StopmenuGroups: Story = {
  args: {
    groups: [
      {
        name: 'Сиропы', total: '64 визита',
        segments: [
          { label: 'Карамельный сироп', count: 'спрашивали 22 раза', widthPct: 34.4 },
          { label: 'Сироп «Солёная карамель»', count: 'спрашивали 16 раз', widthPct: 25 },
          { label: 'Ванильный сироп', count: 'спрашивали 14 раз', widthPct: 21.9 },
          { label: 'Сироп «Лесной орех»', count: 'спрашивали 12 раз', widthPct: 18.7 },
        ],
      },
      {
        name: 'Холодные напитки', total: '61 визит',
        segments: [
          { label: 'Домашний лимонад', count: 'спрашивали 26 раз', widthPct: 40.6 },
          { label: 'Ягодный морс', count: 'спрашивали 20 раз', widthPct: 31.3 },
          { label: 'Смузи', count: 'спрашивали 18 раз', widthPct: 28.1 },
        ],
      },
      {
        // sums to 76.6% — the remainder renders as the muted "rest" filler,
        // matching the source's own behavior for rows that don't fill the track
        name: 'Сэндвичи', total: '49 визитов',
        segments: [
          { label: 'Сэндвич с рваной свининой', count: 'спрашивали 22 раза', widthPct: 34.4 },
          { label: 'Сэндвич с курицей', count: 'спрашивали 16 раз', widthPct: 25 },
          { label: 'Веган-сэндвич', count: 'спрашивали 11 раз', widthPct: 17.2 },
        ],
      },
    ],
  },
}
