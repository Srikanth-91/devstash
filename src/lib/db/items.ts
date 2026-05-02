import { prisma } from "@/lib/prisma";

export interface DashboardItem {
  id: string;
  title: string;
  description: string | null;
  typeName: string;
  collectionName: string | null;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
}

function mapItem(item: {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  isPinned: boolean;
  createdAt: Date;
  type: { name: string };
  collection: { name: string } | null;
  tags: { tag: { name: string } }[];
}): DashboardItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    typeName: item.type.name,
    collectionName: item.collection?.name ?? null,
    tags: item.tags.map((t) => t.tag.name),
    isFavorite: item.isFavorite,
    isPinned: item.isPinned,
    createdAt: item.createdAt,
  };
}

const itemInclude = {
  type: { select: { name: true } },
  collection: { select: { name: true } },
  tags: { include: { tag: { select: { name: true } } } },
} as const;

export async function getDashboardItems(userId: string): Promise<{
  pinnedItems: DashboardItem[];
  recentItems: DashboardItem[];
}> {
  const [pinned, recent] = await Promise.all([
    prisma.item.findMany({
      where: { userId, isPinned: true },
      include: itemInclude,
      orderBy: { updatedAt: "desc" },
    }),
    prisma.item.findMany({
      where: { userId },
      include: itemInclude,
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
  ]);

  return {
    pinnedItems: pinned.map(mapItem),
    recentItems: recent.map(mapItem),
  };
}
