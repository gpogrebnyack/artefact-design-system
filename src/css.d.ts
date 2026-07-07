// This package isn't built by Vite (no vite/client types available), but
// several components import their own CSS as a side effect (e.g.
// `import "./Toolbar.css"`) — the styles ship compiled once via
// `npm run build:css` (see package.json), this declaration just tells
// TypeScript the import itself is valid.
declare module "*.css"
