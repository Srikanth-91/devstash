import { Search, Plus, FolderPlus, PanelLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  onMenuClick?: () => void;
  sidebarOpen?: boolean;
}

export default function TopBar({ onMenuClick, sidebarOpen }: TopBarProps) {
  return (
    <header className="flex h-12 shrink-0 items-center gap-3 border-b border-border px-4">
      {/* Desktop sidebar toggle */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="hidden md:flex items-center justify-center size-7 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <PanelLeft className="size-4" />
        </button>
      )}

      {/* Mobile hamburger */}
      {onMenuClick && (
        <button
          onClick={onMenuClick}
          className="flex md:hidden items-center justify-center size-7 rounded hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Open menu"
        >
          <Menu className="size-4" />
        </button>
      )}

      <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
        <div className="size-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
          D
        </div>
        <span>DevStash</span>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            className="pl-8 h-8 text-sm"
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 hidden sm:inline-flex h-5 items-center gap-0.5 rounded border border-border bg-muted px-1.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
          <FolderPlus className="size-3.5" />
          New Collection
        </Button>
        <Button size="sm" className="gap-1.5">
          <Plus className="size-3.5" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
