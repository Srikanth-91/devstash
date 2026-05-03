import { prisma } from "@/lib/prisma";

export interface SidebarItemType {
  id: string;
  name: string;
  icon: string;
  count: number;
}

export interface SidebarCollection {
  id: string;
  name: string;
  isFavorite: boolean;
  primaryTypeName: string | null;
  itemCount: number;
}

export async function getSidebarData(userId: string): Promise<{
  itemTypes: SidebarItemType[];
  collections: SidebarCollection[];
}> {
  const [rawTypes, rawCollections] = await Promise.all([
    prisma.itemType.findMany({
      where: { isSystem: true },
      include: {
        _count: { select: { items: { where: { userId } } } },
      },
    }),
    prisma.collection.findMany({
      where: { userId },
      orderBy: [{ isFavorite: "desc" }, { updatedAt: "desc" }],
      include: { items: { include: { type: { select: { name: true } } } } },
    }),
  ]);

  const itemTypes = rawTypes.map((t) => ({
    id: t.id,
    name: t.name,
    icon: t.icon ?? "File",
    count: t._count.items,
  }));

  const collections = rawCollections.map((col) => {
    const typeCounts: Record<string, number> = {};
    for (const item of col.items) {
      typeCounts[item.type.name] = (typeCounts[item.type.name] ?? 0) + 1;
    }
    const primaryTypeName = Object.keys(typeCounts).reduce<string | null>((best, name) => {
      if (!best || typeCounts[name] > typeCounts[best]) return name;
      return best;
    }, null);
    return { id: col.id, name: col.name, isFavorite: col.isFavorite, primaryTypeName, itemCount: col.items.length };
  });

  return { itemTypes, collections };
}

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
