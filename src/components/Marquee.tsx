import type { CSSProperties } from "react";
import { cn } from "../utils/cn";

interface MarqueeProps {
  items: string[];
  separator?: string;
  reverse?: boolean;
  duration?: number;
  className?: string;
  itemClassName?: string;
}

export default function Marquee({
  items,
  separator = "✦",
  reverse = false,
  duration = 30,
  className,
  itemClassName,
}: MarqueeProps) {
  const half = (key: string) => (
    <div key={key} className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <span key={i} className={cn("flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10", itemClassName)}>
          <span className="whitespace-nowrap">{item}</span>
          {separator && <span className="text-[0.55em] opacity-60">{separator}</span>}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden", className)}>
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ "--marquee-dur": `${duration}s` } as CSSProperties}
      >
        {half("a")}
        {half("b")}
      </div>
    </div>
  );
}
