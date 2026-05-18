"use client";

import { Bell, ChevronsLeftRight, Command, Menu, Search, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Tooltip } from "@/components/ui/tooltip";
import { BrandMark } from "./brand-mark";
import { mobileNavItems } from "./navigation";

type TopNavbarProps = {
  collapsed: boolean;
  onToggleSidebar: () => void;
};

export function TopNavbar({ collapsed, onToggleSidebar }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/86 backdrop-blur-xl">
      <div className="flex min-h-16 items-center gap-2 px-3 sm:gap-3 sm:px-4 lg:px-6">
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <div className="min-w-0 xl:hidden">
            <BrandMark />
          </div>
          <Tooltip content={collapsed ? "Expand sidebar" : "Collapse sidebar"}>
            <Button
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="hidden xl:inline-flex"
              onClick={onToggleSidebar}
              size="icon"
              variant="ghost"
            >
              <ChevronsLeftRight className="h-4 w-4" />
            </Button>
          </Tooltip>
          <Dropdown
            items={mobileNavItems.map((item) => ({
              href: item.href,
              label: item.label,
              supportingText: `Jump to ${item.label.toLowerCase()} foundation surface`
            }))}
            trigger={
              <Button aria-label="Open mobile menu" className="h-9 w-9 xl:hidden" size="icon" variant="ghost">
                <Menu className="h-4 w-4" />
              </Button>
            }
          />
          <div className="hidden w-full max-w-md items-center gap-2 rounded-md border border-border bg-surface px-3 md:flex">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              aria-label="Search placeholder"
              className="h-9 border-0 bg-transparent px-0 focus:ring-0"
              placeholder="Search certifications, components, routes..."
            />
            <Badge tone="neutral">
              <Command className="mr-1 inline h-3 w-3" />
              K
            </Badge>
          </div>
        </div>
        <div className="hidden min-w-52 md:block">
          <Select
            aria-label="Current certification"
            defaultValue="aws-cloud-practitioner"
            options={[
              { label: "AWS Cloud Practitioner", value: "aws-cloud-practitioner" },
              { label: "Azure Fundamentals", value: "azure-fundamentals" },
              { label: "Google Cloud Digital Leader", value: "gcp-digital-leader" }
            ]}
          />
        </div>
        <Dropdown
          items={[
            { href: "#quality", label: "Foundation audit", supportingText: "Build, type, lint, and visual checks" },
            { href: "#components", label: "Component library", supportingText: "Primitives ready for product phases" },
            { href: "#navigation", label: "Responsive shell", supportingText: "Desktop sidebar and mobile bottom nav" }
          ]}
          trigger={
            <Button aria-label="Notifications" className="h-9 w-9 sm:h-10 sm:w-10" size="icon" variant="secondary">
              <Bell className="h-4 w-4" />
            </Button>
          }
        />
        <Dropdown
          items={[
            { href: "#settings", label: "Profile", supportingText: "Account surface contract" },
            { href: "#system", label: "Workspace settings", supportingText: "Theme and layout architecture" },
            { href: "#overview", label: "Sign out", supportingText: "Auth behavior is reserved for a later phase" }
          ]}
          trigger={
            <Button aria-label="Profile menu" className="h-9 w-9 sm:h-10 sm:w-10" size="icon" variant="secondary">
              <UserRound className="h-4 w-4" />
            </Button>
          }
        />
      </div>
    </header>
  );
}
