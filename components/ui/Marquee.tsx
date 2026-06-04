import { cn } from "@/lib/utils";

/**
 * Industrial scrolling text strip. Content is rendered twice and translated
 * -50% so the loop is seamless. Pauses on hover.
 */
export default function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  const sequence = [...items, ...items];

  return (
    <div
      className={cn(
        "group flex overflow-hidden border-y border-steel bg-concrete py-5",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-10 whitespace-nowrap pr-10 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl uppercase tracking-wide text-fog">
              {item}
            </span>
            <span aria-hidden className="text-hazard">
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
