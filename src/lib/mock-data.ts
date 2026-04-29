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
    name: "Python Snippets",
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
];
