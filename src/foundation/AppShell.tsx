import type { ReactNode } from "react"

/*
 * AppShell — the page-layout invariant every real page lives in: a sidebar
 * rail + a max-width content column with asymmetric padding. Verbatim from
 * BOTH source pages' own `.app`/`.wrap` (komanda.html AND
 * dashboard-prototype.html declare the identical rule:
 * `.wrap{flex:1;min-width:0;max-width:1280px;margin:0 auto;
 * padding:26px 24px 90px}`) — this is a cross-page invariant, not a
 * one-off, which is why it lives in Foundation next to TitledRow rather
 * than being hand-rolled per page.
 *
 * The sidebar's own 8px detachment lives on the sidebar itself (see
 * SidebarNav.css's `margin: 8px`) — AppShell does NOT add its own padding
 * around the sidebar. A previous version of this component existed, got
 * deleted during an unrelated cleanup, and every page since then hand-rolled
 * its own (wrong) shell inline — this replaces that ad hoc duplication.
 */
export function AppShell({ sidebar, children }: { sidebar: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {sidebar}
      <div style={{ flex: 1, minWidth: 0, maxWidth: 1280, marginInline: "auto", padding: "26px 24px 90px" }}>
        {children}
      </div>
    </div>
  )
}
