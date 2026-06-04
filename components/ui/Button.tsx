import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "invert" | "outlineDark";

const base =
  "group relative inline-flex items-center justify-center gap-2 border px-7 py-4 font-display text-sm uppercase tracking-[0.08em] transition-colors duration-300 select-none disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-hazard text-ink border-hazard hover:bg-bone hover:border-bone",
  outline:
    "bg-transparent text-bone border-steel hover:border-hazard hover:text-hazard",
  ghost: "bg-transparent text-fog border-transparent hover:text-hazard",
  // For light / accent backgrounds (e.g. the hazard CTA band):
  invert:
    "bg-ink text-bone border-ink hover:bg-bone hover:text-ink hover:border-bone",
  outlineDark:
    "bg-transparent text-ink border-ink/40 hover:border-ink hover:text-ink",
};

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type AsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type AsLink = BaseProps & { href: string };

export function Button(props: AsButton | AsLink) {
  if ("href" in props && props.href) {
    const { href, variant = "primary", className, children } = props;
    const cls = cn(base, variants[variant], className);
    // Use a plain anchor for protocol links (tel:, mailto:, external http).
    if (/^(https?:|tel:|mailto:)/.test(href)) {
      return (
        <a
          href={href}
          className={cls}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noreferrer" }
            : {})}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  const { variant = "primary", className, children, ...rest } = props as AsButton;
  return (
    <button type="button" {...rest} className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}
