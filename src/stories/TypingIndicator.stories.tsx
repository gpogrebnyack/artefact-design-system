import type { Meta, StoryObj } from '@storybook/react-vite'
import { TypingIndicator } from '@/components/composed/TypingIndicator'

const meta: Meta<typeof TypingIndicator> = { title: 'Components/Chat/TypingIndicator', component: TypingIndicator }
export default meta
type Story = StoryObj<typeof TypingIndicator>

export const Default: Story = { render: () => <TypingIndicator /> }
