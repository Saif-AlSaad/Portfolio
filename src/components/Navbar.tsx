import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { navLinks, profile } from "../data/portfolio";
import { scrollTo, getLenis } from "../lib/lenis";
import { EASE } from "./typography";

export default function Navbar({ started }: { started: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 200 && !open);
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPos >= top) {
            setActiveSection(`#${sectionIds[i]}`);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className="fixed inset-x-0 top-3 sm:top-4 z-[100] flex justify-center px-3 sm:px-4 pointer-events-none"
      >
        <nav
          onMouseLeave={() => setHoveredHref(null)}
          className="pointer-events-auto relative flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/70 bg-white/80 p-1.5 pl-2 shadow-[0_12px_36px_-6px_rgba(12,18,34,0.08),0_2px_8px_rgba(12,18,34,0.04)] backdrop-blur-2xl ring-1 ring-black/[0.04] transition-all duration-300 hover:shadow-[0_18px_48px_-8px_rgba(37,99,235,0.12),0_4px_14px_rgba(12,18,34,0.05)]"
        >
          {/* Top subtle gloss highlight */}
          <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

          {/* Brand Logo & Name */}
          <button
            onClick={() => scrollTo(0)}
            className="group mr-1 sm:mr-2 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2.5 transition-all duration-200 hover:bg-slate-100/70"
            title="Scroll to top"
          >
            {/* Avatar badge with live pulse indicator */}
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal via-indigo-600 to-sky-400 font-display text-[11px] font-black tracking-tight text-white shadow-md shadow-royal/25 transition-transform duration-300 group-hover:scale-105">
              SA
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-mint" />
              </span>
            </div>

            {/* Brand text */}
            <span className="hidden sm:flex items-center gap-1 font-display text-sm font-bold tracking-tight text-ink">
              saif
              <span className="rounded-md bg-royal/10 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                .dev
              </span>
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden items-center lg:flex">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              const isHovered = hoveredHref === link.href;

              return (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  onMouseEnter={() => setHoveredHref(link.href)}
                  className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 ${
                    isActive ? "text-ink font-semibold" : "text-smoke hover:text-ink"
                  }`}
                >
                  {/* Sliding hover pill indicator */}
                  {isHovered && (
                    <motion.span
                      layoutId="nav-hover-pill"
                      className="absolute inset-0 rounded-full bg-slate-900/[0.05]"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                    />
                  )}

                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-royal shadow-[0_0_8px_rgba(37,99,235,0.8)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* CTA: Let's talk */}
          <a
            href={`mailto:${profile.email}`}
            className="group relative ml-1 hidden items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-ink via-slate-900 to-ink px-4 py-2 text-[13px] font-semibold text-white shadow-md shadow-ink/15 transition-all duration-300 hover:shadow-lg hover:shadow-royal/20 hover:scale-[1.02] active:scale-[0.98] md:flex"
          >
            {/* Shimmer sweep effect */}
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full transition-transform duration-700 ease-in-out group-hover:translate-x-full" />

            <span className="relative z-10">Let's talk</span>
            <span className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full bg-white/15 transition-transform duration-300 group-hover:bg-royal group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight size={11} strokeWidth={2.6} />
            </span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="ml-1 grid h-9 w-9 place-items-center rounded-full border border-line bg-white/60 text-ink shadow-xs transition-colors hover:bg-slate-100 lg:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay Sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-x-4 top-20 z-[99] overflow-hidden rounded-3xl border border-white/70 bg-white/95 p-5 shadow-2xl shadow-ink/15 backdrop-blur-2xl sm:max-w-md sm:mx-auto"
          >
            {/* Availability status badge in mobile menu */}
            <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
                </span>
                <span className="font-mono text-xs font-semibold text-mint">{profile.availability}</span>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-smoke">Dhaka, BD</span>
            </div>

            <div className="space-y-1">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;

                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.05 * i, duration: 0.3 }}
                    onClick={() => go(link.href)}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left transition-colors ${
                      isActive ? "bg-royal/10 text-royal font-bold" : "hover:bg-cloud text-ink font-medium"
                    }`}
                  >
                    <span className="font-display text-base">{link.label}</span>
                    <span className="font-mono text-xs text-smoke/70">{link.index}</span>
                  </motion.button>
                );
              })}
            </div>

            <a
              href={`mailto:${profile.email}`}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-royal via-indigo-600 to-royal px-5 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-royal/25 transition-transform active:scale-[0.98]"
            >
              <Sparkles size={15} />
              <span>Let's talk</span>
              <ArrowUpRight size={15} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
