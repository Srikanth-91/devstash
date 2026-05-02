"use client";

import { useState } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import type { SidebarItemType, SidebarCollection } from "@/lib/db/collections";

interface DashboardShellProps {
  children: React.ReactNode;
  sidebarData: {
    itemTypes: SidebarItemType[];
    collections: SidebarCollection[];
  };
}

export default function DashboardShell({ children, sidebarData }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <TopBar
        onMenuClick={() => setSidebarOpen((o) => !o)}
        sidebarOpen={sidebarOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          itemTypes={sidebarData.itemTypes}
          collections={sidebarData.collections}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
