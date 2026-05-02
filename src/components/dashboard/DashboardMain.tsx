import {
  Layers,
  FolderOpen,
  Star,
  BookMarked,
  Pin,
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { getDashboardCollections, getDashboardStats } from "@/lib/db/collections";
import { getDashboardItems } from "@/lib/db/items";

// ── Type → icon/colour mapping ──────────────────────────────────────────────

const TYPE_CONFIG: Record<
  string,
  { Icon: React.ElementType; bg: string; text: string }
> = {
  snippet: { Icon: Code,      bg: "bg-blue-500/10",    text: "text-blue-400"    },
  prompt:  { Icon: Sparkles,  bg: "bg-purple-500/10",  text: "text-purple-400"  },
  command: { Icon: Terminal,  bg: "bg-emerald-500/10", text: "text-emerald-400" },
  note:    { Icon: FileText,  bg: "bg-amber-500/10",   text: "text-amber-400"   },
  file:    { Icon: File,      bg: "bg-orange-500/10",  text: "text-orange-400"  },
  image:   { Icon: ImageIcon, bg: "bg-pink-500/10",    text: "text-pink-400"    },
  link:    { Icon: LinkIcon,  bg: "bg-cyan-500/10",    text: "text-cyan-400"    },
};

const COL_ICON: Record<string, { Icon: React.ElementType; color: string }> = {
  snippet: { Icon: Code,      color: "text-blue-400"    },
  prompt:  { Icon: Sparkles,  color: "text-purple-400"  },
  command: { Icon: Terminal,  color: "text-emerald-400" },
  note:    { Icon: FileText,  color: "text-amber-400"   },
  file:    { Icon: File,      color: "text-orange-400"  },
  image:   { Icon: ImageIcon, color: "text-pink-400"    },
  link:    { Icon: LinkIcon,  color: "text-cyan-400"    },
};

// Border color derived from the most-used item type in the collection.
// Using raw RGB values (at 40% opacity) so the color is always applied at
// runtime regardless of Tailwind's static class scanner.
const TYPE_BORDER_COLOR: Record<string, string> = {
  snippet: "rgb(59 130 246 / 0.4)",   // blue-500
  prompt:  "rgb(139 92 246 / 0.4)",   // purple-500
  command: "rgb(16 185 129 / 0.4)",   // emerald-500
  note:    "rgb(245 158 11 / 0.4)",   // amber-500
  file:    "rgb(249 115 22 / 0.4)",   // orange-500
  image:   "rgb(236 72 153 / 0.4)",   // pink-500
  link:    "rgb(6 182 212 / 0.4)",    // cyan-500
};

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ── Sub-components ───────────────────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
  iconClass: string;
}

function StatCard({ label, value, Icon, iconClass }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
      <div className={`size-10 rounded-lg flex items-center justify-center ${iconClass}`}>
        <Icon className="size-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

interface CollectionCardProps {
  name: string;
  description: string | null;
  itemCount: number;
  isFavorite: boolean;
  typeNames: string[];
  primaryTypeName: string | null;
}

function CollectionCard({
  name,
  description,
  itemCount,
  isFavorite,
  typeNames,
  primaryTypeName,
}: CollectionCardProps) {
  const borderColor = primaryTypeName ? TYPE_BORDER_COLOR[primaryTypeName] : undefined;

  return (
    <div
      className="group rounded-xl border border-border bg-card p-4 flex flex-col gap-2 hover:bg-card/80 transition-colors cursor-pointer"
      style={borderColor ? { borderLeftWidth: "4px", borderLeftColor: borderColor } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">{name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{itemCount} items</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <Star
            className={`size-3.5 ${isFavorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground/40"}`}
          />
          <button className="p-0.5 rounded hover:bg-muted text-muted-foreground/40 hover:text-muted-foreground transition-colors">
            <MoreHorizontal className="size-3.5" />
          </button>
        </div>
      </div>

      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
      )}

      {typeNames.length > 0 && (
        <div className="flex items-center gap-1.5 mt-auto pt-1">
          {typeNames.slice(0, 4).map((name) => {
            const cfg = COL_ICON[name];
            if (!cfg) return null;
            const { Icon, color } = cfg;
            return <Icon key={name} className={`size-3 ${color}`} />;
          })}
        </div>
      )}
    </div>
  );
}

interface ItemCardProps {
  title: string;
  description?: string | null;
  typeName: string;
  collectionName?: string | null;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
}

function ItemCard({
  title,
  description,
  typeName,
  collectionName,
  tags,
  isFavorite,
  createdAt,
}: ItemCardProps) {
  const cfg = TYPE_CONFIG[typeName] ?? TYPE_CONFIG["snippet"];
  const { Icon, bg, text } = cfg;

  return (
    <div className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 hover:border-border/80 hover:bg-card/80 transition-colors cursor-pointer">
      <div className={`shrink-0 size-9 rounded-lg flex items-center justify-center ${bg}`}>
        <Icon className={`size-4 ${text}`} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <p className="font-semibold text-sm text-foreground truncate">{title}</p>
            <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded border border-border text-muted-foreground">
              {typeName}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Star
              className={`size-3.5 ${isFavorite ? "text-amber-400 fill-amber-400" : "text-muted-foreground/30"}`}
            />
            <button className="p-0.5 rounded hover:bg-muted text-muted-foreground/30 hover:text-muted-foreground transition-colors">
              <MoreHorizontal className="size-3.5" />
            </button>
          </div>
        </div>

        {collectionName && (
          <p className="text-[11px] text-muted-foreground mt-0.5">{collectionName}</p>
        )}

        {description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{description}</p>
        )}

        {(tags.length > 0 || createdAt) && (
          <div className="flex items-center justify-between gap-2 mt-2">
            <div className="flex items-center gap-1 flex-wrap">
              {tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground shrink-0">
              {formatDate(createdAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

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
        <StatCard
          label="Total Items"
          value={stats.totalItems}
          Icon={Layers}
          iconClass="bg-blue-500/10 text-blue-400"
        />
        <StatCard
          label="Collections"
          value={stats.totalCollections}
          Icon={FolderOpen}
          iconClass="bg-purple-500/10 text-purple-400"
        />
        <StatCard
          label="Favorite Items"
          value={stats.favoriteItems}
          Icon={Star}
          iconClass="bg-amber-500/10 text-amber-400"
        />
        <StatCard
          label="Fav Collections"
          value={stats.favoriteCollections}
          Icon={BookMarked}
          iconClass="bg-emerald-500/10 text-emerald-400"
        />
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
