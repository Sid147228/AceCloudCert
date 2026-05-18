import type { HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap rounded-sm border px-2.5 py-1 text-xs font-semibold uppercase leading-none",
  {
    variants: {
      tone: {
        accent: "border-accent/30 bg-accent/10 text-accent",
        danger: "border-destructive/30 bg-destructive/10 text-destructive",
        neutral: "border-border bg-surface text-muted-foreground",
        orange: "border-primary/30 bg-primary/10 text-primary",
        success: "border-success/30 bg-success/10 text-success"
      }
    },
    defaultVariants: {
      tone: "neutral"
    }
  }
);

type BadgeProps = HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>;

export function Badge({ className, tone, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
