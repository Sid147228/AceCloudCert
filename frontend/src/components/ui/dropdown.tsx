"use client";

import type { ReactNode } from "react";
import { DropdownMenu as DropdownPrimitive } from "radix-ui";

export type DropdownItem = {
  href?: string;
  label: string;
  onSelect?: () => void;
  supportingText?: string;
};

type DropdownProps = {
  align?: "center" | "end" | "start";
  items: DropdownItem[];
  trigger: ReactNode;
};

export function Dropdown({ align = "end", items, trigger }: DropdownProps) {
  return (
    <DropdownPrimitive.Root>
      <DropdownPrimitive.Trigger asChild>{trigger}</DropdownPrimitive.Trigger>
      <DropdownPrimitive.Portal>
        <DropdownPrimitive.Content
          align={align}
          className="z-50 min-w-56 rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-2xl"
          sideOffset={8}
        >
          {items.map((item) => {
            const content = (
              <>
                <span className="block font-semibold">{item.label}</span>
                {item.supportingText ? (
                  <span className="block text-xs leading-5 text-muted-foreground">{item.supportingText}</span>
                ) : null}
              </>
            );

            return item.href ? (
              <DropdownPrimitive.Item asChild key={item.label}>
                <a
                  className="block cursor-pointer rounded-md px-3 py-2 text-sm outline-none transition-colors focus:bg-white/5 hover:bg-white/5"
                  href={item.href}
                >
                  {content}
                </a>
              </DropdownPrimitive.Item>
            ) : (
              <DropdownPrimitive.Item
                className="cursor-pointer rounded-md px-3 py-2 text-sm outline-none transition-colors focus:bg-white/5"
                key={item.label}
                onSelect={item.onSelect}
              >
                {content}
              </DropdownPrimitive.Item>
            );
          })}
        </DropdownPrimitive.Content>
      </DropdownPrimitive.Portal>
    </DropdownPrimitive.Root>
  );
}
