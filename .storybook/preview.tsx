import type { Preview, StoryContext } from '@storybook/react-vite'
import type { ReactNode } from 'react'
import '../src/index.css'           // shadcn theme mapped to our tokens
import '../src/brand-overrides.css' // no-shadow / glass / page-gradient layer
import { TooltipProvider } from '../src/components/ui/tooltip'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: { test: 'todo' },
    layout: 'centered',
    // Sidebar order follows the hierarchy, not the alphabet: Foundation is
    // built on nothing, Primitives are built on Foundation, Components on
    // Primitives, Sections on Components. Within a group, alphabetical.
    options: {
      storySort: {
        order: ['Foundation', 'Primitives', 'Components', 'Sections'],
      },
    },
  },
  decorators: [
    // Skip the 24px padding for `layout: 'fullscreen'` stories — they own
    // their own edge-to-edge layout (AppShell/SidebarNav's own margins).
    (Story: () => ReactNode, context: StoryContext) => (
      <TooltipProvider>
        {context.parameters.layout === 'fullscreen' ? (
          <Story />
        ) : (
          <div style={{ padding: 24 }}>
            <Story />
          </div>
        )}
      </TooltipProvider>
    ),
  ],
}

export default preview
