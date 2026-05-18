"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { MobileBottomNav } from "./mobile-bottom-nav";
import { Sidebar } from "./sidebar";
import { TopNavbar } from "./top-navbar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen">
        <Sidebar collapsed={collapsed} />
        <div className="min-w-0 flex-1">
          <TopNavbar collapsed={collapsed} onToggleSidebar={() => setCollapsed((value) => !value)} />
          {children}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
