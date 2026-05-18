import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  collapsed?: boolean;
  className?: string;
};

export function BrandMark({ collapsed = false, className }: BrandMarkProps) {
  return (
    <a className={cn("flex min-w-0 items-center gap-3", className)} href="#overview" aria-label="AceCloudCert home">
      <Image
        alt="AceCloudCert logo"
        className="h-10 w-10 rounded-md border border-border sm:h-[42px] sm:w-[42px]"
        height={42}
        priority
        src="/acecloudcert-logo.png"
        width={42}
      />
      {!collapsed ? (
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold leading-5 text-foreground" data-brand-title>
            AceCloudCert
          </span>
          <span className="hidden truncate text-xs font-medium leading-5 text-muted-foreground sm:block" data-brand-subtitle>
            Enterprise cloud readiness
          </span>
        </span>
      ) : null}
    </a>
  );
}
