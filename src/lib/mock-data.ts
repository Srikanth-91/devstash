export const mockUser = {
  id: "user_1",
  name: "John Doe",
  email: "demo@devstash.io",
  isPro: false,
};

export const mockItemTypes = [
  { id: "type_snippet", name: "Snippets", icon: "code", isSystem: true, count: 24 },
  { id: "type_prompt", name: "Prompts", icon: "sparkles", isSystem: true, count: 18 },
  { id: "type_command", name: "Commands", icon: "terminal", isSystem: true, count: 15 },
  { id: "type_note", name: "Notes", icon: "file-text", isSystem: true, count: 12 },
  { id: "type_file", name: "Files", icon: "file", isSystem: true, count: 5 },
  { id: "type_image", name: "Images", icon: "image", isSystem: true, count: 3 },
  { id: "type_url", name: "Links", icon: "link", isSystem: true, count: 8 },
];

export const mockCollections = [
  {
    id: "col_1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    isFavorite: true,
    iconTypes: ["snippet", "command", "url"],
  },
  {
    id: "col_2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
    iconTypes: ["snippet", "url"],
  },
  {
    id: "col_3",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    isFavorite: true,
    iconTypes: ["file", "image"],
  },
  {
    id: "col_4",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: true,
    iconTypes: ["snippet", "command", "url", "note"],
  },
  {
    id: "col_5",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    isFavorite: true,
    iconTypes: ["command", "url"],
  },
  {
    id: "col_6",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: true,
    iconTypes: ["prompt", "url", "file"],
  },
  {
    id: "col_7",
    name: "Golang Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
    iconTypes: ["snippet", "url"],
  },
  {
    id: "col_8",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: false,
    iconTypes: ["snippet", "command", "url"],
  },
  {
    id: "col_9",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
    iconTypes: ["prompt", "file"],
  },
];

export const mockItems = [
  {
    id: "item_1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "text",
    content: `import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch session
  }, [])

  return { user, loading }
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    language: "typescript",
    tags: ["react", "auth", "hooks"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-15",
  },
  {
    id: "item_2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "text",
    content: `async function fetchWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options)
      if (!res.ok) throw new Error(res.statusText)
      return res.json()
    } catch (err) {
      if (i === retries - 1) throw err
      await new Promise(r => setTimeout(r, 2 ** i * 1000))
    }
  }
}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_1",
    collectionName: "React Patterns",
    language: "javascript",
    tags: ["fetch", "error-handling", "retry"],
    isFavorite: false,
    isPinned: true,
    createdAt: "2026-01-12",
  },
  {
    id: "item_3",
    title: "Git Stash Workflow",
    description: "Quick reference for git stash commands",
    contentType: "text",
    content: `git stash push -m "description"
git stash list
git stash pop
git stash apply stash@{0}
git stash drop stash@{0}`,
    typeId: "type_command",
    typeName: "Command",
    collectionId: "col_5",
    collectionName: "Git Commands",
    language: "bash",
    tags: ["git", "workflow"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-10",
  },
  {
    id: "item_4",
    title: "Explain Code Prompt",
    description: "System prompt for explaining complex code",
    contentType: "text",
    content: `You are a senior developer. Explain the following code in plain English:
1. What it does overall
2. Key functions and their purpose
3. Any potential issues or improvements

Code:
{{code}}`,
    typeId: "type_prompt",
    typeName: "Prompt",
    collectionId: "col_6",
    collectionName: "AI Prompts",
    language: null,
    tags: ["ai", "code-review", "explanation"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-08",
  },
  {
    id: "item_5",
    title: "Python List Comprehension Patterns",
    description: "Common Python list comprehension examples",
    contentType: "text",
    content: `# Filter and transform
evens_squared = [x**2 for x in range(10) if x % 2 == 0]

# Flatten nested list
flat = [item for sublist in nested for item in sublist]

# Dict comprehension
word_lengths = {word: len(word) for word in words}`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_2",
    collectionName: "Python Snippets",
    language: "python",
    tags: ["python", "list-comprehension"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-05",
  },
  {
    id: "item_6",
    title: "Docker Compose Dev Setup",
    description: "Minimal docker-compose for local dev with Postgres and Redis",
    contentType: "text",
    content: `services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    ports:
      - "5432:5432"
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"`,
    typeId: "type_file",
    typeName: "File",
    collectionId: null,
    collectionName: null,
    language: "yaml",
    tags: ["docker", "postgres", "redis", "devops"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-01-03",
  },
  {
    id: "item_7",
    title: "React Server Components Notes",
    description: "Key concepts, limitations, and patterns for using RSC in Next.js",
    contentType: "text",
    content: `# React Server Components

- Run only on the server — no useState, no useEffect
- Can fetch data directly (no API route needed)
- Can't pass functions as props to client components
- Use 'use client' boundary to switch to client components`,
    typeId: "type_note",
    typeName: "Note",
    collectionId: "col_1",
    collectionName: "React Patterns",
    language: null,
    tags: ["react", "rsc", "next.js"],
    isFavorite: true,
    isPinned: true,
    createdAt: "2026-01-22",
  },
  {
    id: "item_8",
    title: "Code Review Prompt",
    description: "Prompt for thorough AI-assisted code reviews",
    contentType: "text",
    content: `Review the following code as a senior engineer. Focus on:
1. Security vulnerabilities
2. Performance bottlenecks
3. Edge cases and error handling
4. Code readability and maintainability

Code: {{code}}`,
    typeId: "type_prompt",
    typeName: "Prompt",
    collectionId: "col_6",
    collectionName: "AI Prompts",
    language: null,
    tags: ["ai", "code-review", "prompt"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-25",
  },
  {
    id: "item_9",
    title: "Prisma Cheat Sheet",
    description: "Common Prisma ORM queries and patterns",
    contentType: "text",
    content: `// Find with relations
const user = await prisma.user.findUnique({
  where: { id },
  include: { posts: true },
})

// Upsert
await prisma.user.upsert({
  where: { email },
  update: { name },
  create: { email, name },
})`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_2",
    collectionName: "Python Snippets",
    language: "typescript",
    tags: ["prisma", "database", "orm"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-01-28",
  },
  {
    id: "item_10",
    title: "Tailwind v4 Config Reference",
    description: "CSS-based theme configuration for Tailwind CSS v4",
    contentType: "text",
    content: `@import "tailwindcss";

@theme {
  --color-primary: oklch(50% 0.2 250);
  --font-sans: "Geist", sans-serif;
  --radius-lg: 0.75rem;
}`,
    typeId: "type_note",
    typeName: "Note",
    collectionId: null,
    collectionName: null,
    language: "css",
    tags: ["tailwind", "css", "config"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-02-01",
  },
  {
    id: "item_11",
    title: "zsh Aliases",
    description: "Productivity aliases for zsh shell",
    contentType: "text",
    content: `alias gs="git status"
alias gp="git push"
alias gl="git log --oneline --graph"
alias ni="npm install"
alias nr="npm run"
alias dev="npm run dev"`,
    typeId: "type_command",
    typeName: "Command",
    collectionId: "col_5",
    collectionName: "Git Commands",
    language: "bash",
    tags: ["zsh", "shell", "aliases", "productivity"],
    isFavorite: true,
    isPinned: false,
    createdAt: "2026-02-03",
  },
  {
    id: "item_12",
    title: "TypeScript Utility Types",
    description: "Commonly used TypeScript utility types with examples",
    contentType: "text",
    content: `type Partial<T> = { [K in keyof T]?: T[K] }
type Required<T> = { [K in keyof T]-?: T[K] }
type Pick<T, K extends keyof T> = { [P in K]: T[P] }
type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
type Record<K extends keyof any, T> = { [P in K]: T }`,
    typeId: "type_snippet",
    typeName: "Snippet",
    collectionId: "col_4",
    collectionName: "Interview Prep",
    language: "typescript",
    tags: ["typescript", "types", "generics"],
    isFavorite: false,
    isPinned: false,
    createdAt: "2026-02-05",
  },
];
