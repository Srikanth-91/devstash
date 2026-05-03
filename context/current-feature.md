# Current Feature

**Code Quality Quick Wins**

## Status

Implemented — build passing, ready for review and commit.

## Goals

Fix a set of low-risk code quality issues identified by a codebase scan. No new features — only safe cleanup and bug fixes.

### In Scope

1. **N+1 null check fix** — [src/app/dashboard/page.tsx](../src/app/dashboard/page.tsx): add explicit null check after `prisma.user.findUnique`; throw a clear error if demo user is missing instead of silently using `""`.

2. **Add dashboard error boundary** — create `src/app/dashboard/error.tsx` so async data-fetch failures show a graceful error UI instead of crashing to the root error page.

3. **Extract shared type config** — move duplicated color/icon maps from `DashboardMain.tsx` and `Sidebar.tsx` into `src/lib/type-config.ts` and import from both.

4. **Split DashboardMain into sub-components** — extract `StatCard`, `CollectionCard`, and `ItemCard` into their own files under `src/components/dashboard/`.

5. **Validate `DATABASE_URL` at startup** — replace `process.env.DATABASE_URL!` in `src/lib/prisma.ts` with an explicit check that throws a clear error if the var is missing.

6. **Fix icon fallback inconsistency** — align `icon ?? ""` in `src/lib/db/collections.ts` with the `File` fallback used in `Sidebar.tsx`; define a shared `DEFAULT_ICON` constant.

### Out of Scope

- Authentication (not implemented yet)
- Seed file N+1 (seed-only, no prod impact)
- Hardcoded user email (tied to auth, will be fixed when auth lands)

## Notes

- No new dependencies required.
- Each fix is independent — can be done and tested one at a time.
- Run `npm run build` after each fix to verify no regressions.

## History

<!-- Keep this updated. Earliest to latest -->

- **2026-04-26** — Initial Next.js 16 + Tailwind CSS v4 setup. Cleaned boilerplate: stripped default page content to a bare `<h1>DevStash</h1>`, removed all default global styles (keeping only Tailwind import), deleted placeholder SVGs from `public/`.
- **2026-04-28** — Dashboard UI Phase 1 complete. Initialized ShadCN UI (Tailwind v4 / Base UI), added Button and Input components. Created `/dashboard` route with layout, TopBar (search + New Collection + New Item buttons), sidebar placeholder, and main area placeholder. Dark mode forced globally via `dark` class on `<html>`.
- **2026-04-29** — Dashboard UI Phase 2 complete. Added collapsible Sidebar with colored type icons (Snippets, Prompts, Commands, Notes, Files, Images, Links), favorite and all-collections sections, user avatar area at the bottom, and mobile drawer with backdrop. Added DashboardShell client wrapper to manage sidebar state. Added PanelLeft (desktop) and Menu (mobile) toggles to TopBar. Fixed Geist font wiring in globals.css. Updated mock data to use plural type names.
- **2026-04-29** — Dashboard UI Phase 3 complete. Added main area with 4 stats cards (total items, collections, favorite items, favorite collections), responsive collections grid, pinned items section, and 10 recent items sorted by date. Extended mock data to 12 items. Created DashboardMain server component.
- **2026-04-30** — Prisma 7 + Neon PostgreSQL setup complete. Installed Prisma 7 with prisma-client provider, PrismaPg driver adapter, and prisma.config.ts datasource config. Created full schema (User, Item, ItemType, Collection, Tag, ItemTag + NextAuth Account, Session, VerificationToken) with indexes and cascade deletes. Applied initial migration to Neon database.
- **2026-04-30** — Seed data complete. Created `prisma/seed.ts` with demo user (demo@devstash.io, bcryptjs 12 rounds), 7 system item types, and 5 collections (React Patterns, AI Workflows, DevOps, Terminal Commands, Design Resources) totalling 18 items. Added `db:seed` script and `prisma.seed` config to `package.json`. Installed `bcryptjs`.
- **2026-05-01** — Dashboard Collections complete. Created `src/lib/db/collections.ts` with `getDashboardStats` and `getDashboardCollections` functions. Replaced mock collection data in `DashboardMain` with live Neon DB data via Prisma. Stats cards now show real counts. Collection cards show a 4px colored left border derived from the most-used item type, and small type icons for all types present in the collection.
- **2026-05-01** — Dashboard Items complete. Created `src/lib/db/items.ts` with `getDashboardItems` function fetching pinned and recent items (top 10 by createdAt) via Prisma, including type name, collection name, and tags. Replaced mock item data in `DashboardMain`. Item card icon/border color derived from DB type name. Pinned section hidden when no pinned items exist.
- **2026-05-02** — Stats & Sidebar complete. Added `getSidebarData` to `src/lib/db/collections.ts` fetching system item types (with per-user counts) and collections (with primary type). Converted `DashboardPage` to async server component to pass sidebar data down. Updated `DashboardShell` and `Sidebar` to use live DB data. Sidebar now shows type icons/counts linking to `/items/[type]`, colored dots for non-favorite collections based on most-used type, item counts for all collections, and a "View all collections" link to `/collections`.
- **2026-05-02** — Pro Badge in Sidebar complete. Installed ShadCN `Badge` component. Added a subtle "PRO" outline badge next to Files and Images types in the sidebar, indicating they are Pro-tier features.
