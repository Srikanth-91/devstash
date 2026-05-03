import { Star, MoreHorizontal } from "lucide-react";
import { TYPE_CONFIG } from "@/lib/type-config";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
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

export default function ItemCard({
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
