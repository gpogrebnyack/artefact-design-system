import "./SidebarNav.css"
import { Icon, type IconName } from "@/primitives/Icon"

/*
 * SidebarNav — the app-shell left rail. Deliberately one of the few bespoke
 * Sections (a layout fixture, not content). Visuals live in SidebarNav.css;
 * the icons come from our Icon base primitive (Phosphor), so the rail
 * consumes the same governed icon set as everything else.
 *
 * Brand mark stays a literal SVG — it's an identity asset, not an icon.
 * `items`/`clientLabel` are required-or-omitted on purpose: Артефакт serves
 * several clients, so nothing here defaults to any one of them.
 */

const BRAND_LOGO_PATH =
  "M450.313 0C769.313 0 944.528 245.166 864.813 542.666C852.313 581.666 848.967 591.728 838.813 623.165L872.813 664.166C962.596 778.457 980.313 929.666 937.814 1104.77H624.813C746.313 944.666 814.313 782.166 825.313 711.666L814.313 696.165C714.974 976.165 548.411 1115.92 359.862 1115.92C151.313 1115.92 0 972.665 0 794.466C0 582.558 193.313 444.512 450.313 444.512C625.327 444.512 730.313 526.666 783.813 571.665L796.313 532.666C781.813 463.166 613.813 360.364 436.813 360.364C329.862 360.364 239.313 386.166 144.313 437.165L20 114.335C134.313 49.6655 286.313 0 450.313 0ZM543.813 547.665C425.012 547.665 349.862 633.349 349.862 720.165C349.862 791.982 413.313 872.992 493.663 872.992C605.327 872.992 712.813 785.665 764.813 639.665C704.313 582.666 621.859 547.665 543.813 547.665Z"

export type NavItem = { key: string; label: string; icon: IconName }

// example nav — a real 4-item set from one product screen. Not a silent
// default consumers get by accident: SidebarNav requires `items` (below),
// this is exported only as a starting point / Storybook fixture.
export const EXAMPLE_NAV_ITEMS: NavItem[] = [
  { key: "home", label: "Главная", icon: "home" },
  { key: "team", label: "Команда", icon: "team" },
  { key: "orders", label: "Заказы", icon: "orders" },
  { key: "knowledge", label: "Знания", icon: "knowledge" },
]

const NI = 22 // sidebar icon size

export type SidebarNavProps = {
  active?: string
  items: NavItem[]
  avatarInitials?: string
  avatarTitle?: string
  showSettings?: boolean
  /** Which client's dashboard this is (Артефакт serves several). Omit to
   *  hide the chip entirely — DON'T default this to any one client's name. */
  clientLabel?: string
  /** Single-letter badge for the chip; falls back to `clientLabel`'s first
   *  character if omitted. */
  clientInitial?: string
}

export function SidebarNav({
  active,
  items,
  avatarInitials = "",
  avatarTitle,
  showSettings = true,
  clientLabel,
  clientInitial,
}: SidebarNavProps) {
  return (
    <aside className="sidebar">
      {/* brand — orange accent mark */}
      <div className="brand" title="Артефакт">
        <svg
          className="brand-logo"
          viewBox="0 0 960 1116"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" clipRule="evenodd" d={BRAND_LOGO_PATH} />
        </svg>
      </div>

      {/* client chip — white backing + green inner badge. Only rendered when
          the consumer actually passes a client — no fallback to any one
          real client's name. */}
      {clientLabel && (
        <div className="client" aria-label={clientLabel}>
          <span className="bd">{(clientInitial ?? clientLabel.charAt(0)).toUpperCase()}</span>
          <span className="tip">{clientLabel}</span>
        </div>
      )}

      {/* primary nav */}
      <nav className="nav" aria-label="Навигация">
        {items.map((item) => (
          <a
            key={item.key}
            href="#"
            className={item.key === active ? "active" : undefined}
            aria-label={item.label}
            aria-current={item.key === active ? "page" : undefined}
          >
            <Icon name={item.icon} size={NI} />
            <span className="tip">{item.label}</span>
          </a>
        ))}
      </nav>

      {/* foot — avatar + optional settings, pinned to the bottom */}
      <div className="side-foot">
        <span className="avatar" title={avatarTitle}>
          {avatarInitials}
        </span>
        {showSettings && (
          <span className="ico-btn" aria-label="Настройки">
            <Icon name="settings" size={NI} />
            <span className="tip">Настройки</span>
          </span>
        )}
      </div>
    </aside>
  )
}
