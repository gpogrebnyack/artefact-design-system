import { useState, type ReactNode } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Flex, motion } from "@/foundation"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import { Text } from "@/primitives/Text"

/*
 * CollapsibleGroup — komanda.html's `.addr-group`: a clickable group header
 * (title + count + extras + rotating chevron) over a collapsible body. Two
 * consumer sessions re-implemented this exact React state by hand
 * (AddressGroup / TeamComposition) before Collapsible was even vendored.
 *
 * Uncontrolled by default (defaultOpen); pass open/onOpenChange to control
 * it from outside (e.g. a "Свернуть всё" toolbar button — a real feature
 * both source page and consumer sessions had).
 */
export type CollapsibleGroupProps = {
  title: ReactNode
  /** small muted note after the title ("7 человек") */
  count?: ReactNode
  /** trailing slot after count — e.g. a StatusBadge with unknown-voices */
  extra?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: ReactNode
}

export function CollapsibleGroup({
  title, count, extra, defaultOpen = true, open, onOpenChange, children,
}: CollapsibleGroupProps) {
  // track openness only to rotate the chevron; Radix owns the real state
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isOpen = open ?? uncontrolled
  const handleChange = (next: boolean) => {
    setUncontrolled(next)
    onOpenChange?.(next)
  }
  return (
    <Collapsible open={open} defaultOpen={defaultOpen} onOpenChange={handleChange}>
      <CollapsibleTrigger asChild>
        <button
          type="button"
          style={{ all: "unset", cursor: "pointer", display: "block", width: "100%" }}
        >
          <Flex align="center" gap="sm" wrap={false}>
            <span
              style={{
                display: "inline-flex",
                transition: `transform ${motion.base} ${motion.ease}`,
                transform: isOpen ? "none" : "rotate(-90deg)",
              }}
            >
              <Icon name="caret-down" size={16} color={color.mutedForeground} />
            </span>
            <Text as="span" size="subhead" weight={600}>
              {title}
            </Text>
            {count != null && (
              <Text as="span" size="footnote" color={color.mutedForeground}>
                {count}
              </Text>
            )}
            {extra}
          </Flex>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div style={{ paddingTop: 12 }}>{children}</div>
      </CollapsibleContent>
    </Collapsible>
  )
}
