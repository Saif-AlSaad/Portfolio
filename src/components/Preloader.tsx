import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "./typography";
import { profile } from "../data/portfolio";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();
    let raf: number;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-white"
      initial={{ y: 0 }}
      animate={done ? { y: "-100%" } : {}}
      transition={{ duration: 0.9, ease: EASE }}
      onAnimationComplete={() => done && onComplete()}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-royal to-indigo-500 font-display text-lg font-bold text-white shadow-lg shadow-royal/30"
      >
        AS
      </motion.div>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        className="mt-5 font-display text-xl font-bold tracking-tight"
      >
        {profile.name}
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-1 font-mono text-[11px] uppercase tracking-[0.3em] text-smoke"
      >
        Portfolio · 2026
      </motion.p>

      <div className="mt-10 h-[3px] w-56 overflow-hidden rounded-full bg-ink/10">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-royal to-indigo-500" style={{ width: `${count}%` }} />
      </div>
      <p className="mt-3 font-mono text-xs text-smoke tabular-nums">{count}%</p>
    </motion.div>
  );
}
