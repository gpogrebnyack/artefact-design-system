import type { Meta, StoryObj } from '@storybook/react-vite'
import { Progress } from '@/components/ui/progress'

// shadcn Progress = LINEAR only. Covers voice-card wave / loading.
// NOTE: score-ring (circular) and stopmenu (segmented/stacked) are NOT linear
// progress — that's the data-viz boundary (see Chart stories / custom SVG).
const meta: Meta<typeof Progress> = { title: 'Primitives/Progress', component: Progress }
export default meta
type Story = StoryObj<typeof Progress>

export const Linear: Story = { render: () => <Progress value={64} className="w-72" /> }
export const Low: Story = { render: () => <Progress value={18} className="w-72" /> }
