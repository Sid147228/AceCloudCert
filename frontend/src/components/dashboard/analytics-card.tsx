import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AnalyticsPoint = {
  label: string;
  value: number;
};

type AnalyticsCardProps = {
  data: AnalyticsPoint[];
  description: string;
  metric: string;
  title: string;
};

export function AnalyticsCard({ data, description, metric, title }: AnalyticsCardProps) {
  const max = Math.max(...data.map((point) => point.value), 1);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <p className="text-2xl font-semibold leading-none text-foreground">{metric}</p>
      </CardHeader>
      <CardContent>
        <div className="flex h-44 items-end gap-2 rounded-md border border-border bg-background/45 p-3">
          {data.map((point, index) => (
            <div className="flex min-w-0 flex-1 flex-col items-center gap-2" key={point.label}>
              <div className="flex h-32 w-full items-end rounded-sm bg-white/[0.03]">
                <div
                  className={cn(
                    "w-full rounded-sm bg-gradient-to-t from-primary to-accent transition-all duration-500",
                    index % 3 === 1 && "from-accent to-success",
                    index % 3 === 2 && "from-primary to-success"
                  )}
                  style={{ height: `${Math.max(12, (point.value / max) * 100)}%` }}
                />
              </div>
              <span className="truncate text-xs font-medium text-muted-foreground">{point.label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
