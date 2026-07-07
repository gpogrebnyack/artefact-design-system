import type { Meta, StoryObj } from '@storybook/react-vite'
import { Textarea } from '@/components/ui/textarea'

/*
 * Textarea — multi-line sibling of Input, same border/ring/disabled tokens.
 * Exported with zero story coverage. Also the underlying control InputGroup
 * uses for its multi-line variant (see COMPONENTS.md's Search note) — this
 * demos the plain, unwrapped primitive.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Primitives/Textarea',
  component: Textarea,
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = { args: { placeholder: 'Комментарий для управляющего…' } }
export const WithValue: Story = { args: { defaultValue: 'Александра просила пересмотреть график на следующей неделе.' } }
export const Invalid: Story = { args: { placeholder: 'Обязательное поле', 'aria-invalid': true } }
export const Disabled: Story = { args: { placeholder: 'Недоступно', disabled: true } }
