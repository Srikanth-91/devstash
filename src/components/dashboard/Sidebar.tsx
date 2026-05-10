"use client";

import Link from "next/link";
import { File, Star, X, ChevronDown, ChevronRight, LogOut, User } from "lucide-react";
import type { SidebarItemType, SidebarCollection } from "@/lib/db/collections";
import { Badge } from "@/components/ui/badge";
import { TYPE_CONFIG, ICON_NAME_TO_CONFIG } from "@/lib/type-config";
import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";
import { UserAvatar } from "@/components/ui/UserAvatar";

interface SidebarUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  itemTypes: SidebarItemType[];
  collections: SidebarCollection[];
  user: SidebarUser;
}

export default function Sidebar({ isOpen, onClose, itemTypes, collections, user }: SidebarProps) {
  const [collectionsOpen, setCollectionsOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const allCollections = collections.filter((c) => !c.isFavorite);

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
          "md:relative md:shrink-0",
          isOpen ? "md:w-60" : "md:w-0 md:overflow-hidden md:border-r-0",
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
              {itemTypes.map((type) => {
                const cfg = ICON_NAME_TO_CONFIG[type.icon];
                const Icon = cfg?.Icon ?? File;
                return (
                  <li key={type.id}>
                    <Link
                      href={`/items/${type.name.toLowerCase()}`}
                      className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-sm mx-1 transition-colors"
                    >
                      <Icon className={`size-3.5 shrink-0 ${cfg?.text ?? "text-muted-foreground"}`} />
                      <span className="flex-1">{TYPE_CONFIG[type.name]?.displayName ?? type.name}</span>
                      {(type.name === "file" || type.name === "image") && (
                        <Badge variant="outline" className="h-4 px-1 text-[9px] font-semibold tracking-wider text-muted-foreground border-muted-foreground/30">
                          PRO
                        </Badge>
                      )}
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
                {favoriteCollections.length > 0 && (
                  <>
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
                            <span className="text-[11px] text-muted-foreground">{col.itemCount}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* All Collections */}
                {allCollections.length > 0 && (
                  <>
                    <p className="px-3 mb-0.5 text-[10px] font-medium text-muted-foreground/60 uppercase tracking-wider">
                      All Collections
                    </p>
                    <ul>
                      {allCollections.map((col) => {
                        const dotColor = col.primaryTypeName
                          ? (TYPE_CONFIG[col.primaryTypeName]?.dotColor ?? "bg-muted-foreground")
                          : "bg-muted-foreground";
                        return (
                          <li key={col.id}>
                            <Link
                              href={`/collections/${col.id}`}
                              className="flex items-center gap-2.5 px-3 py-1.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-sm mx-1 transition-colors"
                            >
                              <span className={`size-2.5 shrink-0 rounded-full ${dotColor}`} />
                              <span className="flex-1 truncate">{col.name}</span>
                              <span className="text-[11px] text-muted-foreground">{col.itemCount}</span>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                )}

                {/* View all collections link */}
                <Link
                  href="/collections"
                  className="flex items-center gap-1.5 px-3 py-1.5 mt-1 text-xs text-muted-foreground hover:text-sidebar-foreground transition-colors mx-1 rounded-sm hover:bg-sidebar-accent"
                >
                  View all collections
                </Link>
              </>
            )}
          </section>
        </div>

        {/* User area */}
        <div className="shrink-0 border-t border-sidebar-border" ref={menuRef}>
          {/* Dropdown menu */}
          {menuOpen && (
            <div className="mx-2 mb-1 rounded-lg border border-sidebar-border bg-sidebar shadow-lg overflow-hidden">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <User className="size-3.5 text-muted-foreground" />
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/sign-in" })}
                className="flex items-center gap-2 w-full px-3 py-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              >
                <LogOut className="size-3.5 text-muted-foreground" />
                Sign out
              </button>
            </div>
          )}

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="w-full px-3 py-2 flex items-center gap-2.5 hover:bg-sidebar-accent transition-colors"
          >
            <UserAvatar name={user.name} image={user.image} size={28} />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{user.name ?? "User"}</p>
              <p className="text-[10px] text-muted-foreground truncate">{user.email ?? ""}</p>
            </div>
            <ChevronDown className={`size-3.5 text-muted-foreground shrink-0 transition-transform ${menuOpen ? "rotate-180" : ""}`} />
          </button>
        </div>
      </aside>
    </>
  );
}
