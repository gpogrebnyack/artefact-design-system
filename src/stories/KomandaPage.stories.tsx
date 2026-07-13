import type { Meta, StoryObj } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import { AppShell, Flex, Grid, Stack, Surface, TitledRow, color } from '@/foundation'
import { Icon } from '@/primitives/Icon'
import { Text } from '@/primitives/Text'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { CollapsibleGroup } from '@/components/composed/CollapsibleGroup'
import { FilterSelect } from '@/components/composed/FilterSelect'
import { MetricRow } from '@/components/composed/MetricRow'
import { ScorePill } from '@/components/composed/ScorePill'
import { Search } from '@/components/composed/Search'
import { SemanticAvatarFallback, StatusBadge, type SemanticTone } from '@/components/composed/SemanticTone'
import { StatusDot } from '@/components/composed/StatusDot'
import { SummaryNote, SummaryStat } from '@/components/composed/SummaryNote'
import { Toolbar, ToolbarToggleGroup, ToolbarToggleItem } from '@/components/composed/Toolbar'
import { AssistantDock } from '@/sections/AssistantDock'
import { PageHeader } from '@/sections/PageHeader'
import { SidebarNav, EXAMPLE_NAV_ITEMS } from '@/sections/SidebarNav'

/*
 * ACCEPTANCE TEST, not a component: komanda.html rebuilt end-to-end from
 * package exports only, with the source's own data, layout and visual
 * conventions — verified side-by-side against the original in a browser
 * (not from memory; the first draft of this story invented data and card
 * layouts and was corrected wholesale). Deviations found while building it
 * were fixed in the KIT, not papered over here: SemanticAvatarFallback
 * flipped to the soft pair (the source's own avatars), MetricRow's delta
 * arrows straightened (↑/↓ vs the score's ↗/↘), CollapsibleGroup's chevron
 * moved to the right edge, Grid/CollapsibleGroup gained width:100% (the
 * phantom-height root cause).
 */
const meta: Meta = { title: 'Pages/Komanda', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

// --- source data (komanda.html verbatim) ---

type ScoreTone = Extract<SemanticTone, 'green' | 'warn' | 'accent'>
type Tag = { label: string; tone?: ScoreTone } // tone-less = neutral gray
type Metric = { value: string; delta: string; tone?: ScoreTone; trend?: 'up' | 'down' }
type Employee = {
  initials: string; name: string
  score: string; tone: ScoreTone
  tags?: Tag[]
  check: Metric
  upsell: Metric
  daily?: boolean
}

const BOLSHEVISTSKAYA: Employee[] = [
  { initials: 'ТК', name: 'Татьяна Климова', score: '7,1', tone: 'green', tags: [{ label: 'Высокая оценка', tone: 'green' }, { label: 'Растёт', tone: 'green' }], check: { value: '470 ₽', delta: '1% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '5 200 ₽', delta: '86% к среднему', tone: 'green', trend: 'up' }, daily: true },
  { initials: 'К', name: 'Кирилл', score: '6,3', tone: 'green', tags: [{ label: 'Растёт', tone: 'green' }], check: { value: '480 ₽', delta: '3% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '4 885 ₽', delta: '75% к среднему', tone: 'green', trend: 'up' } },
  { initials: 'Я', name: 'Яна', score: '6,1', tone: 'green', tags: [{ label: 'Мало смен' }], check: { value: '528 ₽', delta: '14% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '0 ₽', delta: 'нет за неделю', tone: 'accent', trend: 'down' } },
  { initials: 'А', name: 'Алина', score: '6,0', tone: 'green', check: { value: '460 ₽', delta: '1% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '4 970 ₽', delta: '78% к среднему', tone: 'green', trend: 'up' } },
  { initials: 'П', name: 'Полина', score: '5,9', tone: 'warn', tags: [{ label: 'Растёт', tone: 'green' }], check: { value: '540 ₽', delta: '16% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '1 430 ₽', delta: '49% к среднему', tone: 'accent', trend: 'down' } },
  { initials: 'А', name: 'Анастасия', score: '5,6', tone: 'warn', tags: [{ label: 'Оценка снижается', tone: 'accent' }], check: { value: '450 ₽', delta: '3% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '1 200 ₽', delta: '57% к среднему', tone: 'accent', trend: 'down' } },
  { initials: 'Н', name: 'Николай', score: '5,5', tone: 'warn', tags: [{ label: 'Оценка снижается', tone: 'accent' }], check: { value: '464 ₽', delta: 'на уровне среднего' }, upsell: { value: '2 110 ₽', delta: '24% к среднему', tone: 'accent', trend: 'down' }, daily: true },
]

const SOVETSKAYA: Employee[] = [
  { initials: 'АШ', name: 'Александра Шипилова', score: '5,0', tone: 'warn', tags: [{ label: 'Низкая оценка', tone: 'warn' }], check: { value: '314 ₽', delta: '32% к среднему', tone: 'accent', trend: 'down' }, upsell: { value: '3 020 ₽', delta: '8% к среднему', tone: 'green', trend: 'up' } },
]

const DIMITROVA: Employee[] = [
  { initials: 'МО', name: 'Максим Орлов', score: '6,0', tone: 'green', check: { value: '470 ₽', delta: '1% к среднему', tone: 'green', trend: 'up' }, upsell: { value: '2 300 ₽', delta: '18% к среднему', tone: 'accent', trend: 'down' } },
]

// --- page-local assemblies (deliberately NOT components — the test is
//     whether the kit's parts are enough to build them cleanly) ---

function AccessStatus() {
  return <StatusDot tone="green">Пользуется ежедневно</StatusDot>
}

function TagBadge({ tag }: { tag: Tag }) {
  return <StatusBadge tone={tag.tone ?? 'muted'}>{tag.label}</StatusBadge>
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
              <Text as="span" size="footnote" color={color.mutedForeground}>Сотрудник</Text>
            </Stack>
          </Flex>
          {/* score in the card is plain colored text — the pill (`.sval`)
              is the insights-row language, the source keeps them distinct */}
          <Text as="span" size="title" weight={600} color={color[e.tone]}>
            {e.score}
          </Text>
        </Flex>

        {e.tags && e.tags.length > 0 && (
          <Flex gap="xs">
            {e.tags.map((t) => <TagBadge key={t.label} tag={t} />)}
          </Flex>
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
            Выдать доступ в приложение
          </Button>
        )}
      </Stack>
    </Surface>
  )
}

function PointManagerCard({ initials, name, badge }: { initials: string; name: string; badge: string }) {
  // Ирина Соколова's card: an entity card with a role badge, a dash instead
  // of a score, no metrics — the source keeps the separators and the empty
  // metrics zone so the card reads in the same family as its neighbors
  return (
    <Surface variant="glass" p="base" radius="xl">
      <Stack gap="md" style={{ height: '100%' }}>
        <Flex justify="space-between" align="flex-start" gap="base" wrap={false}>
          <Flex align="center" gap="sm" wrap={false}>
            <Avatar>
              <SemanticAvatarFallback tone="plum">{initials}</SemanticAvatarFallback>
            </Avatar>
            <Stack gap="none">
              <Text as="span" size="body" weight={600}>{name}</Text>
              <Text as="span" size="footnote" color={color.mutedForeground}>Сотрудник</Text>
            </Stack>
          </Flex>
          <Text as="span" size="title" weight={600} color={color.mutedForeground}>—</Text>
        </Flex>
        <Flex gap="xs">
          <StatusBadge tone="plum">{badge}</StatusBadge>
        </Flex>
        <Separator />
        <div style={{ flex: 1 }} />
        <Separator />
        <AccessStatus />
      </Stack>
    </Surface>
  )
}

function NetworkManagerCard({ initials, name }: { initials: string; name: string }) {
  return (
    <Surface variant="glass" p="base" radius="xl">
      <Flex align="center" gap="sm" wrap={false}>
        <Avatar>
          <SemanticAvatarFallback tone="plum">{initials}</SemanticAvatarFallback>
        </Avatar>
        <Stack gap="xs">
          <Stack gap="none">
            <Text as="span" size="body" weight={600}>{name}</Text>
            <Text as="span" size="footnote" color={color.mutedForeground}>Управляющий сетью</Text>
          </Stack>
          <div>
            <StatusBadge tone="plum">Все адреса</StatusBadge>
          </div>
        </Stack>
      </Flex>
    </Surface>
  )
}

function InsightHeader({ icon, label, tone }: { icon: 'star' | 'warning'; label: string; tone: 'green' | 'accent' }) {
  return (
    <Flex align="center" gap="xs">
      <Icon name={icon} size={14} color={color[tone]} />
      <Text as="span" size="footnote" weight={600} color={color[tone]} style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </Text>
    </Flex>
  )
}

function InsightPersonRow({ initials, name, addr, pill }: { initials: string; name: string; addr: string; pill: ReactNode }) {
  return (
    <Flex justify="space-between" align="center" gap="base" wrap={false} style={{ cursor: 'pointer' }}>
      <Flex align="center" gap="sm" wrap={false}>
        <Avatar size="sm">
          <SemanticAvatarFallback tone="muted">{initials}</SemanticAvatarFallback>
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


function UnknownVoiceCard({ addr, samples }: { addr: string; samples: string }) {
  return (
    <Surface variant="muted" p="base" radius="xl">
      <Stack gap="md">
        <Flex align="center" gap="sm" wrap={false}>
          <Avatar>
            <SemanticAvatarFallback tone="muted" style={{ backgroundColor: color.secondary }}>
              <Icon name="voice" size={14} />
            </SemanticAvatarFallback>
          </Avatar>
          <Stack gap="none">
            <Text as="span" size="body" weight={600}>Неизвестный сотрудник</Text>
            <Text as="span" size="footnote" color={color.mutedForeground}>{addr}</Text>
          </Stack>
        </Flex>
        <div>
          <StatusBadge tone="muted" style={{ backgroundColor: color.secondary, gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: color.mutedForeground }} />
            {samples}
          </StatusBadge>
        </div>
        <Text as="p" size="caption" color={color.mutedForeground}>
          Распознали новый голос — прослушайте записи и присвойте имя. После этого начнём считать его оценку.
        </Text>
        <Button size="sm" style={{ width: 'max-content' }}>
          ✎ Указать имя
        </Button>
      </Stack>
    </Surface>
  )
}

function ProcessingCard({ addr }: { addr: string }) {
  return (
    <Surface variant="muted" p="base" radius="xl">
      <Stack gap="md">
        <Flex align="center" gap="sm" wrap={false}>
          <Avatar>
            <SemanticAvatarFallback tone="muted" style={{ backgroundColor: color.secondary }}>
              <Icon name="voice" size={14} />
            </SemanticAvatarFallback>
          </Avatar>
          <Stack gap="none">
            <Text as="span" size="body" weight={600}>Идёт обработка</Text>
            <Text as="span" size="footnote" color={color.mutedForeground}>{addr}</Text>
          </Stack>
        </Flex>
        <Text as="p" size="caption" color={color.mutedForeground}>
          Собираем записи на точке. Сэмплы голосов появятся в ближайшие дни — тогда можно будет присвоить имена.
        </Text>
      </Stack>
    </Surface>
  )
}

function GroupCount({ n }: { n: number }) {
  return <StatusBadge tone="muted">{n}</StatusBadge>
}

export const Full: Story = {
  render: () => (
    <>
      <AppShell
        sidebar={
          <SidebarNav
            active="team"
            items={EXAMPLE_NAV_ITEMS}
            avatarInitials="У"
            avatarTitle="Управляющий"
            clientLabel="Бодрый день"
          />
        }
      >
        <Stack gap="lg">
          <PageHeader
            title="Команда"
            meta="Бодрый день · 5 адресов · 16 человек · неделя 17–23 июня"
            action={
              // the page's single accent CTA — the source's own orange button
              <Button style={{ background: color.accent, color: color.accentForeground }}>
                + Создать профиль
              </Button>
            }
          />

          {/* everything below the header lives in the SAME rail column as
              the source (titleless TitledRow = the source's own titleless
              .srow) — the first draft spanned full width and looked like a
              different page */}
          <TitledRow>
            <Stack gap="base">
              <SummaryNote label="Сводка команды">
                Сильнее всех команда <SummaryStat tone="green" onClick={() => {}}>Большевистская 35</SummaryStat>, у них есть чему поучиться.
                Самый большой недобор на допродажах на <SummaryStat tone="accent" onClick={() => {}}>Советская 5</SummaryStat>.{' '}
                <SummaryStat tone="muted" onClick={() => {}}>Распознано 3 новых голоса</SummaryStat> — их нужно сопоставить с сотрудниками.
                Доступ в приложение пока выдан 2 из 14 линейных.
              </SummaryNote>

              <Grid columns={2} gap="base">
                <Surface variant="glass" p="lg" radius="xl">
                  <Stack gap="md">
                    <InsightHeader icon="star" label="Лучшие на неделе" tone="green" />
                    <InsightPersonRow initials="ТК" name="Татьяна Климова" addr="Большевистская 35" pill={<ScorePill value="7,1" tone="green" />} />
                    <InsightPersonRow initials="К" name="Кирилл" addr="Большевистская 35" pill={<ScorePill value="6,3" tone="green" trend="up" />} />
                  </Stack>
                </Surface>
                <Surface variant="glass" p="lg" radius="xl">
                  <Stack gap="md">
                    <InsightHeader icon="warning" label="Требуют внимания" tone="accent" />
                    <InsightPersonRow initials="АШ" name="Александра Шипилова" addr="Советская 5" pill={<ScorePill value="5,0" tone="warn" />} />
                    <InsightPersonRow initials="А" name="Анастасия" addr="Большевистская 35" pill={<ScorePill value="5,6" tone="accent" trend="down" />} />
                  </Stack>
                </Surface>
              </Grid>

              <Surface variant="muted" p="base" radius="xl" style={{ cursor: 'pointer' }}>
                <Flex justify="space-between" align="center" gap="base" wrap={false}>
                  <Text as="p" size="caption">
                    <b>Распознано 3 новых голоса</b> на Серебренниковской и Советской — присвойте имена, чтобы начать считать их работу.
                  </Text>
                  <Button size="sm" style={{ flexShrink: 0 }}>Разметить голоса</Button>
                </Flex>
              </Surface>
            </Stack>
          </TitledRow>

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
                  <NetworkManagerCard initials="АГ" name="Алексей Громов" />
                  <NetworkManagerCard initials="МИ" name="Мария Иванова" />
                </Grid>
              </Stack>

              <CollapsibleGroup title="Новосибирск, Большевистская 35" count={<GroupCount n={7} />}>
                <Grid minColWidth={320} gap="base">
                  {BOLSHEVISTSKAYA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Новосибирск, Серебренниковская 20" count={<GroupCount n={1} />} extra={<StatusBadge tone="warn">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  <UnknownVoiceCard addr="Новосибирск, Серебренниковская 20" samples="8 сэмплов голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Новосибирск, Советская 5" count={<GroupCount n={2} />} extra={<StatusBadge tone="warn">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  {SOVETSKAYA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                  <UnknownVoiceCard addr="Новосибирск, Советская 5" samples="5 сэмплов голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Новосибирск, Димитрова 2" count={<GroupCount n={3} />} extra={<StatusBadge tone="warn">1 неизвестный</StatusBadge>}>
                <Grid minColWidth={320} gap="base">
                  <PointManagerCard initials="ИС" name="Ирина Соколова" badge="Управляющий точкой" />
                  {DIMITROVA.map((e) => <EmployeeCard key={e.name} e={e} />)}
                  <UnknownVoiceCard addr="Новосибирск, Димитрова 2" samples="3 сэмпла голоса" />
                </Grid>
              </CollapsibleGroup>

              <CollapsibleGroup title="Новосибирск, Кирова 113/2" count={<GroupCount n={1} />}>
                <Grid minColWidth={320} gap="base">
                  <ProcessingCard addr="Новосибирск, Кирова 113/2" />
                </Grid>
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
