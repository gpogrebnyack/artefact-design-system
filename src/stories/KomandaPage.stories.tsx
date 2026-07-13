import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { AppShell, Flex, Grid, Stack, Surface, TitledRow, color } from '@/foundation'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/primitives/Text'
import { Avatar } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ChartCard } from '@/components/composed/ChartCard'
import { CollapsibleGroup } from '@/components/composed/CollapsibleGroup'
import { FilterSelect } from '@/components/composed/FilterSelect'
import { MetricRow } from '@/components/composed/MetricRow'
import { ScorePill } from '@/components/composed/ScorePill'
import { Search } from '@/components/composed/Search'
import { SemanticAvatarFallback, StatusBadge, type SemanticTone } from '@/components/composed/SemanticTone'
import { Sparkline } from '@/components/composed/charts/Sparkline'
import { Toolbar, ToolbarToggleGroup, ToolbarToggleItem } from '@/components/composed/Toolbar'
import { AssistantDock } from '@/sections/AssistantDock'
import { PageHeader } from '@/sections/PageHeader'
import { SidebarNav, EXAMPLE_NAV_ITEMS } from '@/sections/SidebarNav'

/*
 * ACCEPTANCE TEST, not a component: komanda.html rebuilt end-to-end from
 * package exports only, with the source's own real data. The point is the
 * gap hunt — every place where something was missing or awkward is marked
 * with a `GAP:` comment and collected in the review that shipped this.
 * Same discipline as the dashboard-prototype acceptance test that once
 * produced AppShell/TitledRow/AdviceCard.
 */
const meta: Meta = { title: 'Pages/Komanda', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

// --- source data (komanda.html's own numbers, verbatim) ---

type ScoreTone = Extract<SemanticTone, 'green' | 'warn' | 'accent'>
type Employee = {
  initials: string; name: string; role: string
  score: string; tone: ScoreTone; trend?: 'up' | 'down'
  tag?: { tone: SemanticTone; label: string; trend?: 'up' | 'down' } | { neutral: string }
  spark: number[]
  check: { value: string; delta: string; tone?: ScoreTone; trend?: 'up' | 'down' }
  upsell: { value?: string; delta: string; tone?: ScoreTone; trend?: 'up' | 'down' }
  daily?: boolean
}

const BOLSHEVISTSKAYA: Employee[] = [
  { initials: 'ТК', name: 'Татьяна Климова', role: 'Бариста', score: '7,1', tone: 'green', spark: [6.6, 6.8, 6.7, 7.0, 7.1], check: { value: '438 ₽', delta: '+4% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '+6% к плану', delta: 'план выполнен', tone: 'green', trend: 'up' }, daily: true },
  { initials: 'К', name: 'Кирилл', role: 'Бариста', score: '6,3', tone: 'green', trend: 'up', tag: { tone: 'green', label: 'Растёт', trend: 'up' }, spark: [5.6, 5.9, 6.0, 6.1, 6.3], check: { value: '401 ₽', delta: '+1% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '−21 989 ₽ к плану', delta: 'недобор на допродажах', tone: 'accent', trend: 'down' } },
  { initials: 'Я', name: 'Яна', role: 'Бариста', score: '6,1', tone: 'green', tag: { neutral: 'Мало смен' }, spark: [6.2, 6.1, 6.2, 6.0, 6.1], check: { value: '406 ₽', delta: '±0% к среднему' }, upsell: { value: '2 заказа за неделю', delta: 'почти не выходила', tone: 'accent', trend: 'down' } },
  { initials: 'АЛ', name: 'Алина', role: 'Бариста', score: '6,0', tone: 'green', spark: [6.1, 6.0, 5.9, 6.1, 6.0], check: { value: '390 ₽', delta: '−1% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '−28 297 ₽ к плану', delta: 'недобор на допродажах', tone: 'accent', trend: 'down' } },
  { initials: 'ПО', name: 'Полина', role: 'Бариста', score: '5,9', tone: 'warn', tag: { tone: 'green', label: 'Растёт', trend: 'up' }, spark: [5.3, 5.5, 5.6, 5.8, 5.9], check: { value: '415 ₽', delta: '+2% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '+3% к плану', delta: 'план выполнен', tone: 'green', trend: 'up' } },
  { initials: 'АН', name: 'Анастасия', role: 'Бариста', score: '5,6', tone: 'accent', trend: 'down', tag: { tone: 'accent', label: 'Оценка снижается', trend: 'down' }, spark: [6.1, 6.0, 5.9, 5.8, 5.6], check: { value: '398 ₽', delta: '−1% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '−13 627 ₽ к плану', delta: 'недобор на допродажах', tone: 'accent', trend: 'down' } },
  { initials: 'НИ', name: 'Николай', role: 'Бариста', score: '5,5', tone: 'warn', tag: { tone: 'accent', label: 'Оценка снижается', trend: 'down' }, spark: [5.8, 5.7, 5.7, 5.6, 5.5], check: { value: '402 ₽', delta: '±0% к среднему' }, upsell: { value: '−4% к плану', delta: 'недобор на допродажах', tone: 'accent', trend: 'down' } },
]

const SOVETSKAYA: Employee[] = [
  { initials: 'АШ', name: 'Александра Шипилова', role: 'Бариста', score: '5,0', tone: 'warn', tag: { tone: 'accent', label: 'Оценка снижается', trend: 'down' }, spark: [5.9, 5.7, 5.5, 5.2, 5.0], check: { value: '385 ₽', delta: '−3% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '−59 968 ₽ к плану', delta: 'недобор на допродажах', tone: 'accent', trend: 'down' } },
]

const DIMITROVA: Employee[] = [
  { initials: 'МО', name: 'Максим Орлов', role: 'Бариста', score: '6,0', tone: 'green', spark: [5.7, 5.8, 6.0, 5.9, 6.0], check: { value: '408 ₽', delta: '+1% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '+2% к плану', delta: 'план выполнен', tone: 'green', trend: 'up' }, daily: true },
]

// --- page-local assemblies (deliberately NOT components — the test is
//     whether the kit's parts are enough to build them cleanly) ---

function AccessStatus() {
  return (
    <Flex align="center" gap="xs">
      <Icon name="lock-open" size={14} color={color.green} />
      <Text as="span" size="footnote" color={color.green}>Пользуется ежедневно</Text>
    </Flex>
  )
}

function EmployeeCard({ e }: { e: Employee }) {
  return (
    <Surface variant="glass" p="base" radius="xl" style={{ cursor: 'pointer' }}>
      <Stack gap="md">
        <Flex justify="space-between" align="flex-start" gap="base" wrap={false}>
          <Flex align="center" gap="sm" wrap={false}>
            <Avatar>
              <SemanticAvatarFallback tone={e.tone}>{e.initials}</SemanticAvatarFallback>
            </Avatar>
            <Stack gap="none">
              <Text as="span" size="body" weight={600}>{e.name}</Text>
              <Text as="span" size="footnote" color={color.mutedForeground}>{e.role}</Text>
            </Stack>
          </Flex>
          <Flex align="center" gap="sm" wrap={false}>
            <ScorePill value={e.score} tone={e.tone} trend={e.trend} />
            <Sparkline data={e.spark} color={color[e.tone]} showEndDot />
          </Flex>
        </Flex>

        {e.tag && (
          'neutral' in e.tag ? (
            <Badge variant="outline" style={{ backgroundColor: color.muted, color: color.mutedForeground, borderColor: 'transparent' }}>
              {e.tag.neutral}
            </Badge>
          ) : (
            <div>
              <StatusBadge tone={e.tag.tone} style={{ gap: 4 }}>
                {e.tag.trend && <Icon name={e.tag.trend === 'up' ? 'trend-up' : 'trend-down'} size={11} />}
                {e.tag.label}
              </StatusBadge>
            </div>
          )
        )}

        <Separator />

        <Flex gap="2xl">
          <MetricRow label="Средний чек" value={e.check.value} delta={e.check.delta} tone={e.check.tone} trend={e.check.trend} />
          <MetricRow label="Допродажи / нед" value={e.upsell.value} delta={e.upsell.delta} tone={e.upsell.tone} trend={e.upsell.trend} />
        </Flex>

        <Separator />

        {e.daily ? (
          <AccessStatus />
        ) : (
          <Button variant="outline" size="sm" style={{ width: 'max-content' }}>
            <Icon name="lock" size={13} /> Выдать доступ в приложение
          </Button>
        )}
      </Stack>
    </Surface>
  )
}

function UnknownVoiceCard({ addr, samples }: { addr: string; samples: string }) {
  return (
    <Surface variant="muted" p="base" radius="xl">
      <Stack gap="md">
        <Flex justify="space-between" align="flex-start" gap="base" wrap={false}>
          <Flex align="center" gap="sm" wrap={false}>
            <Avatar>
              {/* GAP?: no neutral AvatarFallback helper — hand-tinted like every session did */}
              <SemanticAvatarFallback tone="warn" style={{ backgroundColor: color.secondary, color: color.mutedForeground }}>
                <Icon name="voice" size={14} />
              </SemanticAvatarFallback>
            </Avatar>
            <Stack gap="none">
              <Text as="span" size="body" weight={600}>Неизвестный сотрудник</Text>
              <Text as="span" size="footnote" color={color.mutedForeground}>{addr}</Text>
            </Stack>
          </Flex>
          <Badge variant="outline" style={{ backgroundColor: color.secondary, color: color.mutedForeground, borderColor: 'transparent' }}>
            {samples}
          </Badge>
        </Flex>
        <Text as="p" size="caption" color={color.mutedForeground}>
          Распознали новый голос — прослушайте записи и присвойте имя. После этого начнём считать его оценку.
        </Text>
        <Button variant="secondary" size="sm" style={{ width: 'max-content' }}>
          ✎ Указать имя
        </Button>
      </Stack>
    </Surface>
  )
}

function ManagerCard({ initials, name, role = 'Управляющий сетью', scope = 'Все адреса' }: { initials: string; name: string; role?: string; scope?: string }) {
  return (
    <Surface variant="glass" p="base" radius="xl">
      <Flex justify="space-between" align="center" gap="base" wrap={false}>
        <Flex align="center" gap="sm" wrap={false}>
          <Avatar>
            <SemanticAvatarFallback tone="plum">{initials}</SemanticAvatarFallback>
          </Avatar>
          <Stack gap="none">
            <Text as="span" size="body" weight={600}>{name}</Text>
            <StatusBadge tone="plum">{role}</StatusBadge>
          </Stack>
        </Flex>
        <Flex align="center" gap="sm" wrap={false}>
          <Badge variant="outline" style={{ backgroundColor: color.muted, color: color.mutedForeground, borderColor: 'transparent' }}>
            {scope}
          </Badge>
          <AccessStatus />
        </Flex>
      </Flex>
    </Surface>
  )
}

function InsightPersonRow({ initials, name, addr, pill }: { initials: string; name: string; addr: string; pill: ReactNode }) {
  return (
    <Flex justify="space-between" align="center" gap="base" wrap={false} style={{ cursor: 'pointer' }}>
      <Flex align="center" gap="sm" wrap={false}>
        <Avatar size="sm">
          <SemanticAvatarFallback tone="warn" style={{ backgroundColor: color.muted, color: color.foreground }}>
            {initials}
          </SemanticAvatarFallback>
        </Avatar>
        <Stack gap="none">
          <Text as="span" size="caption" weight={600}>{name}</Text>
          <Text as="span" size="footnote" color={color.mutedForeground}>{addr}</Text>
        </Stack>
      </Flex>
      {pill}
    </Flex>
  )
}

// GAP: summary note with clickable inline stats (.summary/.stat) — no
// component; hand-built here exactly like two consumer sessions did.
function SummaryNote() {
  const stat = (label: string, tone: 'green' | 'accent' | undefined) => (
    <Text
      as="span"
      size="body"
      weight={600}
      color={tone ? color[tone] : undefined}
      style={{ textDecoration: 'underline', textUnderlineOffset: 3, cursor: 'pointer' }}
    >
      {label}
    </Text>
  )
  return (
    <Surface variant="glass" p="lg" radius="xl">
      <Stack gap="sm">
        <Flex align="center" gap="xs">
          <Icon name="spark" size={13} color={color.accent} />
          <Text as="span" size="footnote" weight={600} color={color.accent}>Сводка команды</Text>
        </Flex>
        <Text as="p" size="body">
          Сильнее всех команда {stat('Большевистская 35', 'green')}, у них есть чему поучиться.
          Самый большой недобор на допродажах на {stat('Советская 5', 'accent')}.{' '}
          {stat('Распознано 3 новых голоса', undefined)} — их нужно сопоставить с сотрудниками.
          Доступ в приложение пока выдан 2 из 14 линейных.
        </Text>
      </Stack>
    </Surface>
  )
}

export const Full: Story = {
  render: () => (
    <>
      <AppShell
        sidebar={
          <SidebarNav
            active="team"
            items={EXAMPLE_NAV_ITEMS}
            avatarInitials="УС"
            avatarTitle="Управляющий сетью"
            clientLabel="Бодрый день"
          />
        }
      >
        <Stack gap="xl">
          <PageHeader
            title="Команда"
            meta="Бодрый день · 5 адресов · 16 человек · неделя 17–23 июня"
            action={<Button>+ Создать профиль</Button>}
          />

          <SummaryNote />

          {/* insights row — two cards grouping person rows */}
          <Grid columns={2} gap="base">
            <ChartCard
              title={
                <Flex align="center" gap="xs">
                  <Icon name="star" size={15} color={color.green} />
                  <Text as="span" size="body" weight={600} color={color.green}>Лучшие на неделе</Text>
                </Flex>
              }
            >
              <Stack gap="md">
                <InsightPersonRow initials="ТК" name="Татьяна Климова" addr="Большевистская 35" pill={<ScorePill value="7,1" tone="green" />} />
                <InsightPersonRow initials="К" name="Кирилл" addr="Большевистская 35" pill={<ScorePill value="6,3" tone="green" trend="up" />} />
              </Stack>
            </ChartCard>
            <ChartCard
              title={
                <Flex align="center" gap="xs">
                  <Icon name="warning" size={15} color={color.accent} />
                  <Text as="span" size="body" weight={600} color={color.accent}>Требуют внимания</Text>
                </Flex>
              }
            >
              <Stack gap="md">
                <InsightPersonRow initials="АШ" name="Александра Шипилова" addr="Советская 5" pill={<ScorePill value="5,0" tone="warn" />} />
                <InsightPersonRow initials="А" name="Анастасия" addr="Большевистская 35" pill={<ScorePill value="5,6" tone="accent" trend="down" />} />
              </Stack>
            </ChartCard>
          </Grid>

          {/* voices banner */}
          <Surface variant="muted" p="base" radius="xl" style={{ cursor: 'pointer' }}>
            <Flex justify="space-between" align="center" gap="base" wrap={false}>
              <Text as="p" size="caption">
                <b>Распознано 3 новых голоса</b> на Серебренниковской и Советской — присвойте имена, чтобы начать считать их работу.
              </Text>
              <Button variant="secondary" size="sm" style={{ flexShrink: 0 }}>Разметить голоса</Button>
            </Flex>
          </Surface>

          {/* Состав */}
          <TitledRow
            title={<Text as="h2" size="title" weight={600}>Состав</Text>}
            side={<Button variant="link" size="sm">Свернуть всё</Button>}
          >
            <Stack gap="lg">
              <Toolbar bare>
                <Flex align="center" gap="sm" grow>
                  <ToolbarToggleGroup value="all" onValueChange={() => {}}>
                    <ToolbarToggleItem value="all">Все</ToolbarToggleItem>
                    <ToolbarToggleItem value="mgr">Управляющие</ToolbarToggleItem>
                    <ToolbarToggleItem value="staff">Линейные</ToolbarToggleItem>
                    <ToolbarToggleItem value="unknown">Без имени · 3</ToolbarToggleItem>
                  </ToolbarToggleGroup>
                  <FilterSelect
                    label="Адрес"
                    placeholder="Все адреса"
                    options={[
                      { value: 'bolshevistskaya', label: 'Большевистская 35' },
                      { value: 'serebrennikovskaya', label: 'Серебренниковская 20' },
                      { value: 'sovetskaya', label: 'Советская 5' },
                      { value: 'dimitrova', label: 'Димитрова 2' },
                      { value: 'kirova', label: 'Кирова 113/2' },
                    ]}
                  />
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <Search placeholder="Поиск по имени" />
                  </div>
                </Flex>
              </Toolbar>

              <Stack gap="sm">
                <Text as="div" size="footnote" color={color.mutedForeground} style={{ textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Управляющие сетью · все адреса
                </Text>
                <Grid columns={2} gap="base">
                  <ManagerCard initials="АГ" name="Алексей Громов" />
                  <ManagerCard initials="МИ" name="Мария Иванова" />
                </Grid>
              </Stack>

              <CollapsibleGroup title="Большевистская 35" count="7 человек">
                <Grid minColWidth={320} gap="base">
                  {BOLSHEVISTSKAYA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Серебренниковская 20" count="1 человек" extra={<StatusBadge tone="accent">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  <UnknownVoiceCard addr="Серебренниковская 20" samples="8 сэмплов голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Советская 5" count="2 человека" extra={<StatusBadge tone="accent">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  {SOVETSKAYA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                  <UnknownVoiceCard addr="Советская 5" samples="5 сэмплов голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Димитрова 2" count="3 человека" extra={<StatusBadge tone="accent">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  <ManagerCard initials="ИС" name="Ирина Соколова" role="Управляющий точкой" scope="Димитрова 2" />
                  {DIMITROVA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                  <UnknownVoiceCard addr="Димитрова 2" samples="3 сэмпла голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Кирова 113/2" count="0 человек" defaultOpen={false}>
                <Surface variant="muted" p="base" radius="xl">
                  <Flex align="center" gap="sm">
                    <Icon name="voice" size={16} color={color.mutedForeground} />
                    <Text as="p" size="caption" color={color.mutedForeground}>
                      Собираем записи на точке. Сэмплы голосов появятся в ближайшие дни — тогда можно будет присвоить имена.
                    </Text>
                  </Flex>
                </Surface>
              </CollapsibleGroup>
            </Stack>
          </TitledRow>
        </Stack>
      </AppShell>

      <AssistantDock
        title="Ассистент"
        intro="Спросите про команду, оценки и допродажи."
        placeholder="Спросите про команду…"
        chips={[
          { question: 'Кто требует внимания?', answer: 'Александра Шипилова (Советская 5) и Анастасия (Большевистская 35) — у обеих оценка снижается вторую неделю.' },
          { question: 'Где недобор на допродажах?', answer: 'Самый большой — Советская 5: −59 968 ₽ к плану за неделю.' },
        ]}
        fallbackAnswer="Пока не знаю ответа — уточните вопрос про команду, оценки или допродажи."
      />
    </>
  ),
}
