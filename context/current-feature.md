# Current Feature: Auth Credentials - Email/Password Provider

## Status

In Progress

## Goals

- Add Credentials provider for email/password sign-in
- `auth.config.ts`: Credentials placeholder with `authorize: () => null`
- `auth.ts`: Override Credentials with real bcrypt validation
- Create `POST /api/auth/register` route (name, email, password, confirmPassword)
- Registration validates match, checks duplicate email, hashes with bcryptjs, creates user

## Notes

**Split config pattern for Credentials:**
- `auth.config.ts` needs the Credentials provider stub (edge-safe, no bcrypt)
- `auth.ts` overrides it with the real `authorize` function using bcrypt

**Registration route:** `src/app/api/auth/register/route.ts`
- Validate passwords match
- Check user doesn't already exist
- Hash with bcryptjs (already installed)
- Return `{ success, error }` JSON

**Password field:** Already on User model (`password String?`) — no migration needed.

**Testing:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"password123","confirmPassword":"password123"}'
```
Then sign in at `/api/auth/signin` with email/password and verify dashboard redirect. Also verify GitHub OAuth still works.

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
- **2026-05-03** — Code quality quick wins complete. Extracted `StatCard`, `CollectionCard`, `ItemCard` into separate files. Created `src/lib/type-config.ts` as single source of truth for type icons/colors (eliminating duplication between `DashboardMain` and `Sidebar`). Added explicit null check in dashboard page, `DATABASE_URL` validation in `prisma.ts`, dashboard `error.tsx` boundary, and fixed icon fallback inconsistency in `collections.ts`.
- **2026-05-09** — Auth Phase 1 complete. Installed `next-auth@beta` and `@auth/prisma-adapter`. Set up split config pattern (`auth.config.ts` for edge, `auth.ts` with PrismaAdapter + JWT strategy). Added GitHub OAuth provider. Registered API route at `/api/auth/[...nextauth]`. Protected `/dashboard/*` via `src/proxy.ts` with redirect to sign-in. Extended `Session` type with `user.id`. Added `name`, `image`, `emailVerified` fields to User model and ran migration.
