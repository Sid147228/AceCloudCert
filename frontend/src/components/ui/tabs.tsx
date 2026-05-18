"use client";

import type { ReactNode } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

export type TabItem = {
  content: ReactNode;
  label: string;
  value: string;
};

type TabsProps = {
  defaultValue: string;
  items: TabItem[];
};

export function Tabs({ defaultValue, items }: TabsProps) {
  return (
    <TabsPrimitive.Root className="space-y-4" defaultValue={defaultValue}>
      <TabsPrimitive.List className="inline-flex rounded-md border border-border bg-surface p-1">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            className={cn(
              "rounded-sm px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors",
              "data-[state=active]:bg-card data-[state=active]:text-foreground"
            )}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value}>
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
