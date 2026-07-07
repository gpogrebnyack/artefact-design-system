import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Icon } from "@/primitives/Icon"

/*
 * Search — a Components-tier composite: InputGroup (Primitives-tier, shadcn)
 * + our Icon primitive as a leading addon. This is what every search field in
 * the product should use instead of hand-rolling an Input with an absolutely-
 * positioned icon.
 */
type SearchProps = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export function Search({ placeholder = "Поиск", value, onChange, className }: SearchProps) {
  return (
    <InputGroup className={className}>
      <InputGroupAddon>
        <Icon name="search" size={16} />
      </InputGroupAddon>
      <InputGroupInput
        placeholder={placeholder}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      />
    </InputGroup>
  )
}
