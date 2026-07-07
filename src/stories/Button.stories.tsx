import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '@/components/ui/button'
import { color } from '@/foundation'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
}
export default meta
type Story = StoryObj<typeof Button>

// default filled = dark (ink) — our default CTA
export const Default: Story = { args: { children: 'Присвоить имя' } }

// the rare orange primary (one per screen) — color.accent/accentForeground/
// accentHover. Hover is color-mix() defined once in index.css (see
// --brand-accent-hover) — read here, never recomputed, so it can't drift.
export const OrangePrimary: Story = {
  render: () => (
    <Button
      style={{ background: color.accent, color: color.accentForeground }}
      onMouseEnter={(e) => (e.currentTarget.style.background = color.accentHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = color.accent)}
    >
      Оранжевый primary
    </Button>
  ),
}

export const Secondary: Story = { args: { variant: 'secondary', children: 'Отмена' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Outline' } }
export const Ghost: Story = { args: { variant: 'ghost', children: 'Ghost' } }
export const Link: Story = { args: { variant: 'link', children: 'Подробные инструкции' } }
export const Disabled: Story = { args: { children: 'Недоступно', disabled: true } }
