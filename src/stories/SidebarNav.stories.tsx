import type { Meta, StoryObj } from "@storybook/react-vite"
import { SidebarNav, EXAMPLE_NAV_ITEMS } from "@/sections/SidebarNav"
import { color } from "@/foundation"

/*
 * SidebarNav — the app-shell left rail. Full-height glass rail, sticky,
 * custom hover tooltips, mobile collapse. Icons are the Icon base primitive
 * (Phosphor). `items`/`clientLabel` have no defaults (see SidebarNav.tsx) —
 * every story below passes them explicitly, on purpose.
 */
const meta: Meta<typeof SidebarNav> = {
  title: "Sections/SidebarNav",
  component: SidebarNav,
  parameters: { layout: "fullscreen" },
  args: {
    items: EXAMPLE_NAV_ITEMS,
    avatarInitials: "У",
    avatarTitle: "Управляющий",
    clientLabel: "Пример клиента",
  },
  // give the rail a page-like context so full-height + sticky read correctly
  decorators: [
    (Story) => (
      <div style={{ display: "flex", padding: 8, minHeight: "100vh", background: color.background }}>
        <Story />
        <div style={{ flex: 1, padding: 24, color: color.mutedForeground }}>
          Наведи на иконки — подсказки появляются справа. Сузь окно &lt; 760px — рейл схлопывается.
        </div>
      </div>
    ),
  ],
}
export default meta
type Story = StoryObj<typeof SidebarNav>

export const TeamActive: Story = { args: { active: "team" } }
export const HomeActive: Story = { args: { active: "home" } }
export const OrdersActive: Story = { args: { active: "orders" } }
export const WithoutClientChip: Story = { args: { active: "team", clientLabel: undefined } }
