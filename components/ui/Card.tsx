import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Sharp-edged industrial surface used for panels, stats, testimonials. */
export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border border-steel bg-concrete p-8 transition-colors duration-300 hover:border-hazard/60",
        className,
      )}
    >
      {children}
    </div>
  );
}
