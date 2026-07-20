import type { ReactNode } from "react"
import { Flex, TitledRow } from "@/foundation"
import { color } from "@/foundation"
import { Heading } from "@/foundation"
import { Text } from "@/foundation"

/*
 * PageHeader — the page-top header both source pages open with (komanda's
 * `.tophead`, dashboard's `.pagehead`): page title in the TitledRow rail,
 * meta line + optional CTA in the main column. Rebuilt by hand in all
 * three cold-start consumer sessions — the most-proven Section candidate
 * the system has had.
 *
 * Note this is the one legitimate rail usage that is NOT the ">=2 cards"
 * grouping rule: both sources put the PAGE title (not a section title) in
 * the rail — PageHeader packages that exception so pages don't have to
 * re-derive it.
 */
export type PageHeaderProps = {
  /** page title — rendered as the h1 in the rail */
  title: ReactNode
  /** muted meta line ("Бодрый день · 5 адресов · 16 человек · неделя 17–23 июня") */
  meta?: ReactNode
  /** right-side slot — usually the screen's single primary CTA */
  action?: ReactNode
}

export function PageHeader({ title, meta, action }: PageHeaderProps) {
  return (
    <TitledRow
      title={
        <Heading as="h1" size="headline">
          {title}
        </Heading>
      }
    >
      <Flex justify="space-between" align="center" gap="base">
        {meta != null ? (
          <Text as="span" size="caption" color={color.mutedForeground}>
            {meta}
          </Text>
        ) : (
          <span />
        )}
        {action}
      </Flex>
    </TitledRow>
  )
}
