// Public API of @artefact/design-system. Wildcard re-exports on purpose —
// the barrel tracks the source automatically instead of a second hand-kept
// name list that can drift (same reasoning as context/AGENTS.md's
// self-generating-stories rule, one level up).

// Foundation
export * from "./foundation"

// Primitives — ours
export * from "./primitives/Icon"
export * from "./primitives/Image"
export * from "./primitives/Text"

// util
export * from "./lib/utils"

// Primitives/Components — shadcn-vendored (components/ui/*)
export * from "./components/ui/alert"
export * from "./components/ui/avatar"
export * from "./components/ui/badge"
export * from "./components/ui/button"
export * from "./components/ui/button-group"
export * from "./components/ui/card"
export * from "./components/ui/chart"
export * from "./components/ui/checkbox"
export * from "./components/ui/dialog"
export * from "./components/ui/dropdown-menu"
export * from "./components/ui/empty"
export * from "./components/ui/field"
export * from "./components/ui/input"
export * from "./components/ui/input-group"
export * from "./components/ui/item"
export * from "./components/ui/label"
export * from "./components/ui/navigation-menu"
export * from "./components/ui/pagination"
export * from "./components/ui/progress"
export * from "./components/ui/radio-group"
export * from "./components/ui/select"
export * from "./components/ui/separator"
export * from "./components/ui/sonner"
export * from "./components/ui/spinner"
export * from "./components/ui/switch"
export * from "./components/ui/table"
export * from "./components/ui/tabs"
export * from "./components/ui/textarea"
export * from "./components/ui/toggle"
export * from "./components/ui/toggle-group"
export * from "./components/ui/tooltip"

// Components — our composites
export * from "./components/composed/AdviceCard"
export * from "./components/composed/Chip"
export * from "./components/composed/Field"
export * from "./components/composed/FilterSelect"
export * from "./components/composed/MessageBubble"
export * from "./components/composed/Search"
export * from "./components/composed/Toolbar"
export * from "./components/composed/TypingIndicator"
export * from "./components/composed/charts/AreaChart"
export * from "./components/composed/charts/BarChart"
export * from "./components/composed/charts/DistributionChart"
export * from "./components/composed/charts/DonutChart"
export * from "./components/composed/charts/LineChart"

// Sections — the few bespoke ones
export * from "./sections/AssistantDock"
export * from "./sections/SidebarNav"
