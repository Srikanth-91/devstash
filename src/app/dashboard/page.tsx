export default function DashboardPage() {
  return (
    <>
      <aside className="w-64 shrink-0 border-r border-border overflow-y-auto">
        <h2 className="p-4 text-sm font-semibold text-muted-foreground">Sidebar</h2>
      </aside>
      <main className="flex-1 overflow-y-auto">
        <h2 className="p-4 text-sm font-semibold text-muted-foreground">Main</h2>
      </main>
    </>
  );
}
