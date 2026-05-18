import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type QuickActionCardProps = {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
  tone?: "accent" | "orange" | "success";
};

const toneStyles = {
  accent: "text-accent group-hover:border-accent/45 group-hover:bg-accent/10",
  orange: "text-primary group-hover:border-primary/45 group-hover:bg-primary/10",
  success: "text-success group-hover:border-success/45 group-hover:bg-success/10"
};

export function QuickActionCard({ description, href, icon: Icon, label, tone = "accent" }: QuickActionCardProps) {
  return (
    <a
      className="group block rounded-lg border border-border bg-card p-5 shadow-[0_1px_0_rgba(255,255,255,0.04)_inset,0_18px_44px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-card/90"
      href={href}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={cn("rounded-md border border-border bg-background/50 p-2 transition-colors", toneStyles[tone])}>
          <Icon className="h-4 w-4" />
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>
      <p className="mt-4 text-sm font-semibold text-foreground">{label}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </a>
  );
}
