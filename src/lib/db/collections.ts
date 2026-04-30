import { prisma } from "@/lib/prisma";

export interface CollectionWithTypes {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  typeNames: string[];
  primaryTypeName: string | null;
}

export interface DashboardStats {
  totalItems: number;
  totalCollections: number;
  favoriteItems: number;
  favoriteCollections: number;
}

export async function getDashboardStats(userId: string): Promise<DashboardStats> {
  const [totalItems, totalCollections, favoriteItems, favoriteCollections] = await Promise.all([
    prisma.item.count({ where: { userId } }),
    prisma.collection.count({ where: { userId } }),
    prisma.item.count({ where: { userId, isFavorite: true } }),
    prisma.collection.count({ where: { userId, isFavorite: true } }),
  ]);
  return { totalItems, totalCollections, favoriteItems, favoriteCollections };
}

export async function getDashboardCollections(userId: string): Promise<CollectionWithTypes[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 6,
    include: {
      items: {
        include: { type: true },
      },
    },
  });

  return collections.map((col) => {
    const typeCounts: Record<string, number> = {};
    for (const item of col.items) {
      typeCounts[item.type.name] = (typeCounts[item.type.name] ?? 0) + 1;
    }

    const typeNames = Object.keys(typeCounts);

    const primaryTypeName = typeNames.reduce<string | null>((best, name) => {
      if (!best || typeCounts[name] > typeCounts[best]) return name;
      return best;
    }, null);

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      typeNames,
      primaryTypeName,
    };
  });
}
