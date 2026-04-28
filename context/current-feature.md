# Current Feature

Dashboard UI Phase 1 — Layout scaffold with top bar, sidebar placeholder, and main area placeholder.

## Status

Completed

## Goals

- Initialize ShadCN UI and install required components
- Create dashboard route at `/dashboard`
- Set up main dashboard layout with global dark mode default
- Top bar with search input and "New Item" button (display only)
- Sidebar placeholder (`<h2>Sidebar</h2>`) and main area placeholder (`<h2>Main</h2>`)

## Notes

- Reference screenshot: `context/screenshots/dashboard-ui-main.png`
- This is phase 1 of 3 — no real data or interactivity yet
- Mock data available at `src/lib/mock-data.ts` for later phases

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-04-26** — Initial Next.js 16 + Tailwind CSS v4 setup. Cleaned boilerplate: stripped default page content to a bare `<h1>DevStash</h1>`, removed all default global styles (keeping only Tailwind import), deleted placeholder SVGs from `public/`.
- **2026-04-28** — Dashboard UI Phase 1 complete. Initialized ShadCN UI (Tailwind v4 / Base UI), added Button and Input components. Created `/dashboard` route with layout, TopBar (search + New Collection + New Item buttons), sidebar placeholder, and main area placeholder. Dark mode forced globally via `dark` class on `<html>`.