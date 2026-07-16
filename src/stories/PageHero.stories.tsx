import type { Meta, StoryObj } from "@storybook/react-vite"
import { PageHero } from "@/sections/PageHero"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/composed/SemanticTone"
import { Text } from "@/primitives/Text"
import { color } from "@/foundation"

/*
 * PageHero — страничная шапка В ПОТОКЕ контента (Deel/Neon). Правило выбора
 * против PageHeader (рельса) — в COMPONENTS.md: карточки сразу рядом с
 * шапкой → рельс; списочная или детальная страница → hero.
 */
const meta: Meta<typeof PageHero> = {
  title: "Sections/PageHero",
  component: PageHero,
}
export default meta
type Story = StoryObj<typeof PageHero>

/* списочная страница: заголовок + мета + единственный CTA справа */
export const ListPage: Story = {
  args: {
    title: "Эксперименты",
    sub: "Mobbin-лаборатория · artefact-design-system из npm · готово 9 из 12",
    action: <Button>Каталог кита</Button>,
  },
}

/* детальная страница: крошки НАД заголовком, пилюли статуса ПОД ним,
   лид-абзац — анатомия закреплена ревью Mobbin-эксперимента */
export const DetailPage: Story = {
  args: {
    crumbs: (
      <>
        <a href="#" style={{ color: "inherit" }}>Эксперименты</a>
        {" / "}A2
      </>
    ),
    title: "Период с диапазоном дат",
    badge: (
      <>
        <StatusBadge tone="green">Готов</StatusBadge>
        <StatusBadge tone="muted">Боевой, без контроля</StatusBadge>
      </>
    ),
    lead: (
      <Text as="p" size="caption" color={color.mutedForeground} style={{ maxWidth: "68ch" }}>
        Элемент: расширение переключателя Месяц/Неделя/День возможностью задать произвольный
        диапазон дат. Прецедент нулевой — ресёрч должен сам показать норму.
      </Text>
    ),
  },
}
