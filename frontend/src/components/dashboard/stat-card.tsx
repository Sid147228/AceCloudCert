import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type StatCardProps = {
  delta?: string;
  helper: string;
  icon: LucideIcon;
  label: string;
  tone?: "accent" | "orange" | "success";
  value: string;
};

const toneStyles = {
  accent: "border-accent/30 bg-accent/10 text-accent",
  orange: "border-primary/35 bg-primary/10 text-primary",
  success: "border-success/30 bg-success/10 text-success"
};

export function StatCard({ delta, helper, icon: Icon, label, tone = "accent", value }: StatCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold leading-none text-foreground">{value}</p>
          </div>
          <div className={cn("rounded-md border p-2", toneStyles[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
          <p className="min-w-0 text-sm leading-6 text-muted-foreground">{helper}</p>
          {delta ? (
            <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-success/25 bg-success/10 px-2 py-1 text-xs font-semibold text-success">
              {delta}
              <ArrowUpRight className="h-3 w-3" />
            </span>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
