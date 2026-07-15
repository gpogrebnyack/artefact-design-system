import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Icon, ICON_NAMES, PHOSPHOR_ICON_NAMES } from "@/primitives/Icon"
import { Surface, color } from "@/foundation"
import { Text } from "@/primitives/Text"
import { Input } from "@/components/ui/input"

/*
 * Icon — BASE PRIMITIVE (Phosphor). ВЕСЬ каталог (1512 глифов) вкомпилен в
 * пакет в двух начертаниях — `name` принимает любое kebab-case имя Phosphor
 * («calendar», «caret-left», …) ЛИБО семантический алиас системы
 * («dashboard», «spark»). Alias-галерея ниже — про смысловые роли, не про
 * полноту набора; полный каталог — в стори CatalogSearch.
 */
const meta: Meta<typeof Icon> = {
  title: "Primitives/Icon",
  component: Icon,
}
export default meta
type Story = StoryObj<typeof Icon>

const Tile = ({ name }: { name: (typeof ICON_NAMES)[number] }) => (
  <Surface
    variant="glass"
    radius="lg"
    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, padding: "16px 8px" }}
  >
    <Icon name={name} size={26} />
    <Text as="span" size="footnote" color={color.mutedForeground}>{name}</Text>
  </Surface>
)

/* Семантические алиасы — «какая иконка что значит» решено в одном месте.
   Повторяющаяся роль → добавь алиас в SEMANTIC_ALIASES; разовый глиф —
   бери прямым именем Phosphor, алиас не нужен. */
export const SemanticAliases: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: 12,
        maxWidth: 760,
      }}
    >
      {ICON_NAMES.map((name) => <Tile key={name} name={name} />)}
    </div>
  ),
}

/* Полный каталог Phosphor с поиском по имени — 1512 глифов, все доступны
   через <Icon name="…" /> без каких-либо реестров. */
export const CatalogSearch: Story = {
  render: function CatalogSearchStory() {
    const [q, setQ] = useState("")
    const matches = q.trim()
      ? PHOSPHOR_ICON_NAMES.filter((n) => n.includes(q.trim().toLowerCase()))
      : []
    const shown = matches.slice(0, 48)
    return (
      <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 14 }}>
        <Input
          placeholder={`Поиск по ${PHOSPHOR_ICON_NAMES.length} глифам Phosphor (kebab-case, напр. calendar)…`}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        {q.trim() ? (
          <>
            <Text as="p" size="footnote" color={color.mutedForeground} style={{ margin: 0 }}>
              {matches.length} совпадений{matches.length > shown.length ? ` (показаны первые ${shown.length} — уточни запрос)` : ""}
            </Text>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
              {shown.map((name) => <Tile key={name} name={name} />)}
            </div>
          </>
        ) : (
          <Text as="p" size="footnote" color={color.mutedForeground} style={{ margin: 0 }}>
            Введи часть имени — например «calendar», «caret» или «user».
          </Text>
        )}
      </div>
    )
  },
}

/*
 * Exactly TWO weights exist in this system — enforced by the `weight` prop
 * type AND by the data itself (only regular+fill are compiled). Правило
 * выбора — РАЗМЕРНОЕ и самоприменяющееся: без явного `weight` пиктограмма
 * <16px сама рендерится fill (контур замыливается), служебные штрихи
 * (caret/arrow/check/…) — regular всегда. См. DESIGN.md → Shapes.
 */
export const Weights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start" }}>
        {(
          [
            ["regular", "пиктограммы ≥16px и служебные штрихи"],
            ["fill", "глифы-знаки + любая пиктограмма <16px"],
          ] as const
        ).map(([w, note]) => (
          <div key={w} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, maxWidth: 180 }}>
            <Icon name="team" size={30} weight={w} />
            <Text as="span" size="footnote" color={color.mutedForeground}>{w}</Text>
            <Text as="span" size="footnote" color={color.mutedForeground} align="center">{note}</Text>
          </div>
        ))}
      </div>
      {/* автоматика дефолта: weight не указан нигде в этом ряду */}
      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Icon name="calendar-blank" size={14} />
        <Icon name="calendar-blank" size={20} />
        <Icon name="caret-down" size={14} />
        <Text as="span" size="footnote" color={color.mutedForeground}>
          дефолт сам выбирает: 14px пиктограмма → fill · 20px → regular · caret 14px → regular (служебный)
        </Text>
      </div>
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
