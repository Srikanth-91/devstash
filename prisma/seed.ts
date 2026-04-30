import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ── User ──────────────────────────────────────────────────────────────────
  const passwordHash = await bcrypt.hash("12345678", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {},
    create: {
      email: "demo@devstash.io",
      password: passwordHash,
      isPro: false,
    },
  });

  console.log("✓ User:", user.email);

  // ── System Item Types ─────────────────────────────────────────────────────
  const typeData = [
    { name: "snippet", icon: "Code", color: "#3b82f6" },
    { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
    { name: "command", icon: "Terminal", color: "#f97316" },
    { name: "note", icon: "StickyNote", color: "#fde047" },
    { name: "file", icon: "File", color: "#6b7280" },
    { name: "image", icon: "Image", color: "#ec4899" },
    { name: "link", icon: "Link", color: "#10b981" },
  ];

  const types: Record<string, string> = {};

  for (const t of typeData) {
    const existing = await prisma.itemType.findFirst({ where: { name: t.name, isSystem: true } });
    const itemType = existing
      ? existing
      : await prisma.itemType.create({ data: { ...t, isSystem: true } });
    types[t.name] = itemType.id;
  }

  console.log("✓ Item types seeded");

  // ── Collections ───────────────────────────────────────────────────────────
  const collectionData = [
    { name: "React Patterns", description: "Reusable React patterns and hooks" },
    { name: "AI Workflows", description: "AI prompts and workflow automations" },
    { name: "DevOps", description: "Infrastructure and deployment resources" },
    { name: "Terminal Commands", description: "Useful shell commands for everyday development" },
    { name: "Design Resources", description: "UI/UX resources and references" },
  ];

  const collections: Record<string, string> = {};

  for (const c of collectionData) {
    const col = await prisma.collection.upsert({
      where: { id: (await prisma.collection.findFirst({ where: { name: c.name, userId: user.id } }))?.id ?? "" },
      update: {},
      create: { ...c, userId: user.id },
    });
    collections[c.name] = col.id;
  }

  console.log("✓ Collections seeded");

  // ── Items ─────────────────────────────────────────────────────────────────

  const items = [
    // React Patterns — 3 snippets
    {
      title: "useDebounce Hook",
      contentType: "text",
      content: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}`,
      language: "typescript",
      typeId: types.snippet,
      collectionId: collections["React Patterns"],
      description: "Custom hook that delays updating a value until after a specified wait time.",
    },
    {
      title: "Context Provider Pattern",
      contentType: "text",
      content: `import { createContext, useContext, useState, ReactNode } from "react";

interface ThemeContextValue {
  theme: "light" | "dark";
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}`,
      language: "typescript",
      typeId: types.snippet,
      collectionId: collections["React Patterns"],
      description: "Type-safe context provider pattern with a custom hook.",
    },
    {
      title: "Compound Component Pattern",
      contentType: "text",
      content: `import { createContext, useContext, ReactNode } from "react";

const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null);

function Tabs({ children, defaultTab }: { children: ReactNode; defaultTab: string }) {
  const [active, setActive] = useState(defaultTab);
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>;
}

function Tab({ id, children }: { id: string; children: ReactNode }) {
  const { active, setActive } = useContext(TabsContext)!;
  return (
    <button
      onClick={() => setActive(id)}
      style={{ fontWeight: active === id ? "bold" : "normal" }}
    >
      {children}
    </button>
  );
}

function TabPanel({ id, children }: { id: string; children: ReactNode }) {
  const { active } = useContext(TabsContext)!;
  return active === id ? <div>{children}</div> : null;
}

Tabs.Tab = Tab;
Tabs.Panel = TabPanel;

export { Tabs };`,
      language: "typescript",
      typeId: types.snippet,
      collectionId: collections["React Patterns"],
      description: "Compound component pattern for building flexible Tabs UI.",
    },

    // AI Workflows — 3 prompts
    {
      title: "Code Review Prompt",
      contentType: "text",
      content: `You are an expert code reviewer. Review the following code and provide structured feedback covering:

1. **Correctness** — Does it do what it's supposed to?
2. **Security** — Any vulnerabilities (injection, auth bypass, data exposure)?
3. **Performance** — Any unnecessary re-renders, N+1 queries, or slow operations?
4. **Readability** — Is naming clear? Are abstractions appropriate?
5. **Edge cases** — What inputs could break this?

Be concise. Use code examples when suggesting fixes.

\`\`\`
{{CODE}}
\`\`\``,
      language: null,
      typeId: types.prompt,
      collectionId: collections["AI Workflows"],
      description: "Structured prompt for thorough code review across correctness, security, and performance.",
    },
    {
      title: "Documentation Generator",
      contentType: "text",
      content: `Generate comprehensive documentation for the following code. Include:

- **Summary**: One-paragraph overview of what this does and why.
- **Parameters / Props**: Table with name, type, required, and description.
- **Return value**: What it returns and when.
- **Usage example**: Minimal working example in the same language.
- **Notes**: Any gotchas, constraints, or important side effects.

Format in Markdown. Be concise — omit obvious details.

\`\`\`
{{CODE}}
\`\`\``,
      language: null,
      typeId: types.prompt,
      collectionId: collections["AI Workflows"],
      description: "Generates complete Markdown documentation from a code snippet.",
    },
    {
      title: "Refactoring Assistant",
      contentType: "text",
      content: `Refactor the following code with these goals:

- Improve readability without changing behavior
- Reduce duplication (DRY)
- Apply appropriate design patterns if beneficial
- Ensure proper TypeScript types if applicable
- Keep functions under 40 lines

Provide:
1. The refactored code
2. A bullet list of what changed and why

Do NOT add new features or change the public API.

\`\`\`
{{CODE}}
\`\`\``,
      language: null,
      typeId: types.prompt,
      collectionId: collections["AI Workflows"],
      description: "Focused refactoring prompt that preserves behavior while improving code quality.",
    },

    // DevOps — 1 snippet, 1 command, 2 links
    {
      title: "Dockerfile — Node.js Multi-Stage",
      contentType: "text",
      content: `# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]`,
      language: "dockerfile",
      typeId: types.snippet,
      collectionId: collections["DevOps"],
      description: "Multi-stage Dockerfile for Next.js with minimal production image.",
    },
    {
      title: "Deploy to Production",
      contentType: "text",
      content: `#!/bin/bash
set -e

echo "Running migrations..."
npx prisma migrate deploy

echo "Building image..."
docker build -t devstash:latest .

echo "Stopping old container..."
docker stop devstash-app || true && docker rm devstash-app || true

echo "Starting new container..."
docker run -d --name devstash-app -p 3000:3000 --env-file .env.production devstash:latest

echo "Deploy complete."`,
      language: "bash",
      typeId: types.command,
      collectionId: collections["DevOps"],
      description: "Full deploy script: run migrations, build Docker image, swap container.",
    },
    {
      title: "Docker Docs",
      contentType: "text",
      url: "https://docs.docker.com/reference/",
      typeId: types.link,
      collectionId: collections["DevOps"],
      description: "Official Docker reference documentation.",
    },
    {
      title: "GitHub Actions Docs",
      contentType: "text",
      url: "https://docs.github.com/en/actions",
      typeId: types.link,
      collectionId: collections["DevOps"],
      description: "GitHub Actions documentation — CI/CD workflow reference.",
    },

    // Terminal Commands — 4 commands
    {
      title: "Git Cleanup — Merged Branches",
      contentType: "text",
      content: `# Delete all local branches already merged into main
git branch --merged main | grep -v "^\\* main$" | xargs git branch -d

# Prune remote-tracking refs that no longer exist
git fetch --prune`,
      language: "bash",
      typeId: types.command,
      collectionId: collections["Terminal Commands"],
      description: "Remove stale local branches that have been merged into main.",
    },
    {
      title: "Docker — Clean Up All Stopped Containers",
      contentType: "text",
      content: `# Remove all stopped containers, unused networks, dangling images, and build cache
docker system prune -af

# Remove only stopped containers
docker container prune -f`,
      language: "bash",
      typeId: types.command,
      collectionId: collections["Terminal Commands"],
      description: "Free disk space by removing stopped Docker containers and unused resources.",
    },
    {
      title: "Find and Kill Process on Port",
      contentType: "text",
      content: `# macOS / Linux
lsof -ti :3000 | xargs kill -9

# Windows (PowerShell)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force`,
      language: "bash",
      typeId: types.command,
      collectionId: collections["Terminal Commands"],
      description: "Kill whatever process is occupying a given port (cross-platform).",
    },
    {
      title: "npm — Audit and Fix",
      contentType: "text",
      content: `# List vulnerabilities
npm audit

# Auto-fix compatible vulnerabilities
npm audit fix

# Force-fix (may include breaking changes — review diff!)
npm audit fix --force`,
      language: "bash",
      typeId: types.command,
      collectionId: collections["Terminal Commands"],
      description: "Check and fix known security vulnerabilities in npm dependencies.",
    },

    // Design Resources — 4 links
    {
      title: "Tailwind CSS Docs",
      contentType: "text",
      url: "https://tailwindcss.com/docs",
      typeId: types.link,
      collectionId: collections["Design Resources"],
      description: "Official Tailwind CSS documentation — utility class reference.",
    },
    {
      title: "shadcn/ui Components",
      contentType: "text",
      url: "https://ui.shadcn.com/docs/components",
      typeId: types.link,
      collectionId: collections["Design Resources"],
      description: "shadcn/ui component library — copy-paste accessible React components.",
    },
    {
      title: "Radix UI Primitives",
      contentType: "text",
      url: "https://www.radix-ui.com/primitives",
      typeId: types.link,
      collectionId: collections["Design Resources"],
      description: "Unstyled, accessible UI primitives for building design systems.",
    },
    {
      title: "Lucide Icons",
      contentType: "text",
      url: "https://lucide.dev/icons/",
      typeId: types.link,
      collectionId: collections["Design Resources"],
      description: "Open-source icon library used throughout DevStash.",
    },
  ];

  let created = 0;
  for (const item of items) {
    await prisma.item.create({
      data: {
        title: item.title,
        contentType: item.contentType,
        content: item.content ?? null,
        url: item.url ?? null,
        description: item.description ?? null,
        language: item.language ?? null,
        typeId: item.typeId,
        collectionId: item.collectionId,
        userId: user.id,
      },
    });
    created++;
  }

  console.log(`✓ ${created} items seeded`);
  console.log("Seed complete.");
}

main()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
