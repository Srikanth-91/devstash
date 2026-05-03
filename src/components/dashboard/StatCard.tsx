interface StatCardProps {
  label: string;
  value: number;
  Icon: React.ElementType;
  iconClass: string;
}

export default function StatCard({ label, value, Icon, iconClass }: StatCardProps) {
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
