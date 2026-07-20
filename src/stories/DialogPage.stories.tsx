import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState, type ReactNode } from 'react'
import { AppShell, Flex, Grid, Stack, Surface, TitledRow, color, type as typeScale } from '@/foundation'
import { Icon, type IconName } from '@/primitives/Icon'
import { Text } from '@/primitives/Text'
import { Separator } from '@/components/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Checklist } from '@/components/composed/Checklist'
import { LayeredCard } from '@/components/composed/LayeredCard'
import { MomentCard, MomentStrip } from '@/components/composed/MomentCard'
import { ScoreHeatmap, type ScoreHeatmapGroup } from '@/components/composed/ScoreHeatmap'
import { SparkLink } from '@/components/composed/SparkLink'
import { StatusBadge } from '@/components/composed/SemanticTone'
import { StepFunnel } from '@/components/composed/StepFunnel'
import { TimeTag } from '@/components/composed/TimeTag'
import { WaveformPlayer, type WaveformPlayerHandle } from '@/components/composed/WaveformPlayer'
import { AssistantDock, type AssistantDockHandle } from '@/sections/AssistantDock'
import { SidebarNav, EXAMPLE_NAV_ITEMS } from '@/sections/SidebarNav'

/*
 * ACCEPTANCE TEST, not a component: dialog-v2.html (the dialog-review page)
 * rebuilt end-to-end from package exports, source-verbatim data — the same
 * exercise Pages/Komanda was. Gaps this rebuild surfaced became kit pieces
 * BEFORE this story was written: TimeTag, WaveformPlayer, MomentCard/Strip,
 * ScoreHeatmap, LayeredCard, StepFunnel, Checklist, SparkLink, the `sand`
 * token, AssistantDock's `ask` ref handle.
 *
 * Deliberately skipped from the source: the "Старый вид (для сравнения) /
 * Новый вид" upsell comparison blocks (design-exploration scaffolding, not
 * product surface — the up4 card grid is the canonical view) and the
 * version-switcher widget (prototype tooling).
 */
const meta: Meta = { title: 'Pages/Dialog', parameters: { layout: 'fullscreen' } }
export default meta
type Story = StoryObj

// --- source data (dialog-v2.html DIALOGS[0], verbatim) ---

type MomentDef = {
  id: number
  t: string // "00:00 – 00:01"
  crit: string
  tone: 'success' | 'accent'
  desc: string
  quote?: string
}

const MOMENTS: MomentDef[] = [
  { id: 0, t: '00:00 – 00:01', crit: 'Приветствие', tone: 'accent', desc: 'Поздоровался стандартно «Доброе утро.», без фирменного «Бодрый день».', quote: 'Доброе утро.' },
  { id: 1, t: '00:02 – 00:04', crit: 'Выявление потребностей', tone: 'accent', desc: 'Сразу перешёл к оформлению заказа, без открытых вопросов о предпочтениях гостя.' },
  { id: 2, t: '00:05 – 00:08', crit: 'Допродажи', tone: 'accent', desc: 'Уточнил подогрев, но не предложил напиток или добавку к сэндвичу.', quote: 'Сэндвич подогреть?' },
  { id: 3, t: '00:15 – 00:17', crit: 'Карта лояльности', tone: 'success', desc: 'Своевременно уточнил наличие карты лояльности.', quote: 'Карту, пожалуйста.' },
  { id: 4, t: '00:21 – 00:22', crit: 'Завершение', tone: 'success', desc: 'Чётко озвучил итоговую сумму — но на этом запись обрывается.', quote: 'Сто восемьдесят один.' },
]

const END_MOMENT = { t: '00:22', h: 'Запись обрывается', d: 'Повтор заказа и прощание не попали в запись — оценить их невозможно.' }

const DURATION = 22 // 00:22

function sec(t: string): number {
  const [m, s] = t.split(':').map(Number)
  return m * 60 + s
}
function momentStart(id: number): number {
  return sec(MOMENTS[id].t.split(' ')[0])
}
function momentLabel(id: number): string {
  return MOMENTS[id].t.split(' ')[0]
}

const ANS = {
  voice: 'Голос пока не сопоставлен с сотрудником. Открой «Команда → неизвестные голоса», прослушай сэмплы и присвой имя — после этого заказ привяжется к профилю бариста.',
  focus: <>Начните с одного, самого денежного: <b>предлагать напиток гостям, которые берут только еду</b> («к сэндвичу — сезонный чай со льдом „Таёжь“…»). Приветствие «Бодрый день» — следующим заходом. Карту лояльности сотрудник уже спрашивает — это похвалите.</>,
  money: 'Чек вышел низкий — 181 ₽, закрыта только еда. Упущены напиток (сезонный ≈120–160 ₽) и добавка (сироп/альт. молоко ≈70 ₽). Итого ~200 ₽ потенциала мимо. Для заказов «только еда» это типовой недобор по сети.',
  pattern: 'Не разовое. «Только еда без напитка» и «нет фирменного приветствия» — частые зоны роста. Стоит сделать предложение напитка к еде фокусом смены и отслеживать долю таких заказов на дашборде.',
}

// --- page-local assemblies (deliberately NOT components — the test is
//     whether the kit's parts are enough to build them cleanly) ---

function SectionTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <Stack gap="xs">
      <Text as="h2" size="headline" weight={400} style={{ margin: 0 }}>{children}</Text>
      {sub && <Text as="div" size="caption" color={color.mutedForeground}>{sub}</Text>}
    </Stack>
  )
}

function VerdictStat({ label, children }: { label: ReactNode; children: ReactNode }) {
  return (
    <Stack gap="xs" style={{ flex: 'none' }}>
      <Text as="span" size="caption" color={color.textTertiary}>{label}</Text>
      {children}
    </Stack>
  )
}

function UppercaseLabel({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      size="footnote"
      weight={600}
      color={color.textTertiary}
      style={{ textTransform: 'uppercase', letterSpacing: '0.5px' }}
    >
      {children}
    </Text>
  )
}

function PriorityIcon({ icon, label, bg, fg }: { icon: IconName; label: string; bg: string; fg: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span
          style={{
            position: 'absolute', top: 16, right: 16,
            width: 30, height: 30, borderRadius: 9,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            background: bg, color: fg,
          }}
        >
          <Icon name={icon} size={18} weight="fill" />
        </span>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

const UP_STEPS = ['Повод', 'Назвал', 'Аргумент', 'Призыв'] as const

function DialogPageDemo() {
  const playerRef = useRef<WaveformPlayerHandle>(null)
  const playerPanelRef = useRef<HTMLDivElement>(null)
  const dockRef = useRef<AssistantDockHandle>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [activeMoment, setActiveMoment] = useState<number | null>(null)

  const ask = (q: string, a?: ReactNode) => dockRef.current?.ask(q, a)

  const seekMoment = (id: number) => {
    setActiveMoment(id)
    playerRef.current?.seek(momentStart(id), { play: true })
    const panel = playerPanelRef.current
    if (panel) {
      const r = panel.getBoundingClientRect()
      if (r.top < 6 || r.bottom > window.innerHeight) panel.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    cardRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }

  const jump = (id: number) => <TimeTag time={momentLabel(id)} onClick={() => seekMoment(id)} />

  const heatGroups: ScoreHeatmapGroup[] = [
    { name: 'Приветствие', earned: 0, max: 1, subs: [{ name: 'Фирменное приветствие', score: '0/1' }], evidence: <>Поздоровался стандартно: «Доброе утро.», проигнорировав фирменное приветствие «Бодрый день». {jump(0)}</>, quote: 'Доброе утро.' },
    { name: 'Выявление потребностей', earned: 0, max: 2, subs: [{ name: 'Открытые вопросы', score: '0/2' }], evidence: <>Не задавал открытых вопросов о вкусовых предпочтениях, перейдя сразу к деталям текущего заказа. {jump(1)}</> },
    { name: 'Допродажи', earned: 0, max: 4, subs: [{ name: 'Переориентация на сезонное', score: '0/1' }, { name: 'Попытка допродажи', score: '0/1' }, { name: 'Техника допродажи', score: '0/2' }, { name: 'Допродажа объёма', score: '—' }, { name: 'Предложение еды', score: '—' }, { name: 'Добавка (сироп/альт. молоко)', score: '—' }], evidence: <>Не предложил напиток к сэндвичу, хотя это отличная возможность увеличить КТЧ. Попыток предложить сезонное меню или добавки не зафиксировано. {jump(2)}</> },
    { name: 'Карта лояльности', earned: 2, max: 2, subs: [{ name: 'Вопрос о карте', score: '1/1' }, { name: 'Работа с бонусами', score: '1/1' }], evidence: <>Бариста своевременно уточнил наличие карты лояльности. {jump(3)}</>, quote: 'Карту, пожалуйста.' },
    { name: 'Завершение', earned: 1, max: 1, subs: [{ name: 'Проговорил состав', score: '—' }, { name: 'Озвучил сумму', score: '1/1' }, { name: 'Тёплое прощание', score: '—' }], evidence: <>Озвучил итоговую сумму «Сто восемьдесят один.». Оценить повтор заказа и прощание невозможно — запись обрывается. {jump(4)}</>, quote: 'Сто восемьдесят один.' },
    { name: 'Коммуникация', earned: 3, max: 4, subs: [{ name: 'Доброжелательность', score: '1/2' }, { name: 'Эмпатия', score: '—' }, { name: 'Слова-паразиты', score: '2/2' }, { name: 'Гость без негатива', score: '—' }], evidence: 'Общение прошло в нейтрально-вежливом тоне, слова-паразиты не использовались.' },
  ]

  return (
    <>
      <AppShell
        sidebar={
          <SidebarNav
            active="orders"
            items={EXAMPLE_NAV_ITEMS}
            avatarInitials="У"
            avatarTitle="Управляющий"
            clientLabel="Бодрый день"
          />
        }
      >
        <Stack gap="lg">
          {/* Заказ — page header row: crumb + h1 + meta (the rail carries
              the entity name, same PageHeader anatomy but with the crumb
              line PageHeader doesn't have — composed from parts instead) */}
          <TitledRow title={<Text as="h2" size="headline" weight={400}>Заказ</Text>}>
            <Stack gap="sm">
              <Text as="div" size="caption" color={color.textTertiary}>
                Заказы <span style={{ margin: '0 4px' }}>›</span> Сэндвич
              </Text>
              <Text as="h1" size="display" weight={700} style={{ letterSpacing: '-0.03em', lineHeight: 1.05, margin: 0 }}>
                Сэндвич
              </Text>
              <Flex align="center" gap="sm" style={{ marginTop: 6 }}>
                {/* the source's .unassigned pill is a step bigger than the
                    tag-grade StatusBadge (caption text, 28px) — it's an
                    ACTION in the h1 meta row, not a status tag */}
                <StatusBadge tone="roleManager" asChild>
                  <button
                    type="button"
                    className="artefact-focus-ring artefact-pressable"
                    style={{ cursor: 'pointer', fontSize: typeScale.caption.size, padding: '3px 11px' }}
                    onClick={() => ask('Кому принадлежит этот голос?', ANS.voice)}
                  >
                    <Icon name="target" size={14} /> Назначить профиль
                  </button>
                </StatusBadge>
                <Text as="span" size="caption" color={color.textTertiary}>
                  · сегодня, 11:26 · 1 мин · 🏪 Новосибирск, Димитрова 2
                </Text>
              </Flex>
            </Stack>
          </TitledRow>

          {/* Вердикт + резюме; the right rail carries the insight — the
              FIRST page where TitledRow's reserved side rail gets real
              content (komanda kept it empty) */}
          <TitledRow
            side={
              <Stack gap="xs">
                <Text as="div" size="body" weight={600}>Потенциал заказа</Text>
                <Text as="div" size="display" weight={600} color={color.accent} style={{ lineHeight: 1.05 }}>
                  ≈ 200 ₽
                </Text>
                <Text as="div" size="caption" color={color.mutedForeground} style={{ lineHeight: 1.5 }}>
                  упущено на этом заказе: напиток к еде и добавка (сироп / альт. молоко).
                </Text>
                <div style={{ marginTop: 13 }}>
                  <SparkLink onClick={() => ask('Сколько недозаработали?', ANS.money)}>
                    Сколько недозаработали?
                  </SparkLink>
                </div>
              </Stack>
            }
          >
            <Stack gap="md">
              <Surface variant="panel" radius="xl" style={{ padding: '20px 24px' }}>
                <Flex align="flex-start" gap="4xl" wrap>
                  <VerdictStat label="Общий балл">
                    <Text as="span" size="display" weight={600} color={color.accent} style={{ lineHeight: 1 }}>
                      4.2
                    </Text>
                  </VerdictStat>
                  <VerdictStat label="Категория">
                    <Text as="span" size="title" weight={600} style={{ lineHeight: 1.15 }}>Только еда</Text>
                    <Flex gap="xs" wrap>
                      <StatusBadge tone="success">✓ Еда</StatusBadge>
                      <StatusBadge tone="muted">— Напиток</StatusBadge>
                      <StatusBadge tone="muted">— Добавка</StatusBadge>
                    </Flex>
                  </VerdictStat>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <VerdictStat label="Сумма заказа">
                      <Text as="span" size="title" weight={600} style={{ lineHeight: 1.15 }}>181 ₽</Text>
                    </VerdictStat>
                  </div>
                </Flex>
              </Surface>

              <Surface variant="panel" radius="xl" p="lg">
                <Stack gap="sm">
                  <Text as="div" size="body" weight={600}>Резюме</Text>
                  <Text as="p" size="body" style={{ margin: 0, lineHeight: 1.6 }}>
                    Обслуживание прошло быстро и корректно в плане оформления заказа (сэндвича): бариста
                    уточнил необходимость подогрева и спросил карту лояльности. Однако сотрудник упустил
                    возможность значительно увеличить чек, не предложив напиток к еде. Основными точками
                    роста являются использование фирменного приветствия «Бодрый день» и активное
                    предложение сезонных напитков гостям, которые заказывают только еду.
                  </Text>
                  <Separator style={{ marginTop: 8 }} />
                  <Text as="div" size="body" weight={600}>Сильные стороны</Text>
                  <Stack gap="none">
                    {([
                      ['Своевременно уточнил наличие карты лояльности.', 3],
                      ['Чётко озвучил итоговую сумму заказа.', 4],
                      ['Общался вежливо и нейтрально, без слов-паразитов.', null],
                    ] as const).map(([text, turn], i) => (
                      <Flex key={i} gap="sm" align="flex-start" wrap={false} style={{ padding: '4px 0' }}>
                        <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: '50%', background: color.success, flex: 'none', marginTop: 10 }} />
                        <Text as="span" size="body" style={{ lineHeight: 1.6 }}>
                          {text} {turn != null && jump(turn)}
                        </Text>
                      </Flex>
                    ))}
                  </Stack>
                </Stack>
              </Surface>
            </Stack>
          </TitledRow>

          {/* Хронология: the player panel — wave + controls over the
              horizontally scrolling moment strip, one Surface */}
          <TitledRow title={<SectionTitle>Хронология</SectionTitle>}>
            <div ref={playerPanelRef}>
              <Surface variant="panel" radius="xl" style={{ overflow: 'hidden' }}>
                <div style={{ padding: 20, borderBottom: `1px solid ${color.input}` }}>
                  <WaveformPlayer
                    ref={playerRef}
                    duration={DURATION}
                    marks={MOMENTS.map((m) => {
                      const [s, e] = m.t.split(/\s*–\s*/).map(sec)
                      return { id: m.id, start: s, end: e, tone: m.tone }
                    })}
                    actions={
                      <>
                        <Icon name="transcript" size={20} label="Транскрипт" />
                        <Text as="span" size="caption" color={color.mutedForeground}>Скорость: 1×</Text>
                        <Flex as="span" align="center" gap="xs">
                          <Icon name="download" size={16} />
                          <Text as="span" size="caption" color={color.mutedForeground}>Скачать</Text>
                        </Flex>
                        <Icon name="volume" size={20} label="Громкость" />
                      </>
                    }
                  />
                </div>
                <MomentStrip>
                  {MOMENTS.map((m) => (
                    <MomentCard
                      key={m.id}
                      ref={(el) => { cardRefs.current[m.id] = el }}
                      time={m.t}
                      tone={m.tone}
                      title={m.crit}
                      description={m.desc}
                      quote={m.quote}
                      highlighted={activeMoment === m.id}
                      onClick={() => seekMoment(m.id)}
                      onHoverChange={(h) => playerRef.current?.highlightMark(h ? m.id : null)}
                    />
                  ))}
                  <MomentCard time={END_MOMENT.t} tone="end" title={END_MOMENT.h} description={END_MOMENT.d} />
                </MomentStrip>
              </Surface>
            </div>
          </TitledRow>

          {/* Оценка по критериям */}
          <TitledRow title={<SectionTitle sub="6 групп критериев · итог 6 / 14">Оценка по критериям</SectionTitle>}>
            <Surface variant="panel" radius="xl" style={{ padding: '16px 20px' }}>
              <ScoreHeatmap groups={heatGroups} total={{ earned: 6, max: 14 }} />
            </Surface>
          </TitledRow>

          {/* Что улучшить */}
          <TitledRow title={<SectionTitle sub="Готовые фразы — от важного к незначительному">Что улучшить</SectionTitle>}>
            <Grid minColWidth={340} gap="md">
              <LayeredCard
                footer={
                  <Stack gap="xs">
                    <UppercaseLabel>Как лучше</UppercaseLabel>
                    <Text as="div" size="body" style={{ lineHeight: 1.5 }}>
                      Если гость заказывает только еду, предложите напиток: «Вместо обычного чая возьмите
                      наш сезонный чай со льдом „Таёжь“ — лёгкий, освежающий, отлично утоляет жажду в жару.
                      Попробуете?».
                    </Text>
                  </Stack>
                }
              >
                <PriorityIcon icon="flag" label="Важно" bg={color.accentSoft} fg={color.accent} />
                <Stack gap="sm">
                  <Text as="div" size="body" weight={600} style={{ lineHeight: 1.25, paddingRight: 34 }}>
                    Гость заказал только сэндвич, но сотрудник не предложил дополнить заказ сезонным напитком
                  </Text>
                  <Text as="div" size="body" color={color.mutedForeground} style={{ lineHeight: 1.5 }}>
                    «Сэндвич подогреть?» {jump(2)}
                  </Text>
                </Stack>
              </LayeredCard>
              <LayeredCard
                footer={
                  <Stack gap="xs">
                    <UppercaseLabel>Как лучше</UppercaseLabel>
                    <Text as="div" size="body" style={{ lineHeight: 1.5 }}>
                      Всегда начинайте диалог с нашего стандарта: «Бодрое утро!» — это помогает гостю сразу
                      почувствовать атмосферу нашей кофейни.
                    </Text>
                  </Stack>
                }
              >
                <PriorityIcon icon="warning" label="Внимание" bg={color.warningSoft} fg={color.foreground} />
                <Stack gap="sm">
                  <Text as="div" size="body" weight={600} style={{ lineHeight: 1.25, paddingRight: 34 }}>
                    В начале диалога не использовано фирменное приветствие сети
                  </Text>
                  <Text as="div" size="body" color={color.mutedForeground} style={{ lineHeight: 1.5 }}>
                    «Доброе утро.» {jump(0)}
                  </Text>
                </Stack>
              </LayeredCard>
            </Grid>
          </TitledRow>

          {/* Чеклист */}
          <TitledRow title={<SectionTitle>Чеклист</SectionTitle>}>
            <Surface variant="panel" radius="xl" style={{ padding: '16px 20px 20px' }}>
              <Checklist
                items={[
                  { done: false, label: 'Назвал конкретную позицию' },
                  { done: false, label: 'Проговорил состав заказа' },
                  { done: true, label: 'Озвучил сумму' },
                  { done: false, label: 'Тёплое прощание' },
                  { done: false, label: 'Фирменное приветствие «Бодрый день»' },
                  { done: true, label: 'Спросил о карте лояльности' },
                  { done: false, label: 'Оформлена новая карта' },
                  { done: false, label: 'Красочное описание напитка' },
                  { done: false, label: 'Задал открытые вопросы' },
                  { done: false, label: 'Предложил сезонное меню' },
                ]}
              />
            </Surface>
          </TitledRow>

          {/* Допродажи — the up4 card grid (canonical view) */}
          <TitledRow title={<SectionTitle sub="Поводов: 2 · Упущено 1 · Не довёл 1">Допродажи</SectionTitle>}>
            <Grid minColWidth={340} gap="md">
              {([
                {
                  title: 'Напиток к еде', ctx: 'гость заказал только сэндвич',
                  status: 'Упущено', tone: 'accent' as const, reached: 1, turn: 2, gain: '≈120–160 ₽',
                  fmeta: 'Сорвалось на этапе «Назвал»',
                  quote: 'Сэндвич подогреть?',
                  gap: 'Повод был, но напиток к еде не предложен вообще.',
                  script: 'К сэндвичу отлично зайдёт сезонный чай со льдом „Таёжь“ — освежает. Добавить?',
                },
                {
                  title: 'Добавка: сироп / альт. молоко', ctx: 'оформление заказа',
                  status: 'Только упомянул', tone: 'warning' as const, reached: 2, turn: 2, gain: '≈70 ₽',
                  fmeta: 'Упомянул, но не довёл',
                  quote: 'Сироп добавить не хотите?',
                  gap: 'Упомянул вскользь, без аргумента и уверенного призыва — гость легко отказался.',
                  script: 'Хотите фирменный сироп или на альтернативном молоке? Карамель — наш хит.',
                },
              ]).map((it) => (
                <LayeredCard
                  key={it.title}
                  footer={
                    <Stack gap="xs" style={{ flex: 1 }}>
                      <Flex justify="space-between" align="center" gap="sm">
                        <UppercaseLabel>Готовый скрипт</UppercaseLabel>
                        <StatusBadge tone="success">Потенциал {it.gain}</StatusBadge>
                      </Flex>
                      <Text as="div" size="body" style={{ lineHeight: 1.5 }}>{it.script}</Text>
                      <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                        <SparkLink onClick={() => ask(`Отработать: ${it.title}`, ANS.money)}>
                          Потренировать с ассистентом
                        </SparkLink>
                      </div>
                    </Stack>
                  }
                >
                  <Stack gap="none">
                    <Flex justify="space-between" align="flex-start" gap="md" wrap={false}>
                      <Stack gap="none" style={{ minWidth: 0 }}>
                        <Text as="div" size="body" weight={600} style={{ lineHeight: 1.25, letterSpacing: '-0.02em' }}>
                          {it.title}
                        </Text>
                        <Text as="div" size="footnote" color={color.textTertiary} style={{ marginTop: 3 }}>{it.ctx}</Text>
                      </Stack>
                      <StatusBadge tone={it.tone} style={{ flexShrink: 0 }}>{it.status}</StatusBadge>
                    </Flex>
                    <div style={{ margin: '16px 0 8px' }}>
                      <StepFunnel steps={UP_STEPS} reached={it.reached} tone={it.tone} />
                    </div>
                    <Text as="div" size="footnote" weight={600} color={color[`${it.tone}SoftForeground`]}>
                      {it.fmeta}
                    </Text>
                    <Text as="div" size="body" color={color.mutedForeground} style={{ lineHeight: 1.5, marginTop: 12 }}>
                      «{it.quote}» {jump(it.turn)}
                    </Text>
                    <Stack gap="xs" style={{ marginTop: 14 }}>
                      <UppercaseLabel>Чего не хватило</UppercaseLabel>
                      <Text as="div" size="body" style={{ lineHeight: 1.5 }}>{it.gap}</Text>
                    </Stack>
                  </Stack>
                </LayeredCard>
              ))}
            </Grid>
          </TitledRow>
        </Stack>
      </AppShell>

      <AssistantDock
        ref={dockRef}
        title="Ассистент"
        intro="Разберём этот диалог глубже:"
        placeholder="Спросите про этот диалог…"
        chips={[
          { question: 'С чего начать сотруднику?', answer: ANS.focus },
          { question: 'Сколько мы недозаработали на этом заказе?', answer: ANS.money },
          { question: 'Это разовое или повторяется?', answer: ANS.pattern },
        ]}
        fallbackAnswer="Смотрю этот диалог — что разобрать подробнее?"
      />
    </>
  )
}

export const Full: Story = {
  render: () => <DialogPageDemo />,
}
