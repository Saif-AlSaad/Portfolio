import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "../utils/cn";

export const EASE = [0.76, 0, 0.24, 1] as const;

/* ---------- Word-by-word masked reveal ---------- */

const wordContainer: Variants = {
  hidden: {},
  visible: (delay: number = 0) => ({
    transition: { staggerChildren: 0.04, delayChildren: delay },
  }),
};

const wordInner: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: "0%",
    transition: { duration: 0.85, ease: EASE },
  },
};

interface SplitWordsProps {
  text: string;
  className?: string;
  wordClassName?: string;
  accentWord?: string;
  delay?: number;
  once?: boolean;
}

export function SplitWords({ text, className, wordClassName, accentWord, delay = 0, once = true }: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline-block", className)}
      variants={wordContainer}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-10% 0px" }}
      aria-label={text}
    >
      {words.map((word, i) => {
        const isAccent = accentWord && word.replace(/[^a-zA-Z&]/g, "") === accentWord;
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
            <motion.span
              className={cn("inline-block will-change-transform", isAccent && "text-gradient", wordClassName)}
              variants={wordInner}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

/* ---------- Fade-up reveal wrapper ---------- */

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export function FadeUp({ children, delay = 0, className, y = 28 }: FadeUpProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Section heading — chip + title ---------- */

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  accentWord?: string;
  className?: string;
  right?: ReactNode;
}

export function SectionHeading({ index, eyebrow, title, accentWord, className, right }: SectionHeadingProps) {
  return (
    <div className={cn("mb-14 md:mb-16", className)}>
      <FadeUp y={16}>
        <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2 shadow-sm">
          <span className="font-mono text-[11px] font-medium text-royal">{index}</span>
          <span className="h-3 w-px bg-line" />
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">{eyebrow}</span>
        </div>
      </FadeUp>
      <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] font-bold leading-[1.05] tracking-tight">
          <SplitWords text={title} accentWord={accentWord} />
        </h2>
        {right && <FadeUp delay={0.15}>{right}</FadeUp>}
      </div>
    </div>
  );
}

/* ---------- Animated counter ---------- */

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
