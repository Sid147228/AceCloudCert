import type { ReactNode } from "react";
import { CheckCircle2, Info, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastProps = {
  children: ReactNode;
  tone?: "info" | "success" | "warning";
  title: string;
};

export function Toast({ children, title, tone = "info" }: ToastProps) {
  const Icon = tone === "success" ? CheckCircle2 : tone === "warning" ? TriangleAlert : Info;

  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border bg-card p-4 shadow-xl",
        tone === "success" && "border-success/30",
        tone === "warning" && "border-primary/30",
        tone === "info" && "border-accent/30"
      )}
      role="status"
    >
      <Icon className="mt-0.5 h-4 w-4 text-accent" />
      <div className="space-y-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <div className="text-sm leading-6 text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}
