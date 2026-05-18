import { mobileNavItems } from "./navigation";

export function MobileBottomNav() {
  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-4 rounded-lg border border-border bg-background/94 p-1 shadow-2xl backdrop-blur-xl xl:hidden"
    >
      {mobileNavItems.map(({ href, icon: Icon, label }) => (
        <a
          className="flex flex-col items-center gap-1 rounded-md px-2 py-2 text-[11px] font-semibold text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
          href={href}
          key={label}
        >
          <Icon className="h-4 w-4" />
          {label}
        </a>
      ))}
    </nav>
  );
}
