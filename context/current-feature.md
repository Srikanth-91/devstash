# Current Feature

Dashboard UI Phase 2 — Collapsible sidebar with item types, favorite/recent collections, user avatar area, and mobile drawer.

## Status

In Progress

## Goals

- Collapsible sidebar with drawer icon to open/close
- Item types list with links to `/items/TYPE` (e.g. `/items/snippets`)
- Favorite collections section in sidebar
- Most recent collections section in sidebar
- User avatar area at the bottom of the sidebar
- Always a drawer on mobile view
- Use mock data from `src/lib/mock-data.ts` directly (no DB yet)

## Notes

- Reference screenshot: `context/screenshots/dashboard-ui-main.png`
- This is phase 2 of 3
- Spec: `context/features/dashboard-phase-2-spec.md`

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-04-26** — Initial Next.js 16 + Tailwind CSS v4 setup. Cleaned boilerplate: stripped default page content to a bare `<h1>DevStash</h1>`, removed all default global styles (keeping only Tailwind import), deleted placeholder SVGs from `public/`.
- **2026-04-28** — Dashboard UI Phase 1 complete. Initialized ShadCN UI (Tailwind v4 / Base UI), added Button and Input components. Created `/dashboard` route with layout, TopBar (search + New Collection + New Item buttons), sidebar placeholder, and main area placeholder. Dark mode forced globally via `dark` class on `<html>`.