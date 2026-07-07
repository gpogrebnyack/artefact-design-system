import type { Meta, StoryObj } from '@storybook/react-vite'
import {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink,
} from '@/components/ui/navigation-menu'

// For the SidebarNav recipe: the nav semantics come from NavigationMenu; the
// icon-rail look is composition (icon Buttons + Tooltip + Avatar) on top.
const meta: Meta<typeof NavigationMenu> = { title: 'Primitives/NavigationMenu', component: NavigationMenu }
export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Horizontal: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem><NavigationMenuLink href="#" className="px-3 py-2">Главная</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#" className="px-3 py-2">Команда</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#" className="px-3 py-2">Заказы</NavigationMenuLink></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#" className="px-3 py-2">Лучшие практики</NavigationMenuLink></NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
