import { Star, MoreHorizontal } from "lucide-react";
import { TYPE_CONFIG } from "@/lib/type-config";

interface CollectionCardProps {
  name: string;
  description: string | null;
  itemCount: number;
  isFavorite: boolean;
  typeNames: string[];
  primaryTypeName: string | null;
}

export default function CollectionCard({
  name,
  description,
  itemCount,
  isFavorite,
  typeNames,
  primaryTypeName,
}: CollectionCardProps) {
  const borderColor = primaryTypeName ? TYPE_CONFIG[primaryTypeName]?.borderColor : undefined;

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
          {typeNames.slice(0, 4).map((typeName) => {
            const cfg = TYPE_CONFIG[typeName];
            if (!cfg) return null;
            const { Icon, text } = cfg;
            return <Icon key={typeName} className={`size-3 ${text}`} />;
          })}
        </div>
      )}
    </div>
  );
}
