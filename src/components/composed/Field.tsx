import type { ReactNode } from "react"
import { Field, FieldLabel, FieldDescription, FieldError } from "@/components/ui/field"

/*
 * FormField — a Components-tier composite: shadcn's Field/FieldLabel/
 * FieldDescription/FieldError (Primitives-tier building blocks) wired around
 * whatever control primitive you pass in (Input, Select, Checkbox, ...). This
 * is what every labeled control in a form should use instead of hand-rolling
 * label+control+error markup per call site.
 */
type FormFieldProps = {
  label: string
  htmlFor?: string
  description?: string
  error?: string
  children: ReactNode
}

export function FormField({ label, htmlFor, description, error, children }: FormFieldProps) {
  return (
    <Field data-invalid={error ? true : undefined}>
      <FieldLabel htmlFor={htmlFor}>{label}</FieldLabel>
      {children}
      {description && !error && <FieldDescription>{description}</FieldDescription>}
      {error && <FieldError>{error}</FieldError>}
    </Field>
  )
}
