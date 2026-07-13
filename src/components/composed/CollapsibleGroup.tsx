import { useId, useState, type ReactNode } from "react"
import { Flex, motion } from "@/foundation"
import "./CollapsibleGroup.css"
import { color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import { Text } from "@/primitives/Text"

/*
 * CollapsibleGroup — komanda.html's `.addr-group`: a clickable group header
 * (title + count + extras + rotating chevron) over a collapsible body. Two
 * consumer sessions re-implemented this exact React state by hand
 * (AddressGroup / TeamComposition) before this existed.
 *
 * Plain display:none toggling (what the source page itself does), not the
 * vendored Radix Collapsible: collapse keeps children state/DOM across
 * toggles, and there's no animation machinery this pattern doesn't need.
 * aria-expanded/aria-controls kept by hand.
 *
 * The root carries width:100% — this component is a block wrapper that
 * typically sits as an item of a column Stack with a Grid inside, which is
 * exactly the shape that triggers Chromium's stale hypothetical-main-size
 * measurement (see Grid in foundation/layout.tsx for the full story:
 * without explicit width the container keeps a huge phantom height
 * measured while the grid was one-column wide).
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
  const [uncontrolled, setUncontrolled] = useState(defaultOpen)
  const isOpen = open ?? uncontrolled
  const bodyId = useId()
  const toggle = () => {
    const next = !isOpen
    setUncontrolled(next)
    onOpenChange?.(next)
  }
  return (
    <div style={{ width: "100%" }}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={bodyId}
        onClick={toggle}
        className="artefact-collapsible-group-head artefact-focus-ring"
      >
        <Flex align="center" gap="sm" wrap={false}>
          <Text as="span" size="subhead" weight={600}>
            {title}
          </Text>
          {count != null && (
            <Text as="span" size="footnote" color={color.mutedForeground}>
              {count}
            </Text>
          )}
          {extra}
          {/* chevron on the RIGHT edge, like the source's .addr-head — the
              affordance marks the end of the header rail, not its start */}
          <span
            style={{
              display: "inline-flex",
              marginLeft: "auto",
              transition: `transform ${motion.base} ${motion.ease}`,
              transform: isOpen ? "none" : "rotate(-90deg)",
            }}
          >
            <Icon name="caret-down" size={16} color={color.mutedForeground} />
          </span>
        </Flex>
      </button>
      {/* display:none (not unmount): keeps children state (filters, charts)
          across collapse, same as the source's classList toggle */}
      <div id={bodyId} style={{ display: isOpen ? "block" : "none", paddingTop: 12 }}>
        {children}
      </div>
    </div>
  )
}
