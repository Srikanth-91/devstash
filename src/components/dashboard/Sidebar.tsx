"use client";

import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link as LinkIcon,
  Star,
  Settings,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { mockItemTypes, mockCollections, mockUser } from "@/lib/mock-data";
import { useState } from "react";

const ICON_MAP: Record<string, React.ElementType> = {
  code: Code,
  sparkles: Sparkles,
  terminal: Terminal,
  "file-text": FileText,
  file: File,
  image: Image,
  link: LinkIcon,
};

const ICON_COLOR_MAP: Record<string, string> = {
  code: "text-blue-400",
  sparkles: "text-purple-400",
  terminal: "text-emerald-400",
  "file-text": "text-amber-400",
  file: "text-orange-400",
  image: "text-pink-400",
  link: "text-cyan-400",
};

function toSlug(name: string) {
  return name.toLowerCase();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  const favoriteCollections = mockCollections.filter((c) => c.isFavorite);
  const recentCollections = mockCollections.filter((c) => !c.isFavorite);

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "flex flex-col h-full bg-sidebar border-r border-sidebar-border z-30 transition-all duration-200",
          // Desktop: inline, toggled by width
          "md:relative md:shrink-0",
          isOpen ? "md:w-60" : "md:w-0 md:overflow-hidden md:border-r-0",
          // Mobile: fixed drawer
          "fixed top-0 left-0 w-72 md:static",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        ].join(" ")}
      >
        {/* Mobile close button */}
        <div className="flex items-center justify-between px-3 py-2 border-b border-sidebar-border md:hidden">
          <span className="text-sm font-semibold text-sidebar-foreground">Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-sidebar-accent text-sidebar-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto py-3 space-y-4">
          {/* Types */}
          <section>
            <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Types
            </p>
            <ul>
              {mockItemTypes.map((type) => {
                const Icon = ICON_MAP[type.icon] ?? File;
                return (
                  <li key={type.id}>
                    <Link
                      href={`/items/${toSlug(type.name)}`}
                      className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-sm mx-1 transition-colors"
                    >
                      <Icon className={`size-3.5 shrink-0 ${ICON_COLOR_MAP[type.icon] ?? "text-muted-foreground"}`} />
                      <span className="flex-1">{type.name}</span>
                      <span className="text-[11px] text-muted-foreground">{type.count}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>

          {/* Collections */}
          <section>
            <button
              onClick={() => setCollectionsOpen((o) => !o)}
              className="flex items-center gap-1.5 px-3 mb-1 w-full text-[10px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-sidebar-foreground transition-colors"
            >
              {collectionsOpen ? (
                <ChevronDown className="size-3" />
              ) : (
                <ChevronRight className="size-3" />
              )}
              Collections
            </button>

            {collectionsOpen && (
              <>
                {/* Favorites */}
                <p className="px-3 mb-0.5 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                  Favorites
                </p>
                <ul className="mb-2">
                  {favoriteCollections.map((col) => (
                    <li key={col.id}>
                      <Link
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-sm mx-1 transition-colors"
                      >
                        <Star className="size-3.5 shrink-0 text-amber-400 fill-amber-400" />
                        <span className="flex-1 truncate">{col.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Recent / All */}
                <p className="px-3 mb-0.5 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                  All Collections
                </p>
                <ul>
                  {recentCollections.map((col) => (
                    <li key={col.id}>
                      <Link
                        href={`/collections/${col.id}`}
                        className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-sm mx-1 transition-colors"
                      >
                        <span className="size-3.5 shrink-0" />
                        <span className="flex-1 truncate">{col.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>

        {/* User avatar area */}
        <div className="shrink-0 border-t border-sidebar-border px-3 py-2 flex items-center gap-2.5">
          <div className="size-7 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-xs font-semibold shrink-0">
            {getInitials(mockUser.name)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-sidebar-foreground truncate">{mockUser.name}</p>
            <p className="text-[10px] text-muted-foreground truncate">{mockUser.email}</p>
          </div>
          <button className="p-1 rounded hover:bg-sidebar-accent text-muted-foreground hover:text-sidebar-foreground transition-colors">
            <Settings className="size-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
}
