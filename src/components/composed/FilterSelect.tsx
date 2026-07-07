import { Surface, color } from "@/foundation"
import { Icon } from "@/primitives/Icon"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

/*
 * FilterSelect — Components tier (Select primitive + Separator + Icon,
 * wrapped in a Surface pill). Found missing while assembling
 * dashboard-prototype.html: `.fpill` is a select styled as a paper pill
 * that grows a clear ("×") button once a value is chosen — Select/Field/
 * Search as built don't cover the clearable-once-chosen behavior.
 *
 * The source's own select is borderless (the outer pill's paper background
 * IS the visible boundary) — our shadcn Select defaults to a visible
 * `border-input` hairline (deliberately, for plain standalone inputs), so
 * that border is stripped here specifically, on the outer Surface instead.
 */
export type FilterSelectProps = {
  label: string
  placeholder: string
  value?: string
  onValueChange?: (value: string) => void
  onClear?: () => void
  options: { value: string; label: string }[]
}

export function FilterSelect({ label, placeholder, value, onValueChange, onClear, options }: FilterSelectProps) {
  return (
    <Surface
      variant="paper"
      radius="pill"
      style={{ display: "inline-flex", alignItems: "stretch", overflow: "hidden", width: "max-content" }}
    >
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger
          aria-label={label}
          style={{ border: "none", background: "transparent", borderRadius: 0 }}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {value && (
        <>
          <Separator orientation="vertical" />
          <button
            type="button"
            onClick={onClear}
            aria-label={`Сбросить ${label.toLowerCase()}`}
            style={{
              width: 36, display: "flex", alignItems: "center", justifyContent: "center",
              border: "none", background: "transparent", color: color.ink3, cursor: "pointer", padding: 0,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = color.muted; e.currentTarget.style.color = color.accent }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = color.ink3 }}
          >
            <Icon name="close" size={14} />
          </button>
        </>
      )}
    </Surface>
  )
}
