import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { AppShell, TitledRow, Surface, Stack, Flex, Grid, color } from '@/foundation'
import { Text } from '@/primitives/Text'
import { SidebarNav, type NavItem } from '@/sections/SidebarNav'
import { AdviceCard } from '@/components/composed/AdviceCard'
import { FilterSelect } from '@/components/composed/FilterSelect'
import { Toolbar, ToolbarToggleGroup, ToolbarToggleItem } from '@/components/composed/Toolbar'
import { AreaChart } from '@/components/composed/charts/AreaChart'
import { LineChart } from '@/components/composed/charts/LineChart'
import { DistributionChart } from '@/components/composed/charts/DistributionChart'

/*
 * Pages/Дашборд — an HONEST assembly of dashboard-prototype.html from
 * Foundation + Primitives + Components + Sections only, per DESIGN.md.
 * Real gaps found along the way got fixed as real additions (see
 * Foundation/Row, Components/AdviceCard, Components/FilterSelect,
 * Components/Chart/*, and the `dashboard`/`info`/`lightbulb`/
 * `chart-line-up` icons) — not papered over.
 *
 * Sections stays lean by standing rule (SidebarNav only, for now) — the
 * "stopmenu" content (title-rail + DistributionChart) is composed directly
 * at the PAGE level below, the same way every other block on this page is
 * (Foundation + Components, no bespoke one-off styling), rather than
 * packaged as a dedicated Section.
 *
 * Chart data below is the SOURCE's own verbatim day-series (from
 * dashboard-prototype.html's `DAY_SERIES_BASE`) — including its own
 * intentional data dip at index 6 (14 июня) — not invented numbers.
 * `Допродажи`/`Сервис`/`Очередь`/`Скрипт` now render as real
 * Area/Line charts (Components/Chart). One thing still deliberately NOT
 * reproduced: `missed`/`conv`/`cross`/`dist`/`emo`/`loyalty`/`promo` and
 * `drink-ink` in the source are custom multi-series hand-drawn SVG charts
 * (resampling, dip-handling, bespoke label placement) beyond what a
 * general Area/Line/Bar/Donut family covers faithfully — left out rather
 * than faked.
 */
const meta: Meta = { title: 'Pages/Дашборд', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

const DASHBOARD_NAV: NavItem[] = [
  { key: 'dashboard', label: 'Дашборд', icon: 'dashboard' },
]

// dashboard-prototype.html's own X / DAY_SERIES_BASE (day period), verbatim
const X_DAYS = ['2 июня', '4 июня', '6 июня', '8 июня', '10 июня', '12 июня', '14 июня', '16 июня', '18 июня', '20 июня']
const UPSELL_OFFERED = [132, 148, 142, 155, 138, 148, 6, 142, 138, 10]
const UPSELL_REFUSED = [88, 102, 95, 108, 92, 100, 4, 95, 90, 7]
const UPSELL_SKIPPED = [72, 85, 78, 92, 68, 80, 2, 75, 70, 5]
const SERVICE = [1.3, 1.4, 1.5, 1.6, 1.5, 1.4, 1.5, 1.6, 1.5, 1.6]
const QUEUE = [12, 14, 16, 18, 15, 17, 16, 16, 15, 14]
const SCRIPT = [6.4, 6.6, 6.8, 6.7, 6.5, 6.3, 6.5, 6.8, 6.9, 7.1]

const UPSELL_DATA = X_DAYS.map((day, i) => ({
  day, offered: UPSELL_OFFERED[i], refused: UPSELL_REFUSED[i], skipped: UPSELL_SKIPPED[i],
}))
const SERVICE_DATA = X_DAYS.map((day, i) => ({ day, value: SERVICE[i] }))
const QUEUE_DATA = X_DAYS.map((day, i) => ({ day, value: QUEUE[i] }))
const SCRIPT_DATA = X_DAYS.map((day, i) => ({ day, value: SCRIPT[i] }))

function PeriodToolbar() {
  const [period, setPeriod] = useState('day')
  return (
    // bare: this toolbar holds exactly one group, and ToolbarToggleGroup
    // already paints its own pill background — the default Toolbar chrome
    // would nest a second pill around it (see Toolbar.tsx's `bare` doc).
    <Toolbar bare>
      <ToolbarToggleGroup value={period} onValueChange={(v) => v && setPeriod(v)}>
        <ToolbarToggleItem value="hours">Часы</ToolbarToggleItem>
        <ToolbarToggleItem value="day">День</ToolbarToggleItem>
        <ToolbarToggleItem value="week">Неделя</ToolbarToggleItem>
        <ToolbarToggleItem value="month">30 дней</ToolbarToggleItem>
      </ToolbarToggleGroup>
    </Toolbar>
  )
}

function FilterRow() {
  const [barista, setBarista] = useState<string | undefined>()
  const [loc, setLoc] = useState<string | undefined>()
  return (
    <Flex gap="sm" align="center">
      <PeriodToolbar />
      <FilterSelect
        label="Бариста" placeholder="Все баристы" value={barista}
        onValueChange={setBarista} onClear={() => setBarista(undefined)}
        options={[{ value: 't', label: 'Татьяна' }, { value: 'n', label: 'Николай' }]}
      />
      <FilterSelect
        label="Локация" placeholder="Все локации" value={loc}
        onValueChange={setLoc} onClear={() => setLoc(undefined)}
        options={[{ value: 'b35', label: 'Большевистская 35' }, { value: 'ser', label: 'Серебренниковская' }]}
      />
    </Flex>
  )
}

export const Full: Story = {
  render: () => (
    <AppShell sidebar={<SidebarNav active="dashboard" items={DASHBOARD_NAV} avatarInitials="МК" showSettings={false} />}>
      <Stack gap="lg">
            {/* dash-head — title-wrap only, no side, no main content itself */}
            <TitledRow
              title={
                <Stack gap="xs">
                  <Text as="h1" size="headline">Дашборд</Text>
                  <Text size="caption" color={color.mutedForeground}>2 – 20 июня 2026</Text>
                  <Text size="footnote" color={color.ink3}>Вся сеть · интерактивный прототип</Text>
                </Stack>
              }
            >
              <div />
            </TitledRow>

            {/* upsell block — toolbar + real stacked-area chart + advice side-card */}
            <TitledRow
              title={<Text as="h2" size="title">Потенциал роста прибыли</Text>}
              side={
                <AdviceCard
                  icon="lightbulb"
                  value="60–90"
                  text="«Не предложено» каждый день — столько гостей уходит, не услышав ни одного дополнения"
                  note="Самый быстрый рычаг роста — одна фраза в конце заказа"
                />
              }
            >
              <Stack gap="base">
                <FilterRow />
                <Surface variant="paper" radius="lg" p="lg">
                  <AreaChart
                    data={UPSELL_DATA} xKey="day" height={260}
                    series={[
                      { key: 'offered', label: 'Предложено', color: color.accent },
                      { key: 'refused', label: 'Отказ', color: color.danger },
                      { key: 'skipped', label: 'Не предложено', color: color.warn },
                    ]}
                  />
                </Surface>
              </Stack>
            </TitledRow>

            {/* операции — 3-across insight grid, real line charts */}
            <TitledRow title={<Text as="h2" size="title">Операции</Text>}>
              <Grid columns={3} gap="base">
                <Surface variant="paper" radius="lg" p="lg">
                  <Text size="caption" color={color.mutedForeground} style={{ marginBottom: 8 }}>Сервис, мин</Text>
                  <LineChart data={SERVICE_DATA} xKey="day" height={160} series={[{ key: 'value', label: 'Сервис', color: color.chart1 }]} />
                </Surface>
                <Surface variant="paper" radius="lg" p="lg">
                  <Text size="caption" color={color.mutedForeground} style={{ marginBottom: 8 }}>Очередь, чел.</Text>
                  <LineChart data={QUEUE_DATA} xKey="day" height={160} series={[{ key: 'value', label: 'Очередь', color: color.chart2 }]} />
                </Surface>
                <Surface variant="paper" radius="lg" p="lg">
                  <Text size="caption" color={color.mutedForeground} style={{ marginBottom: 8 }}>Скрипт, баллы</Text>
                  <LineChart data={SCRIPT_DATA} xKey="day" height={160} series={[{ key: 'value', label: 'Скрипт', color: color.green }]} />
                </Surface>
              </Grid>
            </TitledRow>

            {/* таблицы и голос клиента — same title pattern as every other
                row on this page (plain title, no eyebrow/hint — that 3-part
                composition isn't used anywhere else here, so it doesn't get
                invented just for this one row). */}
            <TitledRow title={<Text as="h2" size="title">Таблицы и голос клиента</Text>}>
              <Surface variant="plain" style={{ background: color.chartSurface }} radius="lg" p="lg">
                <Text as="p" style={{ marginBottom: 20, color: color.mutedForeground }}>
                  473 гостя не получили то, за чем пришли. ≈75 000 ₽ — возможная упущенная выручка за месяц.
                </Text>
                <DistributionChart
                  groups={[
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
                  ]}
                />
              </Surface>
            </TitledRow>
      </Stack>
    </AppShell>
  ),
}
