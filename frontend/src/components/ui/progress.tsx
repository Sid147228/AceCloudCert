import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
};

export function Progress({ className, value, ...props }: ProgressProps) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div
      aria-label={`Progress ${safeValue}%`}
      className={cn("h-2 overflow-hidden rounded-full bg-surface", className)}
      role="progressbar"
      {...props}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-success transition-all duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
