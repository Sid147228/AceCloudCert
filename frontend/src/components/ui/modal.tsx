"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ModalProps = {
  children: ReactNode;
  description?: string;
  title: string;
  trigger?: ReactNode;
  triggerLabel?: string;
};

export function Modal({ children, description, title, trigger, triggerLabel = "Open modal" }: ModalProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger ?? <Button variant="secondary">{triggerLabel}</Button>}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border border-border bg-card p-5 text-foreground shadow-2xl"
          )}
        >
          <div className="space-y-1 pe-8">
            <DialogPrimitive.Title className="text-lg font-semibold">{title}</DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="text-sm leading-6 text-muted-foreground">
                {description}
              </DialogPrimitive.Description>
            ) : null}
          </div>
          <div className="mt-5">{children}</div>
          <DialogPrimitive.Close asChild>
            <Button aria-label="Close modal" className="absolute right-3 top-3" size="icon" variant="ghost">
              <X className="h-4 w-4" />
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
