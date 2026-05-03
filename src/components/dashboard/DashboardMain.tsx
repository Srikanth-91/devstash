import { Layers, FolderOpen, Star, BookMarked, Pin, ArrowRight } from "lucide-react";
import { getDashboardCollections, getDashboardStats } from "@/lib/db/collections";
import { getDashboardItems } from "@/lib/db/items";
import StatCard from "./StatCard";
import CollectionCard from "./CollectionCard";
import ItemCard from "./ItemCard";

export default async function DashboardMain({ userId }: { userId: string }) {
  const [stats, collections, { pinnedItems, recentItems }] = await Promise.all([
    getDashboardStats(userId),
    getDashboardCollections(userId),
    getDashboardItems(userId),
  ]);

  return (
    <div className="p-6 space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-0.5">Your developer knowledge hub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Items"     value={stats.totalItems}          Icon={Layers}     iconClass="bg-blue-500/10 text-blue-400"      />
        <StatCard label="Collections"     value={stats.totalCollections}    Icon={FolderOpen} iconClass="bg-purple-500/10 text-purple-400"   />
        <StatCard label="Favorite Items"  value={stats.favoriteItems}       Icon={Star}       iconClass="bg-amber-500/10 text-amber-400"    />
        <StatCard label="Fav Collections" value={stats.favoriteCollections} Icon={BookMarked} iconClass="bg-emerald-500/10 text-emerald-400" />
      </div>

      {/* Collections */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">Collections</h2>
          <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors">
            View all <ArrowRight className="size-3" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              name={col.name}
              description={col.description}
              itemCount={col.itemCount}
              isFavorite={col.isFavorite}
              typeNames={col.typeNames}
              primaryTypeName={col.primaryTypeName}
            />
          ))}
        </div>
      </section>

      {/* Pinned Items */}
      {pinnedItems.length > 0 && (
        <section>
          <div className="flex items-center gap-2 mb-3">
            <Pin className="size-4 text-muted-foreground" />
            <h2 className="text-sm font-semibold text-foreground">Pinned</h2>
          </div>
          <div className="space-y-2">
            {pinnedItems.map((item) => (
              <ItemCard
                key={item.id}
                title={item.title}
                description={item.description}
                typeName={item.typeName}
                collectionName={item.collectionName}
                tags={item.tags}
                isFavorite={item.isFavorite}
                createdAt={item.createdAt}
              />
            ))}
          </div>
        </section>
      )}

      {/* Recent Items */}
      <section>
        <h2 className="text-sm font-semibold text-foreground mb-3">Recent Items</h2>
        <div className="space-y-2">
          {recentItems.map((item) => (
            <ItemCard
              key={item.id}
              title={item.title}
              description={item.description}
              typeName={item.typeName}
              collectionName={item.collectionName}
              tags={item.tags}
              isFavorite={item.isFavorite}
              createdAt={item.createdAt}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
