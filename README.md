# @artefact/design-system

Дизайн-система «Артефакт»: Foundation/Primitives/Components/Sections на базе shadcn/ui + Radix, публикуемая как обычный npm-пакет.

## Установка

```bash
npm install @artefact/design-system
```

```tsx
import { Button, Surface, SidebarNav } from "@artefact/design-system"
import "@artefact/design-system/style.css" // один раз, в корне приложения
```

Стили — один скомпилированный файл (`dist/style.css`), собранный при публикации пакета через Tailwind CLI. Устанавливать/настраивать Tailwind у себя не нужно — все нужные классы уже внутри.

## Разработка

```bash
npm install
npm run storybook   # витрина — читает src/ напрямую, живой reload
npm run build        # lint:design → check:context → typecheck → dist/*.js+*.d.ts → dist/style.css
```

## Документация для агентов/разработчиков системы

Не здесь — в [`context/`](./context/README.md): `DESIGN.md` (токены и правила), `COMPONENTS.md` (каталог компонентов), `AGENTS.md` (навигация по репозиторию, правила синхронизации кода и документов).
