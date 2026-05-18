import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return <main className={cn("mx-auto w-full max-w-7xl px-4 py-6 pb-28 lg:px-6 lg:py-8 xl:pb-10", className)}>{children}</main>;
}
