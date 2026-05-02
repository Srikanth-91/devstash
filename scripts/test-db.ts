// Run with: npm run db:test
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Connecting to database...");
  await prisma.$connect();
  console.log("✓ Connected\n");

  // User
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
  if (!user) throw new Error("Demo user not found — run npm run db:seed first");
  console.log("── User ─────────────────────────────");
  console.log(`  ${user.email}  |  isPro: ${user.isPro}  |  id: ${user.id}`);

  // Item types
  const types = await prisma.itemType.findMany({ where: { isSystem: true } });
  console.log(`\n── Item Types (${types.length}) ──────────────────────`);
  for (const t of types) {
    console.log(`  ${t.name.padEnd(8)}  icon: ${t.icon}  color: ${t.color}`);
  }

  // Collections with item counts
  const collections = await prisma.collection.findMany({
    where: { userId: user.id },
    include: { _count: { select: { items: true } } },
    orderBy: { createdAt: "asc" },
  });
  console.log(`\n── Collections (${collections.length}) ────────────────────`);
  for (const c of collections) {
    console.log(`  ${c.name.padEnd(22)}  ${c._count.items} items  — ${c.description}`);
  }

  // All items grouped by collection
  const items = await prisma.item.findMany({
    where: { userId: user.id },
    include: { type: true, collection: true },
    orderBy: [{ collectionId: "asc" }, { createdAt: "asc" }],
  });

  console.log(`\n── Items (${items.length}) ───────────────────────────`);
  let currentCollection = "";
  for (const item of items) {
    const colName = item.collection?.name ?? "(no collection)";
    if (colName !== currentCollection) {
      console.log(`\n  [${colName}]`);
      currentCollection = colName;
    }
    const detail = item.url ?? (item.content ? item.content.slice(0, 60).replace(/\n/g, " ") + "…" : "");
    console.log(`    • [${item.type.name.padEnd(7)}] ${item.title}`);
    if (detail) console.log(`               ${detail}`);
  }

  console.log("\n✓ All seed data verified.");
}

main()
  .catch((err) => {
    console.error("✗ Test failed:", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
