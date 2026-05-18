import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";

type AuthLayoutProps = {
  children: ReactNode;
  eyebrow: string;
  title: string;
};

export function AuthLayout({ children, eyebrow, title }: AuthLayoutProps) {
  return (
    <section className="grid min-h-[560px] overflow-hidden rounded-lg border border-border bg-card lg:grid-cols-[1fr_440px]">
      <div className="enterprise-grid flex flex-col justify-between p-8">
        <BrandMark />
        <div className="max-w-xl space-y-4">
          <p className="text-xs font-semibold uppercase text-primary">{eyebrow}</p>
          <h2 className="text-3xl font-semibold leading-tight text-foreground">{title}</h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Auth screens inherit the same token system, card language, and keyboard-friendly controls as the product shell.
          </p>
        </div>
      </div>
      <div className="border-t border-border bg-background p-6 lg:border-l lg:border-t-0">{children}</div>
    </section>
  );
}
