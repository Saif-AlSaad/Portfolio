import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import { scrollTo, getLenis } from "../lib/lenis";
import { EASE } from "./typography";

export default function Navbar({ started }: { started: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
  });

  useEffect(() => {
    if (open) getLenis()?.stop();
    else getLenis()?.start();
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => scrollTo(href), open ? 450 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: started ? (hidden ? -90 : 0) : -90, opacity: started ? (hidden ? 0 : 1) : 0 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="fixed inset-x-0 top-4 z-[100] flex justify-center px-4"
      >
        <nav className="flex items-center gap-1 rounded-full border border-line bg-white/85 py-2 pl-3 pr-2 shadow-lg shadow-ink/5 backdrop-blur-xl">
          <button
            onClick={() => scrollTo(0)}
            className="mr-2 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-cloud"
          >
            <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-royal to-indigo-500 font-display text-[11px] font-bold text-white">
              SA
            </span>
            <span className="hidden font-display text-sm font-bold tracking-tight sm:block">saif.dev</span>
          </button>

          <div className="hidden items-center lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="rounded-full px-4 py-2 text-[13px] font-medium text-smoke transition-colors hover:bg-cloud hover:text-ink"
              >
                {link.label}
              </button>
            ))}
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="btn-sheen group ml-1 hidden items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-royal md:flex"
          >
            Let's talk
            <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:rotate-45" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-line lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="fixed inset-x-4 top-20 z-[99] rounded-3xl border border-line bg-white p-4 shadow-2xl shadow-ink/10"
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.06 * i, duration: 0.35 }}
                onClick={() => go(link.href)}
                className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left transition-colors hover:bg-cloud"
              >
                <span className="font-display text-lg font-semibold">{link.label}</span>
                <span className="font-mono text-xs text-royal">{link.index}</span>
              </motion.button>
            ))}
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 flex items-center justify-center gap-2 rounded-2xl bg-royal px-4 py-3.5 font-semibold text-white"
            >
              Let's talk <ArrowUpRight size={15} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
