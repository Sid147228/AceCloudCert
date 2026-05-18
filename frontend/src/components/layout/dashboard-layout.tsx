import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DashboardLayoutProps = {
  aside?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function DashboardLayout({ aside, children, className }: DashboardLayoutProps) {
  return (
    <div className={cn("grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]", className)}>
      <div className="min-w-0 space-y-5">{children}</div>
      {aside ? <aside className="space-y-5">{aside}</aside> : null}
    </div>
  );
}
