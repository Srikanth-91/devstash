import {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image as ImageIcon,
  Link as LinkIcon,
} from "lucide-react";

export const DEFAULT_ICON_NAME = "File";

export const TYPE_CONFIG: Record<
  string,
  {
    Icon: React.ElementType;
    iconName: string;
    bg: string;
    text: string;
    dotColor: string;
    borderColor: string;
    displayName: string;
  }
> = {
  snippet: { Icon: Code,      iconName: "Code",       bg: "bg-blue-500/10",    text: "text-blue-400",    dotColor: "bg-blue-400",    borderColor: "rgb(59 130 246 / 0.4)",  displayName: "Snippets" },
  prompt:  { Icon: Sparkles,  iconName: "Sparkles",   bg: "bg-purple-500/10",  text: "text-purple-400",  dotColor: "bg-purple-400",  borderColor: "rgb(139 92 246 / 0.4)",  displayName: "Prompts"  },
  command: { Icon: Terminal,  iconName: "Terminal",   bg: "bg-emerald-500/10", text: "text-emerald-400", dotColor: "bg-emerald-400", borderColor: "rgb(16 185 129 / 0.4)",  displayName: "Commands" },
  note:    { Icon: FileText,  iconName: "StickyNote", bg: "bg-amber-500/10",   text: "text-amber-400",   dotColor: "bg-amber-400",   borderColor: "rgb(245 158 11 / 0.4)",  displayName: "Notes"    },
  file:    { Icon: File,      iconName: "File",       bg: "bg-orange-500/10",  text: "text-orange-400",  dotColor: "bg-orange-400",  borderColor: "rgb(249 115 22 / 0.4)",  displayName: "Files"    },
  image:   { Icon: ImageIcon, iconName: "Image",      bg: "bg-pink-500/10",    text: "text-pink-400",    dotColor: "bg-pink-400",    borderColor: "rgb(236 72 153 / 0.4)",  displayName: "Images"   },
  link:    { Icon: LinkIcon,  iconName: "Link",       bg: "bg-cyan-500/10",    text: "text-cyan-400",    dotColor: "bg-cyan-400",    borderColor: "rgb(6 182 212 / 0.4)",   displayName: "Links"    },
};

// Lookup by DB icon name string (e.g. "Code", "Sparkles") — used by Sidebar
export const ICON_NAME_TO_CONFIG = Object.fromEntries(
  Object.values(TYPE_CONFIG).map((cfg) => [cfg.iconName, cfg])
) as Record<string, (typeof TYPE_CONFIG)[string]>;
