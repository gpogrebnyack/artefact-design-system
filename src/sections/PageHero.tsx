import type { ReactNode } from "react"
import { Stack, TitledRow, color } from "@/foundation"
import { Heading } from "@/foundation"
import { Text } from "@/foundation"

/*
 * PageHero — страничная шапка ДЛЯ СПИСОЧНЫХ И ДЕТАЛЬНЫХ страниц: заголовок
 * живёт в потоке контента (не в титульном рельсе), действия — справа одной
 * строкой. Родился в Mobbin-эксперименте (плейграунд пересобирал его
 * трижды) из референсов Deel IT / Neon dashboard; PageHeader (рельс)
 * остаётся для страниц, где рядом с шапкой сразу стоят карточки — правило
 * выбора см. COMPONENTS.md.
 *
 * Анатомия закреплена ревью эксперимента:
 *  - `crumbs` — навигация назад ВСЕГДА НАД заголовком (норма 8/8:
 *    Amplitude, Braintrust, Klaviyo, Navattic — ни у кого «назад» не живёт
 *    под h1);
 *  - `badge` — пилюли статуса/режима ПОД заголовком, не в строке h1
 *    (решение владельца);
 *  - `sub` — приглушённая мета-строка фактов (Dovetail);
 *  - `lead` — короткая постановка абзацем (Docusign report: описание живёт
 *    в шапке, а не первой карточкой контента).
 */
export type PageHeroProps = {
  title: ReactNode
  /** навигация назад / хлебные крошки — рендерится НАД заголовком */
  crumbs?: ReactNode
  /** пилюли статуса/режима — строкой под заголовком */
  badge?: ReactNode
  /** приглушённая мета-строка ("Сценарий A · Боевой · файл.md") */
  sub?: ReactNode
  /** короткая постановка/лид-абзац под метой */
  lead?: ReactNode
  /** правый слот — обычно единственный первичный CTA экрана */
  action?: ReactNode
  /** false — hero встаёт в контентную колонку (одна ось с длинформом
   *  ниже), fullWidth остаётся у полноширинных лент-сцен */
  fullWidth?: boolean
}

export function PageHero({ title, crumbs, badge, sub, lead, action, fullWidth = true }: PageHeroProps) {
  return (
    <TitledRow fullWidth={fullWidth}>
      <Stack gap="xs">
        {crumbs && (
          <Text as="nav" size="footnote" color={color.mutedForeground}>
            {crumbs}
          </Text>
        )}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Heading as="h1" size="display" style={{ letterSpacing: "-0.02em" }}>
            {title}
          </Heading>
          {action}
        </div>
        {badge && <div style={{ display: "flex", alignItems: "center", gap: 8 }}>{badge}</div>}
        {sub && (
          <Text as="p" size="caption" color={color.mutedForeground}>
            {sub}
          </Text>
        )}
        {lead && <div style={{ marginTop: 6 }}>{lead}</div>}
      </Stack>
    </TitledRow>
  )
}
