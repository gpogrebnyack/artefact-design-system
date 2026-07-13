import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Flex, Stack } from "@/foundation"
import { color } from "@/foundation"
import { Text } from "@/primitives/Text"

/*
 * ChartCard — dashboard-prototype.html's `.media-chart-card` +
 * `.chart-card-head`: THE most repeated composition of that whole page
 * (11 instances) — a card holding one chart with a title row and an
 * optional legend/stat on the right. Until now every chart shipped bare
 * and every page re-assembled this wrapper by hand.
 *
 * Card-family member (Storybook: Components/Card/Chart): what makes it a
 * "chart card" is the Card shell + head layout — the chart inside is the
 * caller's, passed as children (any Components/Chart/* fits).
 */
export type ChartCardProps = {
  title: ReactNode
  /** right side of the head row — inline legend, headline stat, period note */
  aside?: ReactNode
  /** small muted line under the title ("Последние 2 недели") */
  sub?: ReactNode
  children: ReactNode
}

export function ChartCard({ title, aside, sub, children }: ChartCardProps) {
  return (
    <Card>
      <CardContent>
        <Stack gap="base">
          <Flex justify="space-between" align="baseline" gap="base" wrap={false}>
            <Stack gap="xs">
              <Text as="h3" size="body" weight={600}>
                {title}
              </Text>
              {sub != null && (
                <Text as="span" size="footnote" color={color.mutedForeground}>
                  {sub}
                </Text>
              )}
            </Stack>
            {aside != null && (
              <Text as="span" size="footnote" color={color.mutedForeground} style={{ flexShrink: 0 }}>
                {aside}
              </Text>
            )}
          </Flex>
          {children}
        </Stack>
      </CardContent>
    </Card>
  )
}
