import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-45",
  {
    variants: {
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5",
        icon: "h-10 w-10"
      },
      variant: {
        danger: "bg-destructive text-white hover:bg-destructive/90",
        ghost: "text-muted-foreground hover:bg-white/5 hover:text-foreground",
        outline: "border border-border bg-transparent text-foreground hover:border-accent/60 hover:bg-accent/10",
        primary: "bg-primary text-primary-foreground shadow-[0_0_24px_rgba(255,140,0,0.16)] hover:bg-primary/90",
        secondary: "border border-border bg-surface text-foreground hover:bg-card"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "primary"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, size, variant, ...props }, ref) => (
  <button className={cn(buttonVariants({ size, variant }), className)} ref={ref} {...props} />
));
Button.displayName = "Button";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof buttonVariants>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, size, variant, ...props }, ref) => (
    <a className={cn(buttonVariants({ size, variant }), className)} ref={ref} {...props} />
  )
);
ButtonLink.displayName = "ButtonLink";
