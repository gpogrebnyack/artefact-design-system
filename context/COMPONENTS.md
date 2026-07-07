# COMPONENTS.md — каталог

Что здесь, а что в `DESIGN.md`: `DESIGN.md` — токены и правила визуального языка (Foundation-уровень). Этот файл — конкретные React-компоненты: что это, какой API, когда брать, когда — нет. Значения (цвета/отступы/радиусы) не повторяются здесь — они указаны по имени токена, расшифровка — в `DESIGN.md`.

Источник правды — код (`src/foundation`, `src/primitives`, `src/components`, `src/sections`). Этот файл описывает его состояние на момент написания; если он расходится с кодом — прав код, этот файл нужно поправить.

**Обозначения тира:**
- 🟢 **своё** — написано в этом проекте, полный контроль над API.
- 🔵 **shadcn/vendored** — стандартный shadcn-компонент (`components/ui/*`),
  используется как есть + иногда токен-оверрайд. Полный список пропсов — в
  документации shadcn (не переписываем её здесь, она устареет быстрее кода).
- ⚠️ **демо, не компонент** — существует только как демонстрационный код,
  ничего не экспортируется для импорта. Если нужно использовать —
  сначала превратить в реальный компонент.

---

## Foundation

Чистое поведение, без цвета/идентичности. Всё выше строится на этом.

| Компонент | Тир | Что делает | Когда брать |
|---|---|---|---|
| `Box` | 🟢 | Базовый контейнер: `p/px/py`, `radius`, `width/maxWidth/minWidth`, `grow`. Всё остальное (включая `onClick`, `aria-*`) прокидывается на элемент напрямую. | Всегда, когда нужен `<div>` с паддингом/радиусом из шкалы — никогда не пиши `style={{padding: 16}}` вручную. |
| `Flex` | 🟢 | `Box` + `display:flex`, `direction`, `gap`, `align`, `justify`, `wrap` (по умолчанию `true` — оборачивается сам). | Ряд элементов, которым можно перенестись на новую строку. |
| `Stack` | 🟢 | `Flex` с `direction="column"` по умолчанию. | Вертикальная колонка — самый частый кейс, есть отдельным именем, чтобы не писать `direction="column"` каждый раз. |
| `Grid` | 🟢 | `Box` + `display:grid`, `auto-fit`/`minmax` реflow по `minColWidth` (default 280) ИЛИ фиксированное число `columns`. | Сетка карточек, которая сама решает, сколько колонок влезает — не считай breakpoints руками. |
| `Container` | 🟢 | `Box` + `max-width` (default 1280) + `margin-inline:auto`. | Центрированная колонка контента заданной ширины. |
| `Surface` | 🟢 | `Box` + один из 5 background-вариантов (`glass/paper/muted/plain/scrim`, реестр `SURFACE_VARIANTS` в `surface.tsx`). | Любая поверхность с фоном из системных токенов. См. `DESIGN.md` → Elevation про разницу `glass` и `scrim`. |
| `TitledRow` | 🟢 | Секция title-rail + main + опциональный side-rail (`rail`/`gap` в px). Настоящий CSS (`row.css`), не инлайн-стили — брейкпоинт ~1120px требует media query. | Заголовок раздела страницы с (опционально) правой колонкой-советом. Не давай `side`, если контента для side нет — есть модификатор `--no-side`. |
| `AppShell` | 🟢 | `{sidebar, children}` → флекс сайдбар + колонка `max-width:1280, padding:26px 24px 90px`. Инвариант для всех страниц продукта, не одноразовое решение. | Корень любой реальной страницы. Не пересобирай эти значения руками на уровне страницы — это ровно тот баг, который уже был (сайдбар прилипал не туда). |

## Primitives

### Свои (полный контроль)

| Компонент | Что делает | Когда брать / не брать |
|---|---|---|
| `Icon` | `<Icon name="..." size weight color label />`. Имя — ключ из governed-реестра `REGISTRY` (Phosphor-глифы; полный список в `ICON_NAMES`). | Всегда через `name`, никогда не импортируй Phosphor-глиф напрямую в компонент выше — тогда список иконок остаётся одним управляемым словарём. Если нужной иконки нет в `REGISTRY` — добавь её туда, не инлайни SVG на месте использования. |
| `Image` | `<Image src alt width height fit radius loading />`. Настоящий пробел ни у Radix, ни у shadcn (Avatar покрывает только круглый fallback-кейс, не фото/иллюстрацию). | Любое `<img>` в продукте. `alt` обязателен — decorative-картинка получает `alt=""` явно, а не отсутствие атрибута. |
| `Text` | `<Text as size color weight align truncate />`. `size` — шаг шкалы типографики (`footnote…display`), резолвится в px+lineHeight из `tokens.ts`. | Любая строка текста в компоненте выше должна идти через `Text`, не через сырой `<span className="text-sm">` — единственное место, которое знает, что означает `caption` в px. `weight` не запечён в шаг шкалы — ставь явно (600 — единственное другое реально самохостящееся начертание, см. `DESIGN.md`). |

### shadcn/vendored (стандартный API — см. shadcn-документацию)

`Avatar`, `Badge`, `Button`, `Checkbox`, `Input`, `RadioGroup`, `Select`, `Switch`, `Toggle`/`ToggleGroup`, `Tooltip`, `NavigationMenu`, `Progress`, `Separator`, `Dialog`.

Используются как есть, без правки исходников. Наши оверрайды — на уровне темы/атрибутов, не пропсов:
- `[data-slot="button"]`/`[data-slot="input"]`/`[data-slot="select-trigger"]` — высота/радиус пересчитаны в `brand-overrides.css` (см. `DESIGN.md` → Components).
- Если конкретному месту нужно другое поведение (например, `Select`, который умеет очищаться крестиком) — это уже не «просто shadcn Select», это новый Components-тир композит (см. `FilterSelect` ниже), а не проп на самом `Select`.

**⚠️ `Sparkline`/`ScoreRing` — не компоненты.** Демонстрационный код в `src/stories/Chart.stories.tsx` показывает, что Recharts+`ChartContainer` покрывает то, что раньше было кастомным SVG (mini-график, круговой индикатор прогресса). Ничего не экспортируется — если понадобится настоящий спарклайн-компонент, его нужно сначала выделить в реальный файл.

## Components

Primitives + Foundation, собранные в конкретную повторяемую сущность.

### Свои композиты

| Компонент | Props | Когда брать |
|---|---|---|
| `AdviceCard` | `icon, tone("ink"\|"accent"), value, text, note?` | Карточка-совет в side-rail (`TitledRow`'s `side`) — иконка + крупное значение + текст. `tone="accent"` — редкость, для настоящего хайлайта (новый рекорд и т.п.), не дефолт. Не путать с `Alert` (тот — плоское уведомление, без слота под значение) и `EmptyState` (тот — про отсутствие иконки-как-идентичности). |
| `FilterSelect` | `label, placeholder, value?, onValueChange?, onClear?, options[]` | Пилюля-селект, которая обзаводится крестиком-очисткой при выбранном значении. Обычный `Select` не умеет очищаться — не пытайся добавить это пропом на `Select`, это отдельный композит. |
| `Toolbar` + `ToolbarGroup` + `ToolbarToggleGroup` + `ToolbarToggleItem` + `ToolbarSeparator` + `ToolbarButton` | `Toolbar({orientation, bare})`; `ToolbarToggleGroup({value, onValueChange})` | Построено на `radix-ui`'s `Toolbar` напрямую (у shadcn нет тулбар-рецепта) — roving-focus между кнопками/тоглами. **`bare=true` обязателен**, если внутри ровно одна уже самоокрашенная группа (`ToolbarToggleGroup` рисует свою pill-плашку) — иначе получится пилюля-в-пилюле (реальный баг, который уже чинили). |
| `Chip` | Все пропсы `<button>` (`ButtonHTMLAttributes`) | Кликабельная пилюля на `glass`-поверхности — сработала только после того, как `Box` начал прокидывать `onClick` (см. Foundation). Не для статичных тегов без реакции — см. правило «выглядит кликабельным → обязано реагировать» из `DESIGN.md`. |
| `MessageBubble` | `from("user"\|"bot")`, children | Пузырь чата с «зарезанным» уголком (5px) в сторону отправителя. `user` = тёмная заливка, `bot` = paper. |
| `TypingIndicator` | без пропсов | Три пульсирующих точки — статус «ассистент думает» перед ответом. |
| `FormField` (Field.tsx) | `label, htmlFor?, description?, error?, children` | Обёртка shadcn-примитивов `Field/FieldLabel/FieldDescription/FieldError` вокруг любого контрола (Input/Select/Checkbox). Используй это, а не собирай label+control+error руками на месте — тогда ошибка/описание всегда в одном месте разметки. |
| `Search` | `placeholder?, value?, onChange?, className?` | `InputGroup` (shadcn) + `Icon` как leading addon. Всегда для полей поиска — не собирай Input + абсолютно-позиционированную иконку вручную. |
| `BarChart` / `LineChart` / `AreaChart` | `data, xKey, series: {key,label,color}[], height?, showLegend?` (+`stacked?` у Area) | Настоящий Recharts через shadcn's `ChartContainer`. `showLegend` по умолчанию `series.length > 1`. Grid/оси — `color.input`, никогда `color.border` (тот прозрачный по правилу). |
| `DonutChart` | `data: {key,label,value,color}[], height?, showLegend?` | Категориальная разбивка (Pie, `innerRadius:"60%"`). |
| `DistributionChart` | `groups: {name,total,segments:{label,count,widthPct}[]}[], rowHeight?` | Горизонтальный stacked-bar на группу; если сегменты не сумма в 100% — остаток дорисовывается приглушённым `rest`. Заменил старый самописный `SegmentedBar` (визуально выглядел дешевле настоящих чартов). |

### shadcn/vendored, но на уровне Components (не Primitives)

`Card`, `EmptyState` (`empty.tsx`), `Tabs`, `Alert`, `Menu` (`dropdown-menu.tsx`), `Pagination`, `Table`, `Notification` (`sonner.tsx`).

Это тоже стандартные shadcn-компоненты, но они — композиционные оболочки (слоты Header/Content/Footer, список пунктов и т.п.), а не атомарный контрол — поэтому классифицированы как Components, не Primitives. API — см. shadcn-документацию.

**⚠️ Карточка-метрика (`Card` + `Text` + `LineChart`) — не компонент.** Демонстрационный код в `src/stories/ChartAdvanced.stories.tsx` показывает такую композицию вручную — не экспортируется, есть только как образец, скопируй руками, если нужен такой паттерн.

⚠️ **Известный пробел:** `Notification` (`sonner.tsx`) использует `next-themes`, но `ThemeProvider` в приложении не смонтирован — тема тостов всегда резолвится в `"system"`. Не чинилось, низкий приоритет.

## Sections

Секции — намеренно немногочисленные (стоящее правило: `Sections` остаётся компактным, а не превращается во вторую копию `Components`; странично-специфичный блок без повторяющегося прецедента на нескольких реальных экранах продукта не пакуется в новую секцию раньше времени — он остаётся кодом конкретной страницы в потребляющем приложении).

| Компонент | Props | Что это |
|---|---|---|
| `SidebarNav` | `active?, items (обязателен, NavItem[]), avatarInitials?, avatarTitle?, showSettings?, clientLabel?, clientInitial?` | Левый рейл приложения. `items` — обязательный проп, без дефолта (пакет обслуживает несколько продуктов/клиентов Артефакта — ни один конкретный набор пунктов не может быть «тем самым» дефолтом). `clientLabel` — опциональный чип «какой это клиент»; чип не рендерится вообще, если его не передать, никогда не показывает чьё-то конкретное имя по умолчанию. `EXAMPLE_NAV_ITEMS` экспортирован как пример/фикстура, не как рабочий дефолт. |
| `AssistantDock` | `title?, intro?, chips?(ChipQuestion[]), fallbackAnswer?, placeholder?` | Плавающий AI-ассистент. Настоящий стейт-мачин (`idle → open → orb`), не статичный снэпшот — `orb` включается, если пользователь скроллит вниз и закрывает панель (`window.scrollY > 120`). `intro`/`fallbackAnswer` — placeholder-дефолты без привязки к конкретному продукту/клиенту, передавай реальный текст явно. Единственный наравне с `SidebarNav` «органический» (bespoke) компонент — блюр-панель/градиентная кнопка/спиннер-иконка — реальный CSS в `AssistantDock.css`, не выражен через Foundation-примитивы (не всё честно сводится к токенам без выдумывания). |
