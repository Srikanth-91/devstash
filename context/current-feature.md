# Current Feature

None — no feature in progress.

## Status

—

## Goals

—

## Notes

—

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-04-26** — Initial Next.js 16 + Tailwind CSS v4 setup. Cleaned boilerplate: stripped default page content to a bare `<h1>DevStash</h1>`, removed all default global styles (keeping only Tailwind import), deleted placeholder SVGs from `public/`.
- **2026-04-28** — Dashboard UI Phase 1 complete. Initialized ShadCN UI (Tailwind v4 / Base UI), added Button and Input components. Created `/dashboard` route with layout, TopBar (search + New Collection + New Item buttons), sidebar placeholder, and main area placeholder. Dark mode forced globally via `dark` class on `<html>`.
- **2026-04-29** — Dashboard UI Phase 2 complete. Added collapsible Sidebar with colored type icons (Snippets, Prompts, Commands, Notes, Files, Images, Links), favorite and all-collections sections, user avatar area at the bottom, and mobile drawer with backdrop. Added DashboardShell client wrapper to manage sidebar state. Added PanelLeft (desktop) and Menu (mobile) toggles to TopBar. Fixed Geist font wiring in globals.css. Updated mock data to use plural type names.
- **2026-04-29** — Dashboard UI Phase 3 complete. Added main area with 4 stats cards (total items, collections, favorite items, favorite collections), responsive collections grid, pinned items section, and 10 recent items sorted by date. Extended mock data to 12 items. Created DashboardMain server component.
