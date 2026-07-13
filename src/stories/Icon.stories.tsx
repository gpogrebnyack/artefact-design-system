import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon, ICON_NAMES } from "@/primitives/Icon"
import { color } from "@/foundation"

/*
 * Icon — BASE PRIMITIVE (Phosphor). This gallery is the governed vocabulary:
 * every glyph a higher component may use lives in the registry. Add an icon =
 * add it to the registry, and it shows up here.
 */
const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
}
export default meta
type Story = StoryObj<typeof Icon>

export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 12,
        maxWidth: 760,
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "16px 8px",
            borderRadius: 14,
            background: color.card,
            WebkitBackdropFilter: "blur(10px)",
            backdropFilter: "blur(10px)",
          }}
        >
          <Icon name={name} size={26} />
          <span style={{ fontSize: 12, color: color.mutedForeground }}>{name}</span>
        </div>
      ))}
    </div>
  ),
}

/*
 * Exactly TWO weights exist in this system — the `weight` prop's own type
 * forbids the other four Phosphor styles (thin/light fall apart at working
 * sizes, bold is emphasis-by-stroke, duotone bakes two tones into the
 * glyph where we use the soft-chip + glyph pair). See DESIGN.md → Shapes.
 */
export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
      {(
        [
          ["regular", "дефолт — вся контурная UI-иконография"],
          ["fill", "глиф-знак: play/pause, маркер на чипе, ✦"],
        ] as const
      ).map(([w, note]) => (
        <div key={w} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, maxWidth: 180 }}>
          <Icon name="team" size={30} weight={w} />
          <span style={{ fontSize: 12, color: color.mutedForeground }}>{w}</span>
          <span style={{ fontSize: 12, color: color.mutedForeground, textAlign: "center" }}>{note}</span>
        </div>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
      {[16, 20, 22, 28, 40].map((s) => (
        <Icon key={s} name="settings" size={s} />
      ))}
    </div>
  ),
}
