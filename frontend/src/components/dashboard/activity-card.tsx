import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActivityItem = {
  description: string;
  label: string;
  tone?: "accent" | "orange" | "success";
};

type ActivityCardProps = {
  description: string;
  items: ActivityItem[];
  title: string;
};

const dotStyles = {
  accent: "bg-accent shadow-[0_0_20px_rgba(56,189,248,0.42)]",
  orange: "bg-primary shadow-[0_0_20px_rgba(255,140,0,0.42)]",
  success: "bg-success shadow-[0_0_20px_rgba(34,197,94,0.36)]"
};

export function ActivityCard({ description, items, title }: ActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div className="grid grid-cols-[16px_minmax(0,1fr)] gap-3" key={item.label}>
              <span className={cn("mt-2 h-2 w-2 rounded-full", dotStyles[item.tone ?? "accent"])} />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
