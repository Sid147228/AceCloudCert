import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { BrandMark } from "./brand-mark";
import { platformNavItems, primaryNavItems } from "./navigation";

type SidebarProps = {
  collapsed: boolean;
};

function NavLink({ collapsed, href, icon: Icon, label }: { collapsed: boolean; href: string; icon: LucideIcon; label: string }) {
  const item = (
    <a
      className={cn(
        "flex h-10 items-center gap-3 rounded-md px-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground",
        collapsed && "justify-center px-0"
      )}
      href={href}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed ? <span>{label}</span> : null}
    </a>
  );

  return collapsed ? <Tooltip content={label}>{item}</Tooltip> : item;
}

export function Sidebar({ collapsed }: SidebarProps) {
  return (
    <aside
      className={cn(
        "hidden h-screen shrink-0 border-r border-border bg-background/90 backdrop-blur xl:sticky xl:top-0 xl:flex xl:flex-col",
        collapsed ? "w-[76px]" : "w-[280px]"
      )}
    >
      <div className="border-b border-border p-4">
        <BrandMark collapsed={collapsed} />
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto p-4">
        <nav className="space-y-1" aria-label="Primary">
          {primaryNavItems.map((item) => (
            <NavLink collapsed={collapsed} key={item.label} {...item} />
          ))}
        </nav>
        <div className="space-y-2">
          {!collapsed ? (
            <div className="flex items-center justify-between px-3">
              <p className="text-xs font-semibold uppercase text-muted-foreground">Platform surfaces</p>
              <Badge tone="orange">Core</Badge>
            </div>
          ) : null}
          <nav className="space-y-1" aria-label="Platform">
            {platformNavItems.map((item) => (
              <NavLink collapsed={collapsed} key={item.label} {...item} />
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-border p-4">
        <div className={cn("rounded-lg border border-border bg-surface p-3", collapsed && "p-2")}>
          {!collapsed ? (
            <>
              <p className="text-sm font-semibold text-foreground">Foundation phase</p>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">Architecture, theming, layouts, and reusable UI only.</p>
            </>
          ) : (
            <Badge tone="accent">F1</Badge>
          )}
        </div>
      </div>
    </aside>
  );
}
